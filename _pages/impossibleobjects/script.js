import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

let viewer = document.getElementById("viewer")
let resetButton = document.getElementById("resetview");

// Scene
const scene = new THREE.Scene();

// Load model
let loader = new GLTFLoader();
loader.load( 'models/penroseTri1.gltf', function ( gltf ) {
    var model = gltf.scene.children[0];
    // Set position
    model.position.set(0,0,0);
    scene.add( model );
}, undefined, function ( error ) {
    console.error( error );
} );

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);

// Camera
let camWidth = 10;
let camHeight = 10;
const camera = new THREE.OrthographicCamera(
  camWidth / -2, // left
  camWidth / 2, // right
  camHeight / 2, // top
  camHeight / -2, // bottom
  1, // near
  100 // far
);
camera.position.set(4, 4, -4);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0x000000, 0 );
const canvas = renderer.domElement;
// Add renderer canvas to HTML as a child of viewer
viewer.appendChild(canvas);

// Setup orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

resizeRenderer(renderer);
render();

// Resize the renderer's canvas based on the viewer's size
function resizeRenderer() {
  const canvas = renderer.domElement.parentElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width/window.devicePixelRatio !== width || canvas.height/window.devicePixelRatio !== height;
  if (needResize) {
    renderer.setSize(width/window.devicePixelRatio, height/window.devicePixelRatio, false);
  }
}

// Render the scene and update the controls
function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

// Reset position of camera to initial position
resetButton.addEventListener("click", function(){
  controls.reset();
});

// Resize viewer on window size change
window.onresize = function(){
  viewer.style.width = "100%";
  viewer.style.height = "100%";
  if(viewer.offsetWidth > viewer.offsetHeight){
    viewer.style.width = viewer.offsetHeight + "px";
  }
  else{
    viewer.style.height = viewer.offsetWidth + "px";
  }
  // Resize the canvas to keep it the same as viewer
  resizeRenderer();
};
