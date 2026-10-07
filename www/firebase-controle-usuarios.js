import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = { apiKey: "AIzaSyBNeTqTWbvakrz2KiVABPWezxoqZePuBms", authDomain: "planoeplano.firebaseapp.com", projectId: "planoeplano", storageBucket: "planoeplano.firebasestorage.app", messagingSenderId: "813813625915", appId: "1:813813625915:web:d5996961e50747eb9c181e" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let storage = null;
function obterStorage() { try { return storage || (storage = getStorage(app)); } catch (e) { console.warn("Storage indisponível; cadastro seguirá sem foto.", e); return null; } }
const refs = { registros: doc(db,"controle","dados"), materiais: doc(db,"controle","materiais"), movimentacoes: doc(db,"controle","movimentacoes"), planejamento: doc(db,"controle","planejamento_rt"), diaDia: doc(db,"controle","rt_dia_dia"), saldoNF: doc(db,"controle","saldo_nf") };
const carregar = async (r, chave, padrao=null) => { const snap = await getDoc(r); return snap.exists() ? (snap.data()[chave] ?? padrao) : padrao; };
const observar = (r, chave, cb, padrao=[]) => onSnapshot(r, snap => { if (snap.exists()) cb(snap.data()[chave] ?? padrao); });
const salvar = (r, chave, valor) => setDoc(r, { [chave]: valor, updatedAt: Date.now() }, { merge: true });
export const salvarNaNuvem = v => salvar(refs.registros,"registros",v);
export const carregarDaNuvem = () => carregar(refs.registros,"registros");
export const escutarMudancas = cb => observar(refs.registros,"registros",cb);
async function fotoParaStorage(foto, id) {
  if (!foto || typeof foto !== "string" || !foto.startsWith("data:image/")) return foto || null;
  const s = obterStorage(); if (!s) return null;
  try { const destino = ref(s, `materiais/${id || "sem-id"}/${Date.now()}-${Math.random().toString(36).slice(2,10)}.jpg`); await uploadString(destino, foto, "data_url", { contentType:"image/jpeg", cacheControl:"public,max-age=31536000" }); return await getDownloadURL(destino); } catch (e) { console.warn("Foto não sincronizada; material será salvo sem foto.", e); return null; }
}
export async function salvarMateriaisNaNuvem(lista) {
  const materiais = await Promise.all((Array.isArray(lista) ? lista : []).map(async m => ({ ...m, foto: await fotoParaStorage(m?.foto, m?.id) })));
  try { await salvar(refs.materiais,"materiais",materiais); } catch (e) { console.warn("Nuvem indisponível; materiais mantidos localmente.", e); }
  return materiais;
}
export const carregarMateriaisDaNuvem = () => carregar(refs.materiais,"materiais");
export const escutarMudancasMateriais = cb => observar(refs.materiais,"materiais",cb);
export const salvarMovimentacoesNaNuvem = v => salvar(refs.movimentacoes,"movimentacoes",v);
export const carregarMovimentacoesDaNuvem = () => carregar(refs.movimentacoes,"movimentacoes");
export const escutarMudancasMovimentacoes = cb => observar(refs.movimentacoes,"movimentacoes",cb);
export const salvarPlanejamentoRTNaNuvem = v => salvar(refs.planejamento,"itens",v);
export const carregarPlanejamentoRTDaNuvem = () => carregar(refs.planejamento,"itens");
export const escutarMudancasPlanejamentoRT = cb => observar(refs.planejamento,"itens",cb);
export const salvarRTDiaDiaNaNuvem = v => salvar(refs.diaDia,"itens",v);
export const carregarRTDiaDiaDaNuvem = () => carregar(refs.diaDia,"itens");
export const escutarMudancasRTDiaDia = cb => observar(refs.diaDia,"itens",cb);
export const salvarSaldoNFNaNuvem = v => salvar(refs.saldoNF,"dados",v);
export const carregarSaldoNFDaNuvem = () => carregar(refs.saldoNF,"dados");
export const escutarMudancasSaldoNF = cb => observar(refs.saldoNF,"dados",cb,{ materiais:[], nfs:[] });
