# Sistema de Controle de Materiais - Versão 26

## 🎯 O que é Novo?

A **Versão 26** traz uma reestruturação completa do sistema:

### ✨ Principais Melhorias

1. **Prédio 3D Independente**
   - Desacoplado das RTs
   - Gerencia serviços de pavimentos
   - Interface intuitiva com clique para abrir serviços

2. **Serviços de Pavimentos**
   - Checklist de conclusão
   - Datas de início e previsão
   - Até 5 fotos por serviço
   - Observações e notas

3. **Entrada Automática de Material**
   - Quando RT é marcada como "Entregue", material entra no estoque automaticamente
   - Rastreabilidade completa (entrada + saída)

4. **Interface Melhorada**
   - Modal de serviços com design moderno
   - Gerenciamento de fotos intuitivo
   - Sincronização em tempo real com Firebase

---

## 🚀 Como Começar

### Opção 1: Integração Manual (Recomendado para Personalização)

1. **Copiar Arquivos Novos**
   ```bash
   cp servicos-pavimentos.js /seu/servidor/
   cp integracao-rt-estoque.js /seu/servidor/
   ```

2. **Seguir Guia de Integração**
   - Abra: `EXEMPLO_PRATICO_INTEGRACAO.md`
   - Siga os 9 passos indicados

3. **Testar**
   - Abra seu navegador
   - Vá para "Prédio 3D"
   - Clique em um pavimento
   - Deve abrir modal de serviços

### Opção 2: Integração Automática (Em Breve)
- Script de integração automática será disponibilizado

---

## 📚 Documentação

### Para Começar Rápido
→ **`RESUMO_EXECUTIVO_V26.md`** (5 min)

### Para Integrar no Seu Código
→ **`EXEMPLO_PRATICO_INTEGRACAO.md`** (30 min)

### Para Entender a Arquitetura
→ **`PLANO_REESTRUTURACAO_V26.md`** (15 min)

### Para Detalhes Técnicos
→ **`GUIA_INTEGRACAO_V26.md`** (20 min)

### Para Modificar o Prédio 3D
→ **`MODIFICACOES_PREDIO_3D_V26.md`** (15 min)

---

## 📦 Arquivos Inclusos

### Novos Arquivos
- `servicos-pavimentos.js` - Gerenciador de serviços
- `integracao-rt-estoque.js` - Integração RT ↔ Estoque
- `firebase-controle-usuarios.js` - Atualizado com suporte a serviços

### Documentação
- `PLANO_REESTRUTURACAO_V26.md` - Visão geral
- `GUIA_INTEGRACAO_V26.md` - Instruções detalhadas
- `MODIFICACOES_PREDIO_3D_V26.md` - Mudanças no prédio 3D
- `EXEMPLO_PRATICO_INTEGRACAO.md` - Passo a passo
- `RESUMO_EXECUTIVO_V26.md` - Resumo executivo
- `README_V26.md` - Este arquivo

### Arquivos Originais (Mantidos)
- `index.html` - Seu arquivo principal
- Todos os outros arquivos originais

---

## 🎬 Fluxo de Uso

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

### 3. Gerenciar Serviços do Pavimento
```
Prédio 3D → Clicar no pavimento → Modal de serviços
→ Preencher checklist, datas e fotos → Salvar
```

### 4. Registrar Saída de Material
```
Controle de Materiais → Registrar Retirada → Preencher dados
→ Material é debitado do estoque
```

---

## 🔧 Configuração Rápida

### Passo 1: Adicionar Scripts (2 min)
No seu `index.html`, adicione no `<head>`:
```html
<script src="./integracao-rt-estoque.js"></script>
<script src="./servicos-pavimentos.js"></script>
```

### Passo 2: Adicionar Estilos (2 min)
Copie os estilos de `EXEMPLO_PRATICO_INTEGRACAO.md` para seu `<style>`

### Passo 3: Modificar Prédio 3D (5 min)
Adicione atributos `data-torre` e `data-pavimento` aos pavimentos

### Passo 4: Adicionar Listener (2 min)
Adicione o listener de clique conforme indicado em `EXEMPLO_PRATICO_INTEGRACAO.md`

### Passo 5: Integrar Entrada Automática (2 min)
Modifique a função de alteração de status das RTs

### Passo 6: Inicializar Módulos (1 min)
Adicione inicialização dos módulos no final do arquivo

---

## 🧪 Testes Recomendados

### Teste 1: Abrir Serviços (2 min)
1. Vá para "Prédio 3D"
2. Clique em um pavimento
3. Deve abrir modal com serviços

### Teste 2: Entrada Automática (5 min)
1. Crie uma RT com material "Cimento" (quantidade 50)
2. Marque como "Entregue"
3. Vá para "Controle de Materiais"
4. Procure "Cimento" - deve estar lá com quantidade 50

### Teste 3: Fotos e Datas (3 min)
1. Abra serviços de um pavimento
2. Adicione foto
3. Preencha datas
4. Marque como concluído
5. Recarregue página - dados devem estar salvos

### Teste 4: Rastreabilidade (3 min)
1. Registre retirada de material
2. Vá para "Rastreabilidade"
3. Deve aparecer entrada (RT) e saída (retirada)

---

## 🐛 Troubleshooting

### Modal não abre
- Verificar se scripts foram adicionados
- Verificar console do navegador (F12)
- Verificar se `appServicosPavimentos` está inicializado

### Material não entra automaticamente
- Verificar se `integracao-rt-estoque.js` foi adicionado
- Verificar se função de alteração de status foi modificada
- Verificar console para erros

### Fotos não salvam
- Verificar se localStorage está habilitado
- Verificar se Firebase está configurado
- Verificar tamanho das fotos (máximo 350KB)

### Cores dos pavimentos não mudam
- Chamar `appServicosPavimentos.atualizarCoresPavimentos()`
- Verificar se classes CSS foram adicionadas

---

## 📊 Estrutura de Dados

### Novo Documento Firebase
```
controle/servicos_pavimentos
```

### Estrutura de um Serviço
```javascript
{
  id: "srv_Torre_A_1º_Pavto_Contra_Piso_abc123",
  torre: "Torre A",
  pavimento: "1º Pavto",
  servico: "Contra Piso",
  concluido: false,
  dataInicio: "2026-04-06",
  dataPrevista: "2026-04-15",
  dataConclusao: null,
  fotos: ["base64_img_1", "base64_img_2"],
  observacoes: "Descrição do serviço",
  criadoEm: "2026-04-06T10:00:00Z",
  atualizadoEm: "2026-04-06T10:00:00Z"
}
```

---

## 🔐 Permissões

### Admin / GO
- ✅ Tudo

### Almoxarife
- ✅ Ver RTs
- ✅ Marcar como "Entregue"
- ✅ Ver Materiais
- ✅ Registrar Retiradas
- ❌ Editar Serviços

### Responsável de Obra
- ✅ Ver RTs
- ✅ Gerenciar Serviços
- ✅ Adicionar Fotos
- ✅ Marcar como Concluído
- ❌ Alterar Status de RTs

---

## 📞 Suporte

### Dúvidas sobre Integração?
→ Leia: `EXEMPLO_PRATICO_INTEGRACAO.md`

### Dúvidas sobre Arquitetura?
→ Leia: `PLANO_REESTRUTURACAO_V26.md`

### Dúvidas sobre Prédio 3D?
→ Leia: `MODIFICACOES_PREDIO_3D_V26.md`

### Dúvidas sobre Implementação?
→ Leia: `GUIA_INTEGRACAO_V26.md`

---

## ✅ Checklist de Implementação

- [ ] Arquivos copiados
- [ ] Scripts adicionados
- [ ] Estilos CSS adicionados
- [ ] Prédio 3D modificado
- [ ] Listener de clique adicionado
- [ ] Entrada automática integrada
- [ ] Permissões configuradas
- [ ] Módulos inicializados
- [ ] Testes realizados
- [ ] Deploy em produção

---

## 🎓 Treinamento

### Para Admin
- Como criar/editar RTs
- Como gerenciar serviços
- Como visualizar rastreabilidade

### Para Almoxarife
- Como marcar RTs como "Entregue"
- Como registrar retiradas
- Como visualizar estoque

### Para Responsável de Obra
- Como abrir serviços de pavimentos
- Como adicionar fotos
- Como marcar como concluído

---

## 📈 Benefícios

| Antes | Depois |
|-------|--------|
| Prédio 3D acoplado às RTs | Prédio 3D independente ✅ |
| Sem gerenciamento de serviços | Interface completa de serviços ✅ |
| Sem fotos de serviços | Até 5 fotos por serviço ✅ |
| Entrada manual de material | Entrada automática ✅ |
| Apenas rastreabilidade de saída | Entrada + Saída ✅ |

---

## 🎉 Próximas Ações

1. **Revisar** a documentação
2. **Testar** em desenvolvimento
3. **Integrar** no seu código
4. **Deploy** em produção
5. **Treinar** usuários

---

## 📅 Versão

- **Versão:** 26
- **Data:** 06/04/2026
- **Status:** ✅ Pronto para Integração
- **Tempo de Integração:** ~1 hora
- **Complexidade:** Média

---

## 📝 Notas Importantes

- ✅ Compatível com dados existentes
- ✅ Firebase é atualizado em tempo real
- ✅ Relatórios continuam funcionando
- ✅ Permissões são respeitadas
- ✅ Rastreabilidade é preservada

---

**Boa sorte com a integração! 🚀**

Para mais informações, consulte os documentos de referência inclusos.
