import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

export function setupOrthoViewer(viewerElementID, resetViewID, screenshotViewID, modelPath, type){
  let viewer = document.getElementById(viewerElementID)
  let resetButton = document.getElementById(resetViewID);
  let screenshotButton = document.getElementById(screenshotViewID);

  // Scene
  const scene = new THREE.Scene();

  // Load model
  let loader = new GLTFLoader();
  loader.load(modelPath, function ( gltf ) {
      var model = gltf.scene.children[0];
      // Set position
      model.position.set(0,0,0);
      scene.add( model );
  }, undefined, function ( error ) {
      console.error( error );
  } );

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.position.set(-10, 10, -20); // x, y, z
  scene.add(directionalLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight1.position.set(20, 10, -10); // x, y, z
  scene.add(directionalLight1);

  // Camera
  let camWidth = 7;
  let camHeight = 7;
  const camera = new THREE.OrthographicCamera(
    camWidth / -2, // left
    camWidth / 2, // right
    camHeight / 2, // top
    camHeight / -2, // bottom
    1, // near
    100 // far
  );

  // Change camera position depending on type (two types, iso and tilt. iso is for models meant to be viewed from an isometric angle (like the penrose triangle), while tilt is offset slightly (for some of the impossible cubes))
  if(type == "iso"){
    camera.position.set(4, 4, -4);
  }
  else if(type == "tilt"){
    camera.position.set(4.829629131, 2.588190451, -8.365163037);
  }else{
    camera.position.set(4, 4, -4);
  }

  camera.lookAt(0, 0, 0);


  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor( 0x000000, 0 );
  renderer.outputEncoding = THREE.GammaEncoding;
  const canvas = renderer.domElement;
  // Add renderer canvas to HTML as a child of viewer
  viewer.appendChild(canvas);

  // Setup orbit controls
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  // Change size of viewer to be based on whatever is smaller, width or height
  viewer.style.width = "60%";
  viewer.style.height = "60%";
  if(viewer.offsetWidth > viewer.offsetHeight){
    viewer.style.width = viewer.offsetHeight + "px";
  }
  else{
    viewer.style.height = viewer.offsetWidth + "px";
  }
  // Update renderer size to match viewer
  resizeRenderer(renderer);

  // Render the scene
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
  window.addEventListener("resize", function(event){
    viewer.style.width = "60%";
    viewer.style.height = "60%";
    if(viewer.offsetWidth > viewer.offsetHeight){
      viewer.style.width = viewer.offsetHeight + "px";
    }
    else{
      viewer.style.height = viewer.offsetWidth + "px";
    }
    // Resize the canvas to keep it the same as viewer
    resizeRenderer();
  });



  //The following is used for taking screenshot of the models using the reset button (images used for the main menu)
  var imageElement = document.createElement('img');
  imageElement.onload = function (e) {
      let texture = new THREE.Texture(this);
      texture.needsUpdate = true;
  };

  imageElement.src = "../../images/viewer.png";

  // Set up screenshot button
  screenshotButton.addEventListener("click", function(){
    takeScreenshot();;
  });

  //Takes a screenshot of the canvas
  function takeScreenshot() {
      // Open a new window
      let newWindow = window.open('', '');
      newWindow.document.write('<html><head><title>Screenshot</title><link rel="stylesheet" type="text/css" href="../../style.css"></head><body></body></html>')
      var img = new Image();
      render();
      img.src = renderer.domElement.toDataURL();
      newWindow.document.body.appendChild(img);
  }
}
