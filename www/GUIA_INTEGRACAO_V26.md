# Guia de Integração - Versão 26

## Novos Arquivos Criados

### 1. **firebase-controle-usuarios.js** (Atualizado)
- Adicionadas funções para gerenciar serviços de pavimentos
- Funções adicionadas:
  - `salvarServicosPavimentosNaNuvem(servicos)`
  - `carregarServicosPavimentosDaNuvem()`
  - `escutarMudancasServicosPavimentos(callback)`

### 2. **servicos-pavimentos.js** (Novo)
- Gerenciador completo de serviços de pavimentos
- Funcionalidades:
  - CRUD de serviços
  - Upload e gerenciamento de fotos
  - Sincronização em tempo real com Firebase
  - Interface de modal com checklist, datas e fotos

### 3. **integracao-rt-estoque.js** (Novo)
- Integração entre RTs e controle de estoque
- Funcionalidades:
  - Entrada automática de material ao marcar RT como "Entregue"
  - Registro de movimentação de entrada
  - Funções auxiliares para saída de material

---

## Passos de Integração no index.html

### Passo 1: Incluir os Novos Scripts
No `<head>` do index.html, adicione antes de `</head>`:

```html
<!-- Novos módulos para V26 -->
<script src="./integracao-rt-estoque.js"></script>
<script src="./servicos-pavimentos.js"></script>
```

**Localização:** Após o `<script src="./firebase-controle-usuarios.js"></script>` existente

---

### Passo 2: Adicionar Estilos CSS para Serviços

Adicione no `<style>` do index.html (procure pela seção de estilos do prédio 3D):

```css
/* ── SERVIÇOS DE PAVIMENTOS ── */
.servico-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
  border: 1px solid #eef2f7;
  overflow: hidden;
  transition: transform 0.2s;
}

.servico-card:hover {
  transform: translateY(-2px);
}

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
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
  transition: background 0.2s;
}

.btn-upload:hover {
  background: #1F3864;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-remove:hover {
  background: #cf3d3d;
}

/* Modal de serviços */
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

#modalServicosPavimento .close-btn:hover {
  color: #1F3864;
}

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
```

---

### Passo 3: Modificar o Prédio 3D para Abrir Serviços

Localize no index.html a função que trata do clique no pavimento 3D. Procure por algo como:

```javascript
// ANTES - Abre RTs do pavimento
.predio3d-floor .front {
  cursor: pointer;
  // ... resto do código
}
```

**Modifique para:**

```javascript
// Ao clicar em um pavimento, abrir serviços
document.addEventListener('click', function(e) {
  if (e.target.closest('.predio3d-floor .front')) {
    const floor = e.target.closest('.predio3d-floor');
    if (floor && window.appServicosPavimentos) {
      // Extrair torre e pavimento do elemento
      const torre = floor.dataset.torre || 'Torre A';
      const pavimento = floor.dataset.pavimento || 'Térreo';
      window.appServicosPavimentos.abrirModalServicosPavimento(torre, pavimento);
    }
  }
});
```

---

### Passo 4: Integrar Entrada Automática de Material nas RTs

Localize a função que altera o status de uma RT. Procure por:

```javascript
// Função que altera status da RT (em appRT)
alterarStatusRT(rtId, novoStatus) {
  // ... código existente
}
```

**Adicione esta linha após a mudança de status ser salva:**

```javascript
// Após salvar o novo status
if (window.integracaoRTEstoque && novoStatus === 'Entregue') {
  const rt = this.itens.find(item => item.id === rtId);
  if (rt) {
    window.integracaoRTEstoque.processarMudancaStatusRT(rt, novoStatus);
  }
}
```

---

### Passo 5: Adicionar Permissões

No objeto `auth` (ou onde estão as permissões), adicione:

```javascript
pode(acao) {
  const perms = {
    // ... permissões existentes
    'editar_servicos_pavimentos': ['admin', 'go', 'responsavel_obra'],
    'ver_servicos_pavimentos': ['admin', 'go', 'responsavel_obra', 'almoxarife'],
  };
  // ... resto do código
}
```

---

### Passo 6: Inicializar Módulos

No final do arquivo index.html, após `window.appMateriais = appMateriais;`, adicione:

```javascript
// Inicializar novos módulos
window.appServicosPavimentos = appServicosPavimentos;
window.integracaoRTEstoque = integracaoRTEstoque;

// Iniciar sincronização
if (window.appServicosPavimentos) {
  window.appServicosPavimentos.init();
}
```

---

## Fluxo Completo de Uso

### 1. Criar uma RT
```
Planejamento RT → Novo → Preencher dados → Salvar
```

### 2. Marcar como "Entregue"
```
Planejamento RT → Editar → Status = "Entregue" → Salvar
↓
Material é AUTOMATICAMENTE adicionado ao Controle de Materiais
```

### 3. Registrar Serviços no Pavimento
```
Prédio 3D → Clicar no pavimento → Abre modal de serviços
→ Preencher checklist, datas e fotos → Salvar
```

### 4. Registrar Saída de Material
```
Controle de Materiais → Registrar Retirada → Preencher dados
→ Material é debitado do estoque
```

---

## Dados Armazenados no Firebase

### Documento: `controle/servicos_pavimentos`
```json
{
  "servicos": [
    {
      "id": "srv_Torre_A_1º_Pavto_Contra_Piso_abc123",
      "torre": "Torre A",
      "pavimento": "1º Pavto",
      "servico": "Contra Piso",
      "concluido": false,
      "dataInicio": "2026-04-06",
      "dataPrevista": "2026-04-15",
      "dataConclusao": null,
      "fotos": ["base64_image_1", "base64_image_2"],
      "observacoes": "Descrição do serviço",
      "criadoEm": "2026-04-06T10:00:00Z",
      "atualizadoEm": "2026-04-06T10:00:00Z"
    }
  ],
  "updatedAt": 1712402400000
}
```

---

## Estrutura de Dados - Movimentação com Tipo

### Campo Novo: `tipo`
```javascript
// Entrada (quando RT é marcada como Entregue)
{
  tipo: 'entrada',
  materialNome: 'Cimento',
  quantidade: 50,
  rtId: 'rt_001'
}

// Saída (quando usuário registra retirada)
{
  tipo: 'saida',
  materialNome: 'Cimento',
  quantidade: 10,
  responsavel: 'João Silva'
}
```

---

## Testes Recomendados

### Teste 1: Entrada Automática
1. Criar uma RT com material "Cimento" (quantidade 50)
2. Marcar como "Entregue"
3. Verificar se "Cimento" apareceu em "Controle de Materiais"
4. Verificar se quantidade está correta

### Teste 2: Serviços de Pavimento
1. Clicar em um pavimento no prédio 3D
2. Preencher dados de um serviço
3. Adicionar foto
4. Marcar como concluído
5. Recarregar página
6. Verificar se dados foram salvos

### Teste 3: Rastreabilidade
1. Registrar uma retirada de material
2. Verificar se aparece em "Rastreabilidade"
3. Verificar se quantidade foi debitada do estoque

---

## Troubleshooting

### Problema: Serviços não salvam
**Solução:** Verificar se Firebase está configurado corretamente e se `window.__fb` está disponível

### Problema: Fotos não carregam
**Solução:** Verificar se o navegador permite acesso à câmera/galeria e se há espaço em localStorage

### Problema: Material não entra automaticamente
**Solução:** Verificar se `appMateriais` está inicializado e se `integracaoRTEstoque` está sendo chamado

---

## Próximos Passos

1. ✅ Testar integração completa
2. ✅ Ajustar permissões conforme necessário
3. ✅ Treinar usuários
4. ✅ Deploy em produção

---

**Data:** 06/04/2026  
**Versão:** 26  
**Status:** Pronto para Integração
