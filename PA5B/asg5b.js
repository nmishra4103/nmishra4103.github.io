// import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
// import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader';

// import { MTLLoader } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/loaders/MTLLoader.js';


// import { EffectComposer } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { OutlinePass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/OutlinePass.js';


// import { ShaderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/ShaderPass';

// import { WebGPURenderer } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/renderers/WebGPURenderer.js';


// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';

// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/MTLLoader.js';

// import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/OutlinePass.js';

// import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/ShaderPass.js';
//import { WebGPURenderer } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/renderers/WebGPURenderer.js';




// // Setup scene
// const scene = new THREE.Scene();

// // Setup camera here? placement means something
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;


// // const textureLoader = new THREE.TextureLoader();
// // const skyTexture = textureLoader.load('./assets/ny.jpg');
// // scene.background = skyTexture;  // Sky blue background
 
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true; // Enable shadow mapping
// document.body.appendChild(renderer.domElement);

// const textureLoader = new THREE.CubeTextureLoader();
// const skyTexture = textureLoader.load([
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg'
// ]);
// scene.background = skyTexture; //plaster the same image on all 6
// //for now....
 

// //scene.fog = new THREE.Fog(0xcccccc, 10, 15); //fog
// scene.fog = new THREE.FogExp2( 0xcccccc, 0.075);

// // replace this with my own distance-based fog shader

// //doesnt work yet

// // const fogShader = {
// //   uniforms: {
// //     tDiffuse: { value: null },
// //     fogNear: { value: 5 }, // Adjust as needed
// //     fogFar: { value: 15 } // Adjust as needed
// //   },
// //   vertexShader: `
// //     varying vec2 vUv;
// //     void main() {
// //       vUv = uv;
// //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //     }
// //   `,
// //   fragmentShader: `
// //     uniform sampler2D tDiffuse;
// //     uniform float fogNear;
// //     uniform float fogFar;
// //     varying vec2 vUv;
// //     void main() {
// //       float depth = texture2D(tDiffuse, vUv).r;
// //       float fogFactor = smoothstep(fogNear, fogFar, depth);
// //       gl_FragColor = mix(vec4(0.8, 0.8, 0.8, 1.0), gl_FragColor, fogFactor);
// //     }
// //   `
// // };

// // const fogPass = new ShaderPass(fogShader);
// // fogPass.renderToScreen = true; // Render the result to the screen

// // const composer = new EffectComposer(renderer);
// // const renderPass = new RenderPass(scene, camera);
// // composer.addPass(renderPass);
// // composer.addPass(fogPass);





// // Ground plane (green grass)
// //need to think what to do about this 
// //put a cheap texture for now?
// const planeGeometry = new THREE.PlaneGeometry(100, 100);
// const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Green 
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.receiveShadow = true; // Plane can receive shadows
// plane.position.y = -5;
// scene.add(plane);



// const mtlLoader = new MTLLoader();
// //mtlLoader.setTexturePath('textures/');
// mtlLoader.load('materials.mtl', function (materials) {
//   console.log('Materials:', materials);
//     materials.preload();
//     const objLoaderr = new OBJLoader();
//     objLoaderr.setMaterials(materials);
//     objLoaderr.load('model.obj', function (object) {
//       console.log('Object:', object);
//       object.position.set(1, 0, -10);
//         object.scale.set(1, 1, 1);
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

// // Load texture
// const textureLoader2 = new THREE.TextureLoader();
// const texture = textureLoader2.load('./texture.jpg');



// // // Apply texture to sphere
// const sphereMaterial = new THREE.MeshPhongMaterial({
//     map: texture
// });

// // Add shapes
// const geometry1 = new THREE.BoxGeometry(1, 1, 1);
// const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

// const geometry2 = new THREE.SphereGeometry(0.7, 32, 32);
// const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), sphereMaterial);
// sphere.castShadow = true;
// sphere.receiveShadow = true;
// sphere.position.x = 2;
// scene.add(sphere);

// const geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
// const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), new THREE.MeshPhongMaterial({ color: 0x0000ff }));
// cylinder.castShadow = true;
// cylinder.receiveShadow = true;
// cylinder.position.x = -2;
// scene.add(cylinder);

// // Animate cube
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// animate();

// // Add directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 5);
// directionalLight.castShadow = true; // Light casting shadows
// directionalLight.shadow.mapSize.width = 2048; // Higher res
// directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 50;
// directionalLight.shadow.camera.left = -10;
// directionalLight.shadow.camera.right = 10;
// directionalLight.shadow.camera.top = 10;
// directionalLight.shadow.camera.bottom = -10;
// directionalLight.shadow.radius = 4; 
// directionalLight.target.position.set(0, 0, 0); 
// scene.add(directionalLight);


// const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
// scene.add(ambientLight);

// // Add orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();


// // Load custom 3D model (obj file)
// const objLoader = new OBJLoader();
// //objLoader.setPath('PA5A\\');
// objLoader.load('Zelda Hylian Shield.obj', (object) => {
//   object.traverse(function (child) {
//     if (child instanceof THREE.Mesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });
//   object.scale.set(0.005, 0.005, 0.005); //bruh the shapes are inside this object lmao
//   object.position.set(-1, 0.5, -3);
//   object.castShadow = true; // Ensure model casts shadows
//   object.receiveShadow = true;
//   object.castShadow = true;
//   scene.add(object);
// });


// // Render the scene
// //renderer.render(scene, camera);
// composer.render(); //need to call this one for fog post processing


//----------------------------------------------------------------------------------------------------------
//mess with the shader shit later
//NOOOO but i want it


import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/loaders/MTLLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/ShaderPass.js';

// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Set background color to match fog color
const fogColor = 0xcccccc;
scene.background = new THREE.Color(fogColor);

// Ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
plane.position.y = -5;
scene.add(plane);

// Load materials and model
// const mtlLoader = new MTLLoader();
// mtlLoader.load('materials.mtl', function (materials) {
//     materials.preload();
//     const objLoader = new OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.load('model.obj', function (object) {
//         object.position.set(1, 0, -10);
//         object.scale.set(1, 1, 1);
//         object.traverse(function (child) {
//             if (child instanceof THREE.Mesh) {
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });
//         scene.add(object);
//     });
// });

// Load texture
const textureLoader2 = new THREE.TextureLoader();
const texture = textureLoader2.load('./texture.jpg');

// Add shapes
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

// const sphereMaterial = new THREE.MeshPhongMaterial({ map: texture });
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), sphereMaterial);
// sphere.castShadow = true;
// sphere.receiveShadow = true;
// sphere.position.x = 2;
// scene.add(sphere);

// const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), new THREE.MeshPhongMaterial({ color: 0x0000ff }));
// cylinder.castShadow = true;
// cylinder.receiveShadow = true;
// cylinder.position.x = -2;
// scene.add(cylinder);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
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

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xff0000, 1, 50);
pointLight.position.set(0, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Add spotlight
const spotLight = new THREE.SpotLight(0x0000ff, 1);
spotLight.position.set(-5, 10, 5);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Function to create a tree
function createTree(positionX, positionZ) {
    const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.4, 4, 32);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(positionX, -3, positionZ);
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const foliageGeometry = new THREE.ConeGeometry(2, 4, 32);
    const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(positionX, 1, positionZ);
    foliage.castShadow = true;
    foliage.receiveShadow = true;

    scene.add(trunk);
    scene.add(foliage);
}

// Add multiple trees to the scene
const treeCount = 50;
for (let i = 0; i < treeCount; i++) {
    const positionX = (Math.random() - 0.5) * 100;
    const positionZ = (Math.random() - 0.5) * 100;
    createTree(positionX, positionZ);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);  // Update composer size as well
});

scene.fog = new THREE.FogExp2(fogColor, 0.04);

// Custom fog shader
const fogShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_FogColor: { value: new THREE.Color(fogColor) },
        u_Near: { value: 1.0 },
        u_Far: { value: 100.0 },
        u_FogDensity: { value: 0.5 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying float vDepth;
        void main() {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vDepth = -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 u_FogColor;
        uniform float u_Near;
        uniform float u_Far;
        uniform float u_FogDensity;
        varying vec2 vUv;
        varying float vDepth;

        float linearizeDepth(float depth) {
            return (2.0 * u_Near * u_Far) / (u_Far + u_Near - (depth * 2.0 - 1.0) * (u_Far - u_Near));
        }

        void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            float depth = linearizeDepth(gl_FragCoord.z / gl_FragCoord.w);
            float fogFactor = exp(-u_FogDensity * depth * depth);
            fogFactor = clamp(fogFactor, 0.0, 1.0);
            vec3 fogColor = mix(u_FogColor, texel.rgb, fogFactor);
            gl_FragColor = vec4(fogColor, texel.a);
        }
    `
};

const fogPass = new ShaderPass(fogShader);
fogPass.uniforms.tDiffuse.value = new THREE.Texture();

fogPass.renderToScreen = true;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
composer.addPass(fogPass);

// Animate
function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
    composer.render();  // Apply post-processing
}
animate();


//still want that fog. combining more garbage bc i cant do it 


//GIVE ME THE FOG

// import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
// import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/loaders/MTLLoader.js';
// // import WebGPURenderer from 'https://cdn.skypack.dev/three@0.132.2/addons/renderers/webgpu/WebGPURenderer.js';
// // import PostProcessing from 'https://cdn.skypack.dev/three@0.132.2/addons/renderers/common/PostProcessing.js';

// import { WebGPURenderer } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/renderers/webgpu/WebGPURenderer.js';


// //import { pass, color, rangeFog } from 'https://cdn.skypack.dev/three@0.132.2/nodes';

// import { pass, color, rangeFog } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/nodes/Nodes.js';

// // import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/addons/loaders/RGBELoader.js';
// import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/RGBELoader.js';

// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/MTLLoader.js';
 //import { WebGPURenderer } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/renderers/webgpu/WebGPURenderer.js';
// //import { PostProcessing } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/renderers/common/PostProcessing.js';
// import { pass, color, rangeFog } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/nodes/Nodes.js'; //wtf is wrong with these links
// import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/RGBELoader.js';
// import { PostProcessing } from 'https://cdn.jsdelivr.net/npm/postprocessing@6.35.4/+esm';


// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/MTLLoader.js';
// import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/OutlinePass.js';
// import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/postprocessing/ShaderPass.js';



//no time left take care of that later

// let camera, scene, renderer, postProcessing;

// // Setup scene
// scene = new THREE.Scene();

// // Setup camera
// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Renderer
// renderer = new WebGPURenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Post-processing
// const scenePass = pass(scene, camera);
// const scenePassViewZ = scenePass.getViewZNode();
// const backgroundColor = color(0x0066ff);
// const fogFactor = rangeFog(null, 2.7, 4).context({ getViewZ: () => scenePassViewZ });
// const scenePassTM = scenePass.toneMapping(THREE.ACESFilmicToneMapping);
// const compose = fogFactor.mix(scenePassTM, backgroundColor);

// postProcessing = new PostProcessing(renderer);
// postProcessing.outputNode = compose;

// // Skybox
// const textureLoader = new THREE.CubeTextureLoader();
// const skyTexture = textureLoader.load([
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg',
//     './assets/ny.jpg'
// ]);
// skyTexture.encoding = THREE.sRGBEncoding;
// scene.background = skyTexture;

// // Ground plane
// const planeGeometry = new THREE.PlaneGeometry(100, 100);
// const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.receiveShadow = true;
// plane.position.y = -5;
// scene.add(plane);

// // Load materials and model
// const mtlLoader = new MTLLoader();
// mtlLoader.load('materials.mtl', function (materials) {
//     materials.preload();
//     const objLoader = new OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.load('model.obj', function (object) {
//         object.position.set(1, 0, -10);
//         object.scale.set(1, 1, 1);
//         object.traverse(function (child) {
//             if (child instanceof THREE.Mesh) {
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });
//         scene.add(object);
//     });
// });

// // Load texture
// const textureLoader2 = new THREE.TextureLoader();
// const texture = textureLoader2.load('./texture.jpg');

// // Add shapes
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

// const sphereMaterial = new THREE.MeshPhongMaterial({ map: texture });
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), sphereMaterial);
// sphere.castShadow = true;
// sphere.receiveShadow = true;
// sphere.position.x = 2;
// scene.add(sphere);

// const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), new THREE.MeshPhongMaterial({ color: 0x0000ff }));
// cylinder.castShadow = true;
// cylinder.receiveShadow = true;
// cylinder.position.x = -2;
// scene.add(cylinder);

// // Add directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 5);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.width = 2048;
// directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 50;
// directionalLight.shadow.camera.left = -10;
// directionalLight.shadow.camera.right = 10;
// directionalLight.shadow.camera.top = 10;
// directionalLight.shadow.camera.bottom = -10;
// directionalLight.shadow.radius = 4;
// directionalLight.target.position.set(0, 0, 0);
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);

// // Add orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

// // Load custom 3D model
// const objLoader = new OBJLoader();
// objLoader.load('Zelda Hylian Shield.obj', (object) => {
//     object.traverse(function (child) {
//         if (child instanceof THREE.Mesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;
//         }
//     });
//     object.scale.set(0.005, 0.005, 0.005);
//     object.position.set(-1, 0.5, -3);
//     scene.add(object);
// });

// // Handle window resize
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     postProcessing.setSize(window.innerWidth, window.innerHeight);
// });

// // Animate
// function animate() {
//     requestAnimationFrame(animate);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     controls.update();
//     postProcessing.render();
// }
// animate();

