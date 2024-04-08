// DrawRectangle.js
function main() {
// Retrieve <canvas> element <- (1)
var canvas = document.getElementById('example');
if (!canvas) {
console.log('Failed to retrieve the <canvas> element');
return;
}

// Get the rendering context for 2DCG <- (2)
var ctx = canvas.getContext('2d');

// Draw a blue rectangle <- (3)
ctx.fillStyle = 'black'; // Set a blue color
ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

//instantiating v1
// let v1 = new Vector3([2.25,2.25]);
// drawVector(ctx, v1, 'red'); //draw it

//this works

} 

function handleDrawEvent(){
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    } //canvas wasnt defined in here but can i do this?

    //apparently yes. 

    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 400,400);
    //wipes out the whole canvas so redraw
    ctx.fillStyle = 'black'; // Set a blue color
    ctx.fillRect(0, 0, 400, 400);

    let xInputv1 = document.getElementById("xCoord").value|| 0;
    let yInputv1 = document.getElementById("yCoord").value || 0;
    //default is 0 if the user doesnt put in a value or forgets for one of them or something

    let xInputv2 = document.getElementById("xCoordV2").value || 0;
    let yInputv2 = document.getElementById("yCoordV2").value || 0;

    let xv1 = parseFloat(xInputv1);
    let yv1 = parseFloat(yInputv1); //try parsing for seeing if float ar nah

    
    let xv2 = parseFloat(xInputv2);
    let yv2 = parseFloat(yInputv2);

    //must check if those are valid inputs first
    //placeholder
    let errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.style.display = 'none';
    if (isNaN(xv1) || isNaN(yv1)||isNaN(xv2) || isNaN(yv2)) {
        // Display error message
        errorMessageElement.innerText = 'Invalid input. Please enter valid numbers for both X and Y coordinates.';
        errorMessageElement.style.display = 'block';
        return;
    } //validate to make sure its not words, only numbers

    //WHY ISNT THIS WORKING
    //just kidding

    let v1 = new Vector3([xv1, yv1, 0]);
    drawVector(ctx, v1, 'red');

    let v2 = new Vector3([xv2, yv2, 0]);
    drawVector(ctx, v2, 'blue');

    //handle the new part about the operations here
    let operation = document.getElementById("operation").value;
    if (operation === "") {
        return; //if nothing, ignore all this
    }
    let scalarInput = parseFloat(document.getElementById("scalar").value ||0); //default zero 
    let scalar = parseFloat(scalarInput);

    //validate
    if (isNaN(scalar)) {
        errorMessageElement.innerText = 'Invalid Scalar. Scalar must be a number.';
        errorMessageElement.style.display = 'block';
        return;
    }

    //also dont let division by 0 happen 

    if (operation === "div" && scalar === 0) {
        errorMessageElement.innerText = 'Invalid Scalar. Cannot divide by zero.';
        errorMessageElement.style.display = 'block';
        return;
    }


    let v3, v4;

    switch (operation) {
        case "add":
            v3 = new Vector3(v1.elements);
            v3.add(v2);
            drawVector(ctx, v3, 'green');
            break;
        case "sub":
            v3 = new Vector3(v1.elements);
            v3.sub(v2);
            drawVector(ctx, v3, 'green');
            break;
        case "mul":
            v3 = new Vector3(v1.elements).mul(scalar);
            v4 = new Vector3(v2.elements).mul(scalar);
            drawVector(ctx, v3, 'green');
            drawVector(ctx, v4, 'green');
            break;
        case "div":
            v3 = new Vector3(v1.elements).div(scalar);
            v4 = new Vector3(v2.elements).div(scalar);
            drawVector(ctx, v3, 'green');
            drawVector(ctx, v4, 'green');
            break;
        case "normalize":
            v1.normalize();
            drawVector(ctx, v1, 'green');
            v2.normalize();
            drawVector(ctx, v2, 'green');
            break;
            
        case "magnitude":
            console.log('Magnitude of v1:', v1.magnitude());
            console.log('Magnitude of v2:', v2.magnitude());
            //just logging so pls check console log
            break;
        case "angleBetween":
            let angle = angleBetween(v1, v2);
            console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
            break;
        case "area":
            let area = areaTriangle(v1, v2);
            console.log(`Area of the triangle formed by v1 and v2: ${area.toFixed(2)}`);
            break;
            
    }//we can use switches in js right?
//yes we can.

}

function drawVector(ctx, v, color){
ctx.strokeStyle = color;
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(200+(v.elements[0]*20), 200-(v.elements[1]*20));
ctx.stroke();
//wait why is it going down and not up?
//0,0 is top left so thats why
    
}

//just make the function out here
//helper to be called in case switch
function angleBetween(v1, v2) {
    let dotProd = Vector3.dot(v1, v2);
    let magnitudes = v1.magnitude() * v2.magnitude();
    if (magnitudes > 0) {
        let cosAngle = dotProd / magnitudes;
        //clamp to avoid errors
        cosAngle = Math.max(-1, Math.min(1, cosAngle));
        return Math.acos(cosAngle) * (180 / Math.PI); //radians to degrees
    }
    return 0;
}

//another helper
function areaTriangle(v1, v2) {
    let crossProd = Vector3.cross(v1, v2);
    let areaParallelogram = crossProd.magnitude();
    return areaParallelogram / 2; 
}

