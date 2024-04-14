// var g_points = []; // The array for the position of a mouse press
// var g_colors = []; // The array to store color of a point
var shape = 0; // 0 is square, 1 is triangles, 2 is circles
var size = 5; //10 is TOO damn large
var sCount = 10;
var drag = false;
var canvas;
// New features
var savedColors = []; // Array to store saved colors
var maxSavedColors = 9; // Maximum number of saved colors
var u_Size;
var a_Position;
var u_FragColor;


var currentClearColor = [0.0, 0.0, 0.0, 1.0]; // default to black
//glb black for canvas

var g_shapesList = [];

var shapeData = [];
var eraserEnabled = false; // Global state for eraser

function toggleEraser() {
    eraserEnabled = true;
    defaultMode = false;

    console.log("Eraser mode: ON" );
}



var gl; //yeah we need this global

//feature ideas from mom: - play royalty free music in the background while you draw
// - 

var defaultMode = false; // Toggle for default drawing mode

//i literally cannot find anything in this trashpile. why did i do this
//please trust me i met all the requirements

// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform float u_Size;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = u_Size;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' + // Set the point color (red)
    '}\n';

    function setupWebGL() {
        canvas = document.getElementById('webgl');
        if (!canvas) {
            console.log('Failed to retrieve the <canvas> element');
            return;
        }
        //gl = getWebGLContext(canvas);
        gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});

        //OMG THIS IS SO FAST
        //davis the goat
        if (!gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }
    } //modularizing now because i didnt read the instructions when i did this

    function connectVariablesToGLSL(){
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            console.log('Failed to intialize shaders.');
            return;
        }
     
        a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }
     
        u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
        if (!u_FragColor) {
            console.log('Failed to get u_FragColor');
            return;
        }
     
        u_Size = gl.getUniformLocation(gl.program, 'u_Size');
        if (!u_Size) {
            console.log('Failed to get u_Size');
            return;
        }
     
     }

function handleClicks() {
    canvas.onmousedown = function (ev) {
        click(ev);
        drag = true;
    };
    canvas.onmouseup = function (ev) {
        drag = false;
    };
    canvas.onmousemove = function (ev) {
        if (drag) {
            click(ev);
        }
    };
}



function main() {

    setupWebGL()
    connectVariablesToGLSL()
    handleClicks();
    renderAllShapes();
    addActionsForHtmlUI();
   
  //gl.clearColor(currentClearColor[0], currentClearColor[1], currentClearColor[2], currentClearColor[3]);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  updateColorDisplay();


} // end of main


// shape toggle 
function drawSquare() {
    eraserEnabled = false;
    defaultMode = false;

   shape = 0;
}

function drawTriangle() {
    eraserEnabled = false;
    defaultMode = false;

   shape = 1;
}

function drawCircle() {
    eraserEnabled = false;
    defaultMode = false;

   shape = 2;
}

// Reset arrays and canvas
function clearCanvas(){
//    g_colors = [];
//    g_points = [];
g_shapesList = [];
   //gl.clearColor(0.0, 0.0, 0.0, 1.0);
  renderAllShapes();
}

//New functions 
function updateColorDisplay() {
    var red = document.getElementById('red').value * 0.1;
    var green = document.getElementById('green').value * 0.1;
    var blue = document.getElementById('blue').value * 0.1;
    var colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.style.backgroundColor = `rgb(${red * 255}, ${green * 255}, ${blue * 255})`;
    //saveColor([red, green, blue, 1.0]);
}

function saveColor(color) {
    // Convert the new color to string format for comparison
    var newColorStr = color.toString();
    
    // Check if the color already exists in the savedColors array
    var colorExists = savedColors.some(function(savedColorStr) {
        return savedColorStr === newColorStr;
    });

    // If the color does not exist, save it
    if (!colorExists) {
        // If the maximum number of saved colors has been reached, remove the oldest
        if (savedColors.length >= maxSavedColors) {
            savedColors.shift();
        }

        // Save the new color
        savedColors.push(newColorStr);
        updateSavedColorsDisplay();
    }
}


document.getElementById('saveColorBtn').addEventListener('click', function() {
    var red = document.getElementById('red').value * 0.1;
    var green = document.getElementById('green').value * 0.1;
    var blue = document.getElementById('blue').value * 0.1;
    saveColor([red, green, blue, 1.0]);
});




function updateSavedColorsDisplay() {
    var savedColorsDiv = document.getElementById('savedColors');
    savedColorsDiv.innerHTML = ''; // Clear the current display
    savedColors.forEach(function(colorStr) {
        var color = colorStr.split(',');
        var colorDiv = document.createElement('div');
        colorDiv.style.width = '30px';
        colorDiv.style.height = '30px';
        colorDiv.style.backgroundColor = `rgba(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255}, ${color[3]})`;
        colorDiv.style.display = 'inline-block';
        colorDiv.style.margin = '5px';
        colorDiv.addEventListener('click', function() {
            document.getElementById('red').value = color[0] * 10;
            document.getElementById('green').value = color[1] * 10;
            document.getElementById('blue').value = color[2] * 10;
            updateColorDisplay();
        });
        savedColorsDiv.appendChild(colorDiv);
    });
}


function click(ev) {
    if (defaultMode) {
        // Default mode handling logic
        return;
    }

    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    if (eraserEnabled) {
        eraseShapes(x, y);
    } else {
        // var red = document.getElementById('red').value * 0.1;
        // var green = document.getElementById('green').value * 0.1;
        // var blue = document.getElementById('blue').value * 0.1;
        // g_colors.push([red, green, blue, 1.0]);
        // g_points.push([x, y, shape, size, parseInt(document.getElementById('sCount').value)]);
        var color = getCurrentColor();

        var point;
        if(shape == 0){
            point = new Point();
         } else if (shape == 1){
            point = new Triangle();
         } else if (shape == 2){
            point = new Circle();
            point.sCount = sCount;
         } 

         point.position = [x,y];
   point.color = color;
   point.size = size;

        
        g_shapesList.push(point);
    }

    renderAllShapes();
}

function renderAllShapes() {
       // Clear <canvas>
       gl.clear(gl.COLOR_BUFFER_BIT);
       var len = g_shapesList.length;
       for (var a = 0; a < len; a += 1) {
          g_shapesList[a].render();
       }
    
}

function eraseShapes(x, y) {
    var eraserRadius = 0.05; // Eraser radius, adjustable according to your needs
    // g_shapesList = g_shapesList.filter(shape => {
    //     var dx = x - shape.x;
    //     var dy = y - shape.y;
    //     var distance = Math.sqrt(dx * dx + dy * dy);
    //      if  (distance < eraserRadius){
    //         shape.color = [0.0, 0.0, 0.0, 1.0];

    //      } // Only keep shapes outside the eraser radius
    // });

    // //renderAllShapes(); // Redraw remaining shapes
    for (let shape of g_shapesList) {
        var dx = x - shape.position[0];
        var dy = y - shape.position[1];
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < eraserRadius) {
            shape.color = [0.0, 0.0, 0.0, 1.0]; // Set color to black
            renderAllShapes();
        }}
}


function getCurrentColor() {
    // Retrieve values from sliders
    var red = document.getElementById('red').value * 0.1;
    var green = document.getElementById('green').value * 0.1;
    var blue = document.getElementById('blue').value *0.1;

    // Update the color display as a visual feedback for the selected color
    updateColorDisplay();

    return [red, green, blue, 1.0]; // Include alpha value
}

function addActionsForHtmlUI(){

    function clearSavedColors() {
        savedColors = []; // Clear the array of saved colors
        updateSavedColorsDisplay(); // Update the display
    }
    
    document.getElementById('clearSavedColorsBtn').addEventListener('click', clearSavedColors);
    
    // Button Events for shape selection
    document.getElementById('square').onclick = function() { shape = 0; 
        eraserEnabled = false;
        defaultMode = false;};  // Assuming 0 is the type for Square
    document.getElementById('triangle').onclick = function() { shape = 1; 
        eraserEnabled = false;
        defaultMode = false;};  // Assuming 1 is the type for Triangle
    document.getElementById('circle').onclick = function() { shape = 2; 
        eraserEnabled = false;
        defaultMode = false;};  // Assuming 2 is the type for Circle

    document.getElementById('eraser').onclick = function() { 
        eraserEnabled = true;
        defaultMode = false;toggleEraser(); };
    // Clear canvas button
    document.getElementById('clearCanvas').onclick = function() {  eraserEnabled = false;
        defaultMode = false;g_shapesList = []; renderAllShapes(); };

    // Size Slider Event
    document.getElementById('size').oninput = function() {
        size = parseInt(this.value); // Update the global size variable
    };

    // Segment Count Slider Event (only for circles in this context)
    // document.getElementById('sCount').oninput = function() {
    //     sCount = parseFloat(this.value); // Update the global segment count variable
    // };
    document.getElementById('sCount').addEventListener('mouseup',  function() { sCount = this.value; });

    // Color Slider Events
    document.getElementById('red').oninput = function() {
        getCurrentColor();
        updateColorDisplay(); // Update display based on new color values
    };
    document.getElementById('green').oninput = function() {
        getCurrentColor();
        updateColorDisplay(); // Update display based on new color values
    };

    document.getElementById('blue').oninput = function() {
        getCurrentColor();
        updateColorDisplay(); // Update display based on new color values
    };

    document.getElementById('defaultDrawingButton').onclick = function() {
        // toggleDefaultMode();
        defaultMode = true;
    eraserEnabled = false;
    clearCanvas(); 
    gl.clear(gl.COLOR_BUFFER_BIT);

    shapeData = [
         [0.3, -0.17, 2, 8, [0.380, 0.702, 0.314, 1.0], 5],
         [-0.3, -0.17, 2, 8, [0.380, 0.702, 0.314, 1.0], 5],
         [0.3, -0.13, 2, 7, [0.173, 0.569, 0.310, 1.0], 5],
         [-0.3, -0.13, 2, 7, [0.173, 0.569, 0.310, 1.0], 5],
         [0.08, 0.25, 1, 5, [0.729, 0.102, 0.624, 1.0]],
         [-0.08, 0.25, 1, 5, [0.729, 0.102, 0.624, 1.0]],
         [0.23, 0.15, 1, 5, [0.612, 0.133, 0.373, 1.0]],
         [-0.23, 0.15, 1, 5, [0.612, 0.133, 0.373, 1.0]],
         [0.08, 0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [-0.08, 0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [0.2, -0.1, 2, 5, [0.878, 0.502, 0.718, 1.0], 5],
         [-0.2, -0.1, 2, 5, [0.878, 0.502, 0.718, 1.0], 5],
         [0.08, -0.2, 2, 5, [0.949, 0.655, 0.875, 1.0], 5],
         [-0.08, -0.2, 2, 5, [0.949, 0.655, 0.875, 1.0], 5],
         [0.08, 0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [-0.08, 0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [0.15, 0, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [-0.15, 0, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [0.08, -0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [-0.08, -0.09, 0, 5, [1.0, 0.0, 0.5, 1.0]],
         [0.08, -0.09, 1, 5, [0.859, 0.318, 0.616, 1.0]],
         [-0.08, -0.09, 1, 5, [0.859, 0.318, 0.616, 1.0]],
         [0.25, 0.0, 1, 5, [0.859, 0.369, 0.494, 1.0]],
         [-0.25, 0.0, 1, 5, [0.859, 0.369, 0.494, 1.0]],
         [0, 0, 0, 1.5, [0.890, 0.725, 0.463, 1.0]]
    ];

    for (var i = 0; i < shapeData.length; i++) {
        var item = shapeData[i];
        var x = item[0];
        var y = item[1];
        var shape = item[2];
        var size = item[3];
        var color = item[4];
        var point;
    
        switch(shape) {
            case 0:
                point = new Point();
                break;
            case 1:
                point = new Triangle();
                break;
            case 2:
                point = new Circle();
        
                    var sCount = item[5]; // This could be undefined if not provided
                    point.sCount = sCount; // Only set if sCount is provided
                
                break;
        }
    
        point.position = [x,y];
        point.color = color.slice();
        point.size = size;
    
        g_shapesList.push(point);
    }
    var len = g_shapesList.length;
   for (var a = 0; a < len; a += 1) {
      g_shapesList[a].render();
   }

    }; //IM CRYING 

    function updateColorDisplay() {
        // Assuming color values are from 0 to 1 for WebGL, adjust if necessary
        var red = document.getElementById('red').value * 0.1;
        var green = document.getElementById('green').value * 0.1;
        var blue = document.getElementById('blue').value * 0.1;
        document.getElementById('colorDisplay').style.backgroundColor = `rgb(${red * 255}, ${green * 255}, ${blue * 255})`;
    }
}




