# Guia de Uso - Página de Demonstração v26

## 🎯 Objetivo

A página de demonstração (`demo.html`) permite que você visualize e teste interativamente todas as novas funcionalidades do Sistema de Controle de Materiais v26:

- ✅ Prédio 3D independente
- ✅ Gerenciamento de serviços com fotos
- ✅ Integração RT ↔ Estoque
- ✅ Rastreabilidade completa

---

## 🚀 Como Acessar

### Opção 1: Localmente
1. Abra o arquivo `demo.html` no seu navegador
2. Ou acesse: `http://localhost:8080/demo.html` (se tiver servidor local)

### Opção 2: Online
Acesse a URL pública fornecida:
```
https://8080-i9mwq5fxs0pa4rb0q50zo-815c2754.us2.manus.computer/demo.html
```

---

## 📋 Guia de Navegação

### 1️⃣ Aba "Prédio 3D"

**O que você vê:**
- Duas torres (Torre A e Torre B) com seus pavimentos
- Cores indicam status dos serviços:
  - 🟢 **Verde** = Todos os serviços concluídos
  - 🟡 **Amarelo** = Alguns serviços concluídos
  - ⚫ **Cinza** = Nenhum serviço concluído

**Como usar:**
1. Clique em qualquer pavimento
2. Abre um modal com os 5 serviços padrão:
   - Contra Piso
   - Gesso Liso
   - Forro
   - Pintura
   - Instalação de Porta

3. Para cada serviço, você pode:
   - ☑️ Marcar como concluído (checkbox)
   - 📅 Adicionar data de início
   - 📅 Adicionar data prevista de finalização
   - 📸 Adicionar até 5 fotos
   - 📝 Adicionar observações

4. Clique em "Salvar" para guardar as alterações

**Resultado:**
- As cores dos pavimentos mudam conforme os serviços são concluídos
- O resumo abaixo mostra o percentual de conclusão por pavimento

---

### 2️⃣ Aba "RTs"

**O que você vê:**
- Tabela com requisições de materiais (RTs)
- Cada RT mostra: ID, Material, Quantidade, Torre, Pavimento, Status

**Como usar:**

#### Criar Nova RT
1. Clique em "➕ Nova RT"
2. Preencha os campos:
   - **Material:** Nome do material (ex: Cimento, Areia)
   - **Quantidade:** Quantidade a requisitar
   - **Torre:** Selecione Torre A ou Torre B
   - **Pavimento:** Selecione o pavimento (muda conforme a torre)
   - **Status:** Selecione o status (recomenda "Entregue" para testar)
3. Clique em "✅ Criar RT"

#### Alterar Status
1. Clique em "Alterar Status" na linha da RT
2. Digite o novo status
3. Se mudar para **"Entregue"**, o material entra automaticamente no estoque!

**Resultado:**
- Material aparece na aba "Materiais"
- Entrada é registrada na aba "Rastreabilidade"

---

### 3️⃣ Aba "Materiais"

**O que você vê:**
- Tabela com materiais em estoque
- Mostra: Material, Quantidade, Origem (qual RT), Data de Entrada

**Como funciona:**
- Quando você marca uma RT como "Entregue", o material entra aqui automaticamente
- Se o material já existe, a quantidade é aumentada
- Se é novo, é criado um novo registro

**Teste:**
1. Vá para a aba "RTs"
2. Crie uma RT com status "Entregue"
3. Volte para "Materiais"
4. O material deve estar lá!

---

### 4️⃣ Aba "Rastreabilidade"

**O que você vê:**
- Histórico completo de movimentações
- Mostra: Data/Hora, Tipo (Entrada/Saída), Material, Quantidade, Responsável, Motivo

**Como funciona:**
- **Entrada:** Registrada automaticamente quando RT é marcada como "Entregue"
- **Saída:** Seria registrada quando material é retirado do estoque (não implementado nesta demo)

**Teste:**
1. Crie uma RT e marque como "Entregue"
2. Vá para "Rastreabilidade"
3. Deve aparecer um registro de "Entrada"

---

### 5️⃣ Aba "Sobre"

**O que você vê:**
- Explicação das principais funcionalidades
- Instruções de uso
- Benefícios do sistema

---

## 🧪 Cenários de Teste

### Cenário 1: Testar Prédio 3D e Serviços

1. Vá para aba "Prédio 3D"
2. Clique em "Torre A / Térreo"
3. Abre modal com serviços
4. Marque "Contra Piso" como concluído
5. Adicione uma foto (clique em "📷 Adicionar Foto")
6. Preencha datas
7. Clique "Salvar"
8. Veja o pavimento mudar de cor para amarelo (parcial)
9. Marque todos os serviços como concluído
10. Veja o pavimento ficar verde (completo)

**Resultado esperado:** ✅ Cores mudam conforme serviços são concluídos

---

### Cenário 2: Testar Entrada Automática de Material

1. Vá para aba "RTs"
2. Clique "➕ Nova RT"
3. Preencha:
   - Material: "Cimento"
   - Quantidade: "50"
   - Torre: "Torre A"
   - Pavimento: "1º Pavto"
   - Status: "Entregue"
4. Clique "✅ Criar RT"
5. Vá para aba "Materiais"
6. Procure por "Cimento"

**Resultado esperado:** ✅ "Cimento" aparece com quantidade 50

---

### Cenário 3: Testar Rastreabilidade

1. Execute o Cenário 2
2. Vá para aba "Rastreabilidade"
3. Procure pelo registro mais recente

**Resultado esperado:** ✅ Aparece entrada de "Cimento" com motivo "Entrega de RT #RT..."

---

### Cenário 4: Testar Alteração de Status

1. Vá para aba "RTs"
2. Clique "Alterar Status" em uma RT com status "Aguardando entrega"
3. Digite "Entregue"
4. Vá para aba "Materiais"

**Resultado esperado:** ✅ Material entra no estoque

---

## 🎨 Funcionalidades Testáveis

| Funcionalidade | Onde Testar | Como Testar |
|---|---|---|
| Prédio 3D | Aba "Prédio 3D" | Clique em pavimento |
| Serviços | Modal de serviços | Marque checklist, adicione fotos |
| Datas | Modal de serviços | Preencha data início e previsão |
| Fotos | Modal de serviços | Clique "Adicionar Foto" |
| RTs | Aba "RTs" | Crie nova RT |
| Entrada Automática | Aba "Materiais" | Marque RT como "Entregue" |
| Rastreabilidade | Aba "Rastreabilidade" | Crie RT e marque como "Entregue" |
| Cores do Prédio | Aba "Prédio 3D" | Marque serviços como concluído |
| Resumo de Serviços | Aba "Prédio 3D" | Veja percentual de conclusão |

---

## 💡 Dicas Úteis

### Dica 1: Testar com Múltiplos Pavimentos
- Crie serviços em diferentes pavimentos
- Veja as cores mudarem independentemente
- Acompanhe o resumo de cada pavimento

### Dica 2: Testar Fluxo Completo
1. Crie RT → Marque como "Entregue" → Veja material entrar → Veja rastreabilidade

### Dica 3: Adicionar Fotos
- Use a câmera do seu dispositivo ou selecione do computador
- Máximo 5 fotos por serviço
- Clique na foto para ampliar

### Dica 4: Verificar Dados
- Abra o Console (F12) para ver os dados em tempo real
- Todos os dados são armazenados em memória (não persiste ao recarregar)

---

## ⚠️ Limitações da Demo

- ❌ Dados não persistem ao recarregar a página (use localStorage em produção)
- ❌ Sem autenticação (em produção, haverá login)
- ❌ Sem Firebase (em produção, sincronizará com Firebase)
- ❌ Sem permissões (em produção, haverá controle de acesso)
- ❌ Sem relatórios (em produção, haverá exportação de relatórios)

---

## 🔄 Próximos Passos

Após testar a demo:

1. **Revisar** os documentos de integração
2. **Integrar** no seu `index.html` atual
3. **Testar** com dados reais
4. **Deploy** em produção

---

## 📞 Precisa de Ajuda?

### Dúvidas sobre a Demo?
→ Consulte este arquivo

### Dúvidas sobre Integração?
→ Consulte: `EXEMPLO_PRATICO_INTEGRACAO.md`

### Dúvidas sobre Arquitetura?
→ Consulte: `PLANO_REESTRUTURACAO_V26.md`

---

## 🎉 Aproveite a Demonstração!

Teste todas as funcionalidades e familiarize-se com o novo sistema antes de integrar no seu projeto.

**Bom teste! 🚀**

---

**Data:** 06/04/2026  
**Versão:** 26  
**Status:** ✅ Pronto para Teste
