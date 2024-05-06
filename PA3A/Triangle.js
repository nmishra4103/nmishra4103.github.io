class Triangle{
   constructor(){
      this.type='triangle';
      this.position = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      this.color =[1.0,1.0,1.0,1.0];
      this.size = 5.0;
   }

//    render(){
//       var xy = this.position;
//       var rgba = this.color;
//       var size = this.size;

//       // Pass color to u_FragColor
//       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//       // Pass the size tp u_Size
//       gl.uniform1f(u_Size, size);

//       var d = size/20.0;
//       drawTriangle([xy[0]-d/2, xy[1]-d/2, xy[0]+d/2, xy[1]-d/2, xy[0], xy[1]+d/2]);

//    }
// }

// function drawTriangle(vertices){
//    var n = 3;
//    var vertexBuffer = gl.createBuffer();
//    if(!vertexBuffer){
//       console.log('Failed to create the buffer object');
//       return -1;
//    }

//    // Bind the buffer object to target
//    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//    // Write date into the buffer object
//    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

//    // Assign the buffer object to a_Position variable
//    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

//    // Enable the assignment to a_Position variable
//    gl.enableVertexAttribArray(a_Position);

//    gl.drawArrays(gl.TRIANGLES, 0, n);
// }

// function drawTriangle3D(vertices){
//    var n = 3;
//    var vertexBuffer = gl.createBuffer();
//    if(!vertexBuffer){
//       console.log('Failed to create the buffer object');
//       return -1;
//    }

//    // Bind the buffer object to target
//    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//    // Write date into the buffer object
//    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

//    // Assign the buffer object to a_Position variable
//    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

//    // Enable the assignment to a_Position variable
//    gl.enableVertexAttribArray(a_Position);

//    gl.drawArrays(gl.TRIANGLES, 0, n);
// }



 
   render(){
     /*if (robot_go == true){
       
       drawTriangle([-.1, 0, 0, .1, .1, 0]);
 
       drawTriangle([-.5, 0, 0, .3, .3, 0]);
 
       // drawTriangle([.5, -.5, 0, .5, -.5, 0]);
     } */
 
     // else{
       var xy = this.position;
       var rgba = this.color;
       var size = this.size;
 
       // Pass the position of a point to a_Position variable
       // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
       
       // Pass the color of a point to u_FragColor variable
       gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);                       
       
       gl.uniform1f(u_Size, size);
       // Draw a point
       // gl.drawArrays(gl.POINTS, 0, 1);
       var d = this.size/200.0; //delta
 
           if (robot_go == true){          
             console.log("ROBOT TRIANGL-----------", this.position);
             drawTriangle(this.position); 
           }
           else{
             drawTriangle( [ xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d] );
           }
     }
 
 
     // drawTriangle( [ xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d] );
   // }
 
 }
 
 function drawTriangle(vertices){
     var n = 3; //number of vertices
     console.log("vertices", vertices);
 
     //create buffer object
     var vertexBuffer = gl.createBuffer();
     if(!vertexBuffer){
         console.log('Failed to create the buffer object');
         return -1;
     }
 
     //bind the buffer object to the target
     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
 
     //write date into the buffer object
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
 
     //assign the buffer object to a_position variable
     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
     //enable the assignment to a_Position variable
     gl.enableVertexAttribArray(a_Position);
 
     gl.drawArrays(gl.TRIANGLES, 0, n);
     //return n;
 }  
   
 function drawTriangle3D(vertices){
   var n = vertices.length / 3; //number of vertices
   // console.log("vertices", vertices);
 // im struggling out here
   //create buffer object
   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
       console.log('Failed to create the buffer object');
       return -1;
   }
 
   //bind the buffer object to the target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
 
   //write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
 
   //assign the buffer object to a_position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
 
   //enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);
 
   gl.drawArrays(gl.TRIANGLES, 0, n);
 }  
   
 function drawTriangle3DUV(vertices, uv){
   var n = 3; //number of vertices
 
   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
       console.log('Failed to create the buffer object');
       return -1;
   }
   //bind the buffer object to the target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
 
   //write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
 
   //assign the buffer object to a_position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
 
   //enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);
 
 
   var uvBuffer = gl.createBuffer();
   if(!uvBuffer){
       console.log('Failed to create the buffer object');
       return -1;
   }
   //bind the buffer object to the target
   gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
 
   //write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
 
   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
 
   gl.enableVertexAttribArray(a_UV);
 
 
 
   gl.drawArrays(gl.TRIANGLES, 0, n);
 }  
  
