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
    storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
    return storage;
  } catch (error) {
    console.warn('Firebase Storage indisponível; tentando fallback compartilhado no Firestore:', error);
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
  try {
    // Um documento por foto evita que várias imagens excedam o limite de 1 MiB.
    await setDoc(doc(db, "controle_fotos", id), {
      foto,
      materialId: id,
      updatedAt: Date.now()
    }, { merge: true });
    return `firestore-photo:${id}`;
  } catch (error) {
    console.warn('Coleção compartilhada de fotos indisponível; tentando compatibilidade:', error);
    // Compatibilidade com instalações antigas e regras já existentes no documento de movimentações.
    await setDoc(REF_MOVIMENTACOES, {
      fotos: { [id]: foto },
      fotosUpdatedAt: Date.now()
    }, { merge: true });
    return `mov-photo:${id}`;
  }
}

async function resolverFoto(foto) {
  if (!foto || typeof foto !== 'string') return foto || null;
  const prefix = foto.startsWith('mov-photo:') ? 'mov-photo:' : (foto.startsWith('firestore-photo:') ? 'firestore-photo:' : null);
  if (!prefix) return foto;
  const id = foto.slice(prefix.length);
  try {
    if (prefix === 'mov-photo:') {
      const snap = await getDoc(REF_MOVIMENTACOES);
      return snap.exists() ? (snap.data().fotos?.[id] || null) : null;
    }
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
      const idSeguro = String(materialId || 'sem-id').replace(/[^a-zA-Z0-9_-]/g, '_');
      const nome = `materiais/${idSeguro}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.jpg`;
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
// Materiais também são espelhados no documento que já funciona para as retiradas.
// Isso mantém compatibilidade mesmo quando as regras do documento antigo de materiais
// estiverem bloqueando a gravação.
const REF_MATERIAIS_COMPAT = doc(db, "controle", "movimentacoes");

function comPrazo(promise, ms = 60000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Operação de foto excedeu o tempo limite')), ms);
    promise.then(
      value => { clearTimeout(timer); resolve(value); },
      error => { clearTimeout(timer); reject(error); }
    );
  });
}

async function prepararFotoSemBloquear(foto, materialId) {
  if (!foto || typeof foto !== 'string') return null;
  if (!foto.startsWith('data:image/')) return foto;
  try {
    return await comPrazo(fotoParaStorage(foto, materialId));
  } catch (error) {
    console.error('Foto não foi sincronizada no Firebase; o material não será marcado como sincronizado:', error);
    throw error;
  }
}

export async function salvarMateriaisNaNuvem(materiais) {
  const lista = Array.isArray(materiais) ? materiais : [];
  // Cada foto é tratada separadamente. Uma foto problemática nunca cancela o cadastro.
  const materiaisParaNuvem = await Promise.all(lista.map(async (material) => {
    const fotoOriginal = material?.foto || null;
    const foto = await prepararFotoSemBloquear(fotoOriginal, material?.id);
    return { ...material, foto: foto || (fotoOriginal?.startsWith('data:image/') ? null : fotoOriginal) };
  }));
  const agora = Date.now();
  let salvo = false;
  let ultimoErro = null;
  for (const [nome, refDoc, campoData] of [
    ['principal', REF_MATERIAIS, 'updatedAt'],
    ['compatibilidade', REF_MATERIAIS_COMPAT, 'materiaisUpdatedAt']
  ]) {
    try {
      await setDoc(refDoc, { materiais: materiaisParaNuvem, [campoData]: agora }, { merge: true });
      salvo = true;
    } catch (error) {
      ultimoErro = error;
      console.warn(`Documento ${nome} de materiais recusou a gravação:`, error);
    }
  }
  if (!salvo) throw (ultimoErro || new Error('Não foi possível sincronizar materiais com o Firebase.'));
  // Use URLs/identificadores remotos também no cache local para reduzir espaço e
  // garantir que celular e computador apontem para a mesma foto persistida.
  return materiaisParaNuvem;
}

async function lerMateriaisDoSnapshot(snap, compat = false) {
  if (!snap.exists()) return null;
  const dados = snap.data() || {};
  const materiais = dados.materiais;
  if (!Array.isArray(materiais)) return null;
  const resolvidos = await Promise.all(materiais.map(async (material) => ({ ...material, foto: await resolverFoto(material?.foto) })));
  return { materiais: resolvidos, atualizadoEm: Number(compat ? dados.materiaisUpdatedAt : dados.updatedAt) || 0 };
}

export async function carregarMateriaisDaNuvem() {
  const [principal, compat] = await Promise.all([
    getDoc(REF_MATERIAIS).then(s => lerMateriaisDoSnapshot(s, false)).catch(() => null),
    getDoc(REF_MATERIAIS_COMPAT).then(s => lerMateriaisDoSnapshot(s, true)).catch(() => null)
  ]);
  const escolhido = (compat && (!principal || compat.atualizadoEm > principal.atualizadoEm)) ? compat : principal;
  return escolhido ? escolhido.materiais : null;
}

export function escutarMudancasMateriais(callback) {
  let principal = null;
  let compat = null;
  const emitir = async () => {
    const escolhido = (compat && (!principal || compat.atualizadoEm > principal.atualizadoEm)) ? compat : principal;
    if (escolhido) callback(escolhido.materiais);
  };
  const unsubPrincipal = onSnapshot(REF_MATERIAIS, async (snap) => {
    principal = await lerMateriaisDoSnapshot(snap, false);
    await emitir();
  }, error => console.warn('Sincronização principal de materiais indisponível:', error));
  const unsubCompat = onSnapshot(REF_MATERIAIS_COMPAT, async (snap) => {
    compat = await lerMateriaisDoSnapshot(snap, true);
    await emitir();
  }, error => console.warn('Sincronização compatível de materiais indisponível:', error));
  return () => { unsubPrincipal(); unsubCompat(); };
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
