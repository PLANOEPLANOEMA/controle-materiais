# Sistema Integrado de Gestão de Obras: RT e Controle de Materiais

Este projeto apresenta um sistema web e mobile para a gestão eficiente de Responsabilidade Técnica (RT) e controle de materiais em canteiros de obras. Desenvolvido com foco em usabilidade e responsividade, oferece uma interface "clean" e funcionalidades robustas para otimizar o fluxo de trabalho de equipes de engenharia e logística.

## 🚀 Funcionalidades Principais

-   **Navegação Otimizada:** Abas agrupadas em seções lógicas (RT, Controle de Romaneios, Outros) para uma experiência de usuário intuitiva.
-   **Design Responsivo:** Layout adaptável a diferentes tamanhos de tela, desde desktops até smartphones, com um menu "hambúrguer" inteligente para dispositivos móveis.
-   **Navegação Inteligente (Scroll):** O menu de navegação desaparece ao rolar a página para baixo e reaparece ao rolar para cima, maximizando o espaço de visualização.
-   **Visualização 3D Profissional:** Representação tridimensional realista de edifícios, com fachadas detalhadas e indicação visual do status de cada pavimento (verde, amarelo, vermelho).
-   **Gestão de RT:** Ferramentas para planejamento, lançamento e acompanhamento de Responsabilidades Técnicas por pavimento e serviço, incluindo um fluxo de aprovação integrado.
-   **Controle de Romaneios e Materiais:** Módulo completo para gerenciar o fluxo de materiais de empréstimo e estoque, com KPIs em tempo real e gestão por empresa/material.
-   **Rastreabilidade e Relatórios:** Histórico completo de movimentações de materiais e geração de relatórios visuais (gráficos) e exportáveis (PDF/CSV) para análise estratégica.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica do conteúdo.
-   **CSS3:** Estilização moderna e responsiva, incluindo o design 3D aprimorado.
-   **JavaScript:** Lógica de interação, navegação, manipulação do 3D e funcionalidades dinâmicas.
-   **Chart.js:** Para a criação de gráficos e visualizações de dados.
-   **Capacitor:** (Para versão mobile) Framework para transformar o aplicativo web em um aplicativo nativo para iOS e Android.

## ⚙️ Como Configurar e Rodar o Projeto

### 🌐 Versão Web

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd sistema-gestao-obras
    ```
3.  **Abra o arquivo `index.html`:**
    Simplesmente abra o arquivo `index.html` em seu navegador web preferido.

### 📱 Versão Mobile (com Capacitor)

1.  **Certifique-se de ter o Capacitor CLI instalado globalmente:**
    ```bash
    npm install -g @capacitor/cli
    ```
2.  **Copie o conteúdo da pasta `www` para o seu projeto Capacitor:**
    Se você já tem um projeto Capacitor, substitua o conteúdo da pasta `www` existente pelos arquivos fornecidos neste repositório.
3.  **Sincronize o projeto Capacitor:**
    ```bash
    npx capacitor sync
    ```
4.  **Execute o projeto em uma plataforma específica (iOS/Android):**
    ```bash
    npx capacitor open ios   # Para iOS
    npx capacitor open android # Para Android
    ```

## 🔑 Credenciais de Teste

Para acessar o sistema:
-   **Login:** `admin`
-   **Senha:** `1234`

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias, relatar bugs ou sugerir novas funcionalidades. Seu feedback é muito bem-vindo!

---
