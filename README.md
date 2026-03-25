# Site corrigido - Plano & Plano

Arquivos prontos para subir no GitHub Pages ou Vercel.

## Arquivos principais
- index.html
- firebase.js
- relatorio-materiais.html
- vercel.json

## Importante
No Firebase Firestore, use regras de teste para validar:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /controle/{docId} {
      allow read, write: if true;
    }
  }
}

## Rodar localmente
Use um servidor local:
python -m http.server 5500
