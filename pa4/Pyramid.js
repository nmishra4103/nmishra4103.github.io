// // class Pyramid {
// //     constructor() {
// //         this.type = 'pyramid';
// //         this.position = [0.0, 0.0, 0.0]; // 3D position
// //         this.color = [1.0, 1.0, 1.0, 1.0];
// //         this.size = 5.0;
// //     }
 
// //     render() {
// //         var xyz = this.position;
// //         var rgba = this.color;
// //         var size = this.size;
 
// //         // Pass color to u_FragColor
// //         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
// //         // Pass the size to u_Size
// //         gl.uniform1f(u_Size, size);
 
// //         var d = size / 20.0;
// //         // Define the vertices of the pyramid
// //         var vertices = [
// //             // Base of the pyramid
// //             xyz[0] - d, xyz[1] - d, xyz[2],
// //             xyz[0] + d, xyz[1] - d, xyz[2],
// //             xyz[0] - d, xyz[1] + d, xyz[2],
 
// //             xyz[0] + d, xyz[1] - d, xyz[2],
// //             xyz[0] - d, xyz[1] + d, xyz[2],
// //             xyz[0] + d, xyz[1] + d, xyz[2],
 
// //             // Sides of the pyramid
// //             xyz[0], xyz[1], xyz[2] + d,
// //             xyz[0] - d, xyz[1] - d, xyz[2],
// //             xyz[0] + d, xyz[1] - d, xyz[2],
 
// //             xyz[0], xyz[1], xyz[2] + d,
// //             xyz[0] + d, xyz[1] - d, xyz[2],
// //             xyz[0] + d, xyz[1] + d, xyz[2],
 
// //             xyz[0], xyz[1], xyz[2] + d,
// //             xyz[0] + d, xyz[1] + d, xyz[2],
// //             xyz[0] - d, xyz[1] + d, xyz[2],
 
// //             xyz[0], xyz[1], xyz[2] + d,
// //             xyz[0] - d, xyz[1] + d, xyz[2],
// //             xyz[0] - d, xyz[1] - d, xyz[2]
// //         ];
 
// //         drawPyramid(vertices);
// //     }
// //  }
 
// //  function drawPyramid(vertices) {
// //     var n = 18; // 6 faces * 3 vertices per face
// //     var vertexBuffer = gl.createBuffer();
// //     if (!vertexBuffer) {
// //         console.log('Failed to create the buffer object');
// //         return -1;
// //     }
 
// //     // Bind the buffer object to target
// //     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// //     // Write data into the buffer object
// //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
 
// //     // Assign the buffer object to a_Position variable
// //     gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
 
// //     // Enable the assignment to a_Position variable
// //     gl.enableVertexAttribArray(a_Position);
 
// //     // Draw the pyramid
// //     gl.drawArrays(gl.TRIANGLES, 0, n);
// //  }
// class Pyramid {
//     constructor() {
//         this.type = 'pyramid';
//         this.color = [1.0, 1.0, 1.0, 1.0];
//         this.matrix = new Matrix4(); // Assuming Matrix4 is properly defined elsewhere
//         this.textureNum = -2;
//               this.normalMatrix = new Matrix4();

//     }

//     render() {
//         var rgba = this.color;

//         // Pass the color to u_FragColor variable
//         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//         // Pass the matrix to u_ModelMatrix attribute
//         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//         // Base of the pyramid
//         drawTriangle3D([
//             0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 1.0, 0.0
//         ]);
//         // Sides of the pyramid
//         drawTriangle3D([
//             0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0
//         ]);
//         drawTriangle3D([
//             0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0
//         ]);
//         drawTriangle3D([
//             1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0
//         ]);
//     }
// }

// function drawTriangle3D(vertices) {

//     var vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) {
//         console.log('Failed to create the buffer object');
//         return -1;
//     }

//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//     var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); // Ensure this is setup correctly
//     gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     gl.drawArrays(gl.TRIANGLES, 0, 3);
// } //idk if this works for lighting 

class Pyramid {
    constructor() {
        this.type = 'pyramid';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4(); // Assuming Matrix4 is properly defined elsewhere
        this.textureNum = -2;
        this.normalMatrix = new Matrix4();
        this.verts = [
            // Base of the pyramid
            0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0, 1.0,
            0.0, 0.0, 0.0, 0.5, 0.0, 1.0, 1.0, 0.0, 0.0,
            // Sides of the pyramid
            0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0,
            1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.5, 0.0, 1.0,
            0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0,
        ];
        this.verts32 = new Float32Array(this.verts);

        this.uvVerts32 = new Float32Array([
            // Base
            0.0, 0.0, 1.0, 0.0, 0.5, 1.0,
            0.0, 0.0, 0.5, 1.0, 1.0, 0.0,
            // Sides
            0.0, 0.0, 0.5, 1.0, 0.5, 0.0,
            1.0, 0.0, 0.5, 1.0, 0.5, 0.0,
            0.0, 0.0, 0.5, 1.0, 1.0, 0.0,
        ]);
        
         const baseNormal = [0, -1, 0];
         const normalSide1 = this.calculateNormal([0.0, 0.0, 0.0], [0.5, 1.0, 0.0], [0.5, 0.0, 1.0]);
        const normalSide2 = this.calculateNormal([1.0, 0.0, 0.0], [0.5, 1.0, 0.0], [0.5, 0.0, 1.0]);
        const normalSide3 = this.calculateNormal([0.0, 0.0, 0.0], [0.5, 1.0, 0.0], [1.0, 0.0, 0.0]);

        this.normals = new Float32Array([
            // Base normals
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            // Side normals
            
           normalSide1,normalSide1,normalSide1,
           normalSide2,normalSide2,normalSide2,
           normalSide3,normalSide3,normalSide3
            // 0, 0.4472, 0.8944, 0, 0.4472, 0.8944, 0, 0.4472, 0.8944,
            // 0, 0.4472, 0.8944, 0, 0.4472, 0.8944, 0, 0.4472, 0.8944,
            // 0, 0.4472, 0.8944, 0, 0.4472, 0.8944, 0, 0.4472, 0.8944,
        ]);
    }
    
    
     calculateNormal(v0, v1, v2) {
        function normalize(v) {
            const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return [v[0] / length, v[1] / length, v[2] / length];
        }

        function cross(u, v) {
            return [
                u[1] * v[2] - u[2] * v[1],
                u[2] * v[0] - u[0] * v[2],
                u[0] * v[1] - u[1] * v[0]
            ];
        }

        const edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
        const edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
        const normal = cross(edge1, edge2);
        return normalize(normal);
    }
    
        calculateSideNormals() {
        const vertices = [
            [0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [0.5, 1.0, 0.0], [0.5, 0.0, 1.0]
        ];

        function normalize(v) {
            const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return [v[0] / length, v[1] / length, v[2] / length];
        }

        function cross(u, v) {
            return [
                u[1] * v[2] - u[2] * v[1],
                u[2] * v[0] - u[0] * v[2],
                u[0] * v[1] - u[1] * v[0]
            ];
        }

        function computeNormal(v0, v1, v2) {
            const edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
            const edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
            const normal = cross(edge1, edge2);
            return normalize(normal);
        }

        const normal0 = computeNormal(vertices[0], vertices[2], vertices[3]);
        const normal1 = computeNormal(vertices[1], vertices[2], vertices[3]);
        const normal2 = computeNormal(vertices[0], vertices[1], vertices[2]);

        return [normal0, normal1, normal2];
    }

    render() {
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

        drawTriangle3DUVNormal(this.verts32, this.uvVerts32, this.normals);
    }
}

