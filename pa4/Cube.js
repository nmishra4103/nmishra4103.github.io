// class Cube{
//   constructor(){
//       this.color = [1.0, 1.0, 1.0, 1.0];
//       this.matrix = new Matrix4();
//       this.textureNum = -2;
//       this.normalMatrix = new Matrix4();
// //yeah so setinverseof should work ????
      
      
      
      
      
//       //this thing is so slow its actually killing me 
//       this.verts = [ //copied prof pls work pls work pls work this thing is bricking my computer
//             0,0,0, 1,1,0, 1,0,0,
//             0,0,0, 0,1,0, 1,1,0,
//             0,1,0, 0,1,1, 1,1,1,
//             0,1,0, 1,1,1, 1,1,0,
//             0,1,0, 0,1,1, 1,1,1,
//             0,1,0, 1,1,1, 1,1,0,
//             1,0,0, 1,1,1, 1,1,0,
//             1,0,0, 1,0,1, 1,1,1,
//             0,0,0, 0,1,1, 0,1,0,
//             0,0,0, 0,0,1, 0,1,1,
//             0,0,1, 1,1,1, 0,1,1,
//             0,0,1, 1,0,1, 1,1,1
//         ];
//         this.verts32 = new Float32Array([ //copied prof pls work pls work pls work this thing is bricking my computer
//             -0.5, -0.5, 0.5,  0.5, -0.5, 0.5,  0.5, 0.5, 0.5,
//             -0.5, -0.5, 0.5,  0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,
//             -0.5, 0.5, 0.5,  -0.5, 0.5, -0.5,  0.5, 0.5, -0.5,
//             -0.5, 0.5, 0.5,  0.5, 0.5, -0.5,  0.5, 0.5, 0.5,
//             0.5, -0.5, 0.5,  0.5, -0.5, -0.5,  0.5, 0.5, -0.5,
//             0.5, -0.5, 0.5,  0.5, 0.5, -0.5,  0.5, 0.5, 0.5,
//             -0.5, -0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5, 0.5, -0.5,
//             -0.5, -0.5, 0.5,  -0.5, 0.5, -0.5,  -0.5, -0.5, -0.5,
//             -0.5, -0.5, -0.5,  0.5, 0.5, -0.5,  0.5, -0.5, -0.5,
//             -0.5, -0.5, -0.5,  -0.5, 0.5, -0.5,  0.5, 0.5, -0.5,
//             -0.5, -0.5, 0.5,  -0.5, -0.5, -0.5,  0.5, -0.5, -0.5,
//             -0.5, -0.5, 0.5,  0.5, -0.5, -0.5,  0.5, -0.5, 0.5
//         ]);
        
//         this.uvVerts32  = new Float32Array([
//             0, 0, 1, 0, 1, 1,  0, 0, 1, 1, 0, 1,
//             0, 1, 0, 0, 1, 0,  0, 1, 1, 0, 1, 1,
//           0, 0, 1, 0, 1, 1,  0, 0, 1, 1, 0, 1,
//           1, 0, 1, 1, 0, 1,  1, 0, 0, 1, 0, 0,
//             0, 0, 1, 1, 1, 0,  0, 0, 0, 1, 1, 1,
//             0, 1, 1, 1, 1, 0,  0, 1, 1, 0, 0, 0
//         ]);
//   }

//   render() {
//       var rgba = this.color;

//       // gl.uniform1i(u_whichTexture, this.textureNum);

//       // // Pass the color of a point to u_FragColor variable
//       // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//       // // Pass the matrix to u_ModelMatrix attribute
//       // gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      
      
      
//       gl.uniform1i(u_whichTexture, this.textureNum);

//       // Pass the color of a point to u_FragColor variable
//       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//       // Pass the matrix to u_ModelMatrix attribute
//       gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//       // Pass the matrix to u_NormalMatrix attribute
//       gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);


//       // Front of Cube
//       drawTriangle3DUV([0.0,1.0,0.0, 1.0,1.0,0.0, 0.0,0.0,0.0 ], [0,0, 1,0, 1,1]);
//       drawTriangle3DUV([0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,1.0,0.0 ], [0,1, 1,1, 0,0]);
//       // Back
//       drawTriangle3DUV([0.0,1.0,1.0, 1.0,1.0,1.0, 0.0,0.0,1.0 ],[0,0, 1,0, 1,1]);
//       drawTriangle3DUV([0.0,0.0,1.0, 1.0,0.0,1.0, 1.0,1.0,1.0 ],[0,1, 1,1, 0,0]);
//       // Top
//       drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//       drawTriangle3D([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
//       // Bottom
//       drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
//       drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
//       // Left
//       drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
//       drawTriangle3D([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ],[0,1, 1,1, 0,0]);
//       // Right
//       drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
//       drawTriangle3D([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ],[0,1, 1,1, 0,0]);


//       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//       }

//       renderfast() {
//         // var rgba = this.color;

//         // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//         // gl.uniform1i(u_whichTexture, this.textureNum);
//         // gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//         // var allverts = [];
//         // // Front of Cube
//         // allverts = allverts.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
//         // allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
//         // // Back
//         // allverts = allverts.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
//         // allverts = allverts.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
//         // // Top
//         // allverts = allverts.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         // allverts = allverts.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         // // Bottom
//         // allverts = allverts.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
//         // allverts = allverts.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);

//         // // Left
//         // allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
//         // allverts = allverts.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
//         // // Right
//         // allverts = allverts.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         // allverts = allverts.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);
//   // if (g_vertexBuffer == null){
//         //   initTriangle3D();
//         // }
//         // drawTriangle3D(allverts);
//         // } //am i supposed to use this? 
//         // //do i have to use this? 
//         var rgba = this.color;                                           
//         gl.uniform1i(u_whichTexture, this.textureNum);
//         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  
//         // Pass the matrix to u_ModelMatrix attribute 
//         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
     
//     //   gl.bufferData(gl.ARRAY_BUFFER, new Floar32Array(this.verts), gl.DYNAMIC_DRAW);
        
//           //gl.bufferData(gl.ARRAY_BUFFER, this.verts32, gl.DYNAMIC_DRAW);
//         //gl.drawArrays(gl.TRIANGLES,0,36);
        
//         drawTriangle3DUVmod(this.verts32, this.uvVerts32, 36);
//       }
      
//       renderfastwnorm(){
//         //is this the reason not working??
//                 var rgba = this.color;

//         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//         gl.uniform1i(u_whichTexture, this.textureNum);

//         // Pass the color of a point to u_FragColor variable

//         // Pass the matrix to u_ModelMatrix attribute
//         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//         var verts2 = [];
//         // Front of Cube
//         verts2 = verts2.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
//         verts2 = verts2.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
//         // Back
//         verts2 = verts2.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
//         verts2 = verts2.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
//         // Top
//         verts2 = verts2.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         verts2 = verts2.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         // Bottom
//         verts2 = verts2.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
//         verts2 = verts2.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);

//         // Left
//         verts2 = verts2.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
//         verts2 = verts2.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
//         // Right
//         verts2 = verts2.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//         verts2 = verts2.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);

//         var alluvs=[
//             0,0, 1,1, 1,0,
//             0,0, 0,1, 1,1,
//             1,0, 1,1, 0,0,
//             0,1, 1,1, 0,0,
//             0,0, 0,1, 1,1,
//             0,0, 1,0, 1,1,
//             1,0, 0,0, 0,1,
//             1,0, 1,1, 0,1,
//             0,1, 1,0, 1,1,
//             0,1, 0,0, 1,0,
//             0,0, 1,0, 1,1,
//             0,1, 0,1, 1,1
//         ];

//         var allnorms = [
//             0,0,-1, 0,0,-1, 0,0,-1,
//             0,0,-1, 0,0,-1, 0,0,-1,
//             0,1,0, 0,1,0, 0,1,0,
//             0,1,0, 0,1,0, 0,1,0,
//             1,0,0, 1,0,0, 1,0,0,
//             1,0,0, 1,0,0, 1,0,0,
//             -1,0,0, -1,0,0, -1,0,0,
//             -1,0,0, -1,0,0, -1,0,0,
//             0,-1,0, 0,-1,0, 0,-1,0,
//             0,-1,0, 0,-1,0, 0,-1,0,
//             0,0,1, 0,0,1, 0,0,1,
//             0,0,1, 0,0,1, 0,0,1
//         ];

//         drawTriangle3DUVNormal(verts2, alluvs, allnorms);
//       // drawTriangle3DUVNormal(this.uvVerts32,  this.uvVerts32, allnorms*36);
//       //this shit doesnt work
        
        
//       }
      
      

// }
class Cube{
   constructor(){
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.normalMatrix = new Matrix4();
      this.textureNum = -2;
   
   }

   render() {
      var rgba = this.color;
      // console.log(rgba);

      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Pass the matrix to u_NormalMatrix attribute
      gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

      // Front of Cube
      drawTriangle3DUVNormal([0,0,0, 1,1,0, 1,0,0],[0,0, 1,1, 1,0], [0,0,-1, 0,0,-1, 0,0,-1]);
      drawTriangle3DUVNormal([0,0,0, 0,1,0, 1,1,0],[0,0, 0,1, 1,1], [0,0,-1, 0,0,-1, 0,0,-1]);

      // gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
      // Top
      drawTriangle3DUVNormal([1,1,0, 1,1,1, 0,1,0],[1,0, 1,1, 0,0], [0,1,0, 0,1,0, 0,1,0]);
      drawTriangle3DUVNormal([0,1,1, 1,1,1, 0,1,0],[0,1, 1,1, 0,0], [0,1,0, 0,1,0, 0,1,0]);

      // gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
      // Right
      drawTriangle3DUVNormal([1,0,0, 1,1,0, 1,1,1],[0,0, 0,1, 1,1], [1,0,0, 1,0,0, 1,0,0]);
      drawTriangle3DUVNormal([1,0,0, 1,0,1, 1,1,1],[0,0, 1,0, 1,1], [1,0,0, 1,0,0, 1,0,0]);

      // gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
      // Left
      drawTriangle3DUVNormal([0,0,0, 0,0,1, 0,1,1],[1,0, 0,0, 0,1], [-1,0,0, -1,0,0, -1,0,0]);
      drawTriangle3DUVNormal([0,0,0, 0,1,0, 0,1,1],[1,0, 1,1, 0,1], [-1,0,0, -1,0,0, -1,0,0]);

      // gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
      // Bottom
      drawTriangle3DUVNormal([0,0,0, 1,0,1, 1,0,0],[0,1, 1,0, 1,1], [0,-1,0, 0,-1,0, 0,-1,0]);
      drawTriangle3DUVNormal([0,0,0, 0,0,1, 1,0,1],[0,1, 0,0, 1,0], [0,-1,0, 0,-1,0, 0,-1,0]);

      // gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);
      // Back
      drawTriangle3DUVNormal([1,0,1, 0,0,1, 0,1,1],[0,0, 1,0, 1,1], [0,0,1, 0,0,1, 0,0,1]);
      drawTriangle3DUVNormal([1,0,1, 1,1,1, 0,1,1],[0,1, 0,1, 1,1], [0,0,1, 0,0,1, 0,0,1]);  


      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      }

      renderfastwnorm() {
         var rgba = this.color;

         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
         gl.uniform1i(u_whichTexture, this.textureNum);

         // Pass the color of a point to u_FragColor variable

         // Pass the matrix to u_ModelMatrix attribute
         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

         var allverts = [];
         // Front of Cube
         allverts = allverts.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
         // Back
         allverts = allverts.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
         allverts = allverts.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
         // Top
         allverts = allverts.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
         allverts = allverts.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
         // Bottom
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
         allverts = allverts.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);

         // Left
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
         allverts = allverts.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
         // Right
         allverts = allverts.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
         allverts = allverts.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);

         var alluvs=[
            0,0, 1,1, 1,0,
            0,0, 0,1, 1,1,
            1,0, 1,1, 0,0,
            0,1, 1,1, 0,0,
            0,0, 0,1, 1,1,
            0,0, 1,0, 1,1,
            1,0, 0,0, 0,1,
            1,0, 1,1, 0,1,
            0,1, 1,0, 1,1,
            0,1, 0,0, 1,0,
            0,0, 1,0, 1,1,
            0,1, 0,1, 1,1
         ];

         var allnorms = [
            0,0,-1, 0,0,-1, 0,0,-1,
            0,0,-1, 0,0,-1, 0,0,-1,
            0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0,
            1,0,0, 1,0,0, 1,0,0,
            1,0,0, 1,0,0, 1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1
         ];

         drawTriangle3DUVNormal(allverts, alluvs, allnorms);
         }

}
