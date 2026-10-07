/**
 * Firebase Firestore (sem build / sem npm)
 * - Funciona em site estático (GitHub Pages / Vercel)
 * - Salva/Carrega em 2 documentos: controle/dados e controle/materiais
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage, ref, uploadString, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

// ✅ Config do seu app
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

function obterStorage() {
  if (storage) return storage;
  try {
    storage = getStorage(app);
    return storage;
  } catch (error) {
    console.warn('Firebase Storage indisponível; o cadastro seguirá sem foto:', error);
    return null;
  }
}

// Documentos para empréstimos, materiais da obra e rastreabilidade
const REF_EMPRESTIMOS = doc(db, "controle", "dados");
const REF_MATERIAIS = doc(db, "controle", "materiais");
const REF_MOVIMENTACOES = doc(db, "controle", "movimentacoes");
const REF_PLANEJAMENTO_RT = doc(db, "controle", "planejamento_rt");
const REF_RT_DIA_DIA = doc(db, "controle", "rt_dia_dia");
const REF_SALDO_NF = doc(db, "controle", "saldo_nf");

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

// ── MATERIAIS DA OBRA ──
async function salvarFotoNoFirestore(foto, materialId) {
  const id = String(materialId || 'sem-id');
  await setDoc(doc(db, "controle_fotos", id), {
    foto,
    materialId: id,
    updatedAt: Date.now()
  }, { merge: true });
  return `firestore-photo:${id}`;
}

async function resolverFoto(foto) {
  if (!foto || typeof foto !== 'string' || !foto.startsWith('firestore-photo:')) return foto || null;
  const id = foto.slice('firestore-photo:'.length);
  try {
    const snap = await getDoc(doc(db, "controle_fotos", id));
    return snap.exists() ? (snap.data().foto || null) : null;
  } catch (error) {
    console.warn('Não foi possível carregar a foto compartilhada:', error);
    return null;
  }
}

async function fotoParaStorage(foto, materialId) {
  if (!foto || typeof foto !== 'string' || !foto.startsWith('data:image/')) return foto || null;
  const storageAtual = obterStorage();
  if (storageAtual) {
    try {
      const nome = `materiais/${materialId || 'sem-id'}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.jpg`;
      const destino = ref(storageAtual, nome);
      await uploadString(destino, foto, 'data_url', { contentType: 'image/jpeg', cacheControl: 'public,max-age=31536000' });
      const url = await getDownloadURL(destino);
      if (url && /^https?:\/\//.test(url)) return url;
    } catch (error) {
      console.warn('Storage recusou a foto; usando o armazenamento compartilhado do Firestore:', error);
    }
  }
  // Fallback compartilhado: não deixa a foto ficar presa somente no PC/celular.
  return await salvarFotoNoFirestore(foto, materialId);
}

// Fotos ficam no Storage quando disponível; o Firestore guarda um identificador
// compartilhado quando o Storage não aceita o upload.
export async function salvarMateriaisNaNuvem(materiais) {
  const lista = Array.isArray(materiais) ? materiais : [];
  const materiaisParaNuvem = await Promise.all(lista.map(async (material) => {
    const foto = await fotoParaStorage(material?.foto, material?.id);
    return { ...material, foto };
  }));
  await setDoc(REF_MATERIAIS, { materiais: materiaisParaNuvem, updatedAt: Date.now() }, { merge: true });
  // Retorna as fotos originais/URLs para o aparelho atual; a nuvem guarda o ponteiro.
  return lista.map((material, i) => ({ ...material, foto: material?.foto || materiaisParaNuvem[i]?.foto || null }));
}

export async function carregarMateriaisDaNuvem() {
  const snap = await getDoc(REF_MATERIAIS);
  if (!snap.exists()) return null;
  const materiais = snap.data().materiais ?? null;
  return Array.isArray(materiais)
    ? await Promise.all(materiais.map(async (material) => ({ ...material, foto: await resolverFoto(material?.foto) })))
    : materiais;
}

export function escutarMudancasMateriais(callback) {
  return onSnapshot(REF_MATERIAIS, async (snap) => {
    if (!snap.exists()) return;
    const materiais = snap.data().materiais ?? [];
    const resolvidos = Array.isArray(materiais)
      ? await Promise.all(materiais.map(async (material) => ({ ...material, foto: await resolverFoto(material?.foto) })))
      : [];
    callback(resolvidos);
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
