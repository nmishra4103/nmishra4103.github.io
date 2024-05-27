



// gloabal vars
let canvas, gl;
let a_Normal;
let u_Size;
let u_NormalMatrix;
let a_Position, a_Color, a_UV, u_whichTexture, u_FragColor;
let u_GlobalRotationMatrix, u_ModelMatrix, u_ProjectionMatrix, u_ViewMatrix;
let u_Sampler0, u_Sampler1;
let globalRotx, globalRoty, globalRotz, global;
let xSlider, ySlider, zSlider;
let fpsCounter;
let u_lightPos;
let g_camera;
let u_Clicked;// should i use this??
var g_normalOn = false;
var g_lightOn = true;
var g_lightPos = [0,1,1];
let u_cameraPos;
let u_SpotLightPos;

let u_lightColor;
let lightColor = [1.0, 1.0, 1.0]; // Initial color white



document.addEventListener('DOMContentLoaded', function() {
    main();
});


// dawg i am LOSING IT
// Vertex and Fragment Shaders
var VSHADER_SOURCE =`
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   attribute vec3 a_Normal;
   varying vec2 v_UV;
   varying vec3 v_Normal;
   varying vec4 v_VertPos;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_NormalMatrix;
   uniform mat4 u_GlobalRotationMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   void main() {
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotationMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
      v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal,1)));
      v_VertPos = u_ModelMatrix * a_Position;
   }`; //no issues here this one is fine


var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;
    varying vec3 v_Normal;
    uniform vec4 u_FragColor;
    
        uniform vec3 u_lightColor; // Add light color uniform

    
    uniform int u_whichTexture;
    
    uniform vec3 u_lightPos;
    uniform vec3 u_cameraPos;
    varying vec4 v_VertPos;
    uniform bool u_lightOn;
    
    //uniform vec3 u_lightColor; 

    
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;

    // Spotlight uniforms
    uniform vec3 u_spotLightPos;
    uniform vec3 u_spotLightDir;
    uniform float u_spotLightCutoff;
    uniform float u_spotLightExponent;

    void main() {
      if(u_whichTexture == -3){
         gl_FragColor = vec4((v_Normal+1.0)/2.0, 1.0); // Use normal
      } else if(u_whichTexture == -2){
         gl_FragColor = u_FragColor; 
         // Use color
      } else if (u_whichTexture == -1){
      
      
        // gl_FragColor = vec4(0,0, v_UV);
        gl_FragColor = vec4(v_UV, 1.0, 1.0);
         
      } else if(u_whichTexture == 0){
         gl_FragColor = texture2D(u_Sampler0, v_UV);  // Use texture0
      } else if(u_whichTexture == 1){
         gl_FragColor = texture2D(u_Sampler1, v_UV);  // Use texture1
      } else {
         gl_FragColor = vec4(1,.2,.2,1);              // Error, Red
      }

      vec3 lightVector = u_lightPos-vec3(v_VertPos);
      float r = length(lightVector);

      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      float nDotL = max(dot(N,L), 0.0);
      
      vec3 R = reflect(-L,N); //need to modify?
       //R.x = -R.x;
       
       //DAWG WHY IS THE REFLECTION IN THE WRONG DIRECTION??
     vec3 E = normalize(u_cameraPos-vec3(v_VertPos));

      // Specular
      float specular = pow(max(dot(E,R), 0.0), 10.0) *0.5;

     // vec3 diffuse = vec3(gl_FragColor) * nDotL * 0.7;
     // vec3 ambient = vec3(gl_FragColor) * 0.3;
      //vec4 finalColor = vec4(specular+diffuse+ambient, 1.0);
      vec3 diffuse =  u_lightColor * vec3(gl_FragColor) * nDotL * 0.7;
       vec3 ambient = u_lightColor * vec3(gl_FragColor) * 0.3;
       vec4 finalColor = vec4(specular+diffuse+ambient, 1.0);
      

      // Spotlight calculations
      vec3 spotLightVector = u_spotLightPos - vec3(v_VertPos);
      float spotLightDistance = length(spotLightVector);
      vec3 spotLightDir = normalize(spotLightVector);
      float spotEffect = dot(spotLightDir, normalize(-u_spotLightDir));
       vec3 spotLightReflect = reflect(-spotLightDir, N);
        float spotSpecular = pow(max(dot(E, spotLightReflect), 0.0), 10.0) ;
      if(spotEffect > u_spotLightCutoff){
        spotEffect = pow(spotEffect, u_spotLightExponent) ;
        vec3 spotLightColor = u_lightColor * spotEffect;
        finalColor.rgb += spotLightColor * vec3(gl_FragColor) * spotEffect + spotSpecular;
      }

      if(u_lightOn){
          gl_FragColor = finalColor;
      } else {
          gl_FragColor = vec4(gl_FragColor.rgb * 0.3, gl_FragColor.a); // Ambient only if light is off
      }
    }`;

    
function addActionsForHtmlUI() {
  document.getElementById('Perspective').addEventListener('mousemove', function () { g_camera.perspective(this.value); renderScene(); }); //idk why its not working but try here
  document.getElementById('cameraButton').addEventListener('click', function() {g_camera.setEye(0,20,-60)});
  }
  document.getElementById('normal_on').onclick = function() {g_normalOn = true;};

  
  document.getElementById('normal_off').onclick = function() {g_normalOn = false;};
   document.getElementById('light_on').onclick = function() {g_lightOn = true;};
   document.getElementById('light_off').onclick = function() {g_lightOn = false;};
   
   document.getElementById('lightx').addEventListener('mousemove', function(ev) { if(ev.buttons == 1){ g_lightPos[0] = this.value/100; renderScene();}});
   document.getElementById('lighty').addEventListener('mousemove', function(ev) { if(ev.buttons == 1){ g_lightPos[1] = this.value/100; renderScene();}});
   document.getElementById('lightz').addEventListener('mousemove', function(ev) { if(ev.buttons == 1){ g_lightPos[2] = this.value/100; renderScene();}});
   
    document.getElementById('lightRed').addEventListener('input', function() {
    lightColor[0] = parseFloat(this.value);
    renderScene();
  });
  document.getElementById('lightGreen').addEventListener('input', function() {
    lightColor[1] = parseFloat(this.value);
    renderScene();
  });
  document.getElementById('lightBlue').addEventListener('input', function() {
    lightColor[2] = parseFloat(this.value);
    renderScene();
  });

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
   
   
   
   //add that other light sliders and stuff here
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



  

   //this part is same as before
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
    global = new Matrix4();
    gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, global.elements);

    
    // requestAnimationFrame(tick);
    // g_seconds = performance.now()/1000.0 - g_startTime;
    // updateAnimationAngles();
   
   // renderScene();
     g_startTime = performance.now() / 1000.0;
    tick();
     

    
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
       a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
   u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
   u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
   u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
   u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
       u_lightColor = gl.getUniformLocation(gl.program, 'u_lightColor'); // Add uniform 

//is this a double?

//spotlight
u_spotLightPos = gl.getUniformLocation(gl.program, 'u_spotLightPos');
    u_spotLightDir = gl.getUniformLocation(gl.program, 'u_spotLightDir');
    u_spotLightCutoff = gl.getUniformLocation(gl.program, 'u_spotLightCutoff');
    u_spotLightExponent = gl.getUniformLocation(gl.program, 'u_spotLightExponent');

    // for (let i = 0; i < 2; i++) {
    //     gl.uniform1i(gl.getUniformLocation(gl.program, `u_Sampler${i}`), i);
    // } //this is a better way so i dont have to manually do all that 
    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function initTextures() {


    var image = new Image();  //im tired
    var image1 = new Image();

    //doing this the stupid way 
    image.onload = function(){ sendTextureToTEXTURE0(image); renderScene(); }; //oh lmao this is why it wasnt loading textures at startup
    image1.onload = function(){ sendTextureToTEXTURE1(image1); renderScene(); };//call only once bc expensive jk idk 

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
     g_seconds = performance.now()/1000.0 - g_startTime;
     updateAnimationAngles();

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
    
      gl.uniform3fv(u_spotLightPos, [0.5, 1.5, 0.0]);  
    gl.uniform3fv(u_spotLightDir, [0.0, -.5, 0.0]); // Example spotlight direction
    gl.uniform1f(u_spotLightCutoff, Math.cos(Math.PI / 8)); // 22.5 degree cutoff
    gl.uniform1f(u_spotLightExponent, 15.0); // Example exponent for spotlight
    
      gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
      gl.uniform3fv(u_lightColor, lightColor); // Set the light color uniform
  

  
 

    
    //is it ok if i get rid of this??
    //crowd says no 

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    drawAllShapes();
    //removed just for checking 
    
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
var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

// function tick() {
//     const now = performance.now();
//     if (now - lastFrameTime >= 1000) {
//         fps = frameCount;
//         frameCount = 0;
//         lastFrameTime = now;
//         document.getElementById('fps').textContent = 'FPS: ' + fps;
//     }
//     frameCount++;
//   // g_lightPos[0]=2*cos(g_seconds);
 
// }


// function tick(){
//   g_seconds = performance.now()/1000.0 - g_startTime;
//   updateAnimationAngles();
//   renderScene();
//   requestAnimationFrame(tick);
// }

function tick() {
    g_seconds = performance.now() / 1000.0 - g_startTime;
    updateAnimationAngles();
    renderScene();
    requestAnimationFrame(tick);
}

function updateAnimationAngles(){
 g_lightPos[0]=2*Math.cos(g_seconds);
}






















