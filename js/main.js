import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', rerender);
controls.minDistance = 500;
controls.maxDistance = 1500;

const r = '/img/skybox/';

const urls = [
    r + 'right.png', r + 'left.png',
    r + 'top.png', r + 'bottom.png',
    r + 'front.png', r + 'back.png'
];

const loader = new THREE.CubeTextureLoader();
const texture = loader.load(urls);
scene.background = texture;

window.addEventListener( 'resize', onWindowResize, false );

function rerender() {
    requestAnimationFrame(rerender);
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

rerender();
