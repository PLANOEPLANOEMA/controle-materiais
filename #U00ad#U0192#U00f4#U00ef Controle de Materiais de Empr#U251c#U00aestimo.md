# 📋 Controle de Materiais de Empréstimo

Uma aplicação web interativa e editável para gerenciar débitos de materiais de construção e empréstimos de forma visual e intuitiva.

## ✨ Características

- ✅ **Gestão Completa (CRUD)** — Adicione, edite e delete registros de empréstimos
- ✅ **Gráficos Interativos** — Visualize dados em tempo real com gráficos de rosca, pizza e barras
- ✅ **Salvamento Automático** — Dados salvos no navegador (localStorage) — nunca perca suas informações
- ✅ **Filtros e Busca** — Procure por empresa, material ou data facilmente
- ✅ **Exportação CSV** — Exporte seus dados para Excel quando precisar
- ✅ **Design Responsivo** — Funciona perfeitamente em desktop, tablet e celular
- ✅ **Sem Necessidade de Login** — Acesse instantaneamente, sem criar conta

## 🚀 Como Usar

### Online (Recomendado)
Acesse diretamente no navegador:
```
https://seu-dominio-aqui.vercel.app
```

### Localmente
1. Baixe o arquivo `index.html`
2. Abra-o no seu navegador (Chrome, Firefox, Edge)
3. Comece a adicionar seus registros!

## 📊 Funcionalidades

### Visão Geral
- Gráficos de distribuição por empresa e material
- Timeline de empréstimos por data
- KPIs com totalizações

### Por Empresa
- Participação percentual de cada empresa
- Comparativo visual em barras horizontais

### Por Material
- Distribuição de tipos de material
- Análise de quais materiais mais circulam

### Gerenciar Registros
- Tabela completa com todos os dados
- Botões para editar e deletar
- Filtros por empresa e material
- Busca por texto livre
- Exportação em CSV

## 💾 Armazenamento de Dados

Os dados são salvos automaticamente no **localStorage** do seu navegador. Isso significa:
- ✅ Dados persistem mesmo após fechar o navegador
- ✅ Funciona completamente offline
- ✅ Sem servidor necessário
- ⚠️ Se limpar dados do navegador, os dados serão perdidos (use exportar CSV para backup)

## 📥 Exportar Dados

1. Vá na aba "Gerenciar Registros"
2. Clique em "💾 Exportar CSV"
3. O arquivo será baixado automaticamente
4. Abra no Excel ou Google Sheets

## 🔄 Resetar Dados

Para voltar aos dados iniciais:
1. Clique em "🔄 Resetar Dados" na aba de gerenciamento
2. Confirme a ação
3. Todos os dados voltarão ao padrão

## 🛠️ Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Design moderno e responsivo
- **JavaScript Vanilla** — Sem dependências externas (exceto Chart.js)
- **Chart.js** — Gráficos interativos
- **localStorage** — Armazenamento local

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores mobile

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)
1. Faça fork ou clone este repositório
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório GitHub
4. Clique em "Deploy"
5. Seu site estará online em minutos!

### Opção 2: GitHub Pages
1. Faça push dos arquivos para GitHub
2. Vá em Settings → Pages
3. Selecione "main" como branch
4. Seu site estará em `https://seu-usuario.github.io/seu-repositorio`

### Opção 3: Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Faça drag-and-drop da pasta do projeto
3. Seu site estará online instantaneamente!

## 📝 Estrutura de Arquivos

```
controle_emprestimos/
├── index.html          # Aplicação principal
├── vercel.json         # Configuração de deploy
└── README.md           # Este arquivo
```

## 🎨 Customização

Para personalizar as cores, edite as variáveis CSS no `index.html`:

```css
:root {
  --blue-dark:  #1F3864;
  --blue-mid:   #2E75B6;
  --blue-light: #DDEEFF;
  --accent:     #E84545;
  --success:    #27AE60;
}
```

## 🐛 Troubleshooting

### Os dados não estão sendo salvos
- Verifique se o localStorage está habilitado no navegador
- Tente em outro navegador
- Limpe o cache do navegador

### Os gráficos não aparecem
- Verifique sua conexão com a internet (Chart.js é carregado via CDN)
- Recarregue a página (F5)

### Não consigo editar os dados
- Certifique-se de que JavaScript está habilitado
- Tente em outro navegador
- Abra o console (F12) para ver se há erros

## 📧 Suporte

Para dúvidas ou sugestões, entre em contato!

## 📄 Licença

Este projeto é de código aberto e livre para uso pessoal e comercial.

---

**Desenvolvido com ❤️ para simplificar o controle de materiais de empréstimo**
