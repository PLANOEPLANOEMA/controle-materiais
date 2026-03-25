/**
 * Firebase Firestore - Sincronização em Tempo Real
 * Salva TUDO no Firestore, sem cache local
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// ✅ Config do seu app Firebase
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

// ── COLEÇÕES ──
const COLECAO_EMPRESTIMOS = "emprestimos";
const COLECAO_MATERIAIS = "materiais_obra";

// ── EMPRÉSTIMOS ──
export async function salvarNaNuvem(registros) {
  const docRef = doc(db, "controle", "dados");
  await setDoc(docRef, { registros, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function carregarDaNuvem() {
  const docRef = doc(db, "controle", "dados");
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data().registros ?? null) : null;
}

export function escutarMudancas(callback) {
  const docRef = doc(db, "controle", "dados");
  return onSnapshot(docRef, (snap) => {
    if (!snap.exists()) return;
    callback(snap.data().registros ?? []);
  });
}

// ── MATERIAIS DA OBRA (Firestore Collection) ──
export async function salvarMaterialNaNuvem(material) {
  try {
    const docRef = doc(db, COLECAO_MATERIAIS, material.id.toString());
    await setDoc(docRef, {
      ...material,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Erro ao salvar material:", error);
    return false;
  }
}

export async function carregarMateriaisDaNuvem() {
  try {
    const colRef = collection(db, COLECAO_MATERIAIS);
    const snap = await getDoc(colRef);
    // Para coleções, usamos query
    const q = query(colRef);
    const querySnap = await getDocs(q);
    const materiais = [];
    querySnap.forEach((doc) => {
      materiais.push({ id: doc.id, ...doc.data() });
    });
    return materiais;
  } catch (error) {
    console.error("Erro ao carregar materiais:", error);
    return [];
  }
}

export function escutarMudancasMateriais(callback) {
  try {
    const colRef = collection(db, COLECAO_MATERIAIS);
    return onSnapshot(colRef, (snap) => {
      const materiais = [];
      snap.forEach((doc) => {
        materiais.push({ id: doc.id, ...doc.data() });
      });
      callback(materiais);
    });
  } catch (error) {
    console.error("Erro ao escutar mudanças de materiais:", error);
    return () => {};
  }
}

export async function deletarMaterialDaNuvem(materialId) {
  try {
    const docRef = doc(db, COLECAO_MATERIAIS, materialId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Erro ao deletar material:", error);
    return false;
  }
}

// ── Importar getDocs para coleções ──
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
