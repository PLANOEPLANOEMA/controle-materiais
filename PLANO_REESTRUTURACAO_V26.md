# Plano de Reestruturação do Sistema - Versão 26

## Objetivo Principal
Desacoplar o prédio 3D do módulo de RTs (Requisições de Materiais), vincular RTs ao controle de estoque com rastreabilidade automática, e criar uma nova interface de pavimentos com checklists de serviços e fotos.

---

## 1. DESACOPLAMENTO DO PRÉDIO 3D DAS RTs

### Situação Atual
- O prédio 3D está fortemente acoplado aos módulos de **Planejamento RT** e **RT Dia a Dia**
- Ao clicar em um pavimento, o sistema mostra RTs relacionadas àquele pavimento
- As RTs controlam o status visual do prédio (cores dos pavimentos)

### Novo Comportamento
- O prédio 3D se torna **independente** das RTs
- Cada pavimento do prédio 3D terá sua própria interface de **Serviços** (Contra Piso, Gesso Liso, Forro, Pintura, Instalação de Porta, etc.)
- As RTs continuam existindo, mas **vinculadas apenas ao controle de estoque/materiais**

### Mudanças Técnicas
1. **Remover referências de RTs do prédio 3D:**
   - Remover lógica de filtro de RTs por pavimento
   - Remover renderização de RTs no painel lateral do prédio
   - Remover cores de status baseadas em RTs

2. **Criar nova estrutura de dados para Serviços do Pavimento:**
   ```javascript
   // Estrutura de um serviço de pavimento
   {
     id: "srv_torre_a_1pav_contrapiso_001",
     torre: "Torre A",
     pavimento: "1º Pavto",
     servico: "Contra Piso",
     status: "Não iniciado", // Não iniciado, Em andamento, Concluído
     dataInicio: "2026-04-06",
     dataPrevista: "2026-04-15",
     fotos: ["base64_image_1", "base64_image_2"],
     concluido: false,
     observacoes: "Descrição do serviço"
   }
   ```

---

## 2. REESTRUTURAÇÃO DO MÓDULO DE RTs

### Novo Fluxo de RTs com Controle de Estoque

#### Passo 1: Criar RT (Requisição de Material)
- **Campos:** Material, Quantidade, Torre, Pavimento, Serviço, Data Prevista, Status
- **Status Inicial:** "Planejado"
- **Armazenamento:** Firebase `controle/planejamento_rt` e `controle/rt_dia_dia`

#### Passo 2: Alteração de Status
- **Planejado** → **Pedir agora** → **RT lançada** → **Em suprimentos** → **Aguardando entrega** → **Entregue** → **Concluído**

#### Passo 3: Ao Marcar como "Entregue"
**AÇÃO AUTOMÁTICA:** O material é **automaticamente adicionado ao estoque** (Controle de Materiais da Obra)

```javascript
// Quando RT muda para "Entregue":
1. Buscar material no catálogo
2. Verificar se existe em "Materiais da Obra"
   - Se SIM: Aumentar quantidade
   - Se NÃO: Criar novo material com quantidade da RT
3. Registrar uma movimentação de entrada (rastreabilidade)
4. Salvar no Firebase
```

#### Passo 4: Controle de Saída (Rastreabilidade)
- O usuário **registra retiradas** do estoque (como já funciona)
- Cada retirada cria um registro de **rastreabilidade** com:
  - Quem retirou
  - Quando retirou
  - Quantidade
  - Motivo (ex: "Instalação de Porta no 1º Pavto")
  - Fotos (opcional)

### Benefícios
- ✅ RTs controlam entrada de materiais no estoque
- ✅ Controle de Materiais gerencia saída (rastreabilidade)
- ✅ Histórico completo: entrada → saída
- ✅ Almoxarife só marca "Entregue" quando material chega

---

## 3. NOVA INTERFACE DE PAVIMENTOS (PRÉDIO 3D)

### Estrutura Visual

#### Ao Clicar em um Pavimento:
Abre um painel/modal mostrando:

```
┌─────────────────────────────────────────────────────────────┐
│  Torre A - 1º Pavimento - Serviços                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Contra Piso ────────────────────────────────────────┐  │
│  │ ☐ Concluído                                          │  │
│  │ Início: [06/04/2026]  Previsão: [15/04/2026]        │  │
│  │                                                      │  │
│  │ Fotos:                                              │  │
│  │ [📷 Adicionar Foto] [📷 Adicionar Foto]             │  │
│  │ [Thumb 1] [Thumb 2]                                 │  │
│  │                                                      │  │
│  │ Observações: ___________________________________     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ Gesso Liso ──────────────────────────────────────────┐  │
│  │ ☐ Concluído                                          │  │
│  │ Início: [  ]  Previsão: [  ]                         │  │
│  │ [Adicionar Foto] [Adicionar Foto]                   │  │
│  │ Observações: ___________________________________     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Salvar] [Cancelar]                                        │
└─────────────────────────────────────────────────────────────┘
```

### Serviços Disponíveis (Padrão)
1. Contra Piso
2. Gesso Liso
3. Forro
4. Pintura
5. Instalação de Porta

*Obs: Pode ser expandido conforme necessário*

### Funcionalidades de Cada Serviço

#### Checkbox "Concluído"
- ☐ Não concluído (cinza)
- ☑ Concluído (verde)
- Ao marcar, salva a data de conclusão automaticamente

#### Campos de Data
- **Data de Início:** Campo de data (opcional)
- **Data Prevista de Finalização:** Campo de data (obrigatório ao iniciar)

#### Seção de Fotos
- Botão "📷 Adicionar Foto" (câmera ou upload)
- Miniaturas das fotos adicionadas
- Botão "X" para remover foto individual
- Máximo de 5 fotos por serviço (configurável)

#### Observações
- Campo de texto livre para notas do serviço

### Armazenamento de Dados
```javascript
// Estrutura no Firebase: controle/servicos_pavimentos
{
  "servicos": [
    {
      id: "srv_001",
      torre: "Torre A",
      pavimento: "1º Pavto",
      servico: "Contra Piso",
      concluido: false,
      dataInicio: "2026-04-06",
      dataPrevista: "2026-04-15",
      dataConclusao: null,
      fotos: ["base64_img_1", "base64_img_2"],
      observacoes: "Descrição",
      criadoEm: "2026-04-06T10:00:00Z",
      atualizadoEm: "2026-04-06T10:00:00Z"
    }
  ]
}
```

---

## 4. MUDANÇAS NO FIREBASE

### Novos Documentos
- `controle/servicos_pavimentos` - Serviços dos pavimentos (novo)

### Documentos Existentes (Mantidos)
- `controle/planejamento_rt` - RTs de planejamento
- `controle/rt_dia_dia` - RTs do dia a dia
- `controle/materiais` - Materiais em estoque
- `controle/movimentacoes` - Rastreabilidade de saídas

### Fluxo de Dados
```
RT (Planejamento/Dia a Dia)
  ↓
  Status = "Entregue"
  ↓
  Adiciona Material ao Estoque
  ↓
  Registra Movimentação de Entrada
  ↓
  Controle de Materiais
  ↓
  Usuário registra Retirada
  ↓
  Registra Movimentação de Saída (Rastreabilidade)
  ↓
  Serviços de Pavimento (Opcional)
```

---

## 5. MUDANÇAS NA INTERFACE

### Abas Principais (Nav)
1. **Prédio 3D** - Visualização de pavimentos com serviços
2. **Planejamento RT** - RTs de planejamento (mantém funcionalidade)
3. **RT Dia a Dia** - RTs do dia a dia (mantém funcionalidade)
4. **Controle de Materiais** - Estoque e rastreabilidade (mantém funcionalidade)
5. **Rastreabilidade** - Histórico de movimentações (mantém funcionalidade)

### Prédio 3D (Alterações)
- ✅ Clique em pavimento abre modal de serviços
- ✅ Remove renderização de RTs
- ✅ Remove cores de status baseadas em RTs
- ✅ Cores dos pavimentos baseadas em conclusão de serviços (opcional)

---

## 6. PERMISSÕES E ROLES

### Admin / GO
- ✅ Criar/Editar/Deletar RTs
- ✅ Criar/Editar/Deletar Serviços de Pavimentos
- ✅ Alterar qualquer status
- ✅ Ver todos os relatórios

### Almoxarife
- ✅ Ver RTs (Planejamento e Dia a Dia)
- ✅ Alterar status de "Aguardando entrega" para "Entregue"
- ✅ Ver Controle de Materiais
- ✅ Registrar Retiradas
- ❌ Criar/Editar/Deletar RTs
- ❌ Editar Serviços de Pavimentos

### Responsável de Obra
- ✅ Ver RTs
- ✅ Criar/Editar Serviços de Pavimentos
- ✅ Adicionar fotos e observações
- ✅ Marcar serviços como concluído
- ❌ Alterar status de RTs
- ❌ Deletar Serviços

---

## 7. RESUMO DAS MUDANÇAS

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Prédio 3D** | Acoplado às RTs | Independente (Serviços) |
| **RTs** | Vinculadas ao prédio | Vinculadas ao estoque |
| **Entrada de Material** | Manual | Automática ao "Entregue" |
| **Saída de Material** | Registro manual | Rastreabilidade |
| **Serviços** | Não existem | Nova interface com fotos |
| **Cores do Prédio** | Status de RT | Status de Serviço (opcional) |

---

## 8. IMPLEMENTAÇÃO

### Fase 1: Preparação
- ✅ Análise do código atual
- ✅ Criar estrutura de dados para serviços
- ✅ Preparar Firebase

### Fase 2: Backend
- [ ] Criar funções de CRUD para serviços
- [ ] Implementar lógica de entrada automática de material
- [ ] Atualizar Firebase com novo documento
- [ ] Criar funções de sincronização

### Fase 3: Frontend - Prédio 3D
- [ ] Remover lógica de RTs do prédio
- [ ] Criar modal de serviços
- [ ] Implementar interface de fotos
- [ ] Implementar campos de datas

### Fase 4: Frontend - RTs
- [ ] Manter funcionalidade existente
- [ ] Adicionar lógica de entrada automática
- [ ] Testar fluxo completo

### Fase 5: Testes e Deploy
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Deploy em produção

---

## 9. NOTAS IMPORTANTES

- ✅ O sistema mantém compatibilidade com dados existentes
- ✅ Relatórios continuam funcionando
- ✅ Rastreabilidade é preservada
- ✅ Permissões de usuários são respeitadas
- ✅ Firebase é atualizado em tempo real

---

**Data de Criação:** 06/04/2026  
**Versão:** 26  
**Status:** Planejamento
