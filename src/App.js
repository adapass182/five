import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;

class App {
  init() {
    scene = new Scene();

    /* ========== Camera ========== */
    camera = new PerspectiveCamera(
      75, // Field of View in degrees - represents vertical axis
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.6, // Near clipping pane - boundary plane closest to camera
      1200, // Far clipping plane - boundary furthest from camera
    );
    camera.position.z = 5;

    /* ========== Box ========== */
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshLambertMaterial({ color: 0xffffff });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor('#233143');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    const controls = new OrbitControls(camera, renderer.domElement);

    /* Lights */
    const lightValues = [
      { color: 0x14d14a, intensity: 8, dist: 12, x: 1, y: 0, z: 8 },
      { color: 0xbe61cf, intensity: 6, dist: 12, x: -2, y: 1, z: -10 },
      { color: 0x00ffff, intensity: 3, dist: 10, x: 0, y: 10, z: 1 },
      { color: 0x00ff00, intensity: 6, dist: 12, x: 0, y: -10, z: -1 },
      { color: 0x16a7f5, intensity: 6, dist: 12, x: 10, y: 3, z: 0 },
      { color: 0x90f615, intensity: 6, dist: 12, x: -10, y: -1, z: 0 },
    ];

    lightValues.forEach((value) => {
      const lightValue = new PointLight(
        value.color,
        value.intensity,
        value.dist,
      );
      lightValue.position.set(value.x, value.y, value.z);
      scene.add(lightValue);
    });

    animate();
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(controls) {
  requestAnimationFrame(animate);
  scene.rotation.z -= 0.005;
  scene.rotation.x -= 0.01;
  renderer.render(scene, camera);
}

export default App;
