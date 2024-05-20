import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader';

import { MTLLoader } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/loaders/MTLLoader.js';


import { EffectComposer } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/OutlinePass.js';

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);  // Sky blue background


// Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow mapping
document.body.appendChild(renderer.domElement);

// Ground plane (green grass)
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Green 
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true; // Plane can receive shadows
plane.position.y = -5;
scene.add(plane);




// const mtlLoader = new MTLLoader();
// //mtlLoader.setTexturePath('textures/');
// mtlLoader.load('Low-Poly Plant_.mtl', function (materials) {
//   console.log('Materials:', materials);
//     materials.preload();
//     const objLoaderr = new OBJLoader();
//     objLoaderr.setMaterials(materials);
//     objLoaderr.load('Low-Poly Plant_.obj', function (object) {
//       console.log('Object:', object);
//       object.position.set(1, 0, -10);
//         object.scale.set(5, 5, 5);
//         object.traverse(function (child) {
//             if (child instanceof THREE.Mesh) {
//               console.log('Mesh:', child);
//         console.log('Mesh Visible:', child.visible);
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });
//         scene.add(object);
       
//     });
// });

const mtlLoader = new MTLLoader();
//mtlLoader.setTexturePath('textures/');
mtlLoader.load('materials.mtl', function (materials) {
  console.log('Materials:', materials);
    materials.preload();
    const objLoaderr = new OBJLoader();
    objLoaderr.setMaterials(materials);
    objLoaderr.load('model.obj', function (object) {
      console.log('Object:', object);
      object.position.set(1, 0, -10);
        object.scale.set(1, 1, 1);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              console.log('Mesh:', child);
        console.log('Mesh Visible:', child.visible);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(object);
       
    });
});

// const materialsByName = {};

// const mtlLoader = new MTLLoader();
// //mtlLoader.setTexturePath('textures/'); // Make sure to set the correct texture path

// mtlLoader.load('Low-Poly Plant_.mtl', function (materials) {
//     console.log('Materials:', materials);
//     materials.preload();
//     materials.materials.forEach((material) => {
//         materialsByName[material.name] = material;
//     });

//     const objLoader = new OBJLoader();
//     objLoader.setMaterials(materialsByName);

//     objLoader.load('Low-Poly Plant_.obj', function (object) {
//         console.log('Object:', object);
//         object.position.set(1, 0, -10);
//         object.scale.set(5, 5, 5);
//         object.traverse(function (child) {
//             if (child instanceof THREE.Mesh) {
//                 console.log('Mesh:', child);
//                 console.log('Mesh Visible:', child.visible);

//                 if (child.material.name) {
//                     const materialFromMtl = materialsByName[child.material.name];
//                     child.material = materialFromMtl;
//                 }

//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });
//         scene.add(object);
//     });
// });
// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./texture.jpg');



// // Apply texture to sphere
const sphereMaterial = new THREE.MeshPhongMaterial({
    map: texture
});

// Add shapes
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

const geometry2 = new THREE.SphereGeometry(0.7, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.position.x = 2;
scene.add(sphere);

const geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), new THREE.MeshPhongMaterial({ color: 0x0000ff }));
cylinder.castShadow = true;
cylinder.receiveShadow = true;
cylinder.position.x = -2;
scene.add(cylinder);

// Animate cube
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true; // Light casting shadows
directionalLight.shadow.mapSize.width = 2048; // Higher res
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.radius = 4; 
directionalLight.target.position.set(0, 0, 0); 
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
// const texturedSphere = new THREE.Mesh(geometry2, sphereMaterial);
// texturedSphere.position.x = -2;
// scene.add(texturedSphere);

// Load custom 3D model (obj file)
const objLoader = new OBJLoader();
//objLoader.setPath('PA5A\\');
objLoader.load('Zelda Hylian Shield.obj', (object) => {
   object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  object.scale.set(0.005, 0.005, 0.005); //bruh the shapes are inside this object lmao
  object.position.set(-1, 0.5, -3);
  object.castShadow = true; // Ensure model casts shadows
  object.receiveShadow = true;
   object.castShadow = true;
  scene.add(object);
});




// Render the scene
renderer.render(scene, camera);

