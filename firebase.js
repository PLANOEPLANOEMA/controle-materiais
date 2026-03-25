/**
 * Firebase Firestore (sem build / sem npm)
 * - Funciona em site estático (GitHub Pages / Vercel)
 * - Salva materiais no documento: controle/materiais
 * - Salva empréstimos no documento: controle/dados
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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

const REF_EMPRESTIMOS = doc(db, "controle", "dados");
const REF_MATERIAIS = doc(db, "controle", "materiais");

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
export async function salvarMateriaisNaNuvem(materiais) {
  await setDoc(REF_MATERIAIS, { materiais, updatedAt: Date.now() }, { merge: true });
  return true;
}

export async function carregarMateriaisDaNuvem() {
  const snap = await getDoc(REF_MATERIAIS);
  return snap.exists() ? (snap.data().materiais ?? []) : [];
}

export function escutarMudancasMateriais(callback) {
  return onSnapshot(REF_MATERIAIS, (snap) => {
    callback(snap.exists() ? (snap.data().materiais ?? []) : []);
  });
}

export async function salvarMaterialNaNuvem(material) {
  const materiais = await carregarMateriaisDaNuvem();
  const idx = materiais.findIndex((m) => String(m.id) === String(material.id));
  if (idx >= 0) {
    materiais[idx] = { ...materiais[idx], ...material, dataAtualizacao: new Date().toISOString() };
  } else {
    materiais.push({ ...material, dataAtualizacao: material.dataAtualizacao || new Date().toISOString() });
  }
  await salvarMateriaisNaNuvem(materiais);
  return true;
}

export async function deletarMaterialDaNuvem(materialId) {
  const materiais = await carregarMateriaisDaNuvem();
  const atualizados = materiais.filter((m) => String(m.id) !== String(materialId));
  await salvarMateriaisNaNuvem(atualizados);
  return true;
}
