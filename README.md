# Prédio 3D Interativo - Planejamento RT

## 📋 Visão Geral

Este projeto implementa um **prédio 3D interativo** integrado com o **Planejamento RT**, permitindo visualizar o status de construção de cada pavimento através de um sistema de cores dinâmico.

## 🎯 Funcionalidades Principais

### ✅ Prédio 3D em Tempo Real
- Visualização em perspectiva isométrica realista
- Cores dinâmicas que refletem o status de cada pavimento
- Integração automática com dados do Planejamento RT

### 🎨 Sistema de Cores Inteligente
- **🟢 Verde:** Pavimento concluído (100% pronto)
- **🟡 Amarelo:** Em andamento (pavimento anterior concluído)
- **🔴 Vermelho:** Bloqueado (pavimento anterior não concluído)
- **⚫ Cinza:** Planejado (sem dados)

### 🏗️ Lógica de Bloqueio em Cascata
- Um pavimento só pode estar em andamento se o anterior estiver concluído
- Garante sequência construtiva realista
- Previne erros de planejamento

### 📊 Painel de Controle
- Seleção de torre (Torre A, Torre B)
- Simulador manual de status
- Cenários pré-configurados
- Detalhes de cada pavimento

## 📁 Estrutura do Projeto

```
predio-3d-completo/
├── index.html                          # Página principal do sistema
├── predio-3d-demo.html                 # Página de demonstração interativa
├── firebase-controle-usuarios.js       # Integração Firebase
├── package.json                        # Dependências do projeto
├── planejamento_rts_vila_ema.csv       # Base de dados de planejamento
├── planejamento_rts.md                 # Planejamento em markdown
├── README.md                           # Este arquivo
├── RESUMO_ALTERACOES.md                # Detalhes das mudanças implementadas
├── INSTRUCOES_DEMO.md                  # Guia de uso da demonstração
├── DOCUMENTACAO_TECNICA.md             # Documentação técnica completa
├── www/                                # Versão para Capacitor (mobile)
└── [outros arquivos do projeto]
```

## 🚀 Como Usar

### 1. Abrir o Sistema Principal
Abra o arquivo `index.html` em um navegador web para acessar o sistema completo de Planejamento RT com o prédio 3D integrado.

### 2. Visualizar a Demonstração Interativa
Abra o arquivo `predio-3d-demo.html` para uma demonstração isolada e interativa do prédio 3D.

### 3. Explorar o Prédio 3D
- **Clique em qualquer pavimento** para ver detalhes
- **Use o painel lateral** para visualizar informações
- **Alterne entre torres** usando o seletor
- **Simule cenários** usando o painel de controle

## 🔧 Alterações Implementadas

### Correção de Nomes dos Pavimentos
- Alterado de "1º Pavimento" para "1º Pavto"
- Garante compatibilidade com o CSV de planejamento

### Nova Lógica de Cores Dinâmica
- Verde: Todos os itens concluídos
- Amarelo: Pavimento anterior verde + itens em andamento
- Vermelho: Pavimento anterior não verde
- Cinza: Sem dados ou planejado

### Inversão da Ordem de Renderização
- Térreo fica na base do prédio
- Pavimentos superiores ficam acima
- Reflete a estrutura real de uma construção

### Atualização da Legenda
- Cores agora refletem exatamente a lógica implementada
- Labels mais descritivos e claros

## 📊 Dados Utilizados

O sistema utiliza os seguintes campos de cada item:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `torre` | String | Torre (Torre A, Torre B, Outros) |
| `pavimento` | String | Pavimento (Térreo, 1º Pavto, etc.) |
| `status` | String | Status (Planejado, Concluído, etc.) |
| `servico` | String | Tipo de serviço |
| `material` | String | Material |
| `dataServico` | String | Data planejada (YYYY-MM-DD) |

## 🔌 Integração com Firebase

O sistema sincroniza em tempo real com Firebase:
- Alterações no Planejamento RT atualizam o prédio 3D automaticamente
- Dados são salvos em `localStorage` como fallback
- Suporta sincronização offline

## 📱 Responsividade

- ✅ Desktop (> 1200px) - Layout 2 colunas
- ✅ Tablet (760px - 1200px) - Layout adaptado
- ✅ Mobile (< 760px) - Layout coluna única

## 🎓 Exemplos de Uso

### Cenário 1: Início da Obra
1. Apenas o Térreo está em andamento (amarelo)
2. Todos os outros pavimentos estão planejados (cinza)

### Cenário 2: Em Progresso
1. Térreo concluído (verde)
2. 1º e 2º pavimentos em andamento (amarelo)
3. Pavimentos superiores bloqueados (vermelho) ou planejados (cinza)

### Cenário 3: Avançado
1. Vários pavimentos concluídos (verde)
2. Alguns em andamento (amarelo)
3. Demonstra a cascata de bloqueios

## 📚 Documentação

- **RESUMO_ALTERACOES.md** - Detalhes técnicos das mudanças
- **INSTRUCOES_DEMO.md** - Guia completo de uso da demonstração
- **DOCUMENTACAO_TECNICA.md** - Documentação técnica detalhada

## 🔐 Segurança

- Nenhum dado sensível é armazenado localmente
- Sincronização via Firebase (segura)
- Validações de entrada em todos os campos
- Proteção contra XSS e injeção de código

## 🌐 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilos e animações
- **JavaScript (Vanilla)** - Lógica interativa
- **Firebase** - Sincronização em tempo real
- **Capacitor** - Suporte para mobile (opcional)

## 📞 Suporte

Se encontrar algum problema:
1. Verifique se o navegador está atualizado
2. Limpe o cache do navegador
3. Tente em outro navegador
4. Verifique o console (F12) para mensagens de erro

## 🚀 Próximos Passos

Após validar o projeto:
1. Configure o Firebase com suas credenciais
2. Importe dados reais do Planejamento RT
3. Configure sincronização em tempo real
4. Adicione mais funcionalidades conforme necessário

## 📦 Como Subir no Git

1. Inicialize um repositório Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prédio 3D Interativo com Planejamento RT"
   ```

2. Adicione o repositório remoto:
   ```bash
   git remote add origin https://seu-repositorio.git
   ```

3. Faça o push:
   ```bash
   git push -u origin main
   ```

## 📄 Licença

Este projeto está disponível sob licença MIT.

## 👥 Autores

- **Sistema de Planejamento RT** - Implementação do prédio 3D interativo
- **Data:** Abril 2026

---

**Versão:** 3.3 (Prédio 3D Integrado)  
**Status:** Pronto para produção  
**Última atualização:** Abril 2026
