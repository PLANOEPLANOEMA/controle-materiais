# 🏗️ Site Permanente - Sistema de Controle de Obras v26

## 🎯 Bem-vindo!

Você agora tem um **site permanente e funcional** para gerenciar sua obra com:

- ✅ Ambiente 3D imersivo de sala de estar
- ✅ Prédio 3D com múltiplas torres
- ✅ Checklist de serviços com fotos
- ✅ Requisições de materiais (RTs)
- ✅ Controle de estoque com entrada automática
- ✅ Rastreabilidade completa

---

## 🚀 Começar Agora (3 Passos)

### 1️⃣ Acessar Localmente
```bash
# Extraia o ZIP
unzip site-controle-obras-v26-final.zip

# Abra no navegador
# Opção A: Duplo clique em index-v26.html
# Opção B: Servidor local
cd projeto_novo
python3 -m http.server 8000
# Acesse: http://localhost:8000/index-v26.html
```

### 2️⃣ Testar Funcionalidades
- 🏠 Clique em "Acessar Sistema" → Sala 3D imersiva
- 🏢 Clique em "Ver Demonstração" → Prédio 3D + RTs
- 📸 Adicione fotos aos serviços
- 📋 Crie RTs e veja material entrar no estoque

### 3️⃣ Publicar Online
Siga o **GUIA_DEPLOYMENT.md** para publicar em:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Servidor próprio

---

## 📁 Estrutura de Arquivos

```
projeto_novo/
├── index-v26.html              ← Página inicial do site
├── sala3d.html                 ← Ambiente 3D com Three.js
├── demo.html                   ← Demonstração interativa
│
├── servicos-pavimentos.js      ← Lógica de serviços
├── integracao-rt-estoque.js    ← Integração RT ↔ Estoque
├── firebase-controle-usuarios.js
│
├── GUIA_DEPLOYMENT.md          ← Como publicar online
├── GUIA_DEMO.md                ← Como usar a demo
├── README_V26.md               ← Documentação v26
├── EXEMPLO_PRATICO_INTEGRACAO.md
├── PLANO_REESTRUTURACAO_V26.md
└── [outros arquivos]
```

---

## 🎮 Como Usar

### Sala 3D Imersiva
1. Acesse `sala3d.html`
2. **Mouse:** Arraste para rotacionar câmera
3. **Scroll:** Zoom in/out
4. **Clique:** Abrir serviço da área

**Áreas clicáveis:**
- 🟢 Parede frontal → Contra Piso
- 🟡 Parede esquerda → Gesso Liso
- 🔵 Parede direita → Pintura
- 🟣 Teto → Forro
- 🟠 Piso → Instalação de Porta

### Prédio 3D + RTs
1. Acesse `demo.html`
2. Clique em um pavimento no prédio 3D
3. Crie uma RT e marque como "Entregue"
4. Veja material entrar automaticamente no estoque

---

## 💾 Dados Salvos

Os dados são salvos em **localStorage** do navegador:
- Serviços concluídos
- Datas de início/previsão
- Fotos (base64)
- Observações

**Nota:** Para produção, integre com Firebase para sincronização em tempo real.

---

## 🌐 Publicar Online (Rápido)

### Vercel (Mais Fácil)
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Seguir instruções
```

### Netlify (Alternativa)
```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod --dir=.
```

### GitHub Pages
```bash
# 1. Criar repositório no GitHub
# 2. Push dos arquivos
git push origin main

# 3. Ativar Pages em Settings
# URL: https://seu-usuario.github.io/sistema-controle-obras-v26
```

---

## 📊 Módulos Disponíveis

| Módulo | URL | Descrição |
|--------|-----|-----------|
| **Página Inicial** | `index-v26.html` | Menu principal com todos os recursos |
| **Sala 3D** | `sala3d.html` | Ambiente 3D imersivo com Three.js |
| **Prédio 3D** | `demo.html` | Visualização de torres e RTs |
| **RTs** | `demo.html` | Criar e gerenciar requisições |
| **Materiais** | `demo.html` | Controle de estoque |
| **Rastreabilidade** | `demo.html` | Histórico de movimentações |

---

## 🎓 Guias de Referência

### Para Começar
→ Leia: `README_V26.md`

### Para Usar a Demo
→ Leia: `GUIA_DEMO.md`

### Para Publicar Online
→ Leia: `GUIA_DEPLOYMENT.md`

### Para Integrar no Seu Projeto
→ Leia: `EXEMPLO_PRATICO_INTEGRACAO.md`

### Para Entender a Arquitetura
→ Leia: `PLANO_REESTRUTURACAO_V26.md`

---

## 🔧 Customização

### Mudar Cores
Edite as variáveis CSS em `index-v26.html`:
```css
:root {
  --blue-dark: #1F3864;
  --blue-mid: #2E75B6;
  --success: #27AE60;
  /* ... */
}
```

### Mudar Serviços
Edite `servicosData` em `sala3d.html`:
```javascript
const servicosData = {
  'Seu Serviço': {
    descricao: 'Descrição',
    datas: true,
    fotos: true
  }
};
```

### Mudar Logo
Substitua `logo.png` e `logotipo.jpg`

---

## 🚨 Troubleshooting

### Problema: Fotos não salvam
**Causa:** localStorage desativado (modo privado)  
**Solução:** Use modo normal ou integre com Firebase

### Problema: Three.js não carrega
**Causa:** CDN indisponível  
**Solução:** Baixe Three.js localmente

### Problema: Lento
**Causa:** Muitas fotos grandes  
**Solução:** Comprima imagens antes de adicionar

### Problema: Não funciona offline
**Causa:** Dependência de CDN  
**Solução:** Adicione Service Worker para offline

---

## 📈 Próximos Passos

1. **Testar** - Teste todas as funcionalidades localmente
2. **Customizar** - Adapte cores, serviços e layout
3. **Publicar** - Escolha uma plataforma e publique
4. **Integrar Firebase** - Para sincronização em tempo real
5. **Adicionar Usuários** - Sistema de login e permissões

---

## 🔐 Segurança

### Dados Sensíveis
- ⚠️ Não armazene senhas em localStorage
- ⚠️ Use HTTPS em produção
- ⚠️ Valide dados no servidor

### Para Produção
1. Integre com Firebase
2. Adicione autenticação
3. Implemente permissões
4. Ative CORS apropriadamente
5. Configure backup automático

---

## 📞 Suporte

### Dúvidas sobre Uso?
→ Consulte `GUIA_DEMO.md`

### Dúvidas sobre Publicação?
→ Consulte `GUIA_DEPLOYMENT.md`

### Dúvidas sobre Integração?
→ Consulte `EXEMPLO_PRATICO_INTEGRACAO.md`

### Dúvidas sobre Arquitetura?
→ Consulte `PLANO_REESTRUTURACAO_V26.md`

---

## ✅ Checklist de Implementação

- [ ] Extrair ZIP
- [ ] Testar localmente
- [ ] Verificar funcionalidades
- [ ] Customizar (cores, serviços, etc)
- [ ] Publicar online
- [ ] Configurar domínio
- [ ] Ativar HTTPS
- [ ] Testar em produção
- [ ] Configurar backup
- [ ] Documentar mudanças

---

## 🎉 Você Está Pronto!

Seu site permanente está completo e pronto para usar. Escolha uma plataforma de deployment e publique em minutos!

### Recomendações:
- **Melhor:** Vercel (mais rápido)
- **Alternativa:** Netlify (mais fácil)
- **Gratuito:** GitHub Pages
- **Profissional:** Servidor próprio

---

## 📅 Versão

- **Versão:** 26
- **Data:** 06/04/2026
- **Status:** ✅ Pronto para Produção
- **Suporte:** Documentação completa incluída

---

## 🚀 Comece Agora!

1. Extraia o ZIP
2. Abra `index-v26.html` no navegador
3. Clique em "Acessar Sistema"
4. Teste a Sala 3D
5. Publique online

**Boa sorte com seu novo sistema! 🎉**

---

**Dúvidas?** Consulte os guias inclusos no pacote.  
**Pronto para publicar?** Siga o `GUIA_DEPLOYMENT.md`.
