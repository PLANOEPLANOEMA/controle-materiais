# Exemplo Prático de Integração - Passo a Passo

## Objetivo
Mostrar exatamente onde e como adicionar os novos arquivos e modificações no seu index.html.

---

## PASSO 1: Adicionar Scripts no HEAD

### Localizar
Procure no seu index.html por:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
```

### Adicionar Após
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- ✅ NOVOS SCRIPTS PARA V26 -->
<script src="./integracao-rt-estoque.js"></script>
<script src="./servicos-pavimentos.js"></script>
<!-- FIM DOS NOVOS SCRIPTS -->
```

---

## PASSO 2: Adicionar Estilos CSS

### Localizar
Procure por:
```css
/* ── PRÉDIO 3D MODERNO - ESTILO ENGENHARIA CIVIL ── */
```

### Adicionar Antes do Fechamento de `</style>`
```css

/* ✅ ESTILOS PARA SERVIÇOS DE PAVIMENTOS (V26) */

.servico-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
  border: 1px solid #eef2f7;
  overflow: hidden;
  transition: transform 0.2s;
}

.servico-card:hover { transform: translateY(-2px); }

.servico-card.concluido {
  border-left: 4px solid #27AE60;
  background: #f0fdf4;
}

.servico-card.pendente {
  border-left: 4px solid #F5A623;
}

.servico-header {
  padding: 1.25rem;
  background: #fcfdfe;
  border-bottom: 1px solid #f0f4f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.servico-header h3 {
  margin: 0;
  color: #1F3864;
  font-size: 1.15rem;
  font-weight: 700;
}

.servico-body {
  padding: 1.25rem;
}

.dates-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.date-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.date-field label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #718096;
}

.date-field input {
  padding: 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #2d3748;
  outline: none;
}

.date-field input:focus {
  border-color: #2E75B6;
  box-shadow: 0 0 0 3px rgba(46,117,182,0.1);
}

.photos-section {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
}

.photos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.photos-header label {
  font-weight: 700;
  color: #4a5568;
  font-size: 0.9rem;
}

.btn-upload {
  background: #2E75B6;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
}

.btn-upload:hover { background: #1F3864; }

.photos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.photo-thumb {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  position: relative;
}

.photo-remove {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #E84545;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  cursor: pointer;
}

.photo-remove:hover { background: #cf3d3d; }

#modalServicosPavimento {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

#modalServicosPavimento .modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  max-width: 900px;
  max-height: 90vh;
}

#modalServicosPavimento .modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eef2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#modalServicosPavimento .modal-header h2 {
  margin: 0;
  color: #1F3864;
  font-size: 1.5rem;
}

#modalServicosPavimento .close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6b7a99;
}

#modalServicosPavimento .close-btn:hover { color: #1F3864; }

#modalServicosPavimento .modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

#modalServicosPavimento .modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #eef2f7;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Cores dos pavimentos baseadas em serviços */
.predio3d-floor.servicos-completos .front {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 50%, #3d9142 100%) !important;
  border-color: #2e7d32 !important;
}

.predio3d-floor.servicos-parciais .front {
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 50%, #ffa500 100%) !important;
  border-color: #ff8f00 !important;
}

.predio3d-floor.servicos-pendentes .front {
  background: linear-gradient(135deg, #e8f0f8 0%, #d4e4f7 50%, #c8ddf5 100%) !important;
  border-color: #a8c5e8 !important;
}

/* FIM DOS ESTILOS PARA SERVIÇOS */
```

---

## PASSO 3: Modificar Renderização do Prédio 3D

### Localizar a Função
Procure por algo como:
```javascript
renderizarPredio3D() {
  // ... código
}
```

### Encontrar Onde Renderiza os Pavimentos
```javascript
// ANTES
const floorHTML = `
  <div class="predio3d-floor ${statusClass}">
    <div class="front">${pavimento}</div>
    ...
  </div>
`;
```

### Modificar Para
```javascript
// DEPOIS
const floorHTML = `
  <div class="predio3d-floor ${statusClass}" data-torre="${torre}" data-pavimento="${pavimento}" style="cursor: pointer;">
    <div class="front">${pavimento}</div>
    ...
  </div>
`;
```

---

## PASSO 4: Adicionar Listener de Clique

### Localizar
Procure pela função de inicialização do prédio 3D:
```javascript
init() {
  // ... código existente
}
```

### Adicionar Antes do Fechamento da Função
```javascript
init() {
  // ... código existente ...

  // ✅ NOVO: Listener para abrir serviços ao clicar no pavimento
  document.addEventListener('click', (e) => {
    const floor = e.target.closest('.predio3d-floor');
    if (floor && window.appServicosPavimentos) {
      const torre = floor.dataset.torre;
      const pavimento = floor.dataset.pavimento;
      
      if (torre && pavimento) {
        // Feedback visual
        floor.style.transform = 'scale(1.05)';
        setTimeout(() => { floor.style.transform = ''; }, 200);
        
        // Abrir modal
        window.appServicosPavimentos.abrirModalServicosPavimento(torre, pavimento);
      }
    }
  });
}
```

---

## PASSO 5: Integrar Entrada Automática de Material

### Localizar
Procure pela função que altera status de RT:
```javascript
alterarStatus(rtId, novoStatus) {
  // ... código que salva o novo status
}
```

### Adicionar Após Salvar
```javascript
alterarStatus(rtId, novoStatus) {
  // ... código existente para salvar ...
  
  // ✅ NOVO: Processar entrada automática de material
  if (window.integracaoRTEstoque && novoStatus === 'Entregue') {
    const rt = this.itens.find(item => item.id === rtId);
    if (rt) {
      console.log('Processando entrada automática de material...');
      window.integracaoRTEstoque.processarMudancaStatusRT(rt, novoStatus);
    }
  }
}
```

---

## PASSO 6: Adicionar Permissões

### Localizar
Procure pelo objeto `auth` ou função `pode()`:
```javascript
const auth = {
  pode(acao) {
    const perms = {
      // ... permissões existentes
    };
    // ...
  }
};
```

### Adicionar Novas Permissões
```javascript
const auth = {
  pode(acao) {
    const perms = {
      // ... permissões existentes ...
      
      // ✅ NOVAS PERMISSÕES PARA V26
      'editar_servicos_pavimentos': ['admin', 'go', 'responsavel_obra'],
      'ver_servicos_pavimentos': ['admin', 'go', 'responsavel_obra', 'almoxarife'],
      // FIM DAS NOVAS PERMISSÕES
    };
    // ... resto do código
  }
};
```

---

## PASSO 7: Inicializar Módulos

### Localizar
Procure pelo final do arquivo onde estão as inicializações:
```javascript
window.auth = auth;
window.app = app;
window.appMateriais = appMateriais;
window.appRT = appRT;
```

### Adicionar Após
```javascript
window.auth = auth;
window.app = app;
window.appMateriais = appMateriais;
window.appRT = appRT;

// ✅ NOVO: Inicializar módulos da V26
window.appServicosPavimentos = appServicosPavimentos;
window.integracaoRTEstoque = integracaoRTEstoque;

// Iniciar sincronização de serviços
if (window.appServicosPavimentos) {
  window.appServicosPavimentos.init();
}
```

---

## PASSO 8: Testar Integração

### Teste 1: Abrir Serviços
1. Abra o navegador
2. Vá para a aba "Prédio 3D"
3. Clique em um pavimento
4. Deve abrir um modal com os serviços

### Teste 2: Entrada Automática
1. Vá para "Planejamento RT"
2. Crie uma nova RT com:
   - Material: "Cimento"
   - Quantidade: 50
   - Torre: "Torre A"
   - Pavimento: "1º Pavto"
3. Salve a RT
4. Altere o status para "Entregue"
5. Vá para "Controle de Materiais"
6. Procure por "Cimento"
7. Deve estar lá com quantidade 50

### Teste 3: Rastreabilidade
1. Em "Controle de Materiais", registre uma retirada de "Cimento"
2. Vá para "Rastreabilidade"
3. Deve aparecer a entrada (RT) e a saída (retirada)

---

## PASSO 9: Arquivo Completo de Exemplo

Aqui está um exemplo de como ficaria uma seção do seu index.html:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Controle de Materiais - Plano & Plano</title>
  
  <!-- Scripts existentes -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  
  <!-- ✅ NOVOS SCRIPTS PARA V26 -->
  <script src="./integracao-rt-estoque.js"></script>
  <script src="./servicos-pavimentos.js"></script>
  <!-- FIM DOS NOVOS SCRIPTS -->
  
  <style>
    /* Estilos existentes */
    /* ... */
    
    /* ✅ ESTILOS PARA SERVIÇOS DE PAVIMENTOS (V26) */
    .servico-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 1.5rem;
      border: 1px solid #eef2f7;
    }
    /* ... mais estilos ... */
    /* FIM DOS ESTILOS PARA SERVIÇOS */
  </style>
</head>
<body>
  <!-- Seu HTML existente -->
  
  <script type="module">
    import * as fb from './firebase-controle-usuarios.js';
    window.__fb = fb;
    
    // ... seu código JavaScript existente ...
    
    // ✅ NOVO: Inicializar módulos da V26
    window.appServicosPavimentos = appServicosPavimentos;
    window.integracaoRTEstoque = integracaoRTEstoque;
    
    if (window.appServicosPavimentos) {
      window.appServicosPavimentos.init();
    }
  </script>
</body>
</html>
```

---

## Checklist de Integração

- [ ] Adicionar scripts no HEAD
- [ ] Adicionar estilos CSS
- [ ] Modificar renderização do prédio 3D (adicionar data-torre e data-pavimento)
- [ ] Adicionar listener de clique para abrir serviços
- [ ] Integrar entrada automática de material nas RTs
- [ ] Adicionar novas permissões
- [ ] Inicializar módulos
- [ ] Testar abertura de serviços
- [ ] Testar entrada automática de material
- [ ] Testar rastreabilidade
- [ ] Testar fotos e datas
- [ ] Deploy em produção

---

## Troubleshooting

### Problema: Modal não abre ao clicar no pavimento
**Solução:** Verificar se `appServicosPavimentos` está inicializado
```javascript
console.log('appServicosPavimentos:', window.appServicosPavimentos);
```

### Problema: Material não entra automaticamente
**Solução:** Verificar se `integracaoRTEstoque` está sendo chamado
```javascript
console.log('integracaoRTEstoque:', window.integracaoRTEstoque);
```

### Problema: Fotos não salvam
**Solução:** Verificar localStorage
```javascript
console.log('Serviços salvos:', localStorage.getItem('controle_servicos_pavimentos'));
```

---

**Data:** 06/04/2026  
**Versão:** 26  
**Status:** Pronto para Implementação
