// gloabal vars
let canvas, gl;
let a_Position, a_Color, a_UV, u_whichTexture, u_FragColor;
let u_GlobalRotationMatrix, u_ModelMatrix, u_ProjectionMatrix, u_ViewMatrix;
let u_Sampler0, u_Sampler1;
let globalRotx, globalRoty, globalRotz, global;
let xSlider, ySlider, zSlider;
let fpsCounter;
let g_camera;
let u_Clicked;// should i use this??
document.addEventListener('DOMContentLoaded', function() {
    main();
});


// dawg i am LOSING IT
// Vertex and Fragment Shaders
var VSHADER_SOURCE = `
    uniform mat4 u_GlobalRotationMatrix;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform mat4 u_ViewMatrix;

    attribute vec4 a_Position;

    attribute vec2 a_UV;
    varying vec2 v_UV;
    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotationMatrix * u_ModelMatrix * a_Position;
        v_UV = a_UV;
    }`;

// var FSHADER_SOURCE = `
//     precision mediump float;
//     varying vec2 v_UV;

//     uniform vec4 u_FragColor;



//     //skybox sampler
//     uniform sampler2D u_Sampler0;

//     //ground sampler
//     uniform sampler2D u_Sampler1;


//     uniform int u_whichTexture;
//     void main() {

//         if (u_whichTexture >= 0 && u_whichTexture < 2) {
//             gl_FragColor = texture2D(u_Sampler[u_whichTexture], v_UV);
//         } else if (u_whichTexture == -1) {
//             gl_FragColor = vec4(v_UV, 1.0, 1.0);
//         } else if (u_whichTexture == -2) {
//             gl_FragColor = u_FragColor;
//         } else {
//             gl_FragColor = vec4(1, 0, 1, 1);  // Default fallback color
//         }
        
//     }`;

//try again later this method when i have time

var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;

    uniform vec4 u_FragColor;

    uniform sampler2D u_Sampler0; //sky
    uniform sampler2D u_Sampler1; //ground
   

   


    uniform int u_whichTexture;
    void main() {

        if (u_whichTexture == -2) {
            gl_FragColor = u_FragColor;
        } else if (u_whichTexture == -1) {
            gl_FragColor = vec4(v_UV, 1.0, 1.0);
        } else if (u_whichTexture == 0) {
            gl_FragColor = texture2D(u_Sampler0, v_UV);
        } else if (u_whichTexture == 1) {
            gl_FragColor = texture2D(u_Sampler1, v_UV);
        } else {
            gl_FragColor = vec4(1, 0, 1, 1);
        }
        
    }`;
    
function addActionsForHtmlUI() {
  document.getElementById('Perspective').addEventListener('mousemove', function () { g_camera.perspective(this.value); renderScene(); }); //idk why its not working but try here
  document.getElementById('cameraButton').addEventListener('click', function() {g_camera.setEye(0,20,-60)});
  }
  //try again??
  function mouseCam(ev){
   coord = convertCoordinatesToGL(ev);
   if(coord[0] < 0.5){ // left side
      g_camera.panMLeft(coord[0]*-10);
   } else{
      g_camera.panMRight(coord[0]*-10);
   }
}
//it just breaks if i modify above
function drag(ev){
   coord = convertCoordinatesToGL(ev);
     if (canvas.dragActive) {
   if(coord[0] < 0.5){ // left side
      g_camera.panMLeft(coord[0]*-10);
   } else{
      g_camera.panMRight(coord[0]*-10);
   }}
}

function keydown(ev){
   if(ev.keyCode == 68){ // Right Arrow or D
      g_camera.right();
   } else if (ev.keyCode == 65){ // Left Arrow or A
      g_camera.left();
   } else if (ev.keyCode == 87){ // up Arrow or W
      g_camera.forward();
   } else if (ev.keyCode == 83){ // down Arrow or S
      g_camera.back();
   } else if (ev.keyCode==81){ // Q
      g_camera.panLeft();
   } else if (ev.keyCode==69){ // E
      g_camera.panRight();
   } else if (ev.keyCode == 88){ //up X
      g_camera.Up();
   } else if (ev.keyCode == 90){ //down Z
    g_camera.Down();
   } else if (ev.keyCode == 78) {
      addBlock();
   } else if (ev.keyCode == 77) {
    removeBlock();
  } 
   renderScene();
}


// function removeBlock(){
  
  
//     g_map[0][0] -= 1;
  
//     if (g_map[0][0] ==0){ console.log("too less blocks");}
//     console.log("0 blocks left");
  
//   }

// function addBlock(){
  
   
//     g_map[0][0] += 1;
  
// if (g_map[0][0] ==64){ console.log("too many blocks");}
//   console.log("create new block");
//   console.log(g_map[0][0]);
//   }

// function removeBlock() {
//     const columnIndex = getMapIndexFromCameraX();
//     // Assuming we remove blocks only from the first row that has blocks (from top)
//     for (let rowIndex = 0; rowIndex < g_map.length; rowIndex++) {
//         if (g_map[rowIndex][columnIndex] > 0) {
//             g_map[rowIndex][columnIndex] -= 1;
//             console.log(`Block at ${rowIndex}, ${columnIndex} decremented to ${g_map[rowIndex][columnIndex]}`);
//             if (g_map[rowIndex][columnIndex] === 0) {
//                 console.log(`Block removed at ${rowIndex}, ${columnIndex}. No more blocks left here.`);
//             }
//             break; // Stop after modifying the first block found
//         }
//     }
// }

// function addBlock() {
//     const columnIndex = getMapIndexFromCameraX();
//     // Assuming we add blocks only to the first row that isn't maxed out (from top)
//     for (let rowIndex = 0; rowIndex < g_map.length; rowIndex++) {
//         if (g_map[rowIndex][columnIndex] < 64) {
//             g_map[rowIndex][columnIndex] += 1;
//             console.log(`Block at ${rowIndex}, ${columnIndex} incremented to ${g_map[rowIndex][columnIndex]}`);
//             break; // Stop after adding one block
//         }
//     }
// }


// function getMapIndexFromCameraX() {
//     const xPosition = g_camera.eye.elements[0];

//     const mapWidth = g_map[0].length;
//     let index = Math.round((xPosition + mapWidth / 2) * (mapWidth / (mapWidth + mapWidth / 2)));

//     return Math.max(0, Math.min(mapWidth - 1, index));
// }
// //this should help with distance calc

// function getMapCoordinates() {
//     // Compute the direction vector from the camera
//     let direction = new Vector3();
//     direction.set(g_camera.at);
//     direction.sub(g_camera.eye).normalize();

//     // Calculate intersection with the y=0 plane (assuming a horizontal grid)
//     let t = -g_camera.eye.elements[1] / direction.elements[1]; // Assuming horizontal plane at y=0
//     let xIntersection = g_camera.eye.elements[0] + t * direction.elements[0];
//     let zIntersection = g_camera.eye.elements[2] + t * direction.elements[2];

//     // Assuming grid dimensions (width and height) as 32x32
//     const gridSize = 32;
//     const colIndex = gridSize - 1 - Math.floor((zIntersection + gridSize / 2) % gridSize); // Invert the column index
//     const rowIndex = gridSize - 1 - Math.floor((xIntersection + gridSize / 2) % gridSize); // Invert the row index

//     return { colIndex, rowIndex };
// }

// function modifyBlock(amount) {
//     const { colIndex, rowIndex } = getMapCoordinates();

//     if (rowIndex >= 0 && rowIndex < g_map.length && colIndex >= 0 && colIndex < g_map[rowIndex].length) {
//         g_map[rowIndex][colIndex] += amount;
//         g_map[rowIndex][colIndex] = Math.max(0, Math.min(64, g_map[rowIndex][colIndex]));
//         console.log(`Block ${amount > 0 ? 'added' : 'removed'} at (${rowIndex}, ${colIndex}). Total: ${g_map[rowIndex][colIndex]}`);
//     } else {
//         console.log("Targeted position out of map bounds.");
//     }
// }

// function addBlock() {
//     modifyBlock(1);
// }

// function removeBlock() {
//     modifyBlock(-1);
// }

function getMapCoordinates() {
    // Compute the direction vector from the camera
    let direction = new Vector3();
    direction.set(g_camera.at);
    direction.sub(g_camera.eye).normalize();

    // Calculate intersection with the y=0 plane (assuming a horizontal grid)
    let t = -g_camera.eye.elements[1] / direction.elements[1]; // Assuming horizontal plane at y=0
    let xIntersection = g_camera.eye.elements[0] + t * direction.elements[0];
    let zIntersection = g_camera.eye.elements[2] + t * direction.elements[2];

    // Assuming grid dimensions (width and height) as 32x32
    const gridSize = 32;
    const halfGridSize = gridSize / 2;
    const colIndex = Math.floor((zIntersection + halfGridSize) % gridSize); // Direct mapping after normalization
    const rowIndex = Math.floor((xIntersection + halfGridSize) % gridSize); // Direct mapping after normalization

    return { colIndex, rowIndex };
}

function modifyBlock(amount) {
    const { colIndex, rowIndex } = getMapCoordinates();

    if (rowIndex >= 0 && rowIndex < g_map.length && colIndex >= 0 && colIndex < g_map[rowIndex].length) {
        g_map[rowIndex][colIndex] += amount;
        g_map[rowIndex][colIndex] = Math.max(0, Math.min(64, g_map[rowIndex][colIndex]));
        console.log(`Block ${amount > 0 ? 'added' : 'removed'} at (${rowIndex}, ${colIndex}). Total: ${g_map[rowIndex][colIndex]}`);
    } else {
        console.log("Targeted position out of map bounds.");
    }
}

function addBlock() {
    modifyBlock(1);
}

function removeBlock() {
    modifyBlock(-1);
}


// Main function
function main() {
    setupWebGL();
    connectVariablesToGLSL();
     addActionsForHtmlUI();
    
    //didnt work idk why. just remove the slider. 
//jk perspective is a requirement
    g_camera = new Camera(); //made a file. will test
    
    //make a new file for this thing
    initTextures(); //this function might be the issue?

    xSlider = document.getElementById("x");
    ySlider = document.getElementById("y");
    zSlider = document.getElementById("z");
    //initTextures(); //this function might be the issue?
    // document.getElementById('CameraPerspective').addEventListener('mousemove', function () { g_camera.setPerspective(this.value); renderScene(); });

//inittextures was AN issue 
   
  // canvas.onmousemove = function(ev){
  //     mouseCam(ev);
  // }
  
  canvas.onmousedown = function(ev) {
    if (ev.button === 0) { // Left mouse button
        canvas.dragActive = true;
    }
};
canvas.onmousemove = function(ev) {
    if (canvas.dragActive) {
        mouseCam(ev);
        renderScene(); //oh. lmoa thats why it wasnt working 
    }
};
canvas.onmouseup = function(ev) {
    if (ev.button === 0) { // Left mouse button
        canvas.dragActive = false;
    }
};


document.onkeydown = keydown;

// let isMouseDown = false;

// canvas.addEventListener('mousedown', function(ev) {
//     isMouseDown = true;
// });

// canvas.addEventListener('mousemove', function(ev) {
//     if (isMouseDown) {
//         mouseCam(ev);
//     }
// });

// canvas.addEventListener('mouseup', function(ev) {
//     isMouseDown = false;
// });

  

   //this part is same as before
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
    global = new Matrix4();
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);

    
    renderScene();
   tick();
    // drawWalls();
    //where tf do i move this so its not that expensive???

    // global = new Matrix4();
    // gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);
}

function setupWebGL() {
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true}); //always use this high performance
    //option
    if (!gl) {
        console.error('Failed to get the rendering context for WebGL');
        return;
    }
    gl.enable(gl.DEPTH_TEST);
} //this function is not the issue

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('Failed to initialize shaders.');
        return;
    }

    // Connect the shader attributes and uniforms
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    a_Color = gl.getAttribLocation(gl.program, 'a_Color'); //mistake
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotationMatrix');
    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');

    // for (let i = 0; i < 2; i++) {
    //     gl.uniform1i(gl.getUniformLocation(gl.program, `u_Sampler${i}`), i);
    // } //this is a better way so i dont have to manually do all that 
    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function initTextures() {
    // // loadTexture('ny.jpg', 0); 
    // // loadTexture('lavatile.jpg', 1); 

    // let counter = 0;

    // while (!texturelist.length) {
    //     //keep generic for when i add more textures
    //     //only need to 
    //     let img = new Image();

    //     img.onload = function() {
    //         loadTexture( img, counter);
    //         counter++;
          
    //         drawEnvironment();  
    //     }
    
    //     img.src = texturelist[counter];
    // }
    
    
    // return true;

    var image = new Image();  //im tired
    var image1 = new Image();

    //doing this the stupid way 
    image.onload = function(){ sendTextureToTEXTURE0(image); renderScene(); }; //oh lmao this is why it wasnt loading textures at startup
    image1.onload = function(){ sendTextureToTEXTURE1(image1); renderScene(); requestAnimationFrame(tick); };//call only once bc expensive jk idk 

    // image.crossOrigin = 'anonymous';
    // image1.crossOrigin = 'anonymous';
    
    image.src = textureSelect();;
    image1.src = 'ny.jpg';
    return true;



}
function textureSelect() {
    var texture = document.getElementById('textureSelect').value;
    console.log("Selected texture:", texture);
    
    
    
    switch (texture) {
      case 'lava':
        return 'lavatile.jpg';
        break;
      case 'earth':
        return 'Sky.jpg';
        break;
      case 'dream':
        return 'ny.jpg';
        break;
      case 'ocean':
        return 'ocean.jpeg';
        break;
      default:
      return 'lavatile.jpg';
        break;
      
    }
}

//discord said to add this 
function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }


  function sendTextureToTEXTURE0(image) { //GROUND
    var texture = gl.createTexture();
    if(!texture){
       console.log('Failed to create the texture object');
       return false;
    }
 
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
   // Enable texture unit0
   gl.activeTexture(gl.TEXTURE0);
   // Bind the texture object to the target
   gl.bindTexture(gl.TEXTURE_2D, texture);
   //wait why is this issue only showing up in 3B and not 3A ???
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
 
   if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
   } else {
      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   }
 
   // Set the texture unit 0 to the sampler
   gl.uniform1i(u_Sampler0, 0);
 
 
   console.log("Finished loadTexture");
 }


 //this will be sky aka ny.jpg
 function sendTextureToTEXTURE1(image) {
    var texture = gl.createTexture();
    if(!texture){
       console.log('Failed to create the texture object');
       return false;
    }
 
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
   // Enable texture unit0
   gl.activeTexture(gl.TEXTURE1);
   // Bind the texture object to the target
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
 
   if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
   } else {
      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   }
 
   // Set the texture unit 1 to the sampler
   gl.uniform1i(u_Sampler1, 1);
 
 
   console.log("Finished loadTexture1");
 }


// function loadTexture(url, textureUnit, sampleID) {
//     const texture = gl.createTexture();
//     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
//     gl.activeTexture(gl.TEXTURE0 + textureUnit);
//     gl.bindTexture(gl.TEXTURE_2D, texture);

//     const image = new Image();
//     image.onload = function() {
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//         gl.uniform1i(sampler(sampleID), sampleID);
//     };
//     image.src = url;
// }


//just combine them and save the loading error headache

//just kidding 

function loadTexture(img, samplerID) {
    let texture = gl.createTexture();

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0 + samplerID); //does this work?
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.uniform1i(sampler(samplerID), samplerID);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
//not using atm


//need the coord conversion back 
function convertCoordinatesToGL(ev) {
    var x = ev.clientX; 
    var y = ev.clientY; 
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - 400/2)/(400/2);
    y = (400/2 - (y - rect.top))/(400/2); //size of my canvas

    return ([x, y]);
}
// Shaders initialization function (assumed to exist)
function initShaders(gl, vsSource, fsSource) {
    const program = createProgram(gl, vsSource, fsSource);
    if (!program) {
        console.error('Failed to create program');
        return false;
    }
    gl.useProgram(program);
    gl.program = program;
    return true;
}

function createProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function renderScene(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //let projectionMatrix = new Matrix4();
    //projectionMatrix.setPerspective(90, canvas.width / canvas.height, 0.1, 100);
    //now this is being defined only in my camera class
    //now called projMat
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projMat.elements);

    let viewMatrix = new Matrix4();
    
    //replace below. now its dynamic
    //viewMatrix.setLookAt(0, 2, -10,      0, 0, 0,    0, 1, 0); //adjust this when camera mishaps
    //gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    viewMatrix.setLookAt( //can take this out of my camera class
    g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2],
    g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2],
    g_camera.up.elements[0], g_camera.up.elements[1], g_camera.up.elements[2],);//look at (eye, at, up)
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  
  //eye, at ,up


//i dont think any of this needs to be messed with
    global.setRotate(-xSlider.value, 1, 0, 0);
    global.rotate(ySlider.value, 0, 1, 0);
    global.rotate(zSlider.value, 0, 0, 1);
    //at neutral positions the sliders doesnt do anything 
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawEnvironment();
    drawAllShapes();
    drawWalls();
    //removed just for checking 
  requestAnimationFrame(tick);
    
}

const texturelist = [
    'ny.png',
    'lavatile.png',
    
]

function sampler(i) {
    // return  `u_Sampler${i}`;
    if (i == 0){
        return u_Sampler0; 
    }
    if (i == 1){
        return u_Sampler1;  
    }
}


//oof
let g_map = [ //make this like a bowl so the cat cant escape
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
    [0, 5, 5, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 5, 5, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2,2],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
    [0, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3, 3, 4, 5, 4, 4,4 , 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5]
];


//adding back the cat

var fps = 30;
var g_startTime = performance.now() / 1000.0;
var lastFrameTime = performance.now();
var frameCount = 0;

function tick() {
    const now = performance.now();
    if (now - lastFrameTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = now;
        document.getElementById('fps').textContent = 'FPS: ' + fps;
    }
    frameCount++;
    // if (g_Animation) updateAnimation();
    // updateAnimation(now);
    //renderScene();
     //requestAnimationFrame(tick);
    //tick();
}













