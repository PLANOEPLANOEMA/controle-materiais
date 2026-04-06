<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sala 3D - Sistema de Controle de Obras v26</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #000;
      overflow: hidden;
      color: #1a2340;
    }

    #canvas {
      display: block;
      width: 100%;
      height: 100vh;
    }

    /* UI Overlay */
    .ui-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(31, 56, 100, 0.95);
      color: #fff;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      pointer-events: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .header p {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-top: 0.25rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .btn {
      background: #2E75B6;
      color: #fff;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
      pointer-events: auto;
    }

    .btn:hover {
      background: #1F3864;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46,117,182,0.3);
    }

    .instructions {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: rgba(255,255,255,0.95);
      padding: 1.5rem;
      border-radius: 12px;
      max-width: 350px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 100;
      pointer-events: auto;
      border-left: 4px solid #2E75B6;
    }

    .instructions h3 {
      color: #1F3864;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .instructions p {
      color: #6b7a99;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .instructions strong {
      color: #1F3864;
    }

    /* Service Windows */
    .service-window {
      position: fixed;
      background: rgba(255,255,255,0.98);
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 1.5rem;
      z-index: 500;
      pointer-events: auto;
      min-width: 300px;
      max-width: 450px;
      max-height: 80vh;
      overflow-y: auto;
      border: 1px solid #dbe7f7;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .service-window-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #eef2f7;
    }

    .service-window-header h2 {
      color: #1F3864;
      font-size: 1.3rem;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7a99;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #1F3864;
      background: #f0f4fa;
      border-radius: 6px;
    }

    .form-group {
      margin-bottom: 1.2rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #1F3864;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #c8d6ea;
      border-radius: 6px;
      font-size: 0.9rem;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2E75B6;
      box-shadow: 0 0 0 3px rgba(46,117,182,0.1);
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #27AE60;
    }

    .checkbox-group label {
      margin: 0;
      cursor: pointer;
      font-weight: 600;
      color: #1F3864;
    }

    .photos-section {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .photos-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .photos-header label {
      font-weight: 700;
      color: #4a5568;
      margin: 0;
    }

    .btn-upload {
      background: #2E75B6;
      color: #fff;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
    }

    .btn-upload:hover {
      background: #1F3864;
    }

    .photos-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .photo-thumb {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      object-fit: cover;
      border: 1px solid #e2e8f0;
      cursor: pointer;
    }

    .service-footer {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #eef2f7;
    }

    .service-footer .btn {
      flex: 1;
      padding: 0.7rem;
      text-align: center;
    }

    .btn-success {
      background: #27AE60;
    }

    .btn-success:hover {
      background: #229954;
    }

    .btn-secondary {
      background: #95a5a6;
    }

    .btn-secondary:hover {
      background: #7f8c8d;
    }

    /* Status Badge */
    .status-badge {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 700;
      margin-left: 0.5rem;
    }

    .status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .status-completed {
      background: #d4edda;
      color: #155724;
    }

    /* Loading */
    .loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,0.95);
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      z-index: 1000;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #eee;
      border-top: 4px solid #2E75B6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 1rem;
      }

      .service-window {
        width: calc(100% - 2rem) !important;
        left: 1rem !important;
        right: 1rem !important;
      }

      .instructions {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- Canvas 3D -->
  <canvas id="canvas"></canvas>

  <!-- Header -->
  <div class="header">
    <div>
      <h1>🏠 Sala 3D - Controle de Obras</h1>
      <p>Clique nas áreas da sala para gerenciar serviços</p>
    </div>
    <div class="controls">
      <button class="btn" onclick="mostrarPainel()">📊 Painel</button>
      <button class="btn" onclick="resetarCamera()">🔄 Reset</button>
    </div>
  </div>

  <!-- Instructions -->
  <div class="instructions">
    <h3>🎮 Como Usar</h3>
    <p><strong>Mouse:</strong> Arraste para rotacionar a câmera</p>
    <p><strong>Scroll:</strong> Zoom in/out</p>
    <p><strong>Clique:</strong> Abrir serviço da área</p>
    <p style="margin-top: 1rem; color: #2E75B6; font-weight: 700;">Áreas clicáveis:</p>
    <p>🟢 Parede frontal (Contra Piso)</p>
    <p>🟡 Parede esquerda (Gesso)</p>
    <p>🔵 Parede direita (Pintura)</p>
    <p>🟣 Teto (Forro)</p>
    <p>🟠 Piso (Instalação de Porta)</p>
  </div>

  <!-- UI Overlay -->
  <div class="ui-overlay" id="uiOverlay"></div>

  <script>
    // ==================== THREE.JS SETUP ====================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 50, 100);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // ==================== LIGHTING ====================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // ==================== ROOM GEOMETRY ====================
    const roomWidth = 6;
    const roomHeight = 3;
    const roomDepth = 5;

    // Piso
    const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    floor.userData = { type: 'floor', service: 'Instalação de Porta', color: 0xff9800 };
    scene.add(floor);

    // Teto
    const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomHeight;
    ceiling.receiveShadow = true;
    ceiling.userData = { type: 'ceiling', service: 'Forro', color: 0x9c27b0 };
    scene.add(ceiling);

    // Parede frontal (frente)
    const frontWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const frontWallMaterial = new THREE.MeshStandardMaterial({ color: 0xb0e0e6, roughness: 0.7 });
    const frontWall = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
    frontWall.position.z = -roomDepth / 2;
    frontWall.position.y = roomHeight / 2;
    frontWall.receiveShadow = true;
    frontWall.userData = { type: 'wall', service: 'Contra Piso', color: 0x4caf50 };
    scene.add(frontWall);

    // Parede traseira
    const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0xb0e0e6, roughness: 0.7 });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.rotation.y = Math.PI;
    backWall.position.z = roomDepth / 2;
    backWall.position.y = roomHeight / 2;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Parede esquerda
    const leftWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const leftWallMaterial = new THREE.MeshStandardMaterial({ color: 0xc8e6c9, roughness: 0.7 });
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -roomWidth / 2;
    leftWall.position.y = roomHeight / 2;
    leftWall.receiveShadow = true;
    leftWall.userData = { type: 'wall', service: 'Gesso Liso', color: 0xffc107 };
    scene.add(leftWall);

    // Parede direita
    const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const rightWallMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0b2, roughness: 0.7 });
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = roomWidth / 2;
    rightWall.position.y = roomHeight / 2;
    rightWall.receiveShadow = true;
    rightWall.userData = { type: 'wall', service: 'Pintura', color: 0x2196f3 };
    scene.add(rightWall);

    // ==================== INTERACTIVE OBJECTS ====================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const interactiveObjects = [floor, frontWall, leftWall, rightWall, ceiling];

    window.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData.service) {
          abrirJanelaServico(object.userData.service, object.userData.color);
        }
      }
    });

    // ==================== CAMERA CONTROLS ====================
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    document.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        const rotationSpeed = 0.005;
        const euler = new THREE.Euler(0, 0, 0, 'YXZ');
        euler.setFromQuaternion(camera.quaternion);
        euler.rotateY(-deltaX * rotationSpeed);
        euler.rotateX(-deltaY * rotationSpeed);
        camera.quaternion.setFromEuler(euler);

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      const direction = camera.position.clone().normalize();
      const distance = camera.position.length();
      const newDistance = Math.max(1, Math.min(15, distance + (e.deltaY > 0 ? zoomSpeed : -zoomSpeed)));
      camera.position.copy(direction.multiplyScalar(newDistance));
    }, { passive: false });

    function resetarCamera() {
      camera.position.set(0, 1.6, 3);
      camera.quaternion.set(0, 0, 0, 1);
    }

    // ==================== SERVICE WINDOWS ====================
    const servicosData = {
      'Contra Piso': {
        descricao: 'Preparação da base para acabamento',
        datas: true,
        fotos: true
      },
      'Gesso Liso': {
        descricao: 'Revestimento de gesso nas paredes',
        datas: true,
        fotos: true
      },
      'Pintura': {
        descricao: 'Pintura das superfícies',
        datas: true,
        fotos: true
      },
      'Forro': {
        descricao: 'Instalação do forro de gesso',
        datas: true,
        fotos: true
      },
      'Instalação de Porta': {
        descricao: 'Colocação de portas e marcos',
        datas: true,
        fotos: true
      }
    };

    const openWindows = {};

    function abrirJanelaServico(servico, cor) {
      if (openWindows[servico]) return;

      const windowId = `window-${servico.replace(/\s+/g, '-')}`;
      const overlay = document.getElementById('uiOverlay');

      const windowDiv = document.createElement('div');
      windowDiv.className = 'service-window';
      windowDiv.id = windowId;
      windowDiv.style.left = Math.random() * (window.innerWidth - 450) + 'px';
      windowDiv.style.top = Math.random() * (window.innerHeight - 400) + 100 + 'px';

      const dados = servicosData[servico] || {};
      const statusClass = localStorage.getItem(`status-${servico}`) === 'true' ? 'completed' : 'pending';
      const statusText = localStorage.getItem(`status-${servico}`) === 'true' ? 'Concluído' : 'Pendente';

      let html = `
        <div class="service-window-header">
          <div>
            <h2>${servico}</h2>
            <span class="status-badge status-${statusClass}">${statusText}</span>
          </div>
          <button class="close-btn" onclick="fecharJanela('${servico}')">×</button>
        </div>

        <p style="color: #6b7a99; margin-bottom: 1.5rem; font-size: 0.9rem;">${dados.descricao || ''}</p>

        <div class="checkbox-group">
          <input type="checkbox" id="check-${servico}" ${localStorage.getItem(`status-${servico}`) === 'true' ? 'checked' : ''} onchange="atualizarStatus('${servico}')">
          <label for="check-${servico}">Marcar como concluído</label>
        </div>

        <div class="form-group">
          <label>📅 Data de Início</label>
          <input type="date" id="date-inicio-${servico}" value="${localStorage.getItem(`date-inicio-${servico}`) || ''}">
        </div>

        <div class="form-group">
          <label>📅 Data Prevista</label>
          <input type="date" id="date-prevista-${servico}" value="${localStorage.getItem(`date-prevista-${servico}`) || ''}">
        </div>

        <div class="photos-section">
          <div class="photos-header">
            <label>📸 Fotos</label>
            <button class="btn-upload" onclick="document.getElementById('file-${servico}').click()">Adicionar</button>
            <input type="file" id="file-${servico}" accept="image/*" style="display: none;" onchange="adicionarFoto('${servico}', event)">
          </div>
          <div class="photos-grid" id="photos-${servico}"></div>
        </div>

        <div class="form-group">
          <label>📝 Observações</label>
          <textarea id="obs-${servico}" placeholder="Adicione observações..." style="height: 80px;">${localStorage.getItem(`obs-${servico}`) || ''}</textarea>
        </div>

        <div class="service-footer">
          <button class="btn btn-success" onclick="salvarServico('${servico}')">💾 Salvar</button>
          <button class="btn btn-secondary" onclick="fecharJanela('${servico}')">Fechar</button>
        </div>
      `;

      windowDiv.innerHTML = html;
      overlay.appendChild(windowDiv);
      openWindows[servico] = true;

      // Carregar fotos
      const fotosStr = localStorage.getItem(`fotos-${servico}`);
      if (fotosStr) {
        const fotos = JSON.parse(fotosStr);
        const photosDiv = document.getElementById(`photos-${servico}`);
        fotos.forEach((foto, idx) => {
          const img = document.createElement('img');
          img.src = foto;
          img.className = 'photo-thumb';
          img.onclick = () => abrirFotoGrande(foto);
          photosDiv.appendChild(img);
        });
      }

      // Tornar janela arrastável
      tornarArrastavel(windowDiv);
    }

    function fecharJanela(servico) {
      const windowId = `window-${servico.replace(/\s+/g, '-')}`;
      const windowDiv = document.getElementById(windowId);
      if (windowDiv) {
        windowDiv.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
          windowDiv.remove();
          delete openWindows[servico];
        }, 300);
      }
    }

    function atualizarStatus(servico) {
      const checkbox = document.getElementById(`check-${servico}`);
      localStorage.setItem(`status-${servico}`, checkbox.checked);
    }

    function salvarServico(servico) {
      const dataInicio = document.getElementById(`date-inicio-${servico}`).value;
      const dataPrevista = document.getElementById(`date-prevista-${servico}`).value;
      const obs = document.getElementById(`obs-${servico}`).value;

      localStorage.setItem(`date-inicio-${servico}`, dataInicio);
      localStorage.setItem(`date-prevista-${servico}`, dataPrevista);
      localStorage.setItem(`obs-${servico}`, obs);

      mostrarNotificacao('✅ Serviço salvo com sucesso!');
    }

    function adicionarFoto(servico, event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        let fotos = [];
        const fotosStr = localStorage.getItem(`fotos-${servico}`);
        if (fotosStr) {
          fotos = JSON.parse(fotosStr);
        }

        if (fotos.length < 5) {
          fotos.push(e.target.result);
          localStorage.setItem(`fotos-${servico}`, JSON.stringify(fotos));

          const photosDiv = document.getElementById(`photos-${servico}`);
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'photo-thumb';
          img.onclick = () => abrirFotoGrande(e.target.result);
          photosDiv.appendChild(img);

          mostrarNotificacao('📸 Foto adicionada!');
        } else {
          mostrarNotificacao('⚠️ Máximo de 5 fotos por serviço!');
        }
      };
      reader.readAsDataURL(file);
    }

    function abrirFotoGrande(foto) {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
      `;
      modal.onclick = () => modal.remove();
      modal.innerHTML = `<img src="${foto}" style="max-width: 90vw; max-height: 90vh; border-radius: 8px;">`;
      document.body.appendChild(modal);
    }

    function tornarArrastavel(element) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      const header = element.querySelector('.service-window-header');
      if (header) {
        header.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    function mostrarNotificacao(mensagem) {
      const notif = document.createElement('div');
      notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(39, 174, 96, 0.95);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
      `;
      notif.textContent = mensagem;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 3000);
    }

    function mostrarPainel() {
      alert('Painel de Controle (em desenvolvimento)\n\nServiços salvos em localStorage');
    }

    // ==================== ANIMATION LOOP ====================
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // ==================== RESPONSIVE ====================
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>
