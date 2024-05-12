// class Pyramid {
//     constructor() {
//         this.type = 'pyramid';
//         this.position = [0.0, 0.0, 0.0]; // 3D position
//         this.color = [1.0, 1.0, 1.0, 1.0];
//         this.size = 5.0;
//     }
 
//     render() {
//         var xyz = this.position;
//         var rgba = this.color;
//         var size = this.size;
 
//         // Pass color to u_FragColor
//         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
//         // Pass the size to u_Size
//         gl.uniform1f(u_Size, size);
 
//         var d = size / 20.0;
//         // Define the vertices of the pyramid
//         var vertices = [
//             // Base of the pyramid
//             xyz[0] - d, xyz[1] - d, xyz[2],
//             xyz[0] + d, xyz[1] - d, xyz[2],
//             xyz[0] - d, xyz[1] + d, xyz[2],
 
//             xyz[0] + d, xyz[1] - d, xyz[2],
//             xyz[0] - d, xyz[1] + d, xyz[2],
//             xyz[0] + d, xyz[1] + d, xyz[2],
 
//             // Sides of the pyramid
//             xyz[0], xyz[1], xyz[2] + d,
//             xyz[0] - d, xyz[1] - d, xyz[2],
//             xyz[0] + d, xyz[1] - d, xyz[2],
 
//             xyz[0], xyz[1], xyz[2] + d,
//             xyz[0] + d, xyz[1] - d, xyz[2],
//             xyz[0] + d, xyz[1] + d, xyz[2],
 
//             xyz[0], xyz[1], xyz[2] + d,
//             xyz[0] + d, xyz[1] + d, xyz[2],
//             xyz[0] - d, xyz[1] + d, xyz[2],
 
//             xyz[0], xyz[1], xyz[2] + d,
//             xyz[0] - d, xyz[1] + d, xyz[2],
//             xyz[0] - d, xyz[1] - d, xyz[2]
//         ];
 
//         drawPyramid(vertices);
//     }
//  }
 
//  function drawPyramid(vertices) {
//     var n = 18; // 6 faces * 3 vertices per face
//     var vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) {
//         console.log('Failed to create the buffer object');
//         return -1;
//     }
 
//     // Bind the buffer object to target
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     // Write data into the buffer object
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
 
//     // Assign the buffer object to a_Position variable
//     gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
 
//     // Enable the assignment to a_Position variable
//     gl.enableVertexAttribArray(a_Position);
 
//     // Draw the pyramid
//     gl.drawArrays(gl.TRIANGLES, 0, n);
//  }
class Pyramid {
    constructor() {
        this.type = 'pyramid';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4(); // Assuming Matrix4 is properly defined elsewhere
        this.textureNum = -2;
    }

    render() {
        var rgba = this.color;

        // Pass the color to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Base of the pyramid
        drawTriangle3D([
            0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 1.0, 0.0
        ]);
        // Sides of the pyramid
        drawTriangle3D([
            0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0
        ]);
        drawTriangle3D([
            0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0
        ]);
        drawTriangle3D([
            1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0
        ]);
    }
}

function drawTriangle3D(vertices) {

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); // Ensure this is setup correctly
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
