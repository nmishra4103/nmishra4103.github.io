// gloabal vars
let canvas, gl;
let a_Position, a_Color, a_UV, u_whichTexture, u_FragColor;
let u_GlobalRotationMatrix, u_ModelMatrix, u_ProjectionMatrix, u_ViewMatrix;
let u_Sampler0, u_Sampler1;
let globalRotx, globalRoty, globalRotz, global;
let xSlider, ySlider, zSlider;
let fpsCounter;

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

// Main function
function main() {
    setupWebGL();
    connectVariablesToGLSL();

    //g_camera = new Camera(); //make a new file for this thing
    initTextures(); //this function might be the issue?

    xSlider = document.getElementById("x");
    ySlider = document.getElementById("y");
    zSlider = document.getElementById("z");
    //initTextures(); //this function might be the issue?

//inittextures was AN issue 

   //this part is same as before
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
    global = new Matrix4();
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);

    
    renderScene();

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
    image1.onload = function(){ sendTextureToTEXTURE1(image1); renderScene(); };
    image.src = 'lavatile.jpg';
    image1.src = 'ny.jpg';
    return true;



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

    let projectionMatrix = new Matrix4();
    projectionMatrix.setPerspective(90, canvas.width / canvas.height, 0.1, 100);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix.elements);

    let viewMatrix = new Matrix4();
    viewMatrix.setLookAt(0, 2, -10,      0, 0, 0,    0, 1, 0); //adjust this when camera mishaps
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

    global.setRotate(-xSlider.value, 1, 0, 0);
    global.rotate(ySlider.value, 0, 1, 0);
    global.rotate(zSlider.value, 0, 0, 1);
    //at neutral positions the sliders doesnt do anything 
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawEnvironment();

    
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
