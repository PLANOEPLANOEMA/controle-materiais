/**
 * Integração entre RTs e Controle de Estoque
 * Quando uma RT é marcada como "Entregue", o material é automaticamente adicionado ao estoque
 */

const integracaoRTEstoque = {
  /**
   * Processar entrada de material quando RT é marcada como "Entregue"
   * @param {Object} rt - Objeto da RT
   * @param {string} novoStatus - Novo status da RT
   */
  async processarMudancaStatusRT(rt, novoStatus) {
    // Só processar se mudou para "Entregue"
    if (novoStatus !== 'Entregue') {
      return;
    }

    // Validar dados da RT
    if (!rt || !rt.material || !rt.quantidade) {
      console.warn('RT inválida para processamento de estoque:', rt);
      return;
    }

    console.log('Processando entrada de material para RT:', rt.id);

    try {
      // Buscar ou criar material no estoque
      await this.adicionarOuAtualizarMaterialEstoque(rt);
      
      // Registrar movimentação de entrada
      await this.registrarMovimentacaoEntrada(rt);
      
      console.log('Material processado com sucesso!');
    } catch (error) {
      console.error('Erro ao processar material:', error);
      app.mostrarAlerta('Erro ao adicionar material ao estoque!', 'error');
    }
  },

  /**
   * Adicionar ou atualizar material no estoque
   * @param {Object} rt - Objeto da RT
   */
  async adicionarOuAtualizarMaterialEstoque(rt) {
    if (!window.appMateriais) {
      console.warn('appMateriais não disponível');
      return;
    }

    const quantidade = Number(rt.quantidade || 0);
    if (quantidade <= 0) return;

    // Buscar material existente
    const materialExistente = window.appMateriais.materiais.find(m => 
      m.nome.toLowerCase() === (rt.material || '').toLowerCase()
    );

    if (materialExistente) {
      // Atualizar quantidade
      materialExistente.quantidade = Number(materialExistente.quantidade || 0) + quantidade;
      materialExistente.dataAtualizacao = new Date().toISOString();
      console.log(`Material atualizado: ${materialExistente.nome} - Nova quantidade: ${materialExistente.quantidade}`);
    } else {
      // Criar novo material
      const novoId = Math.max(...window.appMateriais.materiais.map(m => m.id || 0), 0) + 1;
      const novoMaterial = {
        id: novoId,
        nome: rt.material,
        quantidade: quantidade,
        especificacoes: rt.observacoes || `Recebido via RT ${rt.id}`,
        foto: null,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      window.appMateriais.materiais.push(novoMaterial);
      console.log(`Material criado: ${novoMaterial.nome} - Quantidade: ${quantidade}`);
    }

    // Salvar no Firebase
    await window.appMateriais.salvarMateriais();
  },

  /**
   * Registrar movimentação de entrada no estoque
   * @param {Object} rt - Objeto da RT
   */
  async registrarMovimentacaoEntrada(rt) {
    if (!window.appMateriais) {
      console.warn('appMateriais não disponível');
      return;
    }

    const quantidade = Number(rt.quantidade || 0);
    if (quantidade <= 0) return;

    const novaMovimentacao = {
      id: Date.now(),
      tipo: 'entrada', // Campo novo para distinguir entrada de saída
      materialId: null,
      materialNome: rt.material,
      quantidade: quantidade,
      responsavel: 'Sistema (RT)',
      funcao: 'Entrada de Material',
      setor: rt.torre || 'Geral',
      motivo: `Entrega de RT #${rt.id}`,
      observacoes: rt.observacoes || '',
      dataHora: new Date().toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema',
      rtId: rt.id // Vincular à RT
    };

    window.appMateriais.movimentacoes.unshift(novaMovimentacao);
    await window.appMateriais.salvarMovimentacoes();
    
    console.log('Movimentação de entrada registrada:', novaMovimentacao.id);
  },

  /**
   * Processar saída de material quando necessário
   * (Função auxiliar para futuro uso)
   * @param {Object} material - Material do estoque
   * @param {number} quantidade - Quantidade a retirar
   * @param {Object} dados - Dados da retirada (responsavel, motivo, etc)
   */
  async processarSaidaMaterial(material, quantidade, dados) {
    if (!window.appMateriais) {
      console.warn('appMateriais não disponível');
      return;
    }

    const qtd = Number(quantidade || 0);
    if (qtd <= 0) return;

    if (material.quantidade < qtd) {
      throw new Error('Quantidade insuficiente em estoque');
    }

    // Atualizar quantidade
    material.quantidade = Number(material.quantidade || 0) - qtd;
    material.dataAtualizacao = new Date().toISOString();

    // Registrar movimentação
    const novaMovimentacao = {
      id: Date.now(),
      tipo: 'saida',
      materialId: material.id,
      materialNome: material.nome,
      quantidade: qtd,
      responsavel: dados.responsavel || 'Não informado',
      funcao: dados.funcao || '',
      setor: dados.setor || '',
      motivo: dados.motivo || '',
      observacoes: dados.observacoes || '',
      dataHora: new Date().toISOString(),
      lancadoPor: window.currentUser?.username || 'sistema'
    };

    window.appMateriais.movimentacoes.unshift(novaMovimentacao);
    await window.appMateriais.salvarMateriais();
    await window.appMateriais.salvarMovimentacoes();

    console.log('Saída de material registrada:', novaMovimentacao.id);
  }
};

// Exportar para uso global
window.integracaoRTEstoque = integracaoRTEstoque;
