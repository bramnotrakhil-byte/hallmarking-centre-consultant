const sceneContainer = document.getElementById('scene');

if (sceneContainer && window.THREE) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.IcosahedronGeometry(1.2, 1);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf7d67d,
    emissive: 0x5e4620,
    metalness: 0.9,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9,
    flatShading: true,
  });

  const crystal = new THREE.Mesh(geometry, material);
  group.add(crystal);

  const ringGeometry = new THREE.TorusGeometry(2.1, 0.04, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xf4d28a,
    transparent: true,
    opacity: 0.7,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.5;
  group.add(ring);

  const particles = new THREE.BufferGeometry();
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16;
    positions[i + 1] = (Math.random() - 0.5) * 16;
    positions[i + 2] = (Math.random() - 0.5) * 16;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xf2d389,
    size: 0.028,
    transparent: true,
    opacity: 0.9,
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  function animate() {
    requestAnimationFrame(animate);
    crystal.rotation.x += 0.003;
    crystal.rotation.y += 0.006;
    ring.rotation.z += 0.005;
    particleSystem.rotation.y += 0.0008;
    group.rotation.y += 0.0012;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
