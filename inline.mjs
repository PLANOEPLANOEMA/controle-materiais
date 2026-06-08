
  import {
    salvarNaNuvem,
    carregarDaNuvem,
    escutarMudancas,
    salvarMateriaisNaNuvem,
    carregarMateriaisDaNuvem,
    escutarMudancasMateriais,
    salvarMovimentacoesNaNuvem,
    carregarMovimentacoesDaNuvem,
    escutarMudancasMovimentacoes,
    salvarPlanejamentoRTNaNuvem,
    carregarPlanejamentoRTDaNuvem,
    escutarMudancasPlanejamentoRT,
    salvarRTDiaDiaNaNuvem,
    carregarRTDiaDiaDaNuvem,
    escutarMudancasRTDiaDia,
    salvarSaldoNFNaNuvem,
    carregarSaldoNFDaNuvem,
    escutarMudancasSaldoNF
  } from "./firebase-controle-usuarios.js?v=1.0.1";

  window.__fb = {
    salvarNaNuvem,
    carregarDaNuvem,
    escutarMudancas,
    salvarMateriaisNaNuvem,
    carregarMateriaisDaNuvem,
    escutarMudancasMateriais,
    salvarMovimentacoesNaNuvem,
    carregarMovimentacoesDaNuvem,
    escutarMudancasMovimentacoes,
    salvarPlanejamentoRTNaNuvem,
    carregarPlanejamentoRTDaNuvem,
    escutarMudancasPlanejamentoRT,
    salvarRTDiaDiaNaNuvem,
    carregarRTDiaDiaDaNuvem,
    escutarMudancasRTDiaDia,
    salvarSaldoNFNaNuvem,
    carregarSaldoNFDaNuvem,
    escutarMudancasSaldoNF
  };



function atualizarBotaoMobile(sectionId) {
  const btn = document.getElementById('mobileHomeBtn');
  if (!btn) return;
  const isLogged = document.getElementById('login-screen')?.classList.contains('hidden');
  const activeSection = sectionId || document.querySelector('section.active')?.id || 'visao-geral';
  const hasOpenModal = document.querySelector('.modal.active');
  const isHome = activeSection === 'visao-geral';
  const show = window.innerWidth <= 768 && isLogged && (!isHome || hasOpenModal);
  btn.style.display = show ? 'flex' : 'none';
}

function voltarParaInicio() {
  const modal = document.getElementById('modal');
  const modalMateriais = document.getElementById('modalMateriais');
  const modalRetirada = document.getElementById('modalRetirada');
  if (modal && modal.classList.contains('active') && window.app?.fecharModal) window.app.fecharModal();
  if (modalMateriais && modalMateriais.classList.contains('active') && window.appMateriais?.fecharModal) window.appMateriais.fecharModal();
  if (modalRetirada && modalRetirada.classList.contains('active') && window.appMateriais?.fecharModalRetirada) window.appMateriais.fecharModalRetirada();
  const btn = document.querySelector('nav button[data-section="visao-geral"]');
  if (window.app?.showSection && btn) {
    window.app.showSection('visao-geral', btn);
  } else {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('visao-geral')?.classList.add('active');
  }
  atualizarBotaoMobile('visao-geral');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('resize', () => atualizarBotaoMobile());

// ── AUTENTICAÇÃO / PERFIS ──
const auth = {
  USUARIOS: {
    admin: { senha: 'Admin@123', nome: 'Administrador', role: 'admin' },
    engenharia: { senha: 'Eng@123', nome: 'Engenharia/Canteiro', role: 'engenharia' },
    canteiro: { senha: 'Cant@123', nome: 'Engenharia/Canteiro', role: 'engenharia' },
    go: { senha: 'Go@123', nome: 'Gerente de Obras', role: 'go' },
    almoxarife: { senha: 'Almox@123', nome: 'Almoxarife', role: 'almoxarife' }
  },
  SESSION_KEY: 'plano_session_auth_v2',

  verificarSessao() {
    const sessao = this.obterSessao();
    if (sessao && sessao.role) {
      this.mostrarApp(sessao);
      return;
    }
    document.getElementById('login-screen').classList.remove('hidden');
    document.querySelector('header').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    atualizarBotaoMobile('visao-geral');
  },

  obterSessao() {
    try {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
    } catch (e) {
      return null;
    }
  },

  login(e) {
    e.preventDefault();
    const login = document.getElementById('login-input').value.toLowerCase().trim();
    const senha = document.getElementById('password-input').value.trim();
    const usuario = this.USUARIOS[login];

    if (usuario && senha === usuario.senha) {
      const sessao = { username: login, nome: usuario.nome, role: usuario.role, loginAt: new Date().toISOString() };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessao));
      document.getElementById('login-error').classList.remove('show');
      this.mostrarApp(sessao);
    } else {
      document.getElementById('login-error').classList.add('show');
      document.getElementById('password-input').value = '';
      document.getElementById('login-input').focus();
    }
  },

  toggleSenha() {
    const input = document.getElementById('password-input');
    input.type = (input.type === 'password') ? 'text' : 'password';
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.reload();
  },

  roleLabel(role) {
    return ({ admin: 'Administrador', engenharia: 'Engenharia/Canteiro', go: 'GO', almoxarife: 'Almoxarife' })[role] || role;
  },

  aplicarPermissoes(sessao) {
    const role = sessao?.role || 'admin';
    document.body.dataset.role = role;
    document.getElementById('currentUserLabel').textContent = `Usuário: ${sessao.username}`;
    document.getElementById('currentUserRole').textContent = `Perfil: ${this.roleLabel(role)}`;

    const permitidas = {
      admin: ['visao-geral','por-empresa','por-material','registros','materiais-obra','saldo-nf','planejamento-rt','predio-3d','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      almoxarife: ['materiais-obra','saldo-nf','planejamento-rt','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      go: ['materiais-obra','saldo-nf','planejamento-rt','predio-3d','rt-dia-dia','rastreabilidade','relatorio','relatorio-dia'],
      engenharia: ['materiais-obra','saldo-nf','predio-3d','relatorio','relatorio-dia']
    }[role] || ['relatorio-dia'];

    document.querySelectorAll('nav button').forEach((btn) => {
      const section = btn.dataset.section;
      btn.style.display = permitidas.includes(section) ? 'inline-flex' : 'none';
    });

    // Aplicar permissões também no menu mobile
    document.querySelectorAll('.mobile-nav-button').forEach((btn) => {
      const section = btn.dataset.section;
      btn.style.display = permitidas.includes(section) ? 'block' : 'none';
    });
    // Ocultar seções do menu mobile que ficaram sem botões visíveis
    document.querySelectorAll('.mobile-nav-section').forEach((sec) => {
      const visivel = [...sec.querySelectorAll('.mobile-nav-button')].some(b => b.style.display !== 'none');
      sec.style.display = visivel ? 'block' : 'none';
    });

    document.querySelector('.kpi-grid').style.display = (role === 'admin') ? 'grid' : 'none';

    const firstBtn = [...document.querySelectorAll('nav button')].find(btn => btn.style.display !== 'none');
    if (firstBtn) {
      app.showSection(firstBtn.dataset.section, firstBtn);
    }
  },

  mostrarApp(sessao = this.obterSessao()) {
    window.currentUser = sessao || { username: 'admin', role: 'admin', nome: 'Administrador' };
    document.getElementById('login-screen').classList.add('hidden');
    document.querySelector('header').style.display = 'flex';
    document.querySelector('nav').style.display = 'flex';
    document.querySelector('main').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    this.aplicarPermissoes(window.currentUser);
    app.init();
    appMateriais.init();
    appSaldoNF.init();
    appRT.init();
    appRT.carregarMateriais();
    predio3D.render();
    setTimeout(() => atualizarBotaoMobile('visao-geral'), 50);
  },

  pode(acao) {
    const role = window.currentUser?.role || 'admin';
    const mapa = {
      admin: ['editar_emprestimos','editar_materiais','deletar_materiais','registrar_retirada','ver_rastreabilidade','ver_relatorio_dia','excluir_rastreabilidade','ver_relatorio_completo','ver_planejamento_rt','editar_planejamento_rt','ver_predio_3d','ver_rt_dia_dia','editar_rt_dia_dia'],
      almoxarife: ['editar_materiais','deletar_materiais','registrar_retirada','ver_rastreabilidade','ver_relatorio_dia','ver_relatorio_completo','ver_planejamento_rt','ver_rt_dia_dia'],
      go: ['ver_rastreabilidade','ver_relatorio_dia','ver_relatorio_completo','ver_planejamento_rt','editar_planejamento_rt','ver_predio_3d','ver_rt_dia_dia','editar_rt_dia_dia'],
      engenharia: ['ver_relatorio_dia','ver_relatorio_completo','ver_predio_3d']
    };
    return (mapa[role] || []).includes(acao);
  }
};



const floorRooms = {
  STORAGE_KEY: 'predio3d_floor_rooms_v3',
  servicesTemplate: [
    { id: 'contrapiso', nome: 'Primeiro Contra piso', surfaceClass: 'room3d-btn-contrapiso', targetLabel: 'Chão', descricao: 'Clique no chão do apartamento para atualizar o contra piso.' },
    { id: 'gesso', nome: 'Gesso liso', surfaceClass: 'room3d-btn-gesso', targetLabel: 'Parede esquerda', descricao: 'Área de gesso liso da parede interna.' },
    { id: 'forro', nome: 'Forro', surfaceClass: 'room3d-btn-forro', targetLabel: 'Teto', descricao: 'Área de forro do teto do apartamento.' },
    { id: 'pintura', nome: 'Pintura', surfaceClass: 'room3d-btn-pintura', targetLabel: 'Parede direita', descricao: 'Área de pintura da parede interna.' },
    { id: 'porta', nome: 'Instalação de porta', surfaceClass: 'room3d-btn-porta', targetLabel: 'Porta', descricao: 'Instalação e acabamento da porta do ambiente.' }
  ],
  state: {},
  activeKey: null,
  activeServiceId: null,

  init() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.state = saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Não foi possível carregar o apartamento virtual:', e);
      this.state = {};
    }
    const modal = document.getElementById('room3dModal');
    if (modal && !modal.dataset.bound) {
      modal.dataset.bound = '1';
      modal.addEventListener('click', (e) => {
        if (e.target.id === 'room3dModal') this.close();
      });
    }
  },

  save() {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state)); } catch (e) { console.warn('Não foi possível salvar o apartamento virtual:', e); }
  },

  makeDefaultService(def) {
    return { id:def.id, nome:def.nome, inicio:'', previsaoFim:'', concluido:false, observacoes:'', fotos:[] };
  },

  getFloorState(key) {
    if (!this.state[key]) {
      this.state[key] = {
        services: this.servicesTemplate.map(def => this.makeDefaultService(def)),
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
    if (!Array.isArray(this.state[key].services)) this.state[key].services = [];
    this.servicesTemplate.forEach(def => {
      if (!this.state[key].services.some(s => s.id === def.id)) this.state[key].services.push(this.makeDefaultService(def));
    });
    this.state[key].services = this.state[key].services.map(s => ({ observacoes:'', fotos:[], inicio:'', previsaoFim:'', concluido:false, ...s }));
    return this.state[key];
  },

  getServiceStatus(service) {
    if (!service) return { key:'none', label:'Sem dados', className:'' };
    if (service.concluido) return { key:'done', label:'Concluído', className:'done' };
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    if (service.previsaoFim) {
      const fim = new Date(`${service.previsaoFim}T00:00:00`);
      if (!Number.isNaN(fim.getTime()) && fim < hoje) return { key:'late', label:'Atrasado', className:'late' };
    }
    if (service.inicio || service.previsaoFim || (service.observacoes || '').trim() || (service.fotos || []).length) {
      return { key:'progress', label:'Em andamento', className:'progress' };
    }
    return { key:'none', label:'Sem dados', className:'' };
  },

  getOverallStatus(floorState) {
    const services = floorState?.services || [];
    const statuses = services.map(s => this.getServiceStatus(s).key);
    if (!statuses.length || statuses.every(s => s === 'none')) return { label:'Sem dados', className:'' };
    if (statuses.every(s => s === 'done')) return { label:'Concluído', className:'success' };
    if (statuses.includes('late')) return { label:'Atrasado', className:'error' };
    if (statuses.includes('progress') || statuses.includes('done')) return { label:'Em andamento', className:'warning' };
    return { label:'Sem dados', className:'' };
  },

  open(key) {
    this.activeKey = key;
    this.activeServiceId = this.activeServiceId || 'gesso';
    const modal = document.getElementById('room3dModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.render();
  },

  close() {
    const modal = document.getElementById('room3dModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  focusService(serviceId) {
    this.activeServiceId = serviceId;
    this.renderHotspots();
    document.querySelectorAll('.room3d-service-card').forEach(card => card.classList.toggle('active', card.dataset.serviceId === serviceId));
    const card = document.querySelector(`.room3d-service-card[data-service-id="${serviceId}"]`);
    if (card) card.scrollIntoView({ behavior:'smooth', block:'nearest' });
  },

  updateService(serviceId, patch) {
    if (!this.activeKey) return;
    const floorState = this.getFloorState(this.activeKey);
    floorState.services = floorState.services.map(service => service.id === serviceId ? { ...service, ...patch } : service);
    floorState.updatedAt = new Date().toISOString();
    this.save();
    this.render();
    if (window.predio3D) window.predio3D.render();
  },

  async handlePhotos(event, serviceId) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const readers = await Promise.all(files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.readAsDataURL(file);
    })));
    const floorState = this.getFloorState(this.activeKey);
    const service = floorState.services.find(s => s.id === serviceId);
    if (!service) return;
    service.fotos = [...(service.fotos || []), ...readers.filter(Boolean)].slice(0, 12);
    floorState.updatedAt = new Date().toISOString();
    this.save();
    this.render();
    if (window.predio3D) window.predio3D.render();
    event.target.value = '';
  },

  removePhoto(serviceId, index) {
    const floorState = this.getFloorState(this.activeKey);
    const service = floorState.services.find(s => s.id === serviceId);
    if (!service) return;
    service.fotos = (service.fotos || []).filter((_, idx) => idx !== index);
    floorState.updatedAt = new Date().toISOString();
    this.save();
    this.render();
    if (window.predio3D) window.predio3D.render();
  },

  renderHotspots() {
    const container = document.getElementById('room3dHotspots');
    if (!container || !this.activeKey) return;
    const floorState = this.getFloorState(this.activeKey);
    container.innerHTML = this.servicesTemplate.map(def => {
      const service = floorState.services.find(s => s.id === def.id) || this.makeDefaultService(def);
      const status = this.getServiceStatus(service);
      const active = this.activeServiceId === def.id ? 'active' : '';
      return `<button type="button" class="room3d-surface-btn ${def.surfaceClass} ${status.className} ${active}" onclick="floorRooms.focusService('${def.id}')"><span class="dot"></span>${def.targetLabel}</button>`;
    }).join('');
  },

  render() {
    if (!this.activeKey) return;
    const floorState = this.getFloorState(this.activeKey);
    const [torre, pavimento] = String(this.activeKey).split('||');
    const title = document.getElementById('room3dTitle');
    const subtitle = document.getElementById('room3dSubtitle');
    if (title) title.textContent = `Apartamento virtual • ${torre || '-'} • ${pavimento || '-'}`;
    if (subtitle) subtitle.textContent = 'Clique nas superfícies do ambiente para abrir o serviço correspondente.';

    const totalDone = floorState.services.filter(service => service.concluido).length;
    const totalProgress = floorState.services.filter(service => this.getServiceStatus(service).key === 'progress').length;
    const totalPhotos = floorState.services.reduce((acc, service) => acc + (service.fotos || []).length, 0);
    const overall = this.getOverallStatus(floorState);

    const overallEl = document.getElementById('room3dOverallStatus');
    if (overallEl) {
      overallEl.textContent = overall.label;
      overallEl.className = `predio3d-badge ${overall.className || ''}`.trim();
    }
    const doneEl = document.getElementById('room3dSummaryDone'); if (doneEl) doneEl.textContent = String(totalDone);
    const progressEl = document.getElementById('room3dSummaryProgress'); if (progressEl) progressEl.textContent = String(totalProgress);
    const photosEl = document.getElementById('room3dSummaryPhotos'); if (photosEl) photosEl.textContent = String(totalPhotos);

    if (!this.activeServiceId || !floorState.services.some(service => service.id === this.activeServiceId)) {
      this.activeServiceId = 'gesso';
    }

    const container = document.getElementById('room3dServices');
    if (!container) return;
    container.innerHTML = floorState.services.map(service => {
      const def = this.servicesTemplate.find(item => item.id === service.id) || { targetLabel: 'Área' };
      const status = this.getServiceStatus(service);
      const activeClass = this.activeServiceId === service.id ? 'active' : '';
      return `
        <div class="room3d-service-card ${activeClass}" data-service-id="${service.id}">
          <div class="room3d-service-head">
            <label class="room3d-check">
              <input type="checkbox" ${service.concluido ? 'checked' : ''} onchange="floorRooms.updateService('${service.id}', { concluido: this.checked })" />
              <span>${service.nome}</span>
            </label>
            <span class="room3d-status-chip">${status.label}</span>
          </div>
          <div style="margin:-.15rem 0 .8rem;color:var(--muted);font-size:.82rem;"><strong style="color:var(--blue-dark);">Superfície:</strong> ${def.targetLabel} • ${def.descricao || ''}</div>
          <div class="room3d-service-fields">
            <div>
              <label>Início do serviço</label>
              <input type="date" value="${service.inicio || ''}" onchange="floorRooms.updateService('${service.id}', { inicio: this.value })" />
            </div>
            <div>
              <label>Data prevista de finalização</label>
              <input type="date" value="${service.previsaoFim || ''}" onchange="floorRooms.updateService('${service.id}', { previsaoFim: this.value })" />
            </div>
            <div class="field-full">
              <label>Checklist / observações</label>
              <textarea onchange="floorRooms.updateService('${service.id}', { observacoes: this.value })" placeholder="Descreva o andamento, pendências e conferências feitas.">${service.observacoes || ''}</textarea>
            </div>
            <div class="field-full">
              <label>Fotos do serviço</label>
              <div class="room3d-upload-row">
                <label class="btn btn-secondary" style="cursor:pointer;">
                  📷 Adicionar foto
                  <input type="file" accept="image/*" multiple style="display:none;" onchange="floorRooms.handlePhotos(event, '${service.id}')" />
                </label>
              </div>
              <div class="room3d-photo-grid">
                ${(service.fotos || []).length ? (service.fotos || []).map((foto, idx) => `
                  <div class="room3d-photo-item">
                    <img src="${foto}" alt="Foto do serviço ${service.nome}" />
                    <button type="button" class="room3d-photo-remove" onclick="floorRooms.removePhoto('${service.id}', ${idx})">×</button>
                  </div>
                `).join('') : `<div class="room3d-empty-photos">Nenhuma foto adicionada ainda.</div>`}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.renderHotspots();
    setTimeout(() => this.focusService(this.activeServiceId), 0);
  }
};


// ── 3D PRÉDIO ──
const predio3D = {
  towerConfig: { 'Torre A': 18, 'Torre B': 20 },
  state: { rotateX: -16, rotateY: -26, scale: 1, selectedKey: null, tower: 'all', dragging: false, startX: 0, startY: 0, baseRotateX: -16, baseRotateY: -26 },
  controlsBound: false,

  getTowerDefinitions() {
    const mk = (torre, total) => {
      const floors = ['Térreo'];
      for (let i = 1; i <= total; i++) floors.push(`${i}º Pavto`);
      return { torre, floors };
    };
    return [mk('Torre A', this.towerConfig['Torre A']), mk('Torre B', this.towerConfig['Torre B'])];
  },

  normalizeTower(value) {
    const txt = String(value || '').trim().toLowerCase();
    if (!txt) return '';
    if (txt === 'a' || txt.includes('torre a')) return 'Torre A';
    if (txt === 'b' || txt.includes('torre b')) return 'Torre B';
    return String(value || '').trim();
  },

  floorNumber(value) {
    const txt = String(value || '').trim().toLowerCase();
    if (!txt) return null;
    if (txt.includes('térreo') || txt.includes('terreo')) return 0;
    const m = txt.match(/(\d+)/);
    return m ? Number(m[1]) : null;
  },

  normalizeFloor(value) {
    const txt = String(value || '').trim();
    if (!txt) return '';
    const low = txt.toLowerCase();
    if (low.includes('térreo') || low.includes('terreo')) return 'Térreo';
    const n = this.floorNumber(txt);
    if (n === null) return txt;
    return `${n}º Pavto`;
  },

  floorOrder(label) {
    if (label === 'Térreo') return 0;
    return this.floorNumber(label) || 999;
  },

  makeFloorKey(torre, floor) { return `${torre}__${floor}`; },

  parseDate(v) {
    if (!v) return null;
    try {
      if (/^\d{4}-\d{2}-\d{2}/.test(v)) return new Date(v + 'T12:00:00');
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
        const [d,m,y] = v.split('/');
        return new Date(`${y}-${m}-${d}T12:00:00`);
      }
    } catch (e) {}
    return null;
  },

  statusLabel(status) {
    return ({ verde: 'Concluído', amarelo: 'Em andamento', vermelho: 'Atrasado', cinza: 'Sem dados' })[status] || 'Sem dados';
  },

  buildTowerSelect() {
    const sel = document.getElementById('predio3dTower');
    if (!sel) return;
    const current = this.state.tower || 'all';
    sel.innerHTML = ['all', 'Torre A', 'Torre B'].map(t => `<option value="${t}">${t === 'all' ? 'Todas as torres' : t}</option>`).join('');
    sel.value = current;
    this.state.tower = sel.value || 'all';
  },

  getDisplayTowers() {
    const defs = this.getTowerDefinitions();
    if (this.state.tower === 'all') return defs;
    const filtered = defs.filter(d => d.torre === this.state.tower);
    return filtered.length ? filtered : defs;
  },

  getItensBase() {
    const planejamento = (window.appRT?.itens || []).map(item => ({ ...item, origem: 'planejamento' }));
    const diaDia = (window.appRT?.itensDiaDia || []).map(item => ({ ...item, origem: 'dia-dia' }));
    return [...planejamento, ...diaDia].map(item => ({
      ...item,
      torre: this.normalizeTower(item.torre),
      pavimento: this.normalizeFloor(item.pavimento)
    })).filter(item => item.torre && item.pavimento);
  },

  getItemsForFloor(torre, floor) {
    return this.getItensBase().filter(item => item.torre === torre && item.pavimento === floor);
  },

  findFloorByKey(key) {
    return this.buildFloors().flatMap(t => t.floors).find(f => f.key === key) || null;
  },

  computeFloorStatus(items) {
    if (items && items.length) {
      const sample = items[0];
      const key = this.makeFloorKey(sample.torre, sample.pavimento);
      if (window.floorRooms) return window.floorRooms.getFloorStatus(key);
    }
    return 'cinza';
  },

  buildFloors() {
    return this.getDisplayTowers().map(def => ({
      torre: def.torre,
      floors: def.floors.map(floor => {
        const items = this.getItemsForFloor(def.torre, floor);
        return { torre: def.torre, floor, key: this.makeFloorKey(def.torre, floor), items, status: this.computeFloorStatus(items) };
      })
    }));
  },

  render() {
    this.buildTowerSelect();
    const towers = this.buildFloors();
    const building = document.getElementById('predio3dBuilding');
    const floorList = document.getElementById('predio3dFloorList');
    const details = document.getElementById('predio3dDetails');
    const selectedLabel = document.getElementById('predio3dSelectedLabel');
    const countFloors = document.getElementById('predio3dCountFloors');
    const countCritical = document.getElementById('predio3dCountCritical');
    if (!building || !floorList || !details || !selectedLabel || !countFloors || !countCritical) return;

    const allFloors = towers.flatMap(t => t.floors);
    countFloors.textContent = String(allFloors.length);
    countCritical.textContent = String(allFloors.filter(f => f.status === 'vermelho').length);

    if (!this.state.selectedKey && allFloors.length) this.state.selectedKey = allFloors[0].key;
    if (this.state.selectedKey && !allFloors.some(f => f.key === this.state.selectedKey)) this.state.selectedKey = allFloors[0]?.key || null;

    const maxFloors = Math.max(...towers.map(t => t.floors.length), 1);
    const totalHeight = Math.max(620, maxFloors * 28 + 120);
    building.style.height = totalHeight + 'px';
    building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    building.className = 'predio3d-scene';
    building.innerHTML = towers.map(tower => {
      const towerHeight = Math.max(520, tower.floors.length * 28 + 96);
      const floorsHtml = tower.floors.map((floorObj, idx) => {
        const y = idx * 28;
        const isTop = idx === tower.floors.length - 1;
        return `
          <div class="predio3d-floor predio3d-${floorObj.status}${this.state.selectedKey === floorObj.key ? ' active' : ''}" style="bottom:${34 + y}px;">
            <div class="face front" onclick='predio3D.openFloorModal(${JSON.stringify(floorObj.key)})'>
              <span>${floorObj.floor}</span>
              <span class="label-small">${predio3D.statusLabel(floorObj.status)}</span>
            </div>
            <div class="face back"></div>
            <div class="face side side-left"></div>
            <div class="face side side-right"></div>
            ${isTop ? '<div class="face roof"></div>' : ''}
          </div>`;
      }).join('');
      return `
        <div class="predio3d-tower-wrap">
          <div class="predio3d-tower-title">${tower.torre}</div>
          <div class="predio3d-building" style="height:${towerHeight}px;">
            ${floorsHtml}
            <div class="predio3d-base"></div>
            <div class="predio3d-ground"></div>
          </div>
        </div>`;
    }).join('');

    floorList.innerHTML = allFloors.length ? allFloors.slice().sort((a,b) => {
      const towerDiff = a.torre.localeCompare(b.torre, 'pt-BR');
      if (towerDiff !== 0) return towerDiff;
      return this.floorOrder(b.floor) - this.floorOrder(a.floor);
    }).map(f => `
      <div class="predio3d-floor-item ${this.state.selectedKey === f.key ? 'active' : ''}" onclick='predio3D.openFloorModal(${JSON.stringify(f.key)})'>
        <div>
          <div style="font-weight:700;color:var(--blue-dark)">${f.floor}</div>
          <small>${f.torre} • ${f.items.length ? `${f.items.length} RT(s)` : 'Sem RT'}</small>
        </div>
        <span class="predio3d-badge">${this.statusLabel(f.status)}</span>
      </div>`).join('') : '<div class="predio3d-empty">Nenhum pavimento encontrado.</div>';

    const selected = allFloors.find(f => f.key === this.state.selectedKey);
    if (!selected) {
      selectedLabel.textContent = 'Selecione um pavimento';
      details.innerHTML = '<div class="predio3d-empty">Nenhum pavimento disponível.</div>';
    } else {
      selectedLabel.textContent = `${selected.torre} • ${selected.floor} • ${this.statusLabel(selected.status)}`;
      const resumoServicos = window.floorRooms ? window.floorRooms.getFloorState(selected.key).services : [];
      const cardsServicos = resumoServicos.map(serv => {
        const st = window.floorRooms ? window.floorRooms.getServiceStatus(serv) : 'cinza';
        return `
          <div class="predio3d-details-item">
            <div style="display:flex;justify-content:space-between;gap:.8rem;align-items:start;">
              <strong>${serv.nome}</strong>
              <span class="predio3d-badge">${window.floorRooms ? window.floorRooms.getStatusLabel(st) : 'Sem dados'}</span>
            </div>
            <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
              Início: ${serv.inicio ? new Date(serv.inicio+'T12:00:00').toLocaleDateString('pt-BR') : '-'} • Previsto: ${serv.previsaoFim ? new Date(serv.previsaoFim+'T12:00:00').toLocaleDateString('pt-BR') : '-'}
            </div>
            <div style="margin-top:.35rem;font-size:.88rem;color:var(--muted);">
              Fotos: ${(serv.fotos || []).length} • Checklist: ${serv.concluido ? 'Concluído' : 'Pendente'}
            </div>
          </div>`;
      }).join('');
      const blocoRts = selected.items.length ? `
        <div class="predio3d-details-item">
          <div style="display:flex;justify-content:space-between;gap:.8rem;align-items:start;">
            <strong>RTs do pavimento</strong>
            <span class="predio3d-badge">${selected.items.length}</span>
          </div>
          <div style="margin-top:.45rem;font-size:.88rem;color:var(--muted);">${selected.items.map(item => `${item.servico || 'Serviço'} • ${item.material || '-'} • ${item.status || 'Planejado'}`).join('<br>')}</div>
        </div>` : '';
      details.innerHTML = `<button class="btn btn-primary" style="width:100%;justify-content:center;" onclick='predio3D.openFloorModal(${JSON.stringify(selected.key)})'>🏠 Abrir sala virtual 3D</button>${cardsServicos || '<div class="predio3d-empty">Nenhum serviço interno cadastrado.</div>'}${blocoRts}`;
    }

    this.ensureControls();
  },

  selectFloor(key) { this.state.selectedKey = key; this.render(); },

  openFloorModal(key) {
    this.state.selectedKey = key;
    this.render();
    if (window.floorRooms) window.floorRooms.open(key);
  },

  resetView() {
    this.state.rotateX = -16;
    this.state.rotateY = -26;
    this.state.scale = 1;
    this.render();
  },

  ensureControls() {
    if (this.controlsBound) return;
    const viewport = document.getElementById('predio3dViewport');
    if (!viewport) return;
    this.controlsBound = true;
    const onDown = (x, y) => {
      this.state.dragging = true;
      this.state.startX = x;
      this.state.startY = y;
      this.state.baseRotateX = this.state.rotateX;
      this.state.baseRotateY = this.state.rotateY;
      viewport.classList.add('dragging');
    };
    const onMove = (x, y) => {
      if (!this.state.dragging) return;
      const dx = x - this.state.startX;
      const dy = y - this.state.startY;
      this.state.rotateY = this.state.baseRotateY + dx * 0.28;
      this.state.rotateX = Math.max(-50, Math.min(8, this.state.baseRotateX - dy * 0.18));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    };
    const onUp = () => {
      this.state.dragging = false;
      viewport.classList.remove('dragging');
    };
    viewport.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    viewport.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    viewport.addEventListener('touchstart', (e) => { const t = e.touches[0]; onDown(t.clientX, t.clientY); }, { passive: true });
    viewport.addEventListener('touchmove', (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener('touchend', onUp);
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const next = this.state.scale + (e.deltaY < 0 ? 0.05 : -0.05);
      this.state.scale = Math.max(0.72, Math.min(1.5, next));
      const building = document.getElementById('predio3dBuilding');
      if (building) building.style.transform = `scale(${this.state.scale}) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`;
    }, { passive: false });
  },

  gerarPdf() {
    const towers = this.buildFloors();
    const floors = towers.flatMap(t => t.floors);
    const rows = floors.map(f => `
      <tr>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${f.torre}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${f.floor}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${this.statusLabel(f.status)}</td>
        <td style="padding:.55rem;border:1px solid #d7e2f2;">${f.items.length}</td>
      </tr>`).join('');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div style="font-family:Segoe UI,Arial,sans-serif;padding:22px;color:#1a2340;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2E75B6;padding-bottom:12px;margin-bottom:18px;">
          <div>
            <h1 style="margin:0;color:#1F3864;font-size:24px;">3D PRÉDIO</h1>
            <p style="margin:6px 0 0 0;color:#6b7a99;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <div style="font-weight:700;color:#1F3864;">Plano & Plano</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead><tr><th style="padding:.6rem;border:1px solid #d7e2f2;">Torre</th><th style="padding:.6rem;border:1px solid #d7e2f2;">Pavimento</th><th style="padding:.6rem;border:1px solid #d7e2f2;">Status</th><th style="padding:.6rem;border:1px solid #d7e2f2;">RTs</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    document.body.appendChild(wrapper);
    html2pdf().set({ margin: 8, filename: '3d-predio.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } }).from(wrapper).save().then(() => wrapper.remove());
  }
};


const app = {
  STORAGE_KEY: 'controle_emprestimos_dados_final',
  STORAGE_KEY_MATERIAIS: 'controle_materiais_obra_dados',
  CORES: ["#2E75B6","#1F3864","#5BA4E0","#E84545","#F5A623","#27AE60","#8E44AD"],
  dados: [],
  editandoId: null,
  charts: {},
  _unsub: null,
  _isApplyingRemote: false,

  init() {
    console.log('Inicializando aplicação de empréstimos...');
    this.carregarDados().then(() => {
      this.atualizarUI();
      this.setupEventListeners();
      this.iniciarSyncAoVivo();
      console.log('Aplicação de empréstimos inicializada!');
    });
  },

  iniciarSyncAoVivo() {
    try {
      if (!window.__fb || !window.__fb.escutarMudancas) return;
      if (this._unsub) this._unsub();
      this._unsub = window.__fb.escutarMudancas((registros) => {
        if (this._isApplyingRemote) return;
        this._isApplyingRemote = true;
        this.dados = Array.isArray(registros) ? registros : [];
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados)); } catch(e) {}
        this.atualizarUI();
        this._isApplyingRemote = false;
      });
    } catch (e) {
      console.warn('Sync ao vivo indisponível:', e);
    }
  },

  setupEventListeners() {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') this.fecharModal();
    });
  },

  async carregarDados() {
    try {
      if (window.__fb && window.__fb.carregarDaNuvem) {
        const cloud = await window.__fb.carregarDaNuvem();
        if (cloud && Array.isArray(cloud) && cloud.length) {
          this.dados = cloud;
          console.log('Dados de empréstimos carregados do Firebase:', this.dados.length);
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados)); } catch(e) {}
          return;
        }
      }

      const salvos = localStorage.getItem(this.STORAGE_KEY);
      if (salvos) {
        this.dados = JSON.parse(salvos);
        console.log('Dados de empréstimos carregados do localStorage:', this.dados.length);
        this.salvarDados();
        return;
      }

      this.dados = [
        { id:1, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:2, empresa:"Felipe Agosti", material:"Chapa de Madeirite OSB", data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:3, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-02-12", quantidade:150, status:"Em Aberto" },
        { id:4, empresa:"Felipe Agosti", material:"Tábua 30cm",             data:"2026-02-12", quantidade:50,  status:"Em Aberto" },
        { id:5, empresa:"Murilo",        material:"Pontalete",              data:"2026-02-04", quantidade:220, status:"Em Aberto" },
        { id:6, empresa:"Spera Urban",   material:"Pontalete",              data:"2025-02-03", quantidade:100, status:"Em Aberto" },
        { id:7, empresa:"Plano Purus",   material:"Tábua de 30cm",          data:"2026-02-06", quantidade:100, status:"Em Aberto" },
      ];
      this.salvarDados();
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      this.mostrarAlerta('Erro ao carregar dados. Usando dados padrão.', 'error');
    }
  },

  salvarDados() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados));
    } catch (e) {
      console.warn('Falha ao salvar cache local:', e);
    }

    try {
      if (this._isApplyingRemote) return;
      if (window.__fb && window.__fb.salvarNaNuvem) {
        window.__fb.salvarNaNuvem(this.dados).then(() => {
          console.log('Dados salvos no Firebase!');
        }).catch((e) => {
          console.error('Erro ao salvar no Firebase:', e);
        });
      }
    } catch (e) {
      console.warn('Falha ao salvar na nuvem:', e);
    }
  },

  mostrarAlerta(msg, tipo) {
    const alert = document.getElementById('alert');
    alert.textContent = msg;
    alert.className = `alert show alert-${tipo}`;
    setTimeout(() => alert.classList.remove('show'), 3000);
  },

  showSection(id, btn) {
    if (id === 'planejamento-rt' && !auth.pode('ver_planejamento_rt')) {
      app.mostrarAlerta('Somente Admin e GO podem acessar o Planejamento RT.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }
    if (id === 'rt-dia-dia' && !auth.pode('ver_rt_dia_dia')) {
      app.mostrarAlerta('Somente Admin e GO podem acessar RT do Dia a Dia.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }
    if (id === 'predio-3d' && !auth.pode('ver_predio_3d')) {
      app.mostrarAlerta('Somente Admin, GO e Engenharia podem acessar o 3D PRÉDIO.', 'error');
      id = 'materiais-obra';
      btn = document.querySelector('nav button[data-section="materiais-obra"]');
    }

    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const section = document.getElementById(id);
    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');

    const globalKpiGrid = document.getElementById('globalKpiGrid');
    if (globalKpiGrid) {
      globalKpiGrid.style.display = ['planejamento-rt','predio-3d','rt-dia-dia','materiais-obra','saldo-nf','rastreabilidade'].includes(id) ? 'none' : 'grid';
    }

    if (id === 'relatorio') {
      this.gerarRelatorioPDF();
    }
    if (id === 'relatorio-dia' && window.appMateriais && typeof window.appMateriais.renderizarRelatorioDia === 'function') {
      window.appMateriais.renderizarRelatorioDia();
    }
    if (id === 'rastreabilidade' && window.appMateriais && typeof window.appMateriais.renderizarRastreabilidadeCompleta === 'function') {
      window.appMateriais.renderizarRastreabilidadeCompleta();
    }
    if (id === 'planejamento-rt' && window.appRT && typeof window.appRT.renderizar === 'function') {
      window.appRT.renderizar();
      if (window.predio3D) window.predio3D.render();
    }
    if (id === 'rt-dia-dia' && window.appRT && typeof window.appRT.renderizarDiaDia === 'function') {
      window.appRT.renderizarDiaDia();
      if (window.predio3D) window.predio3D.render();
    }
    if (id === 'predio-3d' && window.predio3D && typeof window.predio3D.render === 'function') {
      window.predio3D.render();
    }
    if (id === 'saldo-nf' && window.appSaldoNF && typeof window.appSaldoNF.renderizar === 'function') {
      window.appSaldoNF.renderizar();
    }
    atualizarBotaoMobile(id);
  },

  abrirModalNovo() {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode cadastrar materiais.', 'error');
      return;
    }
    this.editandoId = null;
    document.getElementById('modalTitle').textContent = 'Novo Registro';
    document.getElementById('formRegistro').reset();
    document.getElementById('modal').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditar(id) {
    if (!auth.pode('editar_emprestimos')) {
      this.mostrarAlerta('Seu perfil não pode editar registros de empréstimo.', 'error');
      return;
    }
    const reg = this.dados.find(d => d.id === id);
    if (!reg) return;
    this.editandoId = id;
    document.getElementById('modalTitle').textContent = 'Editar Registro';
    document.getElementById('empresa').value = reg.empresa;
    document.getElementById('material').value = reg.material;
    document.getElementById('data').value = reg.data;
    document.getElementById('quantidade').value = reg.quantidade;
    document.getElementById('modal').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModal() {
    document.getElementById('modal').classList.remove('active');
    this.editandoId = null;
    atualizarBotaoMobile();
  },

  salvarRegistro(e) {
    e.preventDefault();
    const empresa = document.getElementById('empresa').value.trim();
    const material = document.getElementById('material').value.trim();
    const data = document.getElementById('data').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (!empresa || !material || !data || !quantidade) {
      this.mostrarAlerta('Preencha todos os campos!', 'error');
      return;
    }

    if (this.editandoId) {
      const idx = this.dados.findIndex(d => d.id === this.editandoId);
      if (idx !== -1) {
        this.dados[idx] = { ...this.dados[idx], empresa, material, data, quantidade };
      }
    } else {
      const novoId = Math.max(...this.dados.map(d => d.id), 0) + 1;
      this.dados.push({ id: novoId, empresa, material, data, quantidade, status: "Em Aberto" });
    }

    this.fecharModal();
    this.salvarDados();
    this.atualizarUI();
    this.mostrarAlerta('Registro salvo com sucesso!', 'success');
  },

  deletarRegistro(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      this.dados = this.dados.filter(d => d.id !== id);
      this.salvarDados();
      this.atualizarUI();
      this.mostrarAlerta('Registro deletado com sucesso!', 'success');
    }
  },

  alterarStatus(id) {
    const reg = this.dados.find(d => d.id === id);
    if (!reg) return;
    
    const statusOpcoes = ["Em Aberto", "Parcial", "Concluído"];
    const indiceAtual = statusOpcoes.indexOf(reg.status);
    reg.status = statusOpcoes[(indiceAtual + 1) % statusOpcoes.length];
    
    this.salvarDados();
    this.atualizarUI();
    this.mostrarAlerta(`Status alterado para: ${reg.status}`, 'success');
  },

  agrupar(campo) {
    return this.dados.reduce((acc, d) => {
      acc[d[campo]] = (acc[d[campo]] || 0) + d.quantidade;
      return acc;
    }, {});
  },

  filtrarTabela() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filterEmpresa = document.getElementById('filterEmpresa').value;
    const filterMaterial = document.getElementById('filterMaterial').value;
    const filterStatus = document.getElementById('filterStatus').value;

    const filtrados = this.dados.filter(d => {
      const matchSearch = d.empresa.toLowerCase().includes(search) || d.material.toLowerCase().includes(search);
      const matchEmpresa = !filterEmpresa || d.empresa === filterEmpresa;
      const matchMaterial = !filterMaterial || d.material === filterMaterial;
      const matchStatus = !filterStatus || d.status === filterStatus;
      return matchSearch && matchEmpresa && matchMaterial && matchStatus;
    });

    this.renderizarTabela(filtrados);
  },

  renderizarTabela(dados = this.dados) {
    const tbody = document.getElementById('tabelaRegistros');
    tbody.innerHTML = '';

    dados.forEach((d, i) => {
      const dataFormatada = new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR');
      const statusClass = `badge-${d.status.toLowerCase().replace('á', 'a').replace('í', 'i')}`;
      
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.empresa}</td>
          <td>${d.material}</td>
          <td>${dataFormatada}</td>
          <td>${d.quantidade}</td>
          <td><span class="badge ${statusClass}" onclick="app.alterarStatus(${d.id})">${d.status}</span></td>
          <td>
            <div class="action-btns">
              <button class="edit-btn" onclick="app.abrirModalEditar(${d.id})">✏️ Editar</button>
              <button class="delete-btn" onclick="app.deletarRegistro(${d.id})">🗑️ Deletar</button>
            </div>
          </td>
        </tr>
      `;
    });
  },

  atualizarUI() {
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);
    const empresas = new Set(this.dados.map(d => d.empresa)).size;
    const materiais = new Set(this.dados.map(d => d.material)).size;
    const concluidos = this.dados.filter(d => d.status === "Concluído").length;

    document.getElementById('kpiTotal').textContent = total;
    document.getElementById('kpiEmpresas').textContent = empresas;
    document.getElementById('kpiMateriais').textContent = materiais;
    document.getElementById('kpiConcluidos').textContent = concluidos;

    this.renderizarTabela();
    this.atualizarFiltros();
    this.atualizarGraficos();
  },

  atualizarFiltros() {
    const empresas = [...new Set(this.dados.map(d => d.empresa))].sort();
    const materiais = [...new Set(this.dados.map(d => d.material))].sort();

    const filterEmpresa = document.getElementById('filterEmpresa');
    const filterMaterial = document.getElementById('filterMaterial');

    filterEmpresa.innerHTML = '<option value="">Todas as empresas</option>';
    filterMaterial.innerHTML = '<option value="">Todos os materiais</option>';

    empresas.forEach(e => {
      filterEmpresa.innerHTML += `<option value="${e}">${e}</option>`;
    });

    materiais.forEach(m => {
      filterMaterial.innerHTML += `<option value="${m}">${m}</option>`;
    });
  },

  atualizarGraficos() {
    if (!document.getElementById('chartData')) return;

    const porEmpresa  = this.agrupar('empresa');
    const porMaterial = this.agrupar('material');
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);

    Object.values(this.charts).forEach(c => c?.destroy?.());
    this.charts = {};

    const porData = this.dados.reduce((acc, d) => {
      const key = `${d.data} – ${d.empresa}`;
      acc[key] = (acc[key] || 0) + d.quantidade;
      return acc;
    }, {});

    this.charts.data = new Chart(document.getElementById('chartData'), {
      type: 'bar',
      data: { labels: Object.keys(porData),
        datasets: [{ label: 'Quantidade', data: Object.values(porData), backgroundColor: this.CORES, borderRadius: 8, borderSkipped: false }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { font: { size: 10 }, maxRotation: 30 }, grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#e8edf5' } }
        }
      }
    });

    const statusCounts = {
      'Em Aberto': this.dados.filter(d => d.status === 'Em Aberto').length,
      'Parcial': this.dados.filter(d => d.status === 'Parcial').length,
      'Concluído': this.dados.filter(d => d.status === 'Concluído').length
    };

    this.charts.status = new Chart(document.getElementById('chartStatus'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#E84545', '#F5A623', '#27AE60'],
          borderRadius: 8
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    this.charts.empresaBar = new Chart(document.getElementById('chartEmpresaBar'), {
      type: 'bar',
      data: { labels: Object.keys(porEmpresa),
        datasets: [{ label: 'Total de Itens', data: Object.values(porEmpresa), backgroundColor: this.CORES, borderRadius: 10, borderSkipped: false }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, grid: { color: '#e8edf5' } }, y: { grid: { display: false } } }
      }
    });

    this.charts.materialBar = new Chart(document.getElementById('chartMaterialBar'), {
      type: 'bar',
      data: { labels: Object.keys(porMaterial),
        datasets: [{ label: 'Total de Itens', data: Object.values(porMaterial), backgroundColor: this.CORES, borderRadius: 10, borderSkipped: false }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, grid: { color: '#e8edf5' } }, y: { grid: { display: false } } }
      }
    });

    const peDiv = document.getElementById('progressEmpresas');
    peDiv.innerHTML = '';
    Object.entries(porEmpresa).sort((a,b) => b[1]-a[1]).forEach(([emp, qtd], i) => {
      const pct = (qtd/total*100).toFixed(1);
      peDiv.innerHTML += `
        <div class="progress-item">
          <label><span>${emp}</span><span>${qtd} itens (${pct}%)</span></label>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background: linear-gradient(90deg, ${this.CORES[i]}, ${this.CORES[(i+1)%this.CORES.length]})"></div>
          </div>
        </div>`;
    });

    const pmDiv = document.getElementById('progressMateriais');
    pmDiv.innerHTML = '';
    Object.entries(porMaterial).sort((a,b) => b[1]-a[1]).forEach(([mat, qtd], i) => {
      const pct = (qtd/total*100).toFixed(1);
      pmDiv.innerHTML += `
        <div class="progress-item">
          <label><span>${mat}</span><span>${qtd} itens (${pct}%)</span></label>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background: linear-gradient(90deg, ${this.CORES[i]}, ${this.CORES[(i+1)%this.CORES.length]})"></div>
          </div>
        </div>`;
    });
  },

  gerarRelatorioPDF() {
    const porEmpresa  = this.agrupar('empresa');
    const porMaterial = this.agrupar('material');
    const total = this.dados.reduce((s, d) => s + d.quantidade, 0);
    const abertos = this.dados.filter(d => d.status === "Em Aberto").length;
    const parciais = this.dados.filter(d => d.status === "Parcial").length;
    const concluidos = this.dados.filter(d => d.status === "Concluído").length;

    let html = `
      <div class="pdf-header">
        <img src="./logo.png" alt="Plano & Plano" />
        <div class="pdf-header-text">
          <h2>Relatório de Materiais em Empréstimo</h2>
          <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>

      <div class="pdf-stats">
        <div class="pdf-stat-box"><span class="value">${total}</span><span class="label">Total de Itens</span></div>
        <div class="pdf-stat-box"><span class="value">${abertos}</span><span class="label">Em Aberto</span></div>
        <div class="pdf-stat-box"><span class="value">${parciais}</span><span class="label">Parcial</span></div>
        <div class="pdf-stat-box"><span class="value">${concluidos}</span><span class="label">Concluído</span></div>
      </div>

      <div class="pdf-section">
        <h3>Principais Empresas Credoras</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Empresa</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Quantidade</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Percentual</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(porEmpresa).sort((a,b) => b[1]-a[1]).map(([emp, qtd]) => `
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #ddd;">${emp}</td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;"><strong>${qtd}</strong></td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">${(qtd/total*100).toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pdf-section">
        <h3>Materiais em Circulação</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Material</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Quantidade</th>
              <th style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">Percentual</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(porMaterial).sort((a,b) => b[1]-a[1]).map(([mat, qtd]) => `
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #ddd;">${mat}</td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;"><strong>${qtd}</strong></td>
                <td style="padding: 0.75rem; text-align: center; border: 1px solid #ddd;">${(qtd/total*100).toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pdf-section">
        <h3>Todos os Registros</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #1F3864; color: #fff;">
              <th style="padding: 0.6rem; text-align: left; border: 1px solid #ddd;">Empresa</th>
              <th style="padding: 0.6rem; text-align: left; border: 1px solid #ddd;">Material</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Data</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Qtd</th>
              <th style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.dados.map(d => {
              const dataFormatada = new Date(d.data + 'T00:00:00').toLocaleDateString('pt-BR');
              return `
              <tr>
                <td style="padding: 0.6rem; border: 1px solid #ddd;">${d.empresa}</td>
                <td style="padding: 0.6rem; border: 1px solid #ddd;">${d.material}</td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">${dataFormatada}</td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;"><strong>${d.quantidade}</strong></td>
                <td style="padding: 0.6rem; text-align: center; border: 1px solid #ddd;">${d.status}</td>
              </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('pdf-container').innerHTML = html;
  },

  exportarPDF() {
    const elemento = document.getElementById('pdf-container');
    const opt = {
      margin: 10,
      filename: `relatorio_materiais_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(elemento).save();
    this.mostrarAlerta('PDF gerado com sucesso!', 'success');
  },

  exportarCSV() {
    let csv = 'ID,Empresa,Material,Data do Empréstimo,Quantidade,Status\n';
    this.dados.forEach(d => {
      csv += `${d.id},"${d.empresa}","${d.material}","${d.data}",${d.quantidade},"${d.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `controle_emprestimos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    this.mostrarAlerta('Arquivo CSV exportado com sucesso!', 'success');
  },

  resetarDados() {
    if (confirm('Tem certeza que deseja resetar TODOS os dados para o padrão inicial? Esta ação não pode ser desfeita!')) {
      try { localStorage.removeItem(this.STORAGE_KEY); } catch(e) {}
      this.dados = [
        { id:1, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:2, empresa:"Felipe Agosti", material:"Chapa de Madeirite OSB", data:"2026-01-28", quantidade:20,  status:"Em Aberto" },
        { id:3, empresa:"Felipe Agosti", material:"Pontalete",              data:"2026-02-12", quantidade:150, status:"Em Aberto" },
        { id:4, empresa:"Felipe Agosti", material:"Tábua 30cm",             data:"2026-02-12", quantidade:50,  status:"Em Aberto" },
        { id:5, empresa:"Murilo",        material:"Pontalete",              data:"2026-02-04", quantidade:220, status:"Em Aberto" },
        { id:6, empresa:"Spera Urban",   material:"Pontalete",              data:"2025-02-03", quantidade:100, status:"Em Aberto" },
        { id:7, empresa:"Plano Purus",   material:"Tábua de 30cm",          data:"2026-02-06", quantidade:100, status:"Em Aberto" },
      ];
      this.salvarDados();
      this.atualizarUI();
      this.mostrarAlerta('Dados resetados para o padrão inicial!', 'success');
    }
  }
};

// ── Aplicação de Controle de Materiais da Obra ──
const appMateriais = {
  STORAGE_KEY: 'controle_materiais_obra_dados',
  STORAGE_KEY_MOV: 'controle_materiais_movimentacoes',
  materiais: [],
  movimentacoes: [],
  editandoId: null,
  _unsub: null,
  _unsubMov: null,

  init() {
    console.log('Inicializando aplicação de materiais da obra...');
    Promise.all([this.carregarMateriais(), this.carregarMovimentacoes()]).then(() => {
      this.setupEventListeners();
      this.buscarMateriais();
      this.preencherMateriaisRastreabilidade();
      this.preencherDataRastreabilidade();
      this.renderizarRelatorioDia();
      this.aplicarPermissoesVisuais();
      this.iniciarSyncAoVivo();
    });
  },

  iniciarSyncAoVivo() {
    try {
      if (window.__fb && window.__fb.escutarMudancasMateriais) {
        if (this._unsub) this._unsub();
        this._unsub = window.__fb.escutarMudancasMateriais((materiais) => {
          this.materiais = Array.isArray(materiais) ? materiais : [];
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais)); } catch(e) {}
          this.buscarMateriais();
          this.preencherMateriaisRastreabilidade();
          this.renderizarRelatorioDia();
        });
      }
      if (window.__fb && window.__fb.escutarMudancasMovimentacoes) {
        if (this._unsubMov) this._unsubMov();
        this._unsubMov = window.__fb.escutarMudancasMovimentacoes((movimentacoes) => {
          this.movimentacoes = Array.isArray(movimentacoes) ? movimentacoes : [];
          try { localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes)); } catch(e) {}
          this.renderizarRelatorioDia();
          this.renderizarMovimentacoes();
          this.renderizarRastreabilidadeCompleta();
        });
      }
    } catch (e) {
      console.warn('Sync ao vivo de materiais indisponível:', e);
    }
  },

  setupEventListeners() {
    const modal = document.getElementById('modalMateriais');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modalMateriais') this.fecharModal();
    });
    const modalRetirada = document.getElementById('modalRetirada');
    if (modalRetirada) {
      modalRetirada.addEventListener('click', (e) => {
        if (e.target.id === 'modalRetirada') this.fecharModalRetirada();
      });
    }

    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.addEventListener('change', (e) => this.previewImagem(e));
    if (fotoInputCamera) fotoInputCamera.addEventListener('change', (e) => this.previewImagem(e));
  },

  async carregarMateriais() {
    try {
      if (window.__fb && window.__fb.carregarMateriaisDaNuvem) {
        const cloud = await window.__fb.carregarMateriaisDaNuvem();
        if (Array.isArray(cloud) && cloud.length) {
          this.materiais = cloud;
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais)); } catch(e) {}
          console.log('Materiais carregados do Firebase:', this.materiais.length);
          return;
        }
      }
      const salvos = localStorage.getItem(this.STORAGE_KEY);
      if (salvos) {
        this.materiais = JSON.parse(salvos);
        console.log('Materiais carregados do localStorage:', this.materiais.length);
      } else {
        this.materiais = [];
      }
    } catch (e) {
      console.error('Erro ao carregar materiais:', e);
      this.materiais = [];
    }
  },


  async carregarMovimentacoes() {
    try {
      if (window.__fb && window.__fb.carregarMovimentacoesDaNuvem) {
        const cloud = await window.__fb.carregarMovimentacoesDaNuvem();
        if (Array.isArray(cloud)) {
          this.movimentacoes = cloud;
          try { localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes)); } catch(e) {}
          return;
        }
      }
      const salvos = localStorage.getItem(this.STORAGE_KEY_MOV);
      this.movimentacoes = salvos ? JSON.parse(salvos) : [];
    } catch (e) {
      console.error('Erro ao carregar movimentações:', e);
      this.movimentacoes = [];
    }
  },

  async salvarMovimentacoes() {
    try {
      localStorage.setItem(this.STORAGE_KEY_MOV, JSON.stringify(this.movimentacoes));
      if (window.__fb && window.__fb.salvarMovimentacoesNaNuvem) {
        await window.__fb.salvarMovimentacoesNaNuvem(this.movimentacoes);
      }
    } catch (e) {
      console.error('Erro ao salvar movimentações:', e);
      app.mostrarAlerta('Erro ao salvar rastreabilidade!', 'error');
    }
  },


  normalizeMaterialName(nome) {
    return String(nome || '').trim().toLowerCase();
  },

  async registrarEntradaPorRT(item, origem = 'rt_planejamento') {
    if (!item || !String(item.material || '').trim()) return false;
    const nome = String(item.material || '').trim();
    const quantidade = Number(item.quantidade || 0);
    if (!quantidade || quantidade < 1) return false;
    const nomeNormalizado = this.normalizeMaterialName(nome);
    let material = this.materiais.find(m => this.normalizeMaterialName(m.nome) === nomeNormalizado);
    const agora = new Date().toISOString();
    if (!material) {
      const novoId = Math.max(...this.materiais.map(m => Number(m.id) || 0), 0) + 1;
      material = {
        id: novoId,
        nome,
        quantidade: 0,
        especificacoes: `Entrada automática via RT • ${item.torre || '-'} • ${item.pavimento || '-'}`,
        foto: null,
        dataCriacao: agora,
        dataAtualizacao: agora
      };
      this.materiais.push(material);
    }
    material.quantidade = Number(material.quantidade || 0) + quantidade;
    material.dataAtualizacao = agora;
    const novaMov = {
      id: Date.now() + Math.floor(Math.random()*1000),
      materialId: material.id,
      materialNome: material.nome,
      quantidade,
      responsavel: item.torre && item.pavimento ? `${item.torre} / ${item.pavimento}` : 'RT entregue',
      funcao: item.servico || 'Entrega de RT',
      setor: 'Entrada em estoque',
      motivo: `Entrada automática via RT entregue`,
      observacoes: `Origem: ${origem} • Status: ${item.status || 'Entregue'}`,
      dataHora: agora,
      lancadoPor: window.currentUser?.username || 'sistema',
      origem: 'entrada_rt'
    };
    this.movimentacoes.unshift(novaMov);
    await this.salvarMateriais();
    await this.salvarMovimentacoes();
    this.buscarMateriais();
    this.preencherMateriaisRastreabilidade();
    this.renderizarRelatorioDia();
    this.renderizarMovimentacoes();
    this.renderizarRastreabilidadeCompleta();
    return true;
  },

  aplicarPermissoesVisuais() {
    const role = window.currentUser?.role || 'admin';
    const materiaisSection = document.getElementById('materiais-obra');
    if (!materiaisSection) return;
    const btnNovo = materiaisSection.querySelector('.btn.btn-primary');
    const btnRelDia = materiaisSection.querySelector('.btn.btn-success');
    const btnRelCompleto = materiaisSection.querySelector('.btn.btn-warning');
    if (btnNovo) btnNovo.style.display = auth.pode('editar_materiais') ? 'inline-flex' : 'none';
    if (btnRelDia) btnRelDia.style.display = auth.pode('ver_relatorio_dia') ? 'inline-flex' : 'none';
    if (btnRelCompleto) btnRelCompleto.style.display = auth.pode('ver_relatorio_completo') ? 'inline-flex' : 'none';
    const search = document.getElementById('searchMateriais');
    const filterData = document.getElementById('filterDataMateriais');
    if (search) search.disabled = false;
    if (filterData) filterData.disabled = false;
  },

  async salvarMateriais() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.materiais));
      if (window.__fb && window.__fb.salvarMateriaisNaNuvem) {
        await window.__fb.salvarMateriaisNaNuvem(this.materiais);
      }
      console.log('Materiais salvos com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar materiais:', e);
      app.mostrarAlerta('Erro ao salvar materiais!', 'error');
    }
  },

  async comprimirImagem(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const maxWidth = 900;
            const maxHeight = 900;
            let { width, height } = img;

            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.72;
            let output = canvas.toDataURL('image/jpeg', quality);
            while (output.length > 350000 && quality > 0.45) {
              quality -= 0.07;
              output = canvas.toDataURL('image/jpeg', quality);
            }
            resolve(output);
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  },

  previewImagem(e) {
    const file = e.target.files && e.target.files[0];
    const preview = document.getElementById('imagemPreview');
    const previewImg = document.getElementById('imagemPreviewImg');

    if (!file) {
      previewImg.src = '';
      preview.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      previewImg.src = event.target.result;
      preview.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  },

  abrirModalNovo() {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode cadastrar materiais.', 'error');
      return;
    }
    this.editandoId = null;
    document.getElementById('modalMateriaisTitle').textContent = 'Novo Material';
    document.getElementById('formMateriais').reset();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.value = '';
    if (fotoInputCamera) fotoInputCamera.value = '';
    document.getElementById('imagemPreviewImg').src = '';
    document.getElementById('imagemPreview').style.display = 'none';
    document.getElementById('modalMateriais').classList.add('active');
    atualizarBotaoMobile();
  },

  abrirModalEditar(id) {
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode editar materiais.', 'error');
      return;
    }
    const mat = this.materiais.find(m => m.id === id);
    if (!mat) return;
    
    this.editandoId = id;
    document.getElementById('modalMateriaisTitle').textContent = 'Editar Material';
    document.getElementById('nomeMaterial').value = mat.nome;
    document.getElementById('quantidadeMaterial').value = mat.quantidade;
    document.getElementById('especificacoes').value = mat.especificacoes || '';
    
    if (mat.foto) {
      const previewImg = document.getElementById('imagemPreviewImg');
      previewImg.src = mat.foto;
      document.getElementById('imagemPreview').style.display = 'flex';
    }
    
    document.getElementById('modalMateriais').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModal() {
    document.getElementById('modalMateriais').classList.remove('active');
    atualizarBotaoMobile();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');
    if (fotoInput) fotoInput.value = '';
    if (fotoInputCamera) fotoInputCamera.value = '';
    this.editandoId = null;
  },

  async salvarMaterial(e) {
    e.preventDefault();
    if (!auth.pode('editar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode salvar materiais.', 'error');
      return;
    }
    const nome = document.getElementById('nomeMaterial').value.trim();
    const quantidade = parseInt(document.getElementById('quantidadeMaterial').value);
    const especificacoes = document.getElementById('especificacoes').value.trim();
    const fotoInput = document.getElementById('fotoMaterial');
    const fotoInputCamera = document.getElementById('fotoMaterialCamera');

    if (!nome || !quantidade) {
      app.mostrarAlerta('Preencha os campos obrigatórios!', 'error');
      return;
    }

    const arquivoSelecionado =
      (fotoInput && fotoInput.files && fotoInput.files[0]) ||
      (fotoInputCamera && fotoInputCamera.files && fotoInputCamera.files[0]);

    let foto = null;
    if (arquivoSelecionado) {
      try {
        foto = await this.comprimirImagem(arquivoSelecionado);
        this.finalizarSalvamento(nome, quantidade, especificacoes, foto);
      } catch (error) {
        console.error('Erro ao comprimir imagem:', error);
        app.mostrarAlerta('Não foi possível processar a imagem.', 'error');
      }
    } else if (this.editandoId) {
      const mat = this.materiais.find(m => m.id === this.editandoId);
      foto = mat?.foto || null;
      this.finalizarSalvamento(nome, quantidade, especificacoes, foto);
    } else {
      this.finalizarSalvamento(nome, quantidade, especificacoes, null);
    }
  },

  finalizarSalvamento(nome, quantidade, especificacoes, foto) {
    if (this.editandoId) {
      const idx = this.materiais.findIndex(m => m.id === this.editandoId);
      if (idx !== -1) {
        this.materiais[idx] = {
          ...this.materiais[idx],
          nome,
          quantidade,
          especificacoes,
          foto: foto || this.materiais[idx].foto,
          dataAtualizacao: new Date().toISOString()
        };
      }
    } else {
      const novoId = Math.max(...this.materiais.map(m => m.id || 0), 0) + 1;
      this.materiais.push({
        id: novoId,
        nome,
        quantidade,
        especificacoes,
        foto,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      });
    }

    this.fecharModal();
    this.salvarMateriais().then(() => {
      this.buscarMateriais();
      app.mostrarAlerta('Material salvo com sucesso!', 'success');
    });
  },

  deletarMaterial(id) {
    if (!auth.pode('deletar_materiais')) {
      app.mostrarAlerta('Seu perfil não pode deletar materiais.', 'error');
      return;
    }
    if (confirm('Tem certeza que deseja deletar este material?')) {
      this.materiais = this.materiais.filter(m => m.id !== id);
      this.salvarMateriais().then(() => {
        this.buscarMateriais();
        app.mostrarAlerta('Material deletado com sucesso!', 'success');
      });
    }
  },

  filtrarMateriais() {
    const search = document.getElementById('searchMateriais').value.toLowerCase();
    const data = document.getElementById('filterDataMateriais').value;

    const filtrados = this.materiais.filter(m => {
      const matchSearch = m.nome.toLowerCase().includes(search);
      const matchData = !data || m.dataAtualizacao.split('T')[0] === data;
      return matchSearch && matchData;
    });

    this.renderizarMateriais(filtrados);
  },

  buscarMateriais() {
    this.renderizarMateriais(this.materiais);
  },

  renderizarMateriais(materiais = this.materiais) {
    const container = document.getElementById('materiaisContainer');
    
    if (materiais.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">Nenhum material cadastrado.</p>';
      return;
    }

    const podeEditar = auth.pode('editar_materiais');
    const podeRetirar = auth.pode('registrar_retirada');

    container.innerHTML = materiais.map(m => {
      const dataFormatada = new Date(m.dataAtualizacao).toLocaleDateString('pt-BR');
      const horaFormatada = new Date(m.dataAtualizacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const ultimaMov = this.movimentacoes.filter(x => x.materialId === m.id).sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora))[0];
      
      return `
        <div class="material-card">
          <div class="material-card-image">
            ${m.foto ? `<img src="${m.foto}" alt="${m.nome}" />` : '📦'}
          </div>
          <div class="material-card-content">
            <h3>${m.nome}</h3>
            ${m.especificacoes ? `<p>${m.especificacoes}</p>` : ''}
            <div class="material-qty">
              <div>
                <div class="material-qty-value">${m.quantidade}</div>
                <div class="material-qty-label">Saldo em estoque</div>
              </div>
            </div>
            <div class="material-date">📅 ${dataFormatada} às ${horaFormatada}</div>
            ${ultimaMov ? `<div class="material-date">🧾 Última retirada: ${ultimaMov.responsavel} - ${ultimaMov.quantidade} un.</div>` : ''}
            <div class="material-actions">
              ${podeRetirar ? `<button class="btn btn-warning" onclick="appMateriais.abrirModalRetirada(${m.id})">📤 Registrar Retirada</button>` : ''}
              ${podeEditar ? `<button class="edit-btn" onclick="appMateriais.abrirModalEditar(${m.id})">✏️ Editar</button>` : ''}
              ${podeEditar ? `<button class="delete-btn" onclick="appMateriais.deletarMaterial(${m.id})">🗑️ Deletar</button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.renderizarMovimentacoes();
  },

  abrirModalRetirada(id) {
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode registrar retiradas.', 'error');
      return;
    }
    const mat = this.materiais.find(m => m.id === id);
    if (!mat) return;
    document.getElementById('retiradaMaterialId').value = mat.id;
    document.getElementById('retiradaMaterialNome').value = `${mat.nome} (saldo: ${mat.quantidade})`;
    document.getElementById('formRetirada').reset();
    document.getElementById('retiradaMaterialId').value = mat.id;
    document.getElementById('retiradaMaterialNome').value = `${mat.nome} (saldo: ${mat.quantidade})`;
    document.getElementById('modalRetirada').classList.add('active');
    atualizarBotaoMobile();
  },

  fecharModalRetirada() {
    document.getElementById('modalRetirada').classList.remove('active');
    atualizarBotaoMobile();
    document.getElementById('formRetirada').reset();
  },

  async salvarRetirada(e) {
    e.preventDefault();
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode registrar retiradas.', 'error');
      return;
    }
    const materialId = Number(document.getElementById('retiradaMaterialId').value);
    const quantidade = Number(document.getElementById('retiradaQuantidade').value);
    const responsavel = document.getElementById('retiradaResponsavel').value.trim();
    const funcao = document.getElementById('retiradaFuncao').value.trim();
    const setor = document.getElementById('retiradaSetor').value.trim();
    const motivo = document.getElementById('retiradaMotivo').value.trim();
    const observacoes = document.getElementById('retiradaObservacoes').value.trim();
    const material = this.materiais.find(m => m.id === materialId);
    if (!material) {
      app.mostrarAlerta('Material não encontrado.', 'error');
      return;
    }
    if (!quantidade || quantidade < 1 || quantidade > Number(material.quantidade || 0)) {
      app.mostrarAlerta('Quantidade inválida para retirada.', 'error');
      return;
    }
    if (!responsavel || !motivo) {
      app.mostrarAlerta('Informe quem retirou e o motivo.', 'error');
      return;
    }

    material.quantidade = Number(material.quantidade || 0) - quantidade;
    material.dataAtualizacao = new Date().toISOString();

    const novaMov = {
      id: Date.now(),
      materialId: material.id,
      materialNome: material.nome,
      quantidade,
      responsavel,
      funcao,
      setor,
      motivo,
      observacoes,
      dataHora: new Date().toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema'
    };

    this.movimentacoes.unshift(novaMov);
    await this.salvarMateriais();
    await this.salvarMovimentacoes();
    this.fecharModalRetirada();
    this.buscarMateriais();
    this.renderizarRelatorioDia();
    app.mostrarAlerta('Retirada registrada com sucesso!', 'success');
  },

  renderizarMovimentacoes() {
    const section = document.getElementById('materiais-obra');
    if (!section) return;
    let box = document.getElementById('movimentacoesContainer');
    if (!box) {
      box = document.createElement('div');
      box.id = 'movimentacoesContainer';
      box.className = 'card';
      section.appendChild(box);
    }
    if (!auth.pode('ver_rastreabilidade')) {
      box.style.display = 'none';
      return;
    }
    box.style.display = 'block';
    const itens = this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora)).slice(0, 20);
    box.innerHTML = `<h2>🧾 Últimas Retiradas</h2>
      <div class="btn-group" style="margin-bottom:1rem;">
        ${auth.pode('ver_relatorio_completo') ? `<button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">📊 Relatório Completo</button>` : ''}
        <button class="btn btn-secondary" onclick="app.showSection('rastreabilidade', document.querySelector('nav button[data-section=&quot;rastreabilidade&quot;]'))">📋 Ver Rastreabilidade Completa</button>
      </div>
      ${itens.length ? `<div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função/Setor</th><th>Motivo</th><th>Lançado por</th><th>Ações</th></tr></thead><tbody>${itens.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td>${m.quantidade}</td><td>${m.responsavel}</td><td>${[m.funcao,m.setor].filter(Boolean).join(' / ') || '-'}</td><td>${m.motivo}${m.observacoes ? `<br><small>${m.observacoes}</small>` : ''}</td><td>${m.lancadoPor}</td><td>${auth.pode('excluir_rastreabilidade') ? `<button class="btn btn-danger" onclick="appMateriais.excluirMovimentacao(${m.id})">Excluir</button>` : `<span style="color:#6b7a99;">Somente admin</span>`}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma retirada registrada ainda.</p>`}`;
  },

  obterMovimentacoesFiltradas() {
    const data = document.getElementById('rastFiltroData')?.value || '';
    const material = (document.getElementById('rastFiltroMaterial')?.value || '').toLowerCase().trim();
    const pessoa = (document.getElementById('rastFiltroPessoa')?.value || '').toLowerCase().trim();
    const setor = (document.getElementById('rastFiltroSetor')?.value || '').toLowerCase().trim();
    return this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora)).filter(m => {
      const dataOk = !data || (m.dataHora || '').split('T')[0] === data;
      const materialOk = !material || (m.materialNome || '').toLowerCase().includes(material);
      const pessoaOk = !pessoa || (m.responsavel || '').toLowerCase().includes(pessoa) || (m.lancadoPor || '').toLowerCase().includes(pessoa);
      const setorTexto = [m.setor, m.funcao].filter(Boolean).join(' ').toLowerCase();
      const setorOk = !setor || setorTexto.includes(setor);
      return dataOk && materialOk && pessoaOk && setorOk;
    });
  },

  preencherDataRastreabilidade() {
    const input = document.getElementById('rastDataHora');
    if (!input) return;
    const agora = new Date();
    const local = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000).toISOString().slice(0,16);
    input.value = local;
  },

  preencherMateriaisRastreabilidade() {
    const list = document.getElementById('rastMateriaisList');
    if (!list) return;
    list.innerHTML = this.materiais
      .slice()
      .sort((a,b) => String(a.nome || '').localeCompare(String(b.nome || ''), 'pt-BR', { sensitivity: 'base' }))
      .map(m => `<option value="${String(m.nome || '').replace(/"/g, '&quot;')}"></option>`)
      .join('');
  },

  async salvarRastreabilidadeManual(e) {
    e.preventDefault();
    if (!auth.pode('registrar_retirada')) {
      app.mostrarAlerta('Seu perfil não pode lançar rastreabilidade.', 'error');
      return;
    }

    const materialNome = document.getElementById('rastMaterialNome').value.trim();
    const quantidade = Number(document.getElementById('rastQuantidade').value);
    const responsavel = document.getElementById('rastResponsavel').value.trim();
    const dataHoraRaw = document.getElementById('rastDataHora').value;
    const funcao = document.getElementById('rastFuncao').value.trim();
    const setor = document.getElementById('rastSetor').value.trim();
    const motivo = document.getElementById('rastMotivo').value.trim();
    const observacoes = document.getElementById('rastObservacoes').value.trim();

    if (!materialNome || !quantidade || quantidade < 1 || !responsavel || !dataHoraRaw || !motivo) {
      app.mostrarAlerta('Preencha os campos obrigatórios da rastreabilidade.', 'error');
      return;
    }

    const materialEncontrado = this.materiais.find(m => String(m.nome || '').toLowerCase() === materialNome.toLowerCase());
    const novaMov = {
      id: Date.now(),
      materialId: materialEncontrado ? materialEncontrado.id : null,
      materialNome,
      quantidade,
      responsavel,
      funcao,
      setor,
      motivo,
      observacoes,
      dataHora: new Date(dataHoraRaw).toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema',
      origem: 'rastreabilidade_manual'
    };

    this.movimentacoes.unshift(novaMov);
    await this.salvarMovimentacoes();
    const form = document.getElementById('formRastreabilidade');
    if (form) form.reset();
    this.preencherDataRastreabilidade();
    this.renderizarMovimentacoes();
    this.renderizarRastreabilidadeCompleta();
    this.renderizarRelatorioDia();
    app.mostrarAlerta('Rastreabilidade lançada com sucesso!', 'success');
  },

  renderizarRastreabilidadeCompleta() {
    const container = document.getElementById('rastreabilidadeCompletaContainer');
    if (!container) return;
    const formRast = document.getElementById('formRastreabilidade');
    if (formRast) formRast.closest('.card').style.display = auth.pode('registrar_retirada') ? '' : 'none';
    if (!auth.pode('ver_rastreabilidade')) {
      container.innerHTML = '<p style="color:#6b7a99;">Seu perfil não tem acesso à rastreabilidade.</p>';
      return;
    }
    const itens = this.obterMovimentacoesFiltradas();
    container.innerHTML = `
      <div class="btn-group" style="margin-bottom:1rem;">
        <span class="btn btn-primary" style="cursor:default;">🧾 ${itens.length} registros</span>
        ${auth.pode('ver_relatorio_completo') ? `<button class="btn btn-warning" onclick="appMateriais.gerarRelatorioCompleto()">📊 Relatório Completo</button>` : ''}
      </div>
      ${itens.length ? `<div class="table-wrap"><table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função</th><th>Setor</th><th>Motivo</th><th>Observações</th><th>Lançado por</th><th>Ações</th></tr></thead><tbody>${itens.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td>${m.quantidade}</td><td>${m.responsavel}</td><td>${m.funcao || '-'}</td><td>${m.setor || '-'}</td><td>${m.motivo || '-'}</td><td>${m.observacoes || '-'}</td><td>${m.lancadoPor || '-'}</td><td>${auth.pode('excluir_rastreabilidade') ? `<button class="btn btn-danger" onclick="appMateriais.excluirMovimentacao(${m.id})">Excluir</button>` : `<span style="color:#6b7a99;">Somente admin</span>`}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhuma movimentação encontrada com os filtros informados.</p>`}`;
  },

  async excluirMovimentacao(id) {
    if (!auth.pode('excluir_rastreabilidade')) {
      app.mostrarAlerta('Somente o administrador pode excluir rastreabilidade.', 'error');
      return;
    }
    if (!confirm('Deseja realmente excluir este registro de rastreabilidade?')) return;
    this.movimentacoes = this.movimentacoes.filter(m => m.id !== id);
    await this.salvarMovimentacoes();
    this.renderizarMovimentacoes();
    this.renderizarRastreabilidadeCompleta();
    this.renderizarRelatorioDia();
    this.buscarMateriais();
    app.mostrarAlerta('Rastreabilidade excluída com sucesso!', 'success');
  },

  renderizarRelatorioDia() {
    const painel = document.getElementById('painelRelatorioDia');
    if (!painel) return;
    const hoje = new Date().toISOString().split('T')[0];
    const materiaisDia = this.materiais.filter(m => (m.dataAtualizacao || '').split('T')[0] === hoje);
    const totalItens = materiaisDia.reduce((s, m) => s + Number(m.quantidade || 0), 0);
    painel.innerHTML = `
      <div class="btn-group" style="margin-bottom:1rem;">
        <span class="btn btn-primary" style="cursor:default;">📅 ${new Date().toLocaleDateString('pt-BR')}</span>
        <span class="btn btn-secondary" style="cursor:default;">📦 ${materiaisDia.length} materiais atualizados</span>
        <span class="btn btn-success" style="cursor:default;">🔢 saldo total ${totalItens}</span>
      </div>
      ${materiaisDia.length ? `<div class="table-wrap"><table><thead><tr><th>Material</th><th>Quantidade</th><th>Especificações</th><th>Atualização</th></tr></thead><tbody>${materiaisDia.map(m => `<tr><td>${m.nome}</td><td>${m.quantidade}</td><td>${m.especificacoes || '-'}</td><td>${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</td></tr>`).join('')}</tbody></table></div>` : `<p style="color:#6b7a99;">Nenhum material atualizado hoje.</p>`}
    `;
  },

  abrirJanelaRelatorio({ titulo, subtitulo, materiais, movimentacoes }) {
    const totalItens = materiais.reduce((s, m) => s + Number(m.quantidade || 0), 0);
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titulo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; margin: 0; color: #1a2340; background: #fff; }
    .page { max-width: 1100px; margin: 0 auto; padding: 24px; }
    .header { display:flex; align-items:center; gap:16px; border-bottom:3px solid #1F3864; padding-bottom:16px; margin-bottom:24px; }
    .header img { height:60px; width:auto; display:block; }
    .header h1 { margin:0; color:#1F3864; font-size:28px; }
    .muted { color:#6b7a99; margin-top:6px; }
    .stats { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:16px; margin: 20px 0 28px; }
    .stat { background:#DDEEFF; border-left:4px solid #2E75B6; border-radius:10px; padding:16px; }
    .stat .value { font-size:30px; font-weight:700; color:#1F3864; }
    .section-title { color:#1F3864; font-size:20px; margin: 0 0 12px 0; }
    table { width:100%; border-collapse:collapse; margin-bottom:28px; }
    thead tr { background:#1F3864; color:#fff; }
    th, td { border:1px solid #d9e3f0; padding:12px; text-align:left; vertical-align:top; }
    th.center, td.center { text-align:center; }
    .cards { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:16px; }
    .card { border:1px solid #d9e3f0; border-radius:12px; overflow:hidden; background:#fff; }
    .card-media { height:180px; background:#f5f7fb; display:flex; align-items:center; justify-content:center; }
    .card-media img { max-width:100%; max-height:100%; object-fit:cover; display:block; }
    .card-body { padding:14px; }
    .card-title { font-weight:700; color:#1F3864; margin-bottom:6px; font-size:18px; }
    .qty { color:#2E75B6; font-weight:700; margin-bottom:6px; }
    .footer { text-align:center; color:#6b7a99; border-top:1px solid #d9e3f0; padding-top:14px; margin-top:28px; font-size:13px; }
    .actions { margin: 0 0 20px 0; }
    .btn { background:#1F3864; color:#fff; border:none; border-radius:8px; padding:10px 16px; cursor:pointer; font-weight:700; }
    @media print { .actions { display:none; } .page { max-width:none; padding:0; } body { margin: 0; } }
    @media (max-width: 800px) { .stats, .cards { grid-template-columns: 1fr; } .header { flex-direction:column; align-items:flex-start; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="actions">
      <button class="btn" onclick="window.print()">🖨️ Imprimir Relatório</button>
    </div>

    <div class="header">
      <img src="./logo.png" alt="Plano & Plano" />
      <div>
        <h1>${titulo}</h1>
        <div class="muted">${subtitulo}</div>
        <div class="muted">Gerado em ${dataFormatada} às ${horaFormatada}</div>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><div class="value">${materiais.length}</div><div>${materiais.length ? 'Materiais listados' : 'Materiais no relatório'}</div></div>
      <div class="stat"><div class="value">${materiais.length ? totalItens : movimentacoes.reduce((s, m) => s + Number(m.quantidade || 0), 0)}</div><div>${materiais.length ? 'Saldo total' : 'Total retirado'}</div></div>
      <div class="stat"><div class="value">${movimentacoes.length}</div><div>Registros de rastreabilidade</div></div>
    </div>

    ${materiais.length ? `
    <h2 class="section-title">Lista de Materiais</h2>
    <table><thead><tr><th>Material</th><th class="center">Quantidade</th><th>Especificações</th><th class="center">Última atualização</th></tr></thead><tbody>${materiais.map(m => `<tr><td><strong>${m.nome}</strong></td><td class="center">${m.quantidade}</td><td>${m.especificacoes || '-'}</td><td class="center">${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</td></tr>`).join('')}</tbody></table>

    <h2 class="section-title">Lista Visual</h2>
    <div class="cards">
      ${materiais.map(m => `
        <div class="card">
          <div class="card-media">
            ${m.foto ? `<img src="${m.foto}" alt="${m.nome}">` : `<div style="font-size:56px;">📦</div>`}
          </div>
          <div class="card-body">
            <div class="card-title">${m.nome}</div>
            <div class="qty">Quantidade: ${m.quantidade}</div>
            <div style="margin-bottom:6px;">${m.especificacoes || '-'}</div>
            <div style="color:#6b7a99; font-size:13px;">Atualizado em ${new Date(m.dataAtualizacao).toLocaleString('pt-BR')}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <h2 class="section-title">Rastreabilidade</h2>
    ${movimentacoes.length ? `<table><thead><tr><th>Data/Hora</th><th>Material</th><th>Qtd.</th><th>Quem retirou</th><th>Função</th><th>Setor</th><th>Motivo</th><th>Observações</th><th>Lançado por</th></tr></thead><tbody>${movimentacoes.map(m => `<tr><td>${new Date(m.dataHora).toLocaleString('pt-BR')}</td><td>${m.materialNome}</td><td class="center">${m.quantidade}</td><td>${m.responsavel}</td><td>${m.funcao || '-'}</td><td>${m.setor || '-'}</td><td>${m.motivo || '-'}</td><td>${m.observacoes || '-'}</td><td>${m.lancadoPor || '-'}</td></tr>`).join('')}</tbody></table>` : `<p style="color:#6b7a99; margin-bottom:24px;">Nenhuma retirada registrada para este relatório.</p>`}

    <div class="footer">Relatório gerado automaticamente pelo sistema de Controle de Materiais - Plano & Plano</div>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (!win) {
      app.mostrarAlerta('O navegador bloqueou a abertura do relatório. Libere pop-ups e tente novamente.', 'error');
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  },

  gerarRelatorioDia() {
    const hoje = new Date().toISOString().split('T')[0];
    const materiaisDia = this.materiais.filter(m => (m.dataAtualizacao || '').split('T')[0] === hoje);
    if (materiaisDia.length === 0) {
      app.mostrarAlerta('Nenhum material foi atualizado hoje!', 'error');
      return;
    }
    this.abrirJanelaRelatorio({
      titulo: 'Relatório do Dia - Materiais da Obra',
      subtitulo: `Data de referência: ${new Date().toLocaleDateString('pt-BR')}`,
      materiais: materiaisDia,
      movimentacoes: []
    });
  },

  gerarRelatorioCompleto() {
    if (!auth.pode('ver_relatorio_completo')) {
      app.mostrarAlerta('Seu perfil não pode abrir o relatório completo.', 'error');
      return;
    }
    const materiaisOrdenados = this.materiais.slice().sort((a, b) =>
      (a.nome || '').localeCompare((b.nome || ''), 'pt-BR', { sensitivity: 'base' })
    );
    if (!materiaisOrdenados.length) {
      app.mostrarAlerta('Ainda não há materiais cadastrados para o relatório completo.', 'error');
      return;
    }
    this.abrirJanelaRelatorio({
      titulo: 'Relatório Completo - Materiais da Obra',
      subtitulo: 'Todos os materiais cadastrados no sistema, em ordem alfabética.',
      materiais: materiaisOrdenados,
      movimentacoes: []
    });
  },

  gerarRelatorioRastreabilidadeCompleta() {
    if (!auth.pode('ver_rastreabilidade')) {
      app.mostrarAlerta('Seu perfil não pode abrir o relatório de rastreabilidade.', 'error');
      return;
    }
    const movimentacoesOrdenadas = this.movimentacoes.slice().sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora));
    if (!movimentacoesOrdenadas.length) {
      app.mostrarAlerta('Ainda não há registros de rastreabilidade para gerar o relatório.', 'error');
      return;
    }
    this.abrirJanelaRelatorioRastreabilidade({
      titulo: 'Relatório Completo de Rastreabilidade',
      subtitulo: 'Relatório exclusivo com todas as retiradas registradas no sistema.',
      movimentacoes: movimentacoesOrdenadas
    });
  }};



const appSaldoNF = {
  STORAGE_KEY: 'controle_saldo_nf_v2_financeiro',
  LEGACY_KEY: 'controle_saldo_nf_v1',
  dados: { contratos: [], nfs: [], aditivos: [] },
  editandoContratoId: null,
  editandoNFId: null,
  editandoAditivoId: null,
  _unsub: null,

  init() {
    this.carregar().then(() => {
      this.setupEventListeners();
      this.renderizar();
      this.iniciarSyncAoVivo();
    });
  },

  setupEventListeners() {
    ['modalSaldoContrato','modalSaldoNF','modalSaldoAditivo'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.addEventListener('click', e => { if (e.target.id === id) modal.classList.remove('active'); });
    });
  },

  normalizarDados(dados) {
    if (!dados) return { contratos: [], nfs: [], aditivos: [] };
    if (Array.isArray(dados.contratos)) {
      return {
        contratos: (dados.contratos || []).map(c => ({ ...c, alertaPercentual: Number(c.alertaPercentual || 30) })),
        nfs: dados.nfs || [],
        aditivos: dados.aditivos || []
      };
    }
    if (Array.isArray(dados.materiais)) {
      return {
        contratos: (dados.materiais || []).map(m => ({
          id: m.id || Date.now(),
          nome: m.nome || 'Contrato sem nome',
          fornecedor: m.fornecedor || '',
          valorInicial: Number(m.valorContrato || 0),
          dataInicio: m.dataInicio || '',
          obs: m.obs || '',
          alertaPercentual: Number(m.alertaPercentual || 30)
        })),
        nfs: (dados.nfs || []).map(n => ({
          id: n.id || Date.now(),
          data: n.data || '',
          numero: n.numero || '',
          contratoId: n.contratoId || n.materialId || '',
          valor: Number(n.valor || 0),
          obs: n.obs || '',
          fornecedor: n.fornecedor || ''
        })),
        aditivos: []
      };
    }
    return { contratos: [], nfs: [], aditivos: [] };
  },

  iniciarSyncAoVivo() {
    try {
      if (!window.__fb?.escutarMudancasSaldoNF) return;
      if (this._unsub) this._unsub();
      this._unsub = window.__fb.escutarMudancasSaldoNF((dados) => {
        if (!dados) return;
        this.dados = this.normalizarDados(dados);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados));
        this.renderizar();
      });
    } catch(e) { console.warn('Sync financeiro indisponível:', e); }
  },

  async carregar() {
    try {
      if (window.__fb?.carregarSaldoNFDaNuvem) {
        const cloud = await window.__fb.carregarSaldoNFDaNuvem();
        if (cloud && (Array.isArray(cloud.contratos) || Array.isArray(cloud.materiais) || Array.isArray(cloud.nfs))) {
          this.dados = this.normalizarDados(cloud);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados));
          return;
        }
      }
      const local = localStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.LEGACY_KEY);
      if (local) { this.dados = this.normalizarDados(JSON.parse(local)); return; }
      this.dados = { contratos: [
        { id: Date.now()+1, nome:'Areia média lavada', fornecedor:'', valorInicial:789455.99, dataInicio:'', obs:'Exemplo de contrato financeiro.', alertaPercentual:30 },
        { id: Date.now()+2, nome:'Concreto usinado', fornecedor:'', valorInicial:1250000, dataInicio:'', obs:'' }
      ], nfs: [], aditivos: [] };
      this.salvar();
    } catch(e) { console.error(e); this.dados = { contratos: [], nfs: [], aditivos: [] }; }
  },

  salvar() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dados));
    try { if (window.__fb?.salvarSaldoNFNaNuvem) window.__fb.salvarSaldoNFNaNuvem(this.dados); } catch(e) { console.warn('Não salvou financeiro na nuvem:', e); }
  },

  parseBR(v) {
    if (typeof v === 'number') return v;
    const txt = String(v || '').trim();
    if (!txt) return 0;
    return Number(txt.replace(/R\$/g,'').replace(/\s/g,'').replace(/\./g,'').replace(',', '.')) || 0;
  },
  formatInputBR(v) { return this.parseBR(v).toLocaleString('pt-BR',{minimumFractionDigits:2, maximumFractionDigits:2}); },
  moeda(v){ return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); },
  perc(v){ return `${Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})}%`; },
  esc(v){ return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); },
  dataBR(d){ return d ? new Date(d+'T12:00:00').toLocaleDateString('pt-BR') : '-'; },

  totalAditivos(contratoId) { return this.dados.aditivos.filter(a => String(a.contratoId)===String(contratoId)).reduce((s,a)=>s+Number(a.valor||0),0); },
  totalLancado(contratoId) { return this.dados.nfs.filter(n => String(n.contratoId)===String(contratoId)).reduce((s,n)=>s+Number(n.valor||0),0); },
  valorTotalContrato(c) { return Number(c.valorInicial||0) + this.totalAditivos(c.id); },
  saldoDisponivel(c) { return this.valorTotalContrato(c) - this.totalLancado(c.id); },
  percentualDisponivel(c) { const total=this.valorTotalContrato(c); return total>0 ? (this.saldoDisponivel(c)/total)*100 : 0; },
  percentualConsumido(c) { return Math.max(0, Math.min(100, 100 - this.percentualDisponivel(c))); },
  alertaPercentual(c) { const v = Number(c.alertaPercentual); return (v > 0 && v <= 100) ? v : 30; },

  previsao(c) {
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() - 30);
    const nfs30 = this.dados.nfs.filter(n => String(n.contratoId)===String(c.id) && n.data && new Date(n.data+'T12:00:00') >= limite);
    const total30 = nfs30.reduce((s,n)=>s+Number(n.valor||0),0);
    const mediaDia = total30 / 30;
    const saldo = this.saldoDisponivel(c);
    if (mediaDia <= 0 || saldo <= 0) return { total30, mediaMensal: total30, dias: null, data: null };
    const dias = Math.ceil(saldo / mediaDia);
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return { total30, mediaMensal: total30, dias, data: data.toLocaleDateString('pt-BR') };
  },

  status(c) {
    const saldo = this.saldoDisponivel(c);
    const disp = this.percentualDisponivel(c);
    const prev = this.previsao(c);
    if (saldo < 0) return {key:'negativo', label:'Saldo negativo', cls:'saldo-critico', icon:'🚨'};
    if (disp <= 10 || (prev.dias !== null && prev.dias <= 60)) return {key:'critico', label:'Crítico', cls:'saldo-critico', icon:'🔴'};
    if (disp <= this.alertaPercentual(c)) return {key:'atencao', label:'Solicitar RT/RS', cls:'saldo-atencao', icon:'🟡'};
    return {key:'ok', label:'Saldo tranquilo', cls:'saldo-ok', icon:'🟢'};
  },
  badge(c){ const st=this.status(c); return `<span class="saldo-status ${st.cls}">${st.icon} ${st.label}</span>`; },

  abrirModalContrato(id=null) {
    this.editandoContratoId = id;
    const form = document.getElementById('formSaldoContrato');
    if (form) form.reset();
    document.getElementById('saldoContratoTitle').textContent = id ? 'Editar Contrato' : 'Cadastrar Contrato';
    if (id) {
      const c = this.dados.contratos.find(x => String(x.id) === String(id));
      if (c) {
        document.getElementById('saldoContratoNome').value = c.nome || '';
        document.getElementById('saldoContratoFornecedor').value = c.fornecedor || '';
        document.getElementById('saldoContratoValorInicial').value = this.formatInputBR(c.valorInicial || 0);
        document.getElementById('saldoContratoAlerta').value = this.alertaPercentual(c);
        document.getElementById('saldoContratoDataInicio').value = c.dataInicio || '';
        document.getElementById('saldoContratoObs').value = c.obs || '';
      }
    }
    document.getElementById('modalSaldoContrato').classList.add('active');
  },
  fecharModalContrato(){ document.getElementById('modalSaldoContrato').classList.remove('active'); this.editandoContratoId=null; },

  salvarContrato(e) {
    e.preventDefault();
    const item = {
      id: this.editandoContratoId || Date.now(),
      nome: document.getElementById('saldoContratoNome').value.trim(),
      fornecedor: document.getElementById('saldoContratoFornecedor').value.trim(),
      valorInicial: this.parseBR(document.getElementById('saldoContratoValorInicial').value),
      alertaPercentual: Number(document.getElementById('saldoContratoAlerta').value || 30),
      dataInicio: document.getElementById('saldoContratoDataInicio').value,
      obs: document.getElementById('saldoContratoObs').value.trim()
    };
    if (this.editandoContratoId) this.dados.contratos = this.dados.contratos.map(c => String(c.id)===String(item.id) ? item : c);
    else this.dados.contratos.push(item);
    this.salvar(); this.fecharModalContrato(); this.renderizar(); app.mostrarAlerta('Contrato salvo com sucesso!', 'success');
  },

  excluirContrato(id) {
    if (!confirm('Excluir este contrato? As NFs e aditivos vinculados também serão removidos.')) return;
    this.dados.contratos = this.dados.contratos.filter(c => String(c.id)!==String(id));
    this.dados.nfs = this.dados.nfs.filter(n => String(n.contratoId)!==String(id));
    this.dados.aditivos = this.dados.aditivos.filter(a => String(a.contratoId)!==String(id));
    this.salvar(); this.renderizar(); app.mostrarAlerta('Contrato excluído.', 'success');
  },

  preencherSelectContratos(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '<option value="">Selecione...</option>' + this.dados.contratos.map(c => `<option value="${c.id}">${this.esc(c.nome)}${c.fornecedor ? ' - '+this.esc(c.fornecedor) : ''}</option>`).join('');
  },

  abrirModalNF(id=null) {
    if (!this.dados.contratos.length) return app.mostrarAlerta('Cadastre um contrato antes de lançar NF.', 'error');
    this.editandoNFId = id;
    this.preencherSelectContratos('saldoNFContrato');
    const form = document.getElementById('formSaldoNF');
    if (form) form.reset();
    document.getElementById('saldoNFData').value = new Date().toISOString().slice(0,10);
    document.getElementById('saldoNFTitle').textContent = id ? 'Editar NF' : 'Lançar NF';
    if (id) {
      const n = this.dados.nfs.find(x => String(x.id)===String(id));
      if (n) {
        document.getElementById('saldoNFData').value = n.data || '';
        document.getElementById('saldoNFNumero').value = n.numero || '';
        document.getElementById('saldoNFContrato').value = n.contratoId || '';
        document.getElementById('saldoNFValor').value = this.formatInputBR(n.valor || 0);
        document.getElementById('saldoNFObs').value = n.obs || '';
      }
    }
    document.getElementById('modalSaldoNF').classList.add('active');
  },
  fecharModalNF(){ document.getElementById('modalSaldoNF').classList.remove('active'); this.editandoNFId=null; },
  salvarNF(e) {
    e.preventDefault();
    const contratoId = document.getElementById('saldoNFContrato').value;
    const contrato = this.dados.contratos.find(c => String(c.id)===String(contratoId));
    const item = {
      id: this.editandoNFId || Date.now(),
      data: document.getElementById('saldoNFData').value,
      numero: document.getElementById('saldoNFNumero').value.trim(),
      contratoId,
      valor: this.parseBR(document.getElementById('saldoNFValor').value),
      obs: document.getElementById('saldoNFObs').value.trim(),
      fornecedor: contrato?.fornecedor || ''
    };
    if (this.editandoNFId) this.dados.nfs = this.dados.nfs.map(n => String(n.id)===String(item.id) ? item : n);
    else this.dados.nfs.unshift(item);
    this.salvar(); this.fecharModalNF(); this.renderizar();
    const st = contrato ? this.status(contrato) : null;
    app.mostrarAlerta(st?.key === 'critico' || st?.key === 'negativo' ? 'NF lançada. Atenção ao saldo/previsão deste contrato!' : 'NF lançada com sucesso!', st?.key === 'critico' || st?.key === 'negativo' ? 'error' : 'success');
  },
  excluirNF(id){ if(!confirm('Excluir este lançamento de NF?')) return; this.dados.nfs=this.dados.nfs.filter(n=>String(n.id)!==String(id)); this.salvar(); this.renderizar(); app.mostrarAlerta('NF excluída.', 'success'); },

  abrirModalAditivo(id=null) {
    if (!this.dados.contratos.length) return app.mostrarAlerta('Cadastre um contrato antes de lançar aditivo.', 'error');
    this.editandoAditivoId = id;
    this.preencherSelectContratos('saldoAditivoContrato');
    const form = document.getElementById('formSaldoAditivo');
    if (form) form.reset();
    document.getElementById('saldoAditivoData').value = new Date().toISOString().slice(0,10);
    document.getElementById('saldoAditivoTitle').textContent = id ? 'Editar Aditivo' : 'Lançar Aditivo';
    if (id) {
      const a = this.dados.aditivos.find(x => String(x.id)===String(id));
      if (a) {
        document.getElementById('saldoAditivoData').value = a.data || '';
        document.getElementById('saldoAditivoContrato').value = a.contratoId || '';
        document.getElementById('saldoAditivoValor').value = this.formatInputBR(a.valor || 0);
        document.getElementById('saldoAditivoObs').value = a.obs || '';
      }
    }
    document.getElementById('modalSaldoAditivo').classList.add('active');
  },
  fecharModalAditivo(){ document.getElementById('modalSaldoAditivo').classList.remove('active'); this.editandoAditivoId=null; },
  salvarAditivo(e) {
    e.preventDefault();
    const item = {
      id: this.editandoAditivoId || Date.now(),
      data: document.getElementById('saldoAditivoData').value,
      contratoId: document.getElementById('saldoAditivoContrato').value,
      valor: this.parseBR(document.getElementById('saldoAditivoValor').value),
      obs: document.getElementById('saldoAditivoObs').value.trim()
    };
    if (this.editandoAditivoId) this.dados.aditivos = this.dados.aditivos.map(a => String(a.id)===String(item.id) ? item : a);
    else this.dados.aditivos.unshift(item);
    this.salvar(); this.fecharModalAditivo(); this.renderizar(); app.mostrarAlerta('Aditivo salvo com sucesso!', 'success');
  },
  excluirAditivo(id){ if(!confirm('Excluir este aditivo?')) return; this.dados.aditivos=this.dados.aditivos.filter(a=>String(a.id)!==String(id)); this.salvar(); this.renderizar(); app.mostrarAlerta('Aditivo excluído.', 'success'); },

  listaContratosFiltrada(){
    const busca=(document.getElementById('saldoBusca')?.value||'').toLowerCase();
    const filtro=document.getElementById('saldoStatusFiltro')?.value||'';
    return this.dados.contratos.filter(c=>{
      const nfs=this.dados.nfs.filter(n=>String(n.contratoId)===String(c.id));
      const blob=`${c.nome} ${c.fornecedor||''} ${c.obs||''} ${nfs.map(n=>n.numero+' '+(n.obs||'')).join(' ')}`.toLowerCase();
      const okBusca=!busca || blob.includes(busca);
      const okStatus=!filtro || this.status(c).key===filtro;
      return okBusca && okStatus;
    });
  },

  renderResumo(lista){
    const el=document.getElementById('saldoResumo'); if(!el) return;
    const totalAtual=lista.reduce((s,c)=>s+this.valorTotalContrato(c),0);
    const totalLancado=lista.reduce((s,c)=>s+this.totalLancado(c.id),0);
    const saldo=totalAtual-totalLancado;
    const criticos=lista.filter(c=>['atencao','critico','negativo'].includes(this.status(c).key)).length;
    el.innerHTML=`
      <div class="saldo-card"><div class="label">Valor total atualizado</div><div class="value">${this.moeda(totalAtual)}</div></div>
      <div class="saldo-card"><div class="label">Total lançado em NFs</div><div class="value">${this.moeda(totalLancado)}</div></div>
      <div class="saldo-card"><div class="label">Saldo disponível</div><div class="value">${this.moeda(saldo)}</div></div>
      <div class="saldo-card"><div class="label">Contratos em atenção</div><div class="value">${criticos}</div></div>`;
  },

  renderAlertas(lista){
    const el=document.getElementById('saldoAlertas'); if(!el) return;
    const alertas=[];
    lista.forEach(c=>{
      const st=this.status(c), prev=this.previsao(c);
      if(st.key==='negativo') alertas.push(`🚨 <strong>${this.esc(c.nome)}</strong> está com saldo negativo de ${this.moeda(Math.abs(this.saldoDisponivel(c)))}.`);
      else if(st.key==='critico') alertas.push(`🔴 <strong>${this.esc(c.nome)}</strong> está crítico. Saldo: ${this.moeda(this.saldoDisponivel(c))}. ${prev.dias!==null ? `Previsão: ${prev.dias} dia(s).` : ''}`);
      else if(st.key==='atencao') alertas.push(`🟡 <strong>${this.esc(c.nome)}</strong> chegou no limite de alerta (${this.alertaPercentual(c)}%). Verificar com a engenharia se já é necessário fazer nova RT/RS. Saldo: ${this.moeda(this.saldoDisponivel(c))}.`);
    });
    el.innerHTML=alertas.length ? alertas.map(a=>`<div class="saldo-alert-box">${a}</div>`).join('') : '<div style="color:#6b7a99;margin-top:.75rem;">Nenhum alerta financeiro no momento.</div>';
  },

  renderPrevisao(lista){
    const el=document.getElementById('saldoPrevisao'); if(!el) return;
    if(!lista.length){ el.innerHTML='<p style="color:#6b7a99;">Nenhum contrato cadastrado.</p>'; return; }
    el.innerHTML=lista.map(c=>{
      const prev=this.previsao(c);
      const saldo=this.saldoDisponivel(c);
      const info = saldo <= 0 ? 'Contrato sem saldo disponível.' : (prev.dias===null ? 'Sem consumo nos últimos 30 dias.' : `Acaba em aprox. <strong>${prev.dias} dia(s)</strong><br>Previsão: <strong>${prev.data}</strong>`);
      return `<div class="saldo-card"><div class="label">${this.esc(c.nome)}</div><div class="value" style="font-size:1.15rem;">${this.moeda(saldo)}</div><div style="color:#6b7a99;margin-top:.45rem;line-height:1.45;">Média últimos 30 dias: <strong>${this.moeda(prev.mediaMensal)}/mês</strong><br>${info}</div></div>`;
    }).join('');
  },

  renderizar(){
    const lista=this.listaContratosFiltrada();
    this.renderResumo(lista); this.renderAlertas(lista); this.renderPrevisao(lista);
    const tbody=document.getElementById('saldoTabelaContratos');
    if(tbody) tbody.innerHTML=lista.length?lista.map(c=>{ const usado=this.percentualConsumido(c); return `<tr><td data-label="Contrato"><strong>${this.esc(c.nome)}</strong>${c.obs?`<div style="color:#6b7a99;font-size:12px;">${this.esc(c.obs)}</div>`:''}<div class="saldo-progress"><span style="width:${usado}%"></span></div></td><td data-label="Fornecedor">${this.esc(c.fornecedor||'-')}</td><td data-label="Valor inicial">${this.moeda(c.valorInicial)}</td><td data-label="Aditivos">${this.moeda(this.totalAditivos(c.id))}</td><td data-label="Valor total"><strong>${this.moeda(this.valorTotalContrato(c))}</strong></td><td data-label="Total lançado">${this.moeda(this.totalLancado(c.id))}</td><td data-label="Saldo disponível"><strong>${this.moeda(this.saldoDisponivel(c))}</strong></td><td data-label="% disponível">${this.perc(this.percentualDisponivel(c))}</td><td data-label="% alerta RT/RS">${this.alertaPercentual(c)}%</td><td data-label="Status">${this.badge(c)}</td><td data-label="Ações"><div class="saldo-actions"><button class="btn btn-success" onclick="appSaldoNF.abrirModalNF()">NF</button><button class="btn btn-warning" onclick="appSaldoNF.abrirModalAditivo()">Aditivo</button><button class="btn btn-secondary" onclick="appSaldoNF.abrirModalContrato(${c.id})">Editar</button><button class="btn btn-danger" onclick="appSaldoNF.excluirContrato(${c.id})">Excluir</button></div></td></tr>`}).join(''):'<tr><td colspan="11">Nenhum contrato encontrado.</td></tr>';

    const busca=(document.getElementById('saldoBusca')?.value||'').toLowerCase();
    const ids=new Set(lista.map(c=>String(c.id)));
    const nfs=this.dados.nfs.filter(n=>ids.has(String(n.contratoId)) || !busca).filter(n=>{
      const c=this.dados.contratos.find(x=>String(x.id)===String(n.contratoId));
      const blob=`${n.numero} ${n.obs||''} ${c?.nome||''} ${c?.fornecedor||''}`.toLowerCase(); return !busca || blob.includes(busca);
    }).sort((a,b)=>(b.data||'').localeCompare(a.data||''));
    const tbodyN=document.getElementById('saldoTabelaNFs');
    if(tbodyN) tbodyN.innerHTML=nfs.length?nfs.map(n=>{ const c=this.dados.contratos.find(x=>String(x.id)===String(n.contratoId)); return `<tr><td data-label="Data">${this.dataBR(n.data)}</td><td data-label="NF"><strong>${this.esc(n.numero)}</strong></td><td data-label="Contrato">${this.esc(c?.nome||'Contrato excluído')}</td><td data-label="Fornecedor">${this.esc(c?.fornecedor||n.fornecedor||'-')}</td><td data-label="Valor NF"><strong>${this.moeda(n.valor)}</strong></td><td data-label="Obs.">${this.esc(n.obs||'-')}</td><td data-label="Ações"><div class="saldo-actions"><button class="btn btn-secondary" onclick="appSaldoNF.abrirModalNF(${n.id})">Editar</button><button class="btn btn-danger" onclick="appSaldoNF.excluirNF(${n.id})">Excluir</button></div></td></tr>`}).join(''):'<tr><td colspan="7">Nenhuma NF lançada.</td></tr>';

    const aditivos=this.dados.aditivos.filter(a=>ids.has(String(a.contratoId)) || !busca).sort((a,b)=>(b.data||'').localeCompare(a.data||''));
    const tbodyA=document.getElementById('saldoTabelaAditivos');
    if(tbodyA) tbodyA.innerHTML=aditivos.length?aditivos.map(a=>{ const c=this.dados.contratos.find(x=>String(x.id)===String(a.contratoId)); return `<tr><td data-label="Data">${this.dataBR(a.data)}</td><td data-label="Contrato">${this.esc(c?.nome||'Contrato excluído')}</td><td data-label="Valor"><strong>${this.moeda(a.valor)}</strong></td><td data-label="Observação">${this.esc(a.obs||'-')}</td><td data-label="Ações"><div class="saldo-actions"><button class="btn btn-secondary" onclick="appSaldoNF.abrirModalAditivo(${a.id})">Editar</button><button class="btn btn-danger" onclick="appSaldoNF.excluirAditivo(${a.id})">Excluir</button></div></td></tr>`}).join(''):'<tr><td colspan="5">Nenhum aditivo lançado.</td></tr>';
  },

  exportarCSV(){
    const linhas=[['Tipo','Data','Contrato','Fornecedor','NF','Valor','Observacao']];
    this.dados.contratos.forEach(c=>linhas.push(['CONTRATO',c.dataInicio||'',c.nome||'',c.fornecedor||'','',Number(c.valorInicial||0).toFixed(2),c.obs||'']));
    this.dados.aditivos.forEach(a=>{ const c=this.dados.contratos.find(x=>String(x.id)===String(a.contratoId)); linhas.push(['ADITIVO',a.data||'',c?.nome||'',c?.fornecedor||'','',Number(a.valor||0).toFixed(2),a.obs||'']); });
    this.dados.nfs.forEach(n=>{ const c=this.dados.contratos.find(x=>String(x.id)===String(n.contratoId)); linhas.push(['NF',n.data||'',c?.nome||'',c?.fornecedor||'',n.numero||'',Number(n.valor||0).toFixed(2),n.obs||'']); });
    const csv=linhas.map(l=>l.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(';')).join('\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='controle_financeiro_contratos.csv'; a.click(); URL.revokeObjectURL(url);
  }
};

// ── Inicializar ao carregar a página ──
document.addEventListener('DOMContentLoaded', () => {
  window.auth = auth;
window.app = app;
window.appMateriais = appMateriais;
window.appSaldoNF = appSaldoNF;
window.appRT = appRT;
window.floorRooms = floorRooms;
floorRooms.init();
auth.verificarSessao();
handleMediaChange();
});

// ── MENU HAMBÚRGUER ──
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('menuToggle');
  if (menu && toggle) {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('menuToggle');
  if (menu && toggle) {
    menu.classList.remove('active');
    toggle.classList.remove('active');
  }
}

// ── NAVEGAÇÃO INTELIGENTE (Scroll) ──
let lastScrollTop = 0;
const desktopNav = document.getElementById('desktopNav');

window.addEventListener('scroll', () => {
  if (!desktopNav) return;
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    desktopNav.classList.add('hidden-on-scroll');
  } else {
    desktopNav.classList.remove('hidden-on-scroll');
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ── RESPONSIVE MEDIA QUERY ──
function handleMediaChange() {
  const menuToggle = document.getElementById('menuToggle');
  const desktopNav = document.getElementById('desktopNav');
  
  if (!menuToggle || !desktopNav) return;
  
  // Mostrar menu hambúrguer em TODOS os dispositivos
  menuToggle.style.display = 'flex';
  desktopNav.style.display = 'none';
  closeMobileMenu();
}

window.addEventListener('resize', handleMediaChange);
