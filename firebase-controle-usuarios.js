<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demonstração - Sistema de Controle de Materiais v26</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --blue-dark: #1F3864;
      --blue-mid: #2E75B6;
      --blue-light: #DDEEFF;
      --accent: #E84545;
      --success: #27AE60;
      --warning: #F5A623;
      --bg: #F0F4FA;
      --card: #FFFFFF;
      --text: #1a2340;
      --muted: #6b7a99;
      --radius: 14px;
      --shadow: 0 4px 24px rgba(31,56,100,.10);
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    /* Header */
    header {
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 100%);
      color: #fff;
      padding: 2rem;
      text-align: center;
      box-shadow: var(--shadow);
    }

    header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    header p { font-size: 1.1rem; opacity: 0.9; }

    /* Nav */
    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--card);
      box-shadow: 0 2px 8px rgba(31,56,100,.08);
      flex-wrap: wrap;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    nav button {
      background: var(--blue-light);
      color: var(--blue-dark);
      border: none;
      border-radius: 50px;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    nav button:hover, nav button.active {
      background: var(--blue-mid);
      color: #fff;
      box-shadow: 0 4px 12px rgba(46,117,182,.35);
    }

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Sections */
    section {
      display: none;
      animation: fadeIn 0.3s ease-in;
    }

    section.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 3D Building */
    .predio3d-viewport {
      perspective: 1600px;
      width: 100%;
      height: 600px;
      background: linear-gradient(180deg, #eef4ff 0%, #f9fbff 56%, #eef3f8 100%);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
      border: 1px solid #dbe7f7;
      margin-bottom: 2rem;
    }

    .predio3d-scene {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 60px;
      padding: 60px 30px;
    }

    .predio3d-tower {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .predio3d-tower-title {
      background: rgba(255,255,255,.94);
      border: 1px solid #dbe7f7;
      border-radius: 999px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      font-weight: 800;
      color: var(--blue-dark);
      box-shadow: 0 10px 20px rgba(31,56,100,.08);
      margin-bottom: 0.5rem;
    }

    .predio3d-building {
      display: flex;
      flex-direction: column-reverse;
      gap: 0;
    }

    .predio3d-floor {
      width: 160px;
      height: 20px;
      background: linear-gradient(135deg, #4caf50 0%, #45a049 50%, #3d9142 100%);
      border: 1px solid #2e7d32;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 8px rgba(31,56,100,.12);
    }

    .predio3d-floor:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(31,56,100,.2);
    }

    .predio3d-floor.amarelo {
      background: linear-gradient(135deg, #ffc107 0%, #ffb300 50%, #ffa500 100%);
      border-color: #ff8f00;
      color: #1a2340;
    }

    .predio3d-floor.vermelho {
      background: linear-gradient(135deg, #f44336 0%, #e53935 50%, #d32f2f 100%);
      border-color: #c62828;
    }

    .predio3d-floor.cinza {
      background: linear-gradient(135deg, #9e9e9e 0%, #757575 50%, #616161 100%);
      border-color: #424242;
    }

    /* Cards */
    .card {
      background: var(--card);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
      border: 1px solid #dbe7f7;
    }

    .card h2 {
      color: var(--blue-dark);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    /* Forms */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--blue-dark);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #c8d6ea;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--blue-mid);
      box-shadow: 0 0 0 4px rgba(46,117,182,0.1);
    }

    /* Buttons */
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: var(--blue-mid);
      color: #fff;
    }

    .btn-primary:hover {
      background: var(--blue-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(31,56,100,0.3);
    }

    .btn-success {
      background: var(--success);
      color: #fff;
    }

    .btn-success:hover {
      background: #229954;
    }

    .btn-warning {
      background: var(--warning);
      color: #1a2340;
    }

    .btn-warning:hover {
      background: #e89b1b;
    }

    .btn-danger {
      background: var(--accent);
      color: #fff;
    }

    .btn-danger:hover {
      background: #d63d3d;
    }

    .btn-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* Modal */
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal.active {
      display: flex;
    }

    .modal-content {
      background: var(--card);
      border-radius: var(--radius);
      max-width: 900px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 2rem;
      border-bottom: 1px solid #eef2f7;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      color: var(--blue-dark);
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: var(--muted);
    }

    .close-btn:hover {
      color: var(--blue-dark);
    }

    .modal-body {
      padding: 2rem;
      flex: 1;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 2rem;
      border-top: 1px solid #eef2f7;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    /* Serviços */
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
      border-left: 4px solid var(--success);
      background: #f0fdf4;
    }

    .servico-card.pendente {
      border-left: 4px solid var(--warning);
    }

    .servico-header {
      padding: 1.25rem;
      background: #fcfdfe;
      border-bottom: 1px solid #f0f4f8;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .servico-header input[type="checkbox"] {
      width: 24px;
      height: 24px;
      cursor: pointer;
      accent-color: var(--success);
    }

    .servico-header h3 {
      margin: 0;
      color: var(--blue-dark);
      font-size: 1.15rem;
      flex: 1;
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
      background: var(--blue-mid);
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

    .btn-upload:hover {
      background: var(--blue-dark);
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
      cursor: pointer;
    }

    /* Table */
    .table-wrap {
      overflow-x: auto;
      margin-bottom: 2rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card);
      border-radius: var(--radius);
      overflow: hidden;
    }

    thead {
      background: var(--blue-dark);
      color: #fff;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eef2f7;
    }

    tbody tr:hover {
      background: #f8fafc;
    }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .grid-item {
      background: var(--card);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      border: 1px solid #dbe7f7;
    }

    .grid-item h3 {
      color: var(--blue-dark);
      margin-bottom: 1rem;
    }

    .grid-item p {
      color: var(--muted);
      line-height: 1.6;
    }

    /* Status Badge */
    .badge {
      display: inline-block;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .badge-success {
      background: #d4edda;
      color: #155724;
    }

    .badge-warning {
      background: #fff3cd;
      color: #856404;
    }

    .badge-danger {
      background: #f8d7da;
      color: #721c24;
    }

    /* Alert */
    .alert {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .alert-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .alert-warning {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
    }

    .alert-info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }

    /* Responsive */
    @media (max-width: 768px) {
      header h1 { font-size: 1.8rem; }
      nav { flex-direction: column; }
      nav button { width: 100%; }
      .dates-group { grid-template-columns: 1fr; }
      .predio3d-scene { gap: 30px; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <h1>🏗️ Sistema de Controle de Materiais v26</h1>
    <p>Demonstração Interativa - Prédio 3D, Serviços e Rastreabilidade</p>
  </header>

  <!-- Nav -->
  <nav>
    <button class="active" onclick="showSection('predio')">🏢 Prédio 3D</button>
    <button onclick="showSection('rts')">📋 RTs</button>
    <button onclick="showSection('materiais')">📦 Materiais</button>
    <button onclick="showSection('rastreabilidade')">🧾 Rastreabilidade</button>
    <button onclick="showSection('sobre')">ℹ️ Sobre</button>
  </nav>

  <!-- Container -->
  <div class="container">
    <!-- Seção Prédio 3D -->
    <section id="predio" class="active">
      <div class="card">
        <h2>🏢 Prédio 3D - Gerenciamento de Serviços</h2>
        <p style="color: var(--muted); margin-bottom: 1.5rem;">
          Clique em um pavimento para abrir a interface de gerenciamento de serviços. 
          As cores indicam o status: <span class="badge badge-success">Verde = Completo</span>
          <span class="badge badge-warning">Amarelo = Parcial</span>
          <span class="badge badge-danger">Cinza = Pendente</span>
        </p>
      </div>

      <!-- 3D Building -->
      <div class="predio3d-viewport">
        <div class="predio3d-scene">
          <!-- Torre A -->
          <div class="predio3d-tower">
            <div class="predio3d-tower-title">Torre A</div>
            <div class="predio3d-building" id="torreA"></div>
          </div>
          <!-- Torre B -->
          <div class="predio3d-tower">
            <div class="predio3d-tower-title">Torre B</div>
            <div class="predio3d-building" id="torreB"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>📊 Resumo de Serviços</h2>
        <div id="resumoServicos" class="grid"></div>
      </div>
    </section>

    <!-- Seção RTs -->
    <section id="rts">
      <div class="card">
        <h2>📋 Requisições de Materiais (RTs)</h2>
        <p style="color: var(--muted); margin-bottom: 1.5rem;">
          Crie RTs e marque como "Entregue" para que o material entre automaticamente no estoque.
        </p>
        
        <div class="btn-group" style="margin-bottom: 2rem;">
          <button class="btn btn-primary" onclick="abrirModalNovaRT()">➕ Nova RT</button>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Torre</th>
                <th>Pavimento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaRTs"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Seção Materiais -->
    <section id="materiais">
      <div class="card">
        <h2>📦 Controle de Materiais</h2>
        <p style="color: var(--muted); margin-bottom: 1.5rem;">
          Materiais que entraram no estoque via RTs marcadas como "Entregue".
        </p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Origem</th>
                <th>Data de Entrada</th>
              </tr>
            </thead>
            <tbody id="tabelaMateriais"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Seção Rastreabilidade -->
    <section id="rastreabilidade">
      <div class="card">
        <h2>🧾 Rastreabilidade Completa</h2>
        <p style="color: var(--muted); margin-bottom: 1.5rem;">
          Histórico de entrada (via RT) e saída (via retirada) de materiais.
        </p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Tipo</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Responsável</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody id="tabelaRastreabilidade"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Seção Sobre -->
    <section id="sobre">
      <div class="card">
        <h2>ℹ️ Sobre o Sistema v26</h2>
        
        <div class="grid">
          <div class="grid-item">
            <h3>🏢 Prédio 3D Independente</h3>
            <p>O prédio 3D agora é desacoplado das RTs e gerencia seus próprios serviços. Clique em qualquer pavimento para abrir a interface de gerenciamento.</p>
          </div>
          
          <div class="grid-item">
            <h3>📸 Serviços com Fotos</h3>
            <p>Cada serviço pode ter até 5 fotos, datas de início e previsão, além de um checklist de conclusão.</p>
          </div>
          
          <div class="grid-item">
            <h3>🔄 Entrada Automática</h3>
            <p>Quando uma RT é marcada como "Entregue", o material entra automaticamente no controle de estoque.</p>
          </div>
          
          <div class="grid-item">
            <h3>🧾 Rastreabilidade Completa</h3>
            <p>Histórico completo de entrada (via RT) e saída (via retirada) de materiais com responsável e motivo.</p>
          </div>
          
          <div class="grid-item">
            <h3>⚡ Sincronização em Tempo Real</h3>
            <p>Todos os dados são sincronizados em tempo real com Firebase para acesso imediato.</p>
          </div>
          
          <div class="grid-item">
            <h3>🔐 Permissões Configuráveis</h3>
            <p>Admin, Almoxarife e Responsável de Obra têm permissões diferentes e apropriadas.</p>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid var(--blue-mid);">
          <h3 style="color: var(--blue-dark); margin-bottom: 1rem;">🚀 Como Usar Esta Demonstração</h3>
          <ol style="color: var(--muted); line-height: 1.8;">
            <li><strong>Prédio 3D:</strong> Clique em um pavimento para gerenciar seus serviços</li>
            <li><strong>RTs:</strong> Crie uma nova RT e marque como "Entregue"</li>
            <li><strong>Materiais:</strong> Veja o material entrar automaticamente no estoque</li>
            <li><strong>Rastreabilidade:</strong> Acompanhe o histórico completo de movimentações</li>
          </ol>
        </div>
      </div>
    </section>
  </div>

  <!-- Modal de Serviços -->
  <div id="modalServicos" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modalServicosTitulo">Serviços</h2>
        <button class="close-btn" onclick="fecharModalServicos()">×</button>
      </div>
      <div class="modal-body" id="modalServicosBody"></div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="salvarServicos()">💾 Salvar</button>
        <button class="btn btn-warning" onclick="fecharModalServicos()">Fechar</button>
      </div>
    </div>
  </div>

  <!-- Modal Nova RT -->
  <div id="modalNovaRT" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Nova RT</h2>
        <button class="close-btn" onclick="fecharModalNovaRT()">×</button>
      </div>
      <div class="modal-body">
        <form id="formNovaRT" onsubmit="salvarNovaRT(event)">
          <div class="form-group">
            <label>Material</label>
            <input type="text" id="rtMaterial" placeholder="Ex: Cimento, Areia, etc" required>
          </div>
          <div class="form-group">
            <label>Quantidade</label>
            <input type="number" id="rtQuantidade" placeholder="Ex: 50" required>
          </div>
          <div class="form-group">
            <label>Torre</label>
            <select id="rtTorre" required>
              <option value="">Selecione</option>
              <option value="Torre A">Torre A</option>
              <option value="Torre B">Torre B</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pavimento</label>
            <select id="rtPavimento" required>
              <option value="">Selecione</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="rtStatus" required>
              <option value="Planejado">Planejado</option>
              <option value="Pedir agora">Pedir agora</option>
              <option value="RT lançada">RT lançada</option>
              <option value="Em suprimentos">Em suprimentos</option>
              <option value="Aguardando entrega">Aguardando entrega</option>
              <option value="Entregue">Entregue</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="document.getElementById('formNovaRT').dispatchEvent(new Event('submit'))">✅ Criar RT</button>
        <button class="btn btn-warning" onclick="fecharModalNovaRT()">Cancelar</button>
      </div>
    </div>
  </div>

  <script>
    // Dados de demonstração
    const demo = {
      rts: [
        { id: 'RT001', material: 'Cimento', quantidade: 50, torre: 'Torre A', pavimento: '1º Pavto', status: 'Entregue', data: new Date().toISOString() },
        { id: 'RT002', material: 'Areia', quantidade: 100, torre: 'Torre B', pavimento: 'Térreo', status: 'Aguardando entrega', data: new Date().toISOString() }
      ],
      materiais: [
        { material: 'Cimento', quantidade: 50, origem: 'RT001', data: new Date().toISOString() }
      ],
      rastreabilidade: [
        { data: new Date().toISOString(), tipo: 'Entrada', material: 'Cimento', quantidade: 50, responsavel: 'Sistema', motivo: 'Entrega de RT #RT001' }
      ],
      servicos: {
        'Torre A_Térreo': [
          { id: 1, servico: 'Contra Piso', concluido: true, dataInicio: '2026-04-01', dataPrevista: '2026-04-05', fotos: [], observacoes: 'Concluído com sucesso' },
          { id: 2, servico: 'Gesso Liso', concluido: false, dataInicio: '2026-04-06', dataPrevista: '2026-04-10', fotos: [], observacoes: '' },
          { id: 3, servico: 'Forro', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 4, servico: 'Pintura', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 5, servico: 'Instalação de Porta', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' }
        ]
      },
      pavimentos: {
        'Torre A': ['Térreo', '1º Pavto', '2º Pavto', '3º Pavto'],
        'Torre B': ['Térreo', '1º Pavto', '2º Pavto']
      }
    };

    // Inicializar
    function init() {
      renderizarPredio3D();
      atualizarTabelaRTs();
      atualizarTabelaMateriais();
      atualizarTabelaRastreabilidade();
      atualizarResumoServicos();
    }

    // Renderizar Prédio 3D
    function renderizarPredio3D() {
      const torres = ['Torre A', 'Torre B'];
      torres.forEach(torre => {
        const pavimentos = demo.pavimentos[torre] || [];
        const container = document.getElementById(torre === 'Torre A' ? 'torreA' : 'torreB');
        container.innerHTML = '';
        
        pavimentos.forEach((pav, idx) => {
          const floor = document.createElement('div');
          floor.className = 'predio3d-floor';
          floor.textContent = pav;
          floor.style.cursor = 'pointer';
          floor.onclick = () => abrirModalServicos(torre, pav);
          
          // Determinar cor baseado em serviços
          const chave = `${torre}_${pav}`;
          const servicos = demo.servicos[chave] || [];
          if (servicos.length > 0) {
            const concluidos = servicos.filter(s => s.concluido).length;
            if (concluidos === servicos.length) {
              floor.classList.add('verde');
            } else if (concluidos > 0) {
              floor.classList.add('amarelo');
            } else {
              floor.classList.add('cinza');
            }
          }
          
          container.appendChild(floor);
        });
      });
    }

    // Abrir Modal de Serviços
    function abrirModalServicos(torre, pavimento) {
      const chave = `${torre}_${pavimento}`;
      let servicos = demo.servicos[chave];
      
      if (!servicos) {
        servicos = [
          { id: 1, servico: 'Contra Piso', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 2, servico: 'Gesso Liso', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 3, servico: 'Forro', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 4, servico: 'Pintura', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' },
          { id: 5, servico: 'Instalação de Porta', concluido: false, dataInicio: '', dataPrevista: '', fotos: [], observacoes: '' }
        ];
        demo.servicos[chave] = servicos;
      }

      document.getElementById('modalServicosTitulo').textContent = `Serviços - ${torre} / ${pavimento}`;
      
      let html = '';
      servicos.forEach(srv => {
        const statusClass = srv.concluido ? 'concluido' : 'pendente';
        const statusText = srv.concluido ? '✅ Concluído' : '⏳ Pendente';
        
        html += `
          <div class="servico-card ${statusClass}">
            <div class="servico-header">
              <input type="checkbox" ${srv.concluido ? 'checked' : ''} onchange="toggleServico('${chave}', ${srv.id}, this.checked)">
              <h3>${srv.servico}</h3>
              <span style="font-size: 0.9rem; color: var(--muted);">${statusText}</span>
            </div>
            <div class="servico-body">
              <div class="dates-group">
                <div class="date-field">
                  <label>📅 Data de Início</label>
                  <input type="date" value="${srv.dataInicio}" onchange="atualizarServico('${chave}', ${srv.id}, 'dataInicio', this.value)">
                </div>
                <div class="date-field">
                  <label>📅 Data Prevista</label>
                  <input type="date" value="${srv.dataPrevista}" onchange="atualizarServico('${chave}', ${srv.id}, 'dataPrevista', this.value)">
                </div>
              </div>
              <div class="photos-section">
                <div class="photos-header">
                  <label>📸 Fotos (${srv.fotos.length}/5)</label>
                  <button class="btn-upload" onclick="document.getElementById('fotoInput_${srv.id}').click()">📷 Adicionar Foto</button>
                  <input type="file" id="fotoInput_${srv.id}" accept="image/*" style="display: none;" onchange="adicionarFoto('${chave}', ${srv.id}, event)">
                </div>
                <div class="photos-grid">
                  ${srv.fotos.length > 0 ? srv.fotos.map((foto, idx) => `
                    <img src="${foto}" class="photo-thumb" onclick="abrirFotoGrande('${foto}')">
                  `).join('') : '<span style="color: #999;">Nenhuma foto adicionada</span>'}
                </div>
              </div>
              <div style="margin-top: 1.5rem;">
                <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">📝 Observações</label>
                <textarea style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; resize: vertical; min-height: 80px;" onchange="atualizarServico('${chave}', ${srv.id}, 'observacoes', this.value)">${srv.observacoes}</textarea>
              </div>
            </div>
          </div>
        `;
      });
      
      document.getElementById('modalServicosBody').innerHTML = html;
      document.getElementById('modalServicos').classList.add('active');
    }

    function toggleServico(chave, id, concluido) {
      const servicos = demo.servicos[chave];
      const srv = servicos.find(s => s.id === id);
      if (srv) srv.concluido = concluido;
      renderizarPredio3D();
      atualizarResumoServicos();
    }

    function atualizarServico(chave, id, campo, valor) {
      const servicos = demo.servicos[chave];
      const srv = servicos.find(s => s.id === id);
      if (srv) srv[campo] = valor;
    }

    function adicionarFoto(chave, id, event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const servicos = demo.servicos[chave];
        const srv = servicos.find(s => s.id === id);
        if (srv && srv.fotos.length < 5) {
          srv.fotos.push(e.target.result);
          abrirModalServicos(chave.split('_')[0], chave.split('_')[1]);
        }
      };
      reader.readAsDataURL(file);
    }

    function abrirFotoGrande(foto) {
      const modal = document.createElement('div');
      modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2000; cursor: pointer;';
      modal.onclick = () => modal.remove();
      modal.innerHTML = `<img src="${foto}" style="max-width: 90vw; max-height: 90vh; border-radius: 8px;">`;
      document.body.appendChild(modal);
    }

    function salvarServicos() {
      fecharModalServicos();
      mostrarAlerta('✅ Serviços salvos com sucesso!', 'success');
    }

    function fecharModalServicos() {
      document.getElementById('modalServicos').classList.remove('active');
    }

    // RTs
    function abrirModalNovaRT() {
      document.getElementById('rtTorre').value = '';
      document.getElementById('rtPavimento').innerHTML = '<option value="">Selecione</option>';
      document.getElementById('modalNovaRT').classList.add('active');
    }

    function fecharModalNovaRT() {
      document.getElementById('modalNovaRT').classList.remove('active');
      document.getElementById('formNovaRT').reset();
    }

    function salvarNovaRT(event) {
      event.preventDefault();
      
      const material = document.getElementById('rtMaterial').value;
      const quantidade = parseInt(document.getElementById('rtQuantidade').value);
      const torre = document.getElementById('rtTorre').value;
      const pavimento = document.getElementById('rtPavimento').value;
      const status = document.getElementById('rtStatus').value;
      
      const novaRT = {
        id: 'RT' + String(demo.rts.length + 1).padStart(3, '0'),
        material,
        quantidade,
        torre,
        pavimento,
        status,
        data: new Date().toISOString()
      };
      
      demo.rts.push(novaRT);
      
      // Se status é "Entregue", adicionar ao estoque
      if (status === 'Entregue') {
        const materialExistente = demo.materiais.find(m => m.material === material);
        if (materialExistente) {
          materialExistente.quantidade += quantidade;
        } else {
          demo.materiais.push({
            material,
            quantidade,
            origem: novaRT.id,
            data: new Date().toISOString()
          });
        }
        
        demo.rastreabilidade.unshift({
          data: new Date().toISOString(),
          tipo: 'Entrada',
          material,
          quantidade,
          responsavel: 'Sistema',
          motivo: `Entrega de RT #${novaRT.id}`
        });
      }
      
      fecharModalNovaRT();
      atualizarTabelaRTs();
      atualizarTabelaMateriais();
      atualizarTabelaRastreabilidade();
      mostrarAlerta('✅ RT criada com sucesso!', 'success');
    }

    document.getElementById('rtTorre').addEventListener('change', function() {
      const pavimentos = demo.pavimentos[this.value] || [];
      const select = document.getElementById('rtPavimento');
      select.innerHTML = '<option value="">Selecione</option>' + 
        pavimentos.map(p => `<option value="${p}">${p}</option>`).join('');
    });

    function atualizarTabelaRTs() {
      const tbody = document.getElementById('tabelaRTs');
      tbody.innerHTML = demo.rts.map(rt => `
        <tr>
          <td><strong>${rt.id}</strong></td>
          <td>${rt.material}</td>
          <td>${rt.quantidade}</td>
          <td>${rt.torre}</td>
          <td>${rt.pavimento}</td>
          <td><span class="badge ${rt.status === 'Entregue' ? 'badge-success' : rt.status === 'Aguardando entrega' ? 'badge-warning' : 'badge-danger'}">${rt.status}</span></td>
          <td>
            <button class="btn btn-primary" style="font-size: 0.85rem; padding: 0.5rem 1rem;" onclick="alterarStatusRT('${rt.id}')">Alterar Status</button>
          </td>
        </tr>
      `).join('');
    }

    function alterarStatusRT(rtId) {
      const rt = demo.rts.find(r => r.id === rtId);
      if (!rt) return;
      
      const novoStatus = prompt('Novo status:', rt.status);
      if (!novoStatus) return;
      
      rt.status = novoStatus;
      
      // Se mudou para "Entregue", adicionar ao estoque
      if (novoStatus === 'Entregue' && !demo.materiais.find(m => m.origem === rtId)) {
        const materialExistente = demo.materiais.find(m => m.material === rt.material);
        if (materialExistente) {
          materialExistente.quantidade += rt.quantidade;
        } else {
          demo.materiais.push({
            material: rt.material,
            quantidade: rt.quantidade,
            origem: rtId,
            data: new Date().toISOString()
          });
        }
        
        demo.rastreabilidade.unshift({
          data: new Date().toISOString(),
          tipo: 'Entrada',
          material: rt.material,
          quantidade: rt.quantidade,
          responsavel: 'Sistema',
          motivo: `Entrega de RT #${rtId}`
        });
      }
      
      atualizarTabelaRTs();
      atualizarTabelaMateriais();
      atualizarTabelaRastreabilidade();
      mostrarAlerta('✅ Status atualizado!', 'success');
    }

    function atualizarTabelaMateriais() {
      const tbody = document.getElementById('tabelaMateriais');
      tbody.innerHTML = demo.materiais.map(m => `
        <tr>
          <td>${m.material}</td>
          <td><strong>${m.quantidade}</strong></td>
          <td>${m.origem}</td>
          <td>${new Date(m.data).toLocaleString('pt-BR')}</td>
        </tr>
      `).join('');
    }

    function atualizarTabelaRastreabilidade() {
      const tbody = document.getElementById('tabelaRastreabilidade');
      tbody.innerHTML = demo.rastreabilidade.map(r => `
        <tr>
          <td>${new Date(r.data).toLocaleString('pt-BR')}</td>
          <td><span class="badge ${r.tipo === 'Entrada' ? 'badge-success' : 'badge-danger'}">${r.tipo}</span></td>
          <td>${r.material}</td>
          <td>${r.quantidade}</td>
          <td>${r.responsavel}</td>
          <td>${r.motivo}</td>
        </tr>
      `).join('');
    }

    function atualizarResumoServicos() {
      const container = document.getElementById('resumoServicos');
      let html = '';
      
      Object.entries(demo.servicos).forEach(([chave, servicos]) => {
        const [torre, pavimento] = chave.split('_');
        const concluidos = servicos.filter(s => s.concluido).length;
        const total = servicos.length;
        const percentual = Math.round((concluidos / total) * 100);
        
        html += `
          <div class="grid-item">
            <h3>${torre} - ${pavimento}</h3>
            <p style="margin-bottom: 1rem;">
              <strong>${concluidos} de ${total}</strong> serviços concluídos
            </p>
            <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
              <div style="background: var(--success); height: 100%; width: ${percentual}%; transition: width 0.3s;"></div>
            </div>
            <p style="font-weight: 700; color: var(--blue-mid);">${percentual}% concluído</p>
          </div>
        `;
      });
      
      container.innerHTML = html || '<p style="color: var(--muted);">Nenhum serviço criado ainda</p>';
    }

    function showSection(id) {
      document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      event.target.classList.add('active');
    }

    function mostrarAlerta(mensagem, tipo) {
      const alert = document.createElement('div');
      alert.className = `alert alert-${tipo}`;
      alert.innerHTML = `<span>${mensagem}</span>`;
      alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 2000; animation: slideIn 0.3s ease-in;';
      document.body.appendChild(alert);
      setTimeout(() => alert.remove(), 3000);
    }

    // Inicializar ao carregar
    window.addEventListener('load', init);
  </script>
</body>
</html>
