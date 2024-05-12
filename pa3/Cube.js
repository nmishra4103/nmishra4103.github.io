class Cube{
   constructor(){
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.textureNum = -2;
      
      
      
      
      
      //this thing is so slow its actually killing me 
      this.verts = [ //copied prof pls work pls work pls work this thing is bricking my computer
            0,0,0, 1,1,0, 1,0,0,
            0,0,0, 0,1,0, 1,1,0,
            0,1,0, 0,1,1, 1,1,1,
            0,1,0, 1,1,1, 1,1,0,
            0,1,0, 0,1,1, 1,1,1,
            0,1,0, 1,1,1, 1,1,0,
            1,0,0, 1,1,1, 1,1,0,
            1,0,0, 1,0,1, 1,1,1,
            0,0,0, 0,1,1, 0,1,0,
            0,0,0, 0,0,1, 0,1,1,
            0,0,1, 1,1,1, 0,1,1,
            0,0,1, 1,0,1, 1,1,1
        ];
        this.verts32 = new Float32Array([ //copied prof pls work pls work pls work this thing is bricking my computer
            -0.5, -0.5, 0.5,  0.5, -0.5, 0.5,  0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,  0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,  -0.5, 0.5, -0.5,  0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,  0.5, 0.5, -0.5,  0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,  0.5, -0.5, -0.5,  0.5, 0.5, -0.5,
            0.5, -0.5, 0.5,  0.5, 0.5, -0.5,  0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,  -0.5, 0.5, -0.5,  -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,  0.5, 0.5, -0.5,  0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,  -0.5, 0.5, -0.5,  0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,  -0.5, -0.5, -0.5,  0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,  0.5, -0.5, -0.5,  0.5, -0.5, 0.5
        ]);
        
        this.uvVerts32  = new Float32Array([
            0, 0, 1, 0, 1, 1,  0, 0, 1, 1, 0, 1,
            0, 1, 0, 0, 1, 0,  0, 1, 1, 0, 1, 1,
           0, 0, 1, 0, 1, 1,  0, 0, 1, 1, 0, 1,
           1, 0, 1, 1, 0, 1,  1, 0, 0, 1, 0, 0,
            0, 0, 1, 1, 1, 0,  0, 0, 0, 1, 1, 1,
            0, 1, 1, 1, 1, 0,  0, 1, 1, 0, 0, 0
        ]);
   }

   render() {
      var rgba = this.color;

      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Front of Cube
      drawTriangle3DUV([0.0,1.0,0.0, 1.0,1.0,0.0, 0.0,0.0,0.0 ], [0,0, 1,0, 1,1]);
      drawTriangle3DUV([0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,1.0,0.0 ], [0,1, 1,1, 0,0]);
      // Back
      drawTriangle3DUV([0.0,1.0,1.0, 1.0,1.0,1.0, 0.0,0.0,1.0 ],[0,0, 1,0, 1,1]);
      drawTriangle3DUV([0.0,0.0,1.0, 1.0,0.0,1.0, 1.0,1.0,1.0 ],[0,1, 1,1, 0,0]);
      // Top
      drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
      drawTriangle3D([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
      // Bottom
      drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
      drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
      // Left
      drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
      drawTriangle3D([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ],[0,1, 1,1, 0,0]);
      // Right
      drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
      drawTriangle3D([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ],[0,1, 1,1, 0,0]);


      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      }

      renderfast() {
        // var rgba = this.color;

        // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // gl.uniform1i(u_whichTexture, this.textureNum);
        // gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // var allverts = [];
        // // Front of Cube
        // allverts = allverts.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
        // allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
        // // Back
        // allverts = allverts.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
        // allverts = allverts.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
        // // Top
        // allverts = allverts.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
        // allverts = allverts.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
        // // Bottom
        // allverts = allverts.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
        // allverts = allverts.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);

        // // Left
        // allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
        // allverts = allverts.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
        // // Right
        // allverts = allverts.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
        // allverts = allverts.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);
   // if (g_vertexBuffer == null){
        //   initTriangle3D();
        // }
        // drawTriangle3D(allverts);
        // } //am i supposed to use this? 
        // //do i have to use this? 
        var rgba = this.color;                                           
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  
        // Pass the matrix to u_ModelMatrix attribute 
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
     
     //   gl.bufferData(gl.ARRAY_BUFFER, new Floar32Array(this.verts), gl.DYNAMIC_DRAW);
        
           //gl.bufferData(gl.ARRAY_BUFFER, this.verts32, gl.DYNAMIC_DRAW);
        //gl.drawArrays(gl.TRIANGLES,0,36);
        
        drawTriangle3DUVmod(this.verts32, this.uvVerts32, 36);
      }

}
