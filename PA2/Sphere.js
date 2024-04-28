// class Sphere{
//    constructor(){
//       this.color = [1.0, 1.0, 1.0, 1.0];
//       this.matrix = new Matrix4();
//       this.center = [0,0,0];
//       this.size = 5.0;
//       this.sCount = 4;
//    }

//    render() {
//       var rgba = this.color;

//       // Pass the color of a point to u_FragColor variable
//       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//       // Pass the matrix to u_ModelMatrix attribute
//       gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//       var xyz = this.center;
//       var size = this.size;

//       // Draw
//       var delta = size/40.0;
//       var angleStep = 360/this.sCount*.5;
//       var indices1 = [];
//       var indices2 = [];
//       var anglez = 0;
//       var sizexy = 0;
//       for(var sCounts = 0; sCounts < this.sCount; sCounts++){
//          let z1 = Math.cos(anglez*Math.PI/180)*delta;
//          let z2 = Math.cos((anglez+angleStep)*Math.PI/180)*delta;
//          anglez = anglez + angleStep;
//          for(var angle = 0; angle <= 360; angle += angleStep){
//             let centerPt = [xyz[0], xyz[1]];
//             let angle1 = angle;
//             let angle2 = angle + angleStep;
//             let vec1 = [Math.cos(angle1*Math.PI/180)*delta, Math.sin(angle1*Math.PI/180)*delta];
//             let vec2 = [Math.cos(angle2*Math.PI/180)*delta, Math.sin(angle2*Math.PI/180)*delta];
//             let pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
//             let pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

//             indices1.push([pt1[0], pt1[1], z1]);
//             indices2.push([pt2[0], pt2[1], z2]);
//          }
//       }
//       // var x = 0;
//       for(var x = 0; x < indices1.length-1; x++){
//          drawTriangle3D([indices1[x][0], indices1[x][1], indices1[x][2], indices1[x+1][0], indices1[x+1][1], indices1[x+1][2], indices2[x][0], indices2[x][1], indices2[x][2]]);
//          drawTriangle3D([indices2[x][0], indices2[x][1], indices2[x][2], indices2[x+1][0], indices2[x+1][1], indices2[x+1][2], indices1[x+1][0], indices1[x+1][1], indices1[x+1][2]]);
//       }
//       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//    }
// }
class Sphere{
   constructor(){
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.center = [0, 0, 0];
      this.size = 5.0;  // This represents the sphere's diameter
      this.sCount = 4; // Increase the slice count for better spherical approximation
   }

   render() {
      var rgba = this.color;

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      var xyz = this.center;
      var radius = this.size / 2; // Radius is half the size (diameter)
      var latitudeBands = this.sCount;
      var longitudeBands = this.sCount;

      var vertices = [];
      for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
         var theta = latNumber * Math.PI / latitudeBands;
         var sinTheta = Math.sin(theta);
         var cosTheta = Math.cos(theta);

         for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

            vertices.push(radius * x);
            vertices.push(radius * y);
            vertices.push(radius * z);
         }
      }

      var indexData = [];
      for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
         for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
         }
      }

      // Using the original drawTriangle3D function with updated vertices
      for (var i = 0; i < indexData.length; i += 3) {
          drawTriangle3D([
              vertices[3 * indexData[i]], vertices[3 * indexData[i] + 1], vertices[3 * indexData[i] + 2],
              vertices[3 * indexData[i + 1]], vertices[3 * indexData[i + 1] + 1], vertices[3 * indexData[i + 1] + 2],
              vertices[3 * indexData[i + 2]], vertices[3 * indexData[i + 2] + 1], vertices[3 * indexData[i + 2] + 2]
          ]);
      }
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
   }
}

function drawTriangle3D(vertices) {
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
