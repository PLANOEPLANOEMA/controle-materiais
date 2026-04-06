/**
 * Gerenciador de Serviços de Pavimentos
 * Desacoplado das RTs - Funciona independentemente
 */

const appServicosPavimentos = {
  servicos: [],
  STORAGE_KEY: 'controle_servicos_pavimentos',
  
  // Serviços padrão disponíveis
  servicosPadrao: [
    'Contra Piso',
    'Gesso Liso',
    'Forro',
    'Pintura',
    'Instalação de Porta'
  ],

  // ── INICIALIZAÇÃO ──
  async init() {
    await this.carregarServicos();
    this.iniciarSyncAoVivo();
  },

  // ── CARREGAR DADOS ──
  async carregarServicos() {
    try {
      if (window.__fb && window.__fb.carregarServicosPavimentosDaNuvem) {
        const cloud = await window.__fb.carregarServicosPavimentosDaNuvem();
        if (Array.isArray(cloud) && cloud.length) {
          this.servicos = cloud;
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.servicos)); } catch(e) {}
          console.log('Serviços carregados do Firebase:', this.servicos.length);
          return;
        }
      }
      const salvos = localStorage.getItem(this.STORAGE_KEY);
      if (salvos) {
        this.servicos = JSON.parse(salvos);
        console.log('Serviços carregados do localStorage:', this.servicos.length);
      } else {
        this.servicos = [];
      }
    } catch (e) {
      console.error('Erro ao carregar serviços:', e);
      this.servicos = [];
    }
  },

  // ── SINCRONIZAÇÃO EM TEMPO REAL ──
  iniciarSyncAoVivo() {
    try {
      if (window.__fb && window.__fb.escutarMudancasServicosPavimentos) {
        if (this._unsubServicos) this._unsubServicos();
        this._unsubServicos = window.__fb.escutarMudancasServicosPavimentos((servicos) => {
          this.servicos = Array.isArray(servicos) ? servicos : [];
          try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.servicos)); } catch(e) {}
          this.renderizarServicosPavimento();
        });
      }
    } catch (e) {
      console.warn('Sync ao vivo de serviços indisponível:', e);
    }
  },

  // ── SALVAR DADOS ──
  async salvarServicos() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.servicos));
      if (window.__fb && window.__fb.salvarServicosPavimentosNaNuvem) {
        await window.__fb.salvarServicosPavimentosNaNuvem(this.servicos);
      }
      console.log('Serviços salvos com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar serviços:', e);
      app.mostrarAlerta('Erro ao salvar serviços!', 'error');
    }
  },

  // ── GERAR ID ÚNICO ──
  gerarIdServico(torre, pavimento, servico) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `srv_${torre.replace(/\s+/g, '_')}_${pavimento.replace(/\s+/g, '_')}_${servico.replace(/\s+/g, '_')}_${random}`;
  },

  // ── ABRIR MODAL DE SERVIÇOS DO PAVIMENTO ──
  abrirModalServicosPavimento(torre, pavimento) {
    if (!auth.pode('editar_servicos_pavimentos') && !auth.pode('editar_planejamento_rt')) {
      app.mostrarAlerta('Seu perfil não pode editar serviços de pavimentos.', 'error');
      return;
    }

    const servicosPavimento = this.servicos.filter(s => s.torre === torre && s.pavimento === pavimento);
    
    // Se não existem serviços, criar padrão
    if (servicosPavimento.length === 0) {
      this.servicosPadrao.forEach(servico => {
        const novoServico = {
          id: this.gerarIdServico(torre, pavimento, servico),
          torre,
          pavimento,
          servico,
          concluido: false,
          dataInicio: '',
          dataPrevista: '',
          dataConclusao: null,
          fotos: [],
          observacoes: '',
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString()
        };
        this.servicos.push(novoServico);
        servicosPavimento.push(novoServico);
      });
      this.salvarServicos();
    }

    // Renderizar modal
    this.renderizarModalServicosPavimento(torre, pavimento, servicosPavimento);
  },

  // ── RENDERIZAR MODAL DE SERVIÇOS ──
  renderizarModalServicosPavimento(torre, pavimento, servicosPavimento) {
    let modal = document.getElementById('modalServicosPavimento');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalServicosPavimento';
      modal.className = 'modal active';
      document.body.appendChild(modal);
    }

    const podeEditar = auth.pode('editar_servicos_pavimentos') || auth.pode('editar_planejamento_rt');

    let html = `
      <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h2>Serviços - ${torre} / ${pavimento}</h2>
          <button class="close-btn" onclick="appServicosPavimentos.fecharModal()">×</button>
        </div>
        <div class="modal-body">
    `;

    servicosPavimento.forEach(srv => {
      const fotoCount = srv.fotos ? srv.fotos.length : 0;
      const statusClass = srv.concluido ? 'concluido' : 'pendente';
      const statusText = srv.concluido ? '✅ Concluído' : '⏳ Pendente';

      html += `
        <div class="servico-card ${statusClass}">
          <div class="servico-header">
            <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
              <input type="checkbox" 
                     ${srv.concluido ? 'checked' : ''} 
                     onchange="appServicosPavimentos.toggleServico('${srv.id}')"
                     ${!podeEditar ? 'disabled' : ''}
                     style="width: 24px; height: 24px; cursor: pointer; accent-color: #27AE60;">
              <div>
                <h3 style="margin: 0; color: #1F3864;">${srv.servico}</h3>
                <span style="color: #6b7a99; font-size: 0.9rem;">${statusText}</span>
              </div>
            </div>
          </div>

          <div class="servico-body">
            <!-- Datas -->
            <div class="dates-group">
              <div class="date-field">
                <label>📅 Data de Início</label>
                <input type="date" 
                       value="${srv.dataInicio || ''}" 
                       onchange="appServicosPavimentos.atualizarCampo('${srv.id}', 'dataInicio', this.value)"
                       ${!podeEditar ? 'disabled' : ''}>
              </div>
              <div class="date-field">
                <label>📅 Data Prevista</label>
                <input type="date" 
                       value="${srv.dataPrevista || ''}" 
                       onchange="appServicosPavimentos.atualizarCampo('${srv.id}', 'dataPrevista', this.value)"
                       ${!podeEditar ? 'disabled' : ''}>
              </div>
            </div>

            <!-- Fotos -->
            <div class="photos-section">
              <div class="photos-header">
                <label style="font-weight: 700; color: #4a5568;">📸 Fotos (${fotoCount}/5)</label>
                ${podeEditar ? `<button class="btn-upload" onclick="document.getElementById('fotoInput_${srv.id}').click()">📷 Adicionar Foto</button>` : ''}
                <input type="file" 
                       id="fotoInput_${srv.id}" 
                       accept="image/*" 
                       style="display: none;" 
                       onchange="appServicosPavimentos.adicionarFoto('${srv.id}', event)">
              </div>
              <div class="photos-grid">
                ${srv.fotos && srv.fotos.length > 0 ? srv.fotos.map((foto, idx) => `
                  <div style="position: relative;">
                    <img src="${foto}" alt="Foto ${idx + 1}" class="photo-thumb" style="cursor: pointer;" onclick="appServicosPavimentos.abrirFotoGrande('${srv.id}', ${idx})">
                    ${podeEditar ? `<button class="photo-remove" onclick="appServicosPavimentos.removerFoto('${srv.id}', ${idx})">×</button>` : ''}
                  </div>
                `).join('') : '<span style="color: #999;">Nenhuma foto adicionada</span>'}
              </div>
            </div>

            <!-- Observações -->
            <div style="margin-top: 1.5rem;">
              <label style="display: block; font-weight: 700; color: #4a5568; margin-bottom: 0.5rem;">📝 Observações</label>
              <textarea 
                        style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Arial; resize: vertical; min-height: 80px;"
                        placeholder="Adicione observações sobre este serviço..."
                        onchange="appServicosPavimentos.atualizarCampo('${srv.id}', 'observacoes', this.value)"
                        ${!podeEditar ? 'disabled' : ''}>${srv.observacoes || ''}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="appServicosPavimentos.fecharModal()">Fechar</button>
          ${podeEditar ? `<button class="btn btn-primary" onclick="appServicosPavimentos.salvarServicos()">💾 Salvar Alterações</button>` : ''}
        </div>
      </div>
    `;

    modal.innerHTML = html;
    modal.classList.add('active');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modalServicosPavimento') this.fecharModal();
    });
  },

  // ── ATUALIZAR CAMPO ──
  atualizarCampo(id, campo, valor) {
    const srv = this.servicos.find(s => s.id === id);
    if (srv) {
      srv[campo] = valor;
      srv.atualizadoEm = new Date().toISOString();
    }
  },

  // ── TOGGLE SERVIÇO (CONCLUÍDO/PENDENTE) ──
  toggleServico(id) {
    const srv = this.servicos.find(s => s.id === id);
    if (srv) {
      srv.concluido = !srv.concluido;
      if (srv.concluido) {
        srv.dataConclusao = new Date().toISOString();
      } else {
        srv.dataConclusao = null;
      }
      srv.atualizadoEm = new Date().toISOString();
      this.salvarServicos();
    }
  },

  // ── ADICIONAR FOTO ──
  async adicionarFoto(id, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const srv = this.servicos.find(s => s.id === id);
    if (!srv) return;

    if (!srv.fotos) srv.fotos = [];
    if (srv.fotos.length >= 5) {
      app.mostrarAlerta('Máximo de 5 fotos por serviço!', 'error');
      return;
    }

    try {
      const base64 = await this.comprimirImagem(file);
      srv.fotos.push(base64);
      srv.atualizadoEm = new Date().toISOString();
      this.salvarServicos();
      
      // Reabrir modal para atualizar
      const torre = srv.torre;
      const pavimento = srv.pavimento;
      const servicosPavimento = this.servicos.filter(s => s.torre === torre && s.pavimento === pavimento);
      this.renderizarModalServicosPavimento(torre, pavimento, servicosPavimento);
    } catch (error) {
      console.error('Erro ao comprimir imagem:', error);
      app.mostrarAlerta('Erro ao processar imagem!', 'error');
    }
  },

  // ── REMOVER FOTO ──
  removerFoto(id, index) {
    const srv = this.servicos.find(s => s.id === id);
    if (srv && srv.fotos) {
      srv.fotos.splice(index, 1);
      srv.atualizadoEm = new Date().toISOString();
      this.salvarServicos();
      
      // Reabrir modal para atualizar
      const torre = srv.torre;
      const pavimento = srv.pavimento;
      const servicosPavimento = this.servicos.filter(s => s.torre === torre && s.pavimento === pavimento);
      this.renderizarModalServicosPavimento(torre, pavimento, servicosPavimento);
    }
  },

  // ── ABRIR FOTO GRANDE ──
  abrirFotoGrande(id, index) {
    const srv = this.servicos.find(s => s.id === id);
    if (!srv || !srv.fotos || !srv.fotos[index]) return;

    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;
    modal.onclick = () => modal.remove();
    modal.innerHTML = `
      <div style="position: relative; max-width: 90vw; max-height: 90vh;">
        <img src="${srv.fotos[index]}" style="max-width: 100%; max-height: 100%; border-radius: 8px;">
        <button onclick="this.parentElement.parentElement.remove()" 
                style="position: absolute; top: -40px; right: 0; background: #E84545; color: #fff; border: none; border-radius: 50%; width: 36px; height: 36px; font-size: 24px; cursor: pointer;">×</button>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // ── COMPRIMIR IMAGEM ──
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

  // ── FECHAR MODAL ──
  fecharModal() {
    const modal = document.getElementById('modalServicosPavimento');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    }
  },

  // ── RENDERIZAR SERVIÇOS (PARA FUTURO USO) ──
  renderizarServicosPavimento() {
    // Será implementado quando integrado ao prédio 3D
  }
};

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => {
  if (window.appServicosPavimentos) {
    window.appServicosPavimentos.init();
  }
});
