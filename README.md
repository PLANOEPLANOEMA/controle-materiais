# ✅ Site pronto (Firebase Firestore)

Este pacote está pronto para **subir no GitHub** (GitHub Pages) ou **deploy na Vercel**.
Ele salva os registros no **Firebase Firestore (nuvem)** e sincroniza entre computadores.

## 1) Firestore Rules (obrigatório)
Firebase Console → Firestore Database → Rules → Publish

Para começar rápido (sem login / aberto), use:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /controle/{docId} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ Se você quiser segurança (cada usuário ver só o seu), me peça que eu adapto para Firebase Auth + regras por `uid`.

## 2) Subir no GitHub (Pages)
1. Crie um repositório e envie estes arquivos (`index.html`, `firebase.js`, etc.)
2. GitHub → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / (root)
3. Acesse o link do Pages.

## 3) Rodar localmente (teste)
Como usamos `import` (módulos), evite abrir com duplo clique.
Use um servidor local:

```bash
python -m http.server 5500
```

Abra:
http://localhost:5500

## Arquivos
- `index.html`  → seu site (já integrado com Firebase)
- `firebase.js` → conexão com Firestore
- `vercel.json` → (opcional) config de deploy

