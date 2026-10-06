/**
 * Firebase - Controle de Materiais / Obra
 *
 * CORREÇÃO DE LIMITE DE IMAGENS:
 * - Antes, todos os materiais ficavam dentro de um único documento Firestore.
 * - Agora cada material é salvo em seu próprio documento em controle_materiais.
 * - Fotos novas são enviadas ao Firebase Storage quando disponível.
 * - Se o Storage não estiver habilitado/permissões impedirem o upload, a foto
 *   continua sendo salva como Base64 no documento individual (máx. ~350 KB),
 *   evitando o limite acumulado do documento antigo.
 * - O documento antigo controle/materiais é usado apenas para migração inicial.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot,
  collection, getDocs, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage, ref, uploadString, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNeTqTWbvakrz2KiVABPWezxoqZePuBms",
  authDomain: "planoeplano.firebaseapp.com",
  projectId: "planoeplano",
  storageBucket: "planoeplano.firebasestorage.app",
  messagingSenderId: "813813625915",
  appId: "1:813813625915:web:d5996961e50747eb9c181e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let storage = null;
try { storage = getStorage(app); } catch (e) { console.warn('Firebase Storage indisponível:', e); }

// Documentos existentes do sistema
const REF_EMPRESTIMOS = doc(db, "controle", "dados");
const REF_MATERIAIS_ANTIGO = doc(db, "controle", "materiais");
const REF_MOVIMENTACOES = doc(db, "controle", "movimentacoes");
const REF_PLANEJAMENTO_RT = doc(db, "controle", "planejamento_rt");
const REF_RT_DIA_DIA = doc(db, "controle", "rt_dia_dia");
const REF_SALDO_NF = doc(db, "controle", "saldo_nf");

// NOVO: um documento por material. Não existe mais limite acumulado de 1 MB.
const REF_MATERIAIS_COLLECTION = collection(db, "controle_materiais");

// ── EMPRÉSTIMOS ──
export async function salvarNaNuvem(registros) {
  await setDoc(REF_EMPRESTIMOS, { registros, updatedAt: Date.now() }, { merge: true });
}

export async function carregarDaNuvem() {
  const snap = await getDoc(REF_EMPRESTIMOS);
  return snap.exists() ? (snap.data().registros ?? null) : null;
}

export function escutarMudancas(callback) {
  return onSnapshot(REF_EMPRESTIMOS, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().registros ?? []);
  });
}

// ── FOTOS DOS MATERIAIS ──
async function armazenarFotoMaterial(materialId, foto) {
  if (!foto || typeof foto !== 'string') return foto || null;
  if (!foto.startsWith('data:image/')) return foto;

  // Tenta Storage primeiro. Se não estiver habilitado/permissão negar,
  // mantém Base64 no documento individual como fallback seguro.
  if (storage) {
    try {
      const fotoRef = ref(storage, `materiais/${materialId}.jpg`);
      await uploadString(fotoRef, foto, 'data_url', {
        contentType: 'image/jpeg',
        cacheControl: 'public,max-age=31536000'
      });
      return await getDownloadURL(fotoRef);
    } catch (e) {
      console.warn('Não foi possível enviar a foto ao Storage. Usando Base64 no documento individual.', e);
    }
  }

  return foto;
}

async function prepararMaterial(material) {
  const preparado = { ...material };
  if (preparado.foto && preparado.foto.startsWith('data:image/')) {
    preparado.foto = await armazenarFotoMaterial(preparado.id, preparado.foto);
  }
  return preparado;
}

// ── MATERIAIS DA OBRA ──
export async function salvarMateriaisNaNuvem(materiais) {
  if (!Array.isArray(materiais)) return;

  const atuais = new Set();

  // Salva cada material separadamente.
  for (const material of materiais) {
    const id = String(material.id);
    atuais.add(id);
    const preparado = await prepararMaterial(material);
    await setDoc(doc(REF_MATERIAIS_COLLECTION, id), {
      ...preparado,
      _updatedAt: Date.now()
    }, { merge: true });
  }

  // Remove da nuvem materiais que foram deletados no aplicativo.
  const existentes = await getDocs(REF_MATERIAIS_COLLECTION);
  const exclusoes = [];
  existentes.forEach(snap => {
    if (!atuais.has(snap.id)) exclusoes.push(deleteDoc(snap.ref));
  });
  if (exclusoes.length) await Promise.all(exclusoes);
}

export async function carregarMateriaisDaNuvem() {
  // Primeiro tenta a nova estrutura.
  const snapNovo = await getDocs(REF_MATERIAIS_COLLECTION);
  if (!snapNovo.empty) {
    return snapNovo.docs.map(d => d.data());
  }

  // Migração automática do formato antigo, se ainda existir.
  const snapAntigo = await getDoc(REF_MATERIAIS_ANTIGO);
  if (!snapAntigo.exists()) return null;

  const antigos = snapAntigo.data().materiais ?? null;
  if (!Array.isArray(antigos) || !antigos.length) return antigos;

  console.log('Migrando materiais para a nova estrutura...', antigos.length);
  try {
    await salvarMateriaisNaNuvem(antigos);
    console.log('Migração dos materiais concluída.');
  } catch (e) {
    console.error('Falha na migração automática dos materiais:', e);
  }

  return antigos;
}

export function escutarMudancasMateriais(callback) {
  return onSnapshot(REF_MATERIAIS_COLLECTION, (snap) => {
    const materiais = snap.docs.map(d => d.data());
    // Enquanto a migração ainda não populou a coleção, não apaga os dados
    // que já estão carregados no navegador.
    if (materiais.length) callback(materiais);
  }, (error) => {
    console.error('Erro no sincronismo dos materiais:', error);
  });
}

// ── RASTREABILIDADE / MOVIMENTAÇÕES ──
export async function salvarMovimentacoesNaNuvem(movimentacoes) {
  await setDoc(REF_MOVIMENTACOES, { movimentacoes, updatedAt: Date.now() }, { merge: true });
}

export async function carregarMovimentacoesDaNuvem() {
  const snap = await getDoc(REF_MOVIMENTACOES);
  return snap.exists() ? (snap.data().movimentacoes ?? null) : null;
}

export function escutarMudancasMovimentacoes(callback) {
  return onSnapshot(REF_MOVIMENTACOES, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().movimentacoes ?? []);
  });
}

// ── PLANEJAMENTO RT ──
export async function salvarPlanejamentoRTNaNuvem(itens) {
  await setDoc(REF_PLANEJAMENTO_RT, { itens, updatedAt: Date.now() }, { merge: true });
}

export async function carregarPlanejamentoRTDaNuvem() {
  const snap = await getDoc(REF_PLANEJAMENTO_RT);
  return snap.exists() ? (snap.data().itens ?? null) : null;
}

export function escutarMudancasPlanejamentoRT(callback) {
  return onSnapshot(REF_PLANEJAMENTO_RT, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().itens ?? []);
  });
}

// ── RT DIA A DIA ──
export async function salvarRTDiaDiaNaNuvem(itens) {
  await setDoc(REF_RT_DIA_DIA, { itens, updatedAt: Date.now() }, { merge: true });
}

export async function carregarRTDiaDiaDaNuvem() {
  const snap = await getDoc(REF_RT_DIA_DIA);
  return snap.exists() ? (snap.data().itens ?? null) : null;
}

export function escutarMudancasRTDiaDia(callback) {
  return onSnapshot(REF_RT_DIA_DIA, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().itens ?? []);
  });
}

// ── CONTROLE DE SALDO POR NF ──
export async function salvarSaldoNFNaNuvem(dados) {
  await setDoc(REF_SALDO_NF, { dados, updatedAt: Date.now() }, { merge: true });
}

export async function carregarSaldoNFDaNuvem() {
  const snap = await getDoc(REF_SALDO_NF);
  return snap.exists() ? (snap.data().dados ?? null) : null;
}

export function escutarMudancasSaldoNF(callback) {
  return onSnapshot(REF_SALDO_NF, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().dados ?? { materiais: [], nfs: [] });
  });
}
