import * as THREE from '../../node_modules/three/build/three.module.js';
// import { TrackballControls } from 'three/TrackballControls';

const { innerHeight, innerWidth } = window;

/* Renderer */
const renderer = new THREE.WebGLRenderer({ antialias: true });

/* Camera */
const camera = new THREE.PerspectiveCamera(
  75, // Field of View in degrees - represents vertical axis
  innerWidth / innerHeight, // Aspect ratio
  0.6, // Near clipping pane - boundary plane closest to camera
  1200, // Far clipping plane - boundary furthest from camera
);
camera.position.z = 5; // Offset camera, otherwise camera & box will both initially render at `0, 0, 0`

/* Scene */
const scene = new THREE.Scene();

/* Lights */
const lights = [];
const lightValues = [
  { colour: 0x14d14a, intensity: 8, dist: 12, x: 1, y: 0, z: 8 },
  { colour: 0xbe61cf, intensity: 6, dist: 12, x: -2, y: 1, z: -10 },
  { colour: 0x00ffff, intensity: 3, dist: 10, x: 0, y: 10, z: 1 },
  { colour: 0x00ff00, intensity: 6, dist: 12, x: 0, y: -10, z: -1 },
  { colour: 0x16a7f5, intensity: 6, dist: 12, x: 10, y: 3, z: 0 },
  { colour: 0x90f615, intensity: 6, dist: 12, x: -10, y: -1, z: 0 },
];

lightValues.forEach((value) => {
  const lightValue = new THREE.PointLight(
    value.colour,
    value.intensity,
    value.dist,
  );
  lightValue.position.set(value.x, value.y, value.z);
  scene.add(lightValue);
});

export default lights;

renderer.setClearColor('#233143'); // Sets background color
renderer.setSize(innerWidth, innerHeight); // Sets size of 'app' - this will fill the screen (matches aspect ratio)

document.body.appendChild(renderer.domElement); // Adds renderer to document as <canvas>

// Update size on screen resize event
window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

/* Box */
const boxGeometry = new THREE.BoxGeometry(2, 2, 2); // Box skeleton - takes width, height and depth (x, y, z)
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // Sets box material from library preset
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Constructs box based on skeleton and material

boxMesh.rotation.set(40, 0, 40); // Change initial rotation of box (x, y, z)

scene.add(boxMesh);

const rendering = () => {
  requestAnimationFrame(rendering);

  // Spin the box
  scene.rotation.z -= 0.005;
  scene.rotation.x -= 0.01;

  renderer.render(scene, camera);
};

rendering();
