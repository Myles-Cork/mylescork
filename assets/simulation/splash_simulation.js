// Myles Cork
// 2D simulation of planets around a star made with ThreeJS

// Bloom effect based on: https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom_selective
// Fbm noise shader based on: https://codepen.io/prisoner849/pen/VwdZGNm and https://github.com/yiwenl/glsl-fbm/blob/master/3d.glsl
// Grid shader based on: https://madebyevan.com/shaders/grid/

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { Mass } from "./mass.js";
import { Mass3D } from "./mass3d.js";
import basic_vertex_shader from "./shaders/basic_vertex.glsl.js";
import grid_fragment_shader from "./shaders/grid_fragment.glsl.js";
import mix_bloom_vertex_shader from "./shaders/mix_bloom_vertex.glsl.js";
import mix_bloom_fragment_shader from "./shaders/mix_bloom_fragment.glsl.js";
import fbm_noise_fragment_shader from "./shaders/fbm_noise_fragment.glsl.js";

const D_VIEWER_ID = "viewer";
let VIEWER_ID;

// Perspective or Orthographic camera
const D_PERSPECTIVE = true;
let PERSPECTIVE;

// Use threejs orbit control addon
const D_ORBIT_CONTROLS = false;
let ORBIT_CONTROLS;

// Simulate in 3D
const D_SIM_3D = false;
let SIM_3D;

// Enable shadows
const D_SHADOWS = true;
let SHADOWS;

// Steps to run the simulation before visualizing
const D_PREBAKE_STEPS = 100;
let PREBAKE_STEPS;

// Colors
const D_BACKGROUND_OPACITY  = 0.0;
const D_BACKGROUND_COLOR    = new THREE.Color(0x262626);
const D_GRID_COLOR          = new THREE.Color(0x417b6d);
const D_STAR_COLOR_BRIGHT   = new THREE.Color(0xaa5b32);
const D_STAR_COLOR_DARK     = new THREE.Color(0.005, 0.002, 0.001);
let BACKGROUND_OPACITY;
let BACKGROUND_COLOR;
let GRID_COLOR;
let STAR_COLOR_BRIGHT;
let STAR_COLOR_DARK;

// Layer for objects to be "lit" in the bloom pass
const BLOOM_SCENE = 1;
const bloom_layer = new THREE.Layers();
bloom_layer.set( BLOOM_SCENE );

// Layer for objects that should not be included/effect the bloom in the bloom pass
const BLOOM_HIDDEN = 2;
const bloom_hidden_layer = new THREE.Layers();
bloom_hidden_layer.set( BLOOM_HIDDEN );

const D_BLOOM_PARAMS = {
    threshold: 0.3,
    strength: 0.8,
    radius: 0.2
};
let BLOOM_PARAMS;

const scene = new THREE.Scene();

export function run_simulation(options){
    options = options || {};
    VIEWER_ID = options.viewer_id || D_VIEWER_ID;
    PERSPECTIVE = options.perspective || D_PERSPECTIVE;
    ORBIT_CONTROLS = options.orbit_controls || D_ORBIT_CONTROLS;
    SIM_3D = options.sim_3D || D_SIM_3D;
    SHADOWS = options.shadows || D_SHADOWS;
    PREBAKE_STEPS = options.prebake_steps || D_PREBAKE_STEPS;
    BACKGROUND_OPACITY = options.background_opacity || D_BACKGROUND_OPACITY;
    BACKGROUND_COLOR = options.background_color || D_BACKGROUND_COLOR;
    GRID_COLOR = options.grid_color || D_GRID_COLOR;
    STAR_COLOR_BRIGHT = options.star_color_bright || D_STAR_COLOR_BRIGHT;
    STAR_COLOR_DARK = options.star_color_dark || D_STAR_COLOR_DARK;
    BLOOM_PARAMS = options.bloom_params || D_BLOOM_PARAMS;

    init_viewer();
    init_renderer();
    init_camera();
    init_renderpasses();
    init_masses();
    init_lights();
    init_grid();
    pre_bake_sim();
    animate();
}

let viewer;
let mouseX = 0, mouseY = 0;
let windowHalfX, windowHalfY;
function init_viewer(){
    viewer = document.getElementById(VIEWER_ID);
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.overflow = "hidden";

    if(!ORBIT_CONTROLS){
        // Get mouse position
        mouseX = 0, mouseY = 0;
        windowHalfX = viewer.offsetWidth / 2;
        windowHalfY = viewer.offsetHeight / 2;
        function onPointerMove( event ) {
            if ( event.isPrimary === false ) return;
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        }
        
        viewer.addEventListener( "pointermove", onPointerMove );
    }
}

let renderer;
function init_renderer(){
    // Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor( BACKGROUND_COLOR, BACKGROUND_OPACITY );
    renderer.shadowMap.enabled = SHADOWS;
    const canvas = renderer.domElement;
    // Add renderer canvas to HTML as a child of viewer
    viewer.appendChild(canvas);
}

let camWidth, camHeight;
let aspect;
let camera;
let controls;
let updateCameraControls = function(){};
function init_camera(){
    // Camera
    camWidth = 10;
    camHeight = 10;
    aspect = viewer.offsetWidth/viewer.offsetHeight;
    camera;
    if(PERSPECTIVE){
        camera = new THREE.PerspectiveCamera(
            Math.sqrt(Math.pow(camWidth,2) + Math.pow(camHeight,2)),
            aspect, 
            1, 
            1000
        );
    }
    else{
        camera = new THREE.OrthographicCamera(
            camWidth / -2 * aspect, // left
            camWidth / 2 * aspect, // right
            camHeight / 2, // top
            camHeight / -2, // bottom
            -100, // near
            200 // far
        );
    }

    camera.layers.enable( BLOOM_SCENE );
    camera.layers.enable( BLOOM_HIDDEN );

    // Setup camera position/rotation and set update function
    if(ORBIT_CONTROLS){
        controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set( 0.0, 0.0, 100.0 );
        updateCameraControls = function(){controls.update();};
        updateCameraControls();
    }
    else{
        camera.position.set(-10.0,-40.0,7.5);
        camera.lookAt(-5.0,5.0,0.0);
        camera.rotation.set(camera.rotation.x,camera.rotation.y,Math.atan(1.0/aspect));
        updateCameraControls = function(){updateMouseCamera();};
    }
}

// Orient the camera based on mouse position
let camera_pos_shift = new THREE.Vector3(0.0,0.0,0.0);
let camera_pos_shift_goal = new THREE.Vector3(0.0,0.0,0.0);
function updateMouseCamera(){
    camera_pos_shift_goal.x = (-mouseY/windowHalfY-mouseX/windowHalfX)/2.0;
    camera_pos_shift_goal.y = ( mouseY/windowHalfY+mouseX/windowHalfX)/2.0;
    camera_pos_shift_goal.z = ( mouseY/windowHalfY-mouseX/windowHalfX)/2.0;

    camera_pos_shift.add(new THREE.Vector3().copy(camera_pos_shift_goal).sub(camera_pos_shift).divideScalar(10.0));

    camera.position.set(-20.0+(camera_pos_shift.x+1)*15,-60.0+(camera_pos_shift.y+1.0)*20.0,3.0+5.0*(Math.pow(2,5.0*camera_pos_shift.z)-1.0));
    camera.lookAt((-3.0+camera_pos_shift.x+camera_pos_shift.y)*(1.0-camera_pos_shift.z),(4.0-2.0*(camera_pos_shift.y))*(1.0-camera_pos_shift.z),0.0);
    camera.rotation.set(camera.rotation.x,camera.rotation.y,Math.atan(1.0/aspect));
}

// Set up render passes
let renderScene, bloomPass, bloomComposer, mixPass, outputPass, finalComposer;
function init_renderpasses(){
    renderScene = new RenderPass( scene, camera );

    bloomPass = new UnrealBloomPass( new THREE.Vector2( viewer.offsetWidth, viewer.offsetHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = BLOOM_PARAMS.threshold;
    bloomPass.strength = BLOOM_PARAMS.strength;
    bloomPass.radius = BLOOM_PARAMS.radius;

    bloomComposer = new EffectComposer( renderer );
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass( renderScene );
    bloomComposer.addPass( bloomPass );

    mixPass = new ShaderPass(
        new THREE.ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader: mix_bloom_vertex_shader,
            fragmentShader: mix_bloom_fragment_shader
        } ), "baseTexture"
    );
    mixPass.needsSwap = true;

    outputPass = new OutputPass();

    finalComposer = new EffectComposer( renderer );
    finalComposer.addPass( renderScene );
    finalComposer.addPass( mixPass );
    finalComposer.addPass( outputPass );

    // Update renderer size to match viewer
    resizeRenderer();
}

// Resize the renderer's canvas based on the viewer's size
function resizeRenderer() {
    const canvas = renderer.domElement.parentElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width/window.devicePixelRatio !== width || canvas.height/window.devicePixelRatio !== height;
    if (needResize) {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width/window.devicePixelRatio, height/window.devicePixelRatio, false);
        bloomComposer.setSize( width/window.devicePixelRatio, height/window.devicePixelRatio,false );
		finalComposer.setSize( width/window.devicePixelRatio, height/window.devicePixelRatio,false );
    }
}

// Render the scene
function render() {
    // Set background to black for bloom pass
    renderer.setClearColor( 0x000000, 0.0 );
    // Darken all objects that won't be included in the bloom pass
    scene.traverse( darkenNonBloomed );
    camera.layers.disable( BLOOM_HIDDEN );
    bloomComposer.render();
    camera.layers.enable( BLOOM_HIDDEN );
    // Restore materials to darkened objects
    scene.traverse( restoreMaterial );
    // Revert background color and opacity
    renderer.setClearColor( BACKGROUND_COLOR, BACKGROUND_OPACITY );
    // Render the entire scene, then render bloom scene on top
    finalComposer.render();
}


function disposeMaterial( obj ) {
    if ( obj.material ) {
        obj.material.dispose();
    }
}

const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
const materials = {};
function darkenNonBloomed( obj ) {
    if ( obj.isMesh && bloom_layer.test( obj.layers ) === false ) {
        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial( obj ) {
    if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
    }
}


// Resize viewer on window size change
window.addEventListener("resize", function(event){
    aspect = viewer.offsetWidth/viewer.offsetHeight;
    if(PERSPECTIVE){
        camera.aspect = aspect;
    }
    else{
        camera.left = camWidth / -2 * aspect; // left
        camera.right = camWidth / 2 * aspect; // right
    }
    resizeRenderer();
    camera.updateProjectionMatrix();

	windowHalfX = viewer.offsetWidth / 2;
	windowHalfY = viewer.offsetHeight / 2;
});

let masses_array;
let star_material;
let star;
function init_masses(){
    scene.traverse( disposeMaterial );
    scene.children.length = 0;

    masses_array = [];

    star_material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            color_bright: { value: STAR_COLOR_BRIGHT },
            color_dark: { value: STAR_COLOR_DARK }
        },
        vertexShader: basic_vertex_shader,
        fragmentShader: fbm_noise_fragment_shader
    });

    // The central mass
    
    if(!SIM_3D){
        star = new Mass(2000.0, 1, new THREE.Vector2(0.0,0.0), new THREE.Vector2(0.0,0.0), true, star_material);
    }
    else{
        star = new Mass3D(2000.0, 1, new THREE.Vector3(0.0,0.0,0.0), new THREE.Vector3(0.0,0.0,0.0), true, star_material);
    }

    masses_array.push(star);
    scene.add(star.obj);
    star.obj.layers.set( BLOOM_SCENE );

    // The orbiting masses
    for(let i = -12.0; i <= 12.0; i+=4.0){
        for(let j = -12.0; j <= 12.0; j+=4.0){
            if(i!=0.0 && j!=0.0){
                const color = new THREE.Color();
                color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

                const material = new THREE.MeshStandardMaterial( { color: color } );
                let scale = Math.random();
                let new_mass;
                if(!SIM_3D){
                    let init_position = new THREE.Vector2(i,j);
                    let init_velocity = new THREE.Vector2(-1*0.2*Math.sign(j)/Math.sqrt(i*i+j*j),0.2*Math.sign(i)/Math.sqrt(i*i+j*j));
                    new_mass = new Mass(scale*50.0+20.0, scale*0.2+0.1, init_position, init_velocity, false, material);
                }
                else{
                    let init_position = new THREE.Vector3(i,j,i/20.0);
                    let init_velocity = new THREE.Vector3(-1*0.2*Math.sign(j)/Math.sqrt(i*i+j*j),0.2*Math.sign(i)/Math.sqrt(i*i+j*j), 0.0);
                    new_mass = new Mass3D(scale*50.0+20.0, scale*0.2+0.1, init_position, init_velocity, false, material);
                }
                new_mass.obj.castShadow = SHADOWS;
                new_mass.obj.receiveShadow = SHADOWS;
                scene.add(new_mass.obj)
                masses_array.push(new_mass);
            }
        }
    }
}


// Lighting
function init_lights(){
    let center_light = new THREE.PointLight(STAR_COLOR_BRIGHT, 1000.0);
    center_light.castShadow = SHADOWS;
    scene.add(center_light);

    let ambient_light = new THREE.AmbientLight(BACKGROUND_COLOR, 10.0);
    scene.add(ambient_light)
}

// Gravity Well Grid
let grid;
function init_grid(){
    let grid_geo = new THREE.PlaneGeometry(40, 40, 100, 100);

    let grid_mat = new THREE.ShaderMaterial({
        vertexShader: basic_vertex_shader,
        fragmentShader: grid_fragment_shader,
        uniforms: {
            max_dist: { value: 20.0 },
            color: { value: new THREE.Color(GRID_COLOR) },
            opacity: { value: 0.1 }
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
    })

    grid = new THREE.Mesh(grid_geo, grid_mat);
    grid.layers.set( BLOOM_HIDDEN );
    scene.add(grid);
}

// Prebake the simulation
function pre_bake_sim(){
    for(let i = 0; i < PREBAKE_STEPS; i ++){
        masses_array.forEach(mass => {
            mass.calc_velocity(masses_array);
        });

        masses_array.forEach(mass => {
            mass.elastic_collisions(masses_array);
        });
        
        masses_array.forEach(mass => {
            mass.update_position();
        });
    }
}


function animate() {
    requestAnimationFrame(animate);

    star.obj.rotation.z = performance.now() / 1000;
    star_material.uniforms.time.value = performance.now() / 10000;

    updateCameraControls();

    // Update Simulation
    for(let i = 0; i < 2; i ++){
        masses_array.forEach(mass => {
            mass.calc_velocity(masses_array);
        });
    
        masses_array.forEach(mass => {
            mass.elastic_collisions(masses_array);
        });
        
        masses_array.forEach(mass => {
            mass.update_position();
        });
    }

    // Edit grid geometry
    let grid_geo_pos = grid.geometry.attributes.position;
    let vertex_pos = new THREE.Vector3();
    let vertex_pos_v2 = new THREE.Vector2();
    // Calculate new z position for each point on grid
    for ( let i = 0, l = grid_geo_pos.count; i < l; i ++ ) {

        vertex_pos.fromBufferAttribute(grid_geo_pos, i);
        vertex_pos_v2 = new THREE.Vector2(vertex_pos.x, vertex_pos.y)
        let accumulation = 0.0;

        masses_array.forEach(mass => {
            let mass_pos = new THREE.Vector2(mass.position.x,mass.position.y)
            let m = mass.mass
            let distance_sq = vertex_pos_v2.distanceToSquared(mass_pos);
            accumulation += m / (1+distance_sq);
        });
        
        let z = -2*Math.sqrt(accumulation)/masses_array.length;
        grid_geo_pos.setZ(i, z);
    }
    grid_geo_pos.needsUpdate = true

    render();
}