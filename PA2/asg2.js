
// var gl;
// var canvas;
// var a_Position;
// var u_FragColor;
// var u_ModelMatrix;
// var u_GlobalRotateMatrix;

// var g_globalAngle = 0; // Camera
var g_verticalAngle =0;
var head_animation = 0; //declare those here

// var isDragging = false; // Track if the mouse is being dragged
// var lastX = -1; // Last position of the cursor on the X-axis
// // scrapped this

// var identityM = new Matrix4();


var g_jointAngle = 0; // Joint 1
var g_jointAngle2 = 0; // Joint 2
var g_jointAnimation = false; // Joint 2
// not using some of these

var g_tailJoint1 = 0; 
var g_tailJoint2 = 0; 
var g_tailJoint3 = 0;

// // the shift click 
var earAnimation = false; // Control for ear animation
var g_earAngle = 0; // Initial angle for the ear animation


// // Animation
// var g_startTime = performance.now()/1000.0;
// var g_seconds = performance.now()/1000.0 - g_startTime;
// var lastFrameTime = performance.now();
// var frameCount = 0;
// var fps = 0;



// var VSHADER_SOURCE =
//     'attribute vec4 a_Position;\n' +
//     'uniform mat4 u_ModelMatrix;\n' +
//     'uniform mat4 u_GlobalRotateMatrix;\n' +
//     'void main() {\n' +
//     ' gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
//     '}\n';

// var FSHADER_SOURCE =
//     'precision mediump float;\n' +
//     'uniform vec4 u_FragColor;\n' +
//     'void main() {\n' +
//     '  gl_FragColor = u_FragColor;\n' + // Set the point color (red)
//     '}\n';

// function addActionsForHtmlUI(){
//    // Color Slider Events
//   // document.getElementById('camera').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes();});
// //    document.getElementById('joint').addEventListener('mousemove', function() { g_jointAngle = this.value; renderAllShapes();});
// //    document.getElementById('joint2').addEventListener('mousemove', function() { g_jointAngle2 = this.value; renderAllShapes();});

//    document.getElementById('tailJoint1').addEventListener('mousemove', function() {
//     g_tailJoint1 = parseFloat(this.value); // Ensure the value is converted to a float
//     renderAllShapes(); // Call to re-render the scene
// });
// document.getElementById('tailJoint2').addEventListener('mousemove', function() {
//     g_tailJoint2 = parseFloat(this.value); // Ensure the value is converted to a float
//     renderAllShapes(); // Call to re-render the scene
// });
// document.getElementById('tailJoint3').addEventListener('mousemove', function() {
//     g_tailJoint3 = parseFloat(this.value); // Ensure the value is converted to a float
//     renderAllShapes(); // Call to re-render the scene
// });

//    document.getElementById('animate_on').onclick = function() {g_jointAnimation = true;};
//    document.getElementById('animate_off').onclick = function() {g_jointAnimation = false;};

// }

// function setupWebGL(){
//    // Retrieve <canvas> element
//    canvas = document.getElementById('asg');
   
//    if (!canvas) {
//        console.log('Failed to retrieve the <canvas> element');
//        return;
//    }

//    // Rendering context for WebGL
//    // gl = canvas.getContext("asg1", {preserveDrawingBuffer: true});
//    gl = getWebGLContext(canvas);
//    if(!gl){
//        console.log('Failed to get the rendering context for WebGL');
//        return;
//    }

//    gl.enable(gl.DEPTH_TEST);
// }

// function connectVariablesToGLSL(){
//    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//        console.log('Failed to intialize shaders.');
//        return;
//    }
//    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
//    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
//    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
//    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
//    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

// //    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
// //    if (a_Position < 0) {
// //        console.log('Failed to get the storage location of a_Position');
// //        return;
// //    }

// //    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
// //    if (!u_FragColor) {
// //        console.log('Failed to get u_FragColor');
// //        return;
// //    }

// //    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
// //    if (!u_ModelMatrix) {
// //        console.log('Failed to get u_ModelMatrix');
// //        return;
// //    }

// //    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
// //    if (!u_GlobalRotateMatrix) {
// //        console.log('Failed to get u_GlobalRotateMatrix');
// //        return;
// //    }

// //    var identityM = new Matrix4();
// //    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

// }

// // function addMouseControl() {
// //     canvas.onmousedown = function(ev) {
// //         isDragging = true;
// //         lastX = ev.clientX;
// //     };
// //     canvas.onmouseup = function(ev) {
// //         isDragging = false;
// //     };
// //     canvas.onmousemove = function(ev) {
// //         if (isDragging) {
// //             var factor = 10 / canvas.height;
// //             var dx = factor * (ev.clientX - lastX);
// //             g_globalAngle += dx;
// //             renderAllShapes();
// //         }
// //         lastX = ev.clientX;
// //     };
// // }

let ev;
function click(ev){
    if (ev.shiftKey && ev.button === 0) { 
        earAnimation = !earAnimation;
        console.log("poke"); 
    }else{
  g_globalAngle -= ev.movementX;
  g_verticalAngle -= ev.movementY;
  //ev = ev;
    }
    
  renderScene();
}


// function main() {
//    setupWebGL();
//    connectVariablesToGLSL();
//    addActionsForHtmlUI();
//    //addMouseControl(); // Setup mouse controls for rotation
//    canvas.onmousedown=click;
//     canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); } };


//    // Specify the color for clearing <canvas>
//    gl.clearColor(0.0, 0.0, 0.0, 1.0);
//    // Clear <canvas>
//    // gl.clear(gl.COLOR_BUFFER_BIT);

//    requestAnimationFrame(tick);
// } // end of main

// // function tick(){
// //    g_seconds = performance.now()/1000.0 - g_startTime;
// //    updateAnimationAngles();
// //    renderAllShapes();
// //    requestAnimationFrame(tick);
// // }

// function tick() {
//     var now = performance.now();
//     frameCount++;
//     if (now - lastFrameTime >= 1000) { // update every second
//         fps = frameCount;
//         frameCount = 0;
//         lastFrameTime = now;
//         document.getElementById('fps').textContent = 'FPS: ' + fps; // Update the FPS display
//     }

//     g_seconds = performance.now()/1000.0 - g_startTime;
//     updateAnimationAngles();
//     renderAllShapes();
//     requestAnimationFrame(tick);
// }

// function calculateGlobalRotationMatrix() {
//     var globalRotMat = new Matrix4();
//     globalRotMat.rotate(g_globalAngle, 0, 1, 0);
//     globalRotMat.rotate(g_verticalAngle, 1, 0, 0);
//     return globalRotMat.elements;
// }

// function renderAllShapes(){
// //    // Pass the matrix to u_ModelMatrix attribute
// //    var globalRotMat = new Matrix4().rotate(g_globalAngle, 0,1,0);
// //    globalRotMat.rotate(g_verticalAngle, 1, 0, 0);
// //    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

// gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, calculateGlobalRotationMatrix());


//    // Clear <canvas>
//    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// //    gl.clear(gl.COLOR_BUFFER_BIT);

//    drawAllShapes();
// }

// function updateAnimationAngles(){
//    if(g_jointAnimation){
//       g_jointAngle = 30*Math.sin(g_seconds);
//       head_animation = 15*Math.sin(g_seconds);
//       g_tailJoint1=10*Math.sin(g_seconds);
//       g_tailJoint2=10*Math.sin(g_seconds);
//       g_tailJoint3=10*Math.sin(g_seconds);
//    }
//    if (earAnimation) {
//     g_earAngle = 10 * Math.sin(2 * g_seconds);
    
// }
   
// }

// Vertex and Fragment Shaders
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`;

var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`;

// Global Variables
let canvas, gl, a_Position, u_FragColor, u_ModelMatrix, u_GlobalRotateMatrix;
let g_globalAngle = 0, g_Animation = false;
var g_startTime = performance.now() / 1000.0;
var lastFrameTime = performance.now();
var frameCount = 0;
var fps = 0;

function setupWebGL() {
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true}); //wait this actually has to be named webgl?? damn
    if (!gl) {
        console.error('Failed to get the rendering context for WebGL');
        return;
    }
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('Failed to initialize shaders.');
        return;
    }
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
}

function addActionsForHtmlUI() {
    document.getElementById('animate_on').onclick = function() {g_jointAnimation = true;};
        document.getElementById('animate_off').onclick = function() {g_jointAnimation = false;};
    // document.getElementById("angleSlide").oninput = (event) => {
    //     g_globalAngle = event.target.value;
    //     renderScene();
    // };
   document.getElementById('tailJoint1').addEventListener('mousemove', function() {
    g_tailJoint1 = parseFloat(this.value); // Ensure the value is converted to a float
    renderScene(); // Call to re-render the scene
});
document.getElementById('tailJoint2').addEventListener('mousemove', function() {
    g_tailJoint2 = parseFloat(this.value); // Ensure the value is converted to a float
    renderScene(); // Call to re-render the scene
});
document.getElementById('tailJoint3').addEventListener('mousemove', function() {
    g_tailJoint3 = parseFloat(this.value); // Ensure the value is converted to a float
    renderScene(); // Call to re-render the scene
});
}

function main() {
    setupWebGL();
    connectVariablesToGLSL();
    addActionsForHtmlUI();

    canvas.onmousedown=click;
  canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); } };


    requestAnimationFrame(tick);
}

function handleMouse(ev) {
    g_globalAngle -= ev.movementX;
    g_verticalAngle -= ev.movementY;
    renderScene();
}

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
    updateAnimation(now);
    renderScene();
    requestAnimationFrame(tick);
}

function updateAnimation(now) {
    const elapsed = (now - g_startTime) / 1000.0;
    if (g_jointAnimation) {
    g_jointAngle = 30*Math.sin(elapsed);
      head_animation = 15*Math.sin(elapsed);
      g_tailJoint1=10*Math.sin(elapsed);
      g_tailJoint2=10*Math.sin(elapsed);
      g_tailJoint3=10*Math.sin(elapsed);
    }
    if (earAnimation) {
        g_earAngle = 10 * Math.sin(2 * elapsed);
        g_tailJoint1=5*Math.sin(elapsed);
      g_tailJoint2=10*Math.sin(elapsed);
      g_tailJoint3=15*Math.sin(elapsed);
    }
}

function renderScene() {
    var globalRotMat = new Matrix4();
    globalRotMat.setRotate(g_globalAngle, 0, 1, 0); // Global rotation
    globalRotMat.rotate(g_verticalAngle, 1, 0, 0); // Vertical rotation
   // globalRotMat.rotate(g_earAngle, 0, 1, 1);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawAllShapes();
}


