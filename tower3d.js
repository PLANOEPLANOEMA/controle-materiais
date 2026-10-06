/**
 * Torre 3D Realista com Three.js
 * Integrada ao sistema de planejamento RT
 */

class Tower3D {
  constructor(containerId, towerName, floorsData) {
    this.containerId = containerId;
    this.towerName = towerName;
    this.floorsData = floorsData; // Array com dados dos pavimentos
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.towerGroup = null;
    this.selectedFloor = null;
    this.onFloorSelected = null;
    this.colorMap = {
      verde: 0x27AE60,
      amarelo: 0xF5A623,
      vermelho: 0xE84545,
      cinza: 0x95a5a6
    };
    this.init();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container ${this.containerId} não encontrado`);
      return;
    }

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeef5ff);
    this.scene.fog = new THREE.Fog(0xeef5ff, 100, 200);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 8, 15);
    this.camera.lookAt(0, 8, 0);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // Lighting
    this.setupLighting();

    // Build tower
    this.towerGroup = new THREE.Group();
    this.scene.add(this.towerGroup);
    this.buildTower();

    // Controls
    this.setupControls();

    // Animation loop
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 30, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    this.scene.add(directionalLight);

    // Point light for accent
    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-20, 20, 20);
    this.scene.add(pointLight);
  }

  buildTower() {
    const floorHeight = 3.5;
    const towerWidth = 12;
    const towerDepth = 8;
    const numFloors = this.floorsData.length;

    // Foundation (pilares)
    this.buildFoundation(towerWidth, towerDepth);

    // Floors
    this.floorsData.forEach((floorData, index) => {
      const yPosition = index * floorHeight;
      this.buildFloor(floorData, index, yPosition, towerWidth, towerDepth, floorHeight);
    });

    // Roof
    this.buildRoof(numFloors * floorHeight, towerWidth, towerDepth);
  }

  buildFoundation(width, depth) {
    const pillarRadius = 0.3;
    const pillarHeight = 2.5;
    const spacing = 2.5;

    const pillarPositions = [
      [-width / 2 + 1, 0, -depth / 2 + 1],
      [width / 2 - 1, 0, -depth / 2 + 1],
      [-width / 2 + 1, 0, depth / 2 - 1],
      [width / 2 - 1, 0, depth / 2 - 1],
      [0, 0, -depth / 2 + 1],
      [0, 0, depth / 2 - 1]
    ];

    const pillarGeometry = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight, 16);
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a5a5a,
      metalness: 0.3,
      roughness: 0.7
    });

    pillarPositions.forEach(pos => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(pos[0], pos[1] + pillarHeight / 2, pos[2]);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.towerGroup.add(pillar);
    });

    // Base platform
    const baseGeometry = new THREE.BoxGeometry(width + 1, 0.5, depth + 1);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x7a7a7a,
      metalness: 0.2,
      roughness: 0.8
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 2.5;
    base.castShadow = true;
    base.receiveShadow = true;
    this.towerGroup.add(base);
  }

  buildFloor(floorData, index, yPosition, width, depth, floorHeight) {
    const floorThickness = 0.3;
    const wallThickness = 0.2;

    // Get color based on status
    const color = this.colorMap[floorData.status] || this.colorMap.cinza;

    // Floor slab
    const floorGeometry = new THREE.BoxGeometry(width, floorThickness, depth);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.1,
      roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = yPosition;
    floor.castShadow = true;
    floor.receiveShadow = true;
    floor.userData = { floorIndex: index, floorData: floorData };
    this.towerGroup.add(floor);

    // Walls
    this.buildWalls(yPosition, width, depth, floorHeight, wallThickness, color);

    // Windows
    this.buildWindows(yPosition + floorThickness, width, depth, floorHeight, floorData);

    // Floor label (invisible but interactive)
    const labelGeometry = new THREE.BoxGeometry(width - 1, floorHeight - 0.5, depth - 1);
    const labelMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = yPosition + floorHeight / 2;
    label.userData = { isFloorLabel: true, floorIndex: index, floorData: floorData };
    this.towerGroup.add(label);
  }

  buildWalls(yPosition, width, depth, floorHeight, thickness, color) {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.05,
      roughness: 0.9
    });

    // Front wall
    const frontGeometry = new THREE.BoxGeometry(width, floorHeight - 0.3, thickness);
    const frontWall = new THREE.Mesh(frontGeometry, wallMaterial);
    frontWall.position.set(0, yPosition + floorHeight / 2, -depth / 2);
    frontWall.castShadow = true;
    frontWall.receiveShadow = true;
    this.towerGroup.add(frontWall);

    // Back wall
    const backWall = new THREE.Mesh(frontGeometry, wallMaterial);
    backWall.position.set(0, yPosition + floorHeight / 2, depth / 2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    this.towerGroup.add(backWall);

    // Left wall
    const sideGeometry = new THREE.BoxGeometry(thickness, floorHeight - 0.3, depth);
    const leftWall = new THREE.Mesh(sideGeometry, wallMaterial);
    leftWall.position.set(-width / 2, yPosition + floorHeight / 2, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    this.towerGroup.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(sideGeometry, wallMaterial);
    rightWall.position.set(width / 2, yPosition + floorHeight / 2, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    this.towerGroup.add(rightWall);
  }

  buildWindows(yPosition, width, depth, floorHeight, floorData) {
    const windowWidth = 1.2;
    const windowHeight = 1.0;
    const windowDepth = 0.15;

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      metalness: 0.8,
      roughness: 0.1
    });

    // Front windows
    const frontWindowPositions = [
      -width / 3,
      0,
      width / 3
    ];

    frontWindowPositions.forEach(x => {
      const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth);
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(x, yPosition + floorHeight / 2, -depth / 2 - 0.1);
      window.castShadow = true;
      this.towerGroup.add(window);
    });

    // Back windows
    frontWindowPositions.forEach(x => {
      const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth);
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(x, yPosition + floorHeight / 2, depth / 2 + 0.1);
      window.castShadow = true;
      this.towerGroup.add(window);
    });
    if (this.onFloorSelected && this.floorsData[floorIndex]) {
      this.onFloorSelected(floorIndex, this.floorsData[floorIndex]);
    }
  }

  buildRoof(height, width, depth) {
    const roofHeight = 1.5;
    const roofGeometry = new THREE.ConeGeometry(Math.max(width, depth) / 1.5, roofHeight, 32);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x5f6f87,
      metalness: 0.3,
      roughness: 0.7
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = height + roofHeight / 2;
    roof.castShadow = true;
    roof.receiveShadow = true;
    this.towerGroup.add(roof);
  }

  setupControls() {
    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    this.renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };

      // Raycasting for floor selection
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.towerGroup.children, true);

      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isFloorLabel) {
          this.selectFloor(intersects[i].object.userData.floorIndex);
          break;
        }
      }
    });

    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        this.towerGroup.rotation.y += deltaX * 0.005;
        this.towerGroup.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    this.renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Mouse wheel zoom
    this.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      const direction = e.deltaY > 0 ? 1 : -1;
      const distance = this.camera.position.length();
      const newDistance = Math.max(5, Math.min(50, distance + direction * zoomSpeed * distance));
      const ratio = newDistance / distance;
      this.camera.position.multiplyScalar(ratio);
    });
  }

  setOnFloorSelected(callback) {
    this.onFloorSelected = callback;
  }

  rotateToView(angle = 0) {
    if (this.towerGroup) this.towerGroup.rotation.y = angle;
  }

  zoomTo(distance = 18) {
    const dir = this.camera.position.clone().normalize();
    this.camera.position.copy(dir.multiplyScalar(distance));
  }

  selectFloor(floorIndex) {
    this.selectedFloor = floorIndex;
    // Highlight selected floor
    this.towerGroup.children.forEach(child => {
      if (child.userData.floorIndex === floorIndex && child.material && child.material.emissive) {
        child.material.emissive.setHex(0x444444);
      } else if (child.userData.floorIndex !== undefined && child.material && child.material.emissive) {
        child.material.emissive.setHex(0x000000);
      }
    });
  }

  updateFloorStatus(floorIndex, newStatus) {
    const color = this.colorMap[newStatus] || this.colorMap.cinza;
    this.towerGroup.children.forEach(child => {
      if (child.userData.floorIndex === floorIndex && child.material) {
        child.material.color.setHex(color);
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }
}

// Export for use in HTML
window.Tower3D = Tower3D;
