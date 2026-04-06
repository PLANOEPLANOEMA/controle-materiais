# Modificações no Prédio 3D - Versão 26

## Objetivo
Desacoplar o prédio 3D das RTs e permitir que ao clicar em um pavimento, abra a interface de serviços com checklist, datas e fotos.

---

## 1. Remover Referências às RTs do Prédio 3D

### Localizar e Remover

#### 1.1 Remover Renderização de RTs no Painel Lateral
**Procure por:** Função que renderiza RTs no painel do prédio 3D

```javascript
// ANTES - REMOVER ESTA LÓGICA
renderizarRTsPavimento(torre, pavimento) {
  // Código que mostra RTs do pavimento
  // ...
}
```

**Ação:** Comentar ou remover completamente

---

#### 1.2 Remover Cores de Status Baseadas em RTs
**Procure por:** Função que define cores dos pavimentos baseado em status de RT

```javascript
// ANTES - REMOVER/MODIFICAR
atualizarCorPavimento(pavimento, statusRT) {
  if (statusRT === 'Planejado') pavimento.classList.add('predio3d-amarelo');
  if (statusRT === 'Entregue') pavimento.classList.add('predio3d-verde');
  // ...
}
```

**Ação:** Remover ou modificar para usar status de serviços em vez de RTs

---

#### 1.3 Remover Filtro de RTs
**Procure por:** Função de filtro de RTs por pavimento

```javascript
// ANTES - REMOVER
filtrarRTsPorPavimento(torre, pavimento) {
  return this.itens.filter(rt => rt.torre === torre && rt.pavimento === pavimento);
}
```

**Ação:** Remover completamente

---

## 2. Modificar Clique no Pavimento

### 2.1 Localizar o Evento de Clique

**Procure por:**
```javascript
// Evento de clique no pavimento 3D
.predio3d-floor .front {
  cursor: pointer;
  // ...
}
```

### 2.2 Adicionar Atributos de Dados

Modifique o HTML de renderização do prédio 3D para adicionar atributos:

```javascript
// ANTES
const floorHTML = `<div class="predio3d-floor">...</div>`;

// DEPOIS
const floorHTML = `
  <div class="predio3d-floor" data-torre="${torre}" data-pavimento="${pavimento}">
    ...
  </div>
`;
```

### 2.3 Adicionar Listener de Clique

**Adicione este código no final da função de inicialização do prédio 3D:**

```javascript
// Adicionar listener para abrir serviços ao clicar no pavimento
document.addEventListener('click', (e) => {
  const floor = e.target.closest('.predio3d-floor');
  if (floor) {
    const torre = floor.dataset.torre;
    const pavimento = floor.dataset.pavimento;
    
    if (torre && pavimento && window.appServicosPavimentos) {
      console.log(`Abrindo serviços: ${torre} - ${pavimento}`);
      window.appServicosPavimentos.abrirModalServicosPavimento(torre, pavimento);
    }
  }
});
```

---

## 3. Atualizar Visual do Prédio 3D

### 3.1 Adicionar Indicador Visual de Serviços Concluídos

**Modifique o CSS para mostrar cores baseadas em conclusão de serviços:**

```css
/* Pavimento com serviços concluídos */
.predio3d-floor.servicos-completos .front {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 50%, #3d9142 100%) !important;
  border-color: #2e7d32 !important;
}

/* Pavimento com alguns serviços concluídos */
.predio3d-floor.servicos-parciais .front {
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 50%, #ffa500 100%) !important;
  border-color: #ff8f00 !important;
}

/* Pavimento sem serviços concluídos */
.predio3d-floor.servicos-pendentes .front {
  background: linear-gradient(135deg, #e8f0f8 0%, #d4e4f7 50%, #c8ddf5 100%) !important;
  border-color: #a8c5e8 !important;
}
```

### 3.2 Função para Atualizar Cores (Opcional)

**Adicione esta função ao appServicosPavimentos:**

```javascript
atualizarCoresPavimentos() {
  // Agrupar serviços por pavimento
  const servicosPorPavimento = {};
  
  this.servicos.forEach(srv => {
    const chave = `${srv.torre}_${srv.pavimento}`;
    if (!servicosPorPavimento[chave]) {
      servicosPorPavimento[chave] = [];
    }
    servicosPorPavimento[chave].push(srv);
  });

  // Atualizar cores dos pavimentos
  Object.entries(servicosPorPavimento).forEach(([chave, servicos]) => {
    const [torre, pavimento] = chave.split('_');
    const floor = document.querySelector(
      `.predio3d-floor[data-torre="${torre}"][data-pavimento="${pavimento}"]`
    );
    
    if (!floor) return;

    // Remover classes anteriores
    floor.classList.remove('servicos-completos', 'servicos-parciais', 'servicos-pendentes');

    // Calcular status
    const concluidos = servicos.filter(s => s.concluido).length;
    const total = servicos.length;

    if (concluidos === total) {
      floor.classList.add('servicos-completos');
    } else if (concluidos > 0) {
      floor.classList.add('servicos-parciais');
    } else {
      floor.classList.add('servicos-pendentes');
    }
  });
}
```

---

## 4. Remover Painel Lateral de RTs

### 4.1 Localizar o Painel

**Procure por:**
```html
<!-- Painel lateral do prédio 3D -->
<div class="predio3d-panel">
  <!-- Lista de RTs do pavimento -->
</div>
```

### 4.2 Modificar Conteúdo

**Antes:**
```html
<div class="predio3d-panel">
  <h3>RTs do Pavimento</h3>
  <!-- Lista de RTs -->
</div>
```

**Depois:**
```html
<div class="predio3d-panel">
  <h3>Serviços do Pavimento</h3>
  <p style="color: #6b7a99; font-size: 0.9rem;">
    Clique em um pavimento para gerenciar seus serviços
  </p>
  <div id="resumoServicos">
    <!-- Resumo será atualizado dinamicamente -->
  </div>
</div>
```

---

## 5. Adicionar Resumo de Serviços (Opcional)

### 5.1 Função para Renderizar Resumo

**Adicione ao appServicosPavimentos:**

```javascript
renderizarResumoServicosPavimento(torre, pavimento) {
  const servicosPavimento = this.servicos.filter(s => 
    s.torre === torre && s.pavimento === pavimento
  );
  
  const concluidos = servicosPavimento.filter(s => s.concluido).length;
  const total = servicosPavimento.length;
  const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  const resumo = document.getElementById('resumoServicos');
  if (!resumo) return;

  resumo.innerHTML = `
    <div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
      <div style="margin-bottom: 0.5rem;">
        <strong>${torre} - ${pavimento}</strong>
      </div>
      <div style="font-size: 0.9rem; color: #6b7a99;">
        ${concluidos} de ${total} serviços concluídos
      </div>
      <div style="margin-top: 0.75rem; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
        <div style="background: #27AE60; height: 100%; width: ${percentual}%; transition: width 0.3s;"></div>
      </div>
      <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #2E75B6; font-weight: 700;">
        ${percentual}% concluído
      </div>
    </div>
  `;
}
```

---

## 6. Integração com Sincronização

### 6.1 Atualizar Cores ao Sincronizar

**Modifique a função `iniciarSyncAoVivo` em appServicosPavimentos:**

```javascript
iniciarSyncAoVivo() {
  try {
    if (window.__fb && window.__fb.escutarMudancasServicosPavimentos) {
      if (this._unsubServicos) this._unsubServicos();
      this._unsubServicos = window.__fb.escutarMudancasServicosPavimentos((servicos) => {
        this.servicos = Array.isArray(servicos) ? servicos : [];
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.servicos)); } catch(e) {}
        
        // NOVO: Atualizar cores dos pavimentos
        this.atualizarCoresPavimentos();
        
        this.renderizarServicosPavimento();
      });
    }
  } catch (e) {
    console.warn('Sync ao vivo de serviços indisponível:', e);
  }
}
```

---

## 7. Checklist de Modificações

- [ ] Remover renderização de RTs do painel lateral
- [ ] Remover cores de status baseadas em RTs
- [ ] Remover filtro de RTs por pavimento
- [ ] Adicionar atributos `data-torre` e `data-pavimento` aos pavimentos
- [ ] Adicionar listener de clique para abrir serviços
- [ ] Adicionar CSS para cores de serviços
- [ ] Adicionar função `atualizarCoresPavimentos()`
- [ ] Modificar painel lateral para mostrar resumo de serviços
- [ ] Testar clique em pavimento
- [ ] Testar abertura de modal de serviços
- [ ] Testar sincronização de cores

---

## 8. Exemplo Completo de Clique

```javascript
// Adicionar este código na inicialização do prédio 3D
document.addEventListener('DOMContentLoaded', () => {
  // ... código existente ...

  // Novo: Listener para serviços de pavimentos
  document.addEventListener('click', (e) => {
    const floor = e.target.closest('.predio3d-floor');
    if (floor && !e.target.closest('.predio3d-dot')) {
      const torre = floor.dataset.torre;
      const pavimento = floor.dataset.pavimento;
      
      if (torre && pavimento) {
        // Adicionar feedback visual
        floor.style.transform = 'scale(1.05)';
        setTimeout(() => {
          floor.style.transform = '';
        }, 200);

        // Abrir modal de serviços
        if (window.appServicosPavimentos) {
          window.appServicosPavimentos.abrirModalServicosPavimento(torre, pavimento);
        }
      }
    }
  });
});
```

---

## 9. Resultado Final

Após estas modificações:

✅ Prédio 3D desacoplado das RTs  
✅ Clique em pavimento abre interface de serviços  
✅ Cores dos pavimentos refletem conclusão de serviços  
✅ Painel lateral mostra resumo de serviços  
✅ Fotos e datas são gerenciadas por serviço  
✅ Rastreabilidade de entrada de material funciona  

---

**Data:** 06/04/2026  
**Versão:** 26  
**Status:** Pronto para Implementação
