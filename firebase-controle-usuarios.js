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
  getStorage, ref as storageRef, uploadString, getDownloadURL
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
const storage = getStorage(app);

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
// Mantemos a mesma estrutura pública (controle/materiais), mas as fotos
// deixam de ocupar espaço dentro do documento. Isso preserva a sincronização
// entre celular e computador e elimina o limite de ~1 MB do Firestore.
const REF_MATERIAIS_IMAGENS = (id) => doc(db, "controle", "materiais_imagens", "itens", String(id));

function ehDataUrlImagem(valor) {
  return typeof valor === "string" && valor.startsWith("data:image/");
}

async function salvarFotoSeparada(material) {
  if (!material || !material.foto) return null;
  if (!ehDataUrlImagem(material.foto)) return material.foto;

  const id = String(material.id);
  try {
    const destino = storageRef(storage, `materiais/${id}.jpg`);
    await uploadString(destino, material.foto, "data_url", { contentType: "image/jpeg" });
    return await getDownloadURL(destino);
  } catch (erroStorage) {
    // Fallback: uma imagem por documento. Assim, mesmo sem Storage habilitado,
    // a foto não volta a ocupar o documento único dos materiais.
    await setDoc(REF_MATERIAIS_IMAGENS(id), {
      foto: material.foto,
      updatedAt: Date.now()
    }, { merge: true });
    return `firestore-image:${id}`;
  }
}

async function hidratarFotos(materiais) {
  const lista = Array.isArray(materiais) ? materiais.map(m => ({ ...m })) : [];
  await Promise.all(lista.map(async (m) => {
    // Se a migração falhar, preservamos a foto Base64 antiga em memória.
    if (m.foto) return;
    if (!m.id) return;
    const id = String(m.id);
    if (m.fotoRef && m.fotoRef !== `firestore-image:${id}` && m.fotoRef.startsWith("http")) {
      m.foto = m.fotoRef;
      return;
    }
    try {
      const imgSnap = await getDoc(REF_MATERIAIS_IMAGENS(id));
      if (imgSnap.exists()) m.foto = imgSnap.data().foto || null;
    } catch (e) {
      console.warn("Não foi possível carregar a foto do material", id, e);
    }
  }));
  return lista;
}

async function prepararMateriaisParaSalvar(materiais) {
  const lista = Array.isArray(materiais) ? materiais.map(m => ({ ...m })) : [];
  for (const material of lista) {
    if (!ehDataUrlImagem(material.foto)) continue;
    const fotoOriginal = material.foto;
    const fotoExterna = await salvarFotoSeparada(material);
    material.fotoRef = fotoExterna;
    // Nunca mais gravar Base64 no documento principal.
    material.foto = null;
    // Se o upload para Storage falhar, o fallback já foi salvo em Firestore.
    if (!fotoExterna && fotoOriginal) material.fotoRef = `firestore-image:${material.id}`;
  }
  return lista;
}

export async function salvarMateriaisNaNuvem(materiais) {
  const prontos = await prepararMateriaisParaSalvar(materiais);
  await setDoc(REF_MATERIAIS, { materiais: prontos, updatedAt: Date.now() }, { merge: true });
}

export async function carregarMateriaisDaNuvem() {
  const snap = await getDoc(REF_MATERIAIS);
  if (!snap.exists()) return null;
  const materiais = snap.data().materiais ?? null;
  if (!Array.isArray(materiais)) return materiais;

  // Compatibilidade com os 11 materiais já existentes: se ainda houver
  // Base64 no documento antigo, migramos as fotos automaticamente.
  const possuiFotosLegadas = materiais.some(m => ehDataUrlImagem(m?.foto));
  if (possuiFotosLegadas) {
    try {
      await salvarMateriaisNaNuvem(materiais);
      const atualizado = await getDoc(REF_MATERIAIS);
      const dados = atualizado.exists() ? (atualizado.data().materiais ?? materiais) : materiais;
      return await hidratarFotos(dados);
    } catch (e) {
      console.warn("Migração das fotos antigas não concluída; mantendo leitura compatível.", e);
    }
  }
  return await hidratarFotos(materiais);
}

export function escutarMudancasMateriais(callback) {
  return onSnapshot(REF_MATERIAIS, async (snap) => {
    if (!snap.exists()) return;
    const materiais = snap.data().materiais ?? [];
    callback(await hidratarFotos(materiais));
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
