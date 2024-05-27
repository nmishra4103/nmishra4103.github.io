function drawAllShapes(scaleFactor){
  
    gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
  gl.uniform1i(u_lightOn, g_lightOn);
  // gl.uniform1i(u_SpotLightOn, g_spotLightOn);
  //spotlight is on?? why error???
  var scale = scaleFactor || 1.0;

    //this will be a cat
    //allegedly

    //var orange = [.9, .6, 0.0, 1.0];
    
    drawEnvironment();
  
    drawCat();
       var light = new Cube();
   light.color=[2,2,0,1];
   light.matrix.translate(g_lightPos[0], g_lightPos[1],g_lightPos[2]);
   light.matrix.scale(-.1,-.1,-.1);
   light.matrix.translate(-.5, -.5,-.5);
   light.render();
   
  //   var s_light = new Cube();
  // s_light.textureNum = -2;
  // s_light.color = spotlight;
  // s_light.updateNormals = false;
  // s_light.matrix.translate(g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
  // s_light.matrix.scale(0.2, 0.2, 0.2);
  // s_light.matrix.translate(-0.5, -0.5, -0.5);
  // s_light.render();
    
    
    //I DIDNT EVEN CHANGE ANYTHING???

//     var body = new Cube();
//       body.color = [.9, .6, 0.0, 1.0];
//     //var bodybase = new Matrix4(body.matrix);
//     if(g_normalOn) body.textureNum = -3;
//     // body.matrix.translate(-.25, -.75, 0.0);
//     // body.matrix.rotate(-5, 1, 0, 0);
//     // body.matrix.scale(0.5, 0.3, 0.5);
//     body.matrix.scale(.25* scale, 0.25* scale, 0.35* scale);
//     body.matrix.translate(-.5* scale, 0* scale, -0.25* scale);
//     // no longer attached to the joint -- come back for this
//     body.normalMatrix.setInverseOf(body.matrix).transpose(); //why is it pissing itself it literally exists
//     //is this ok

//     body.render();


//     var head = new Sphere();
   
//     // head.matrix.rotate(-10, 1, 0, 0);
//     head.color = [.9, .6, 0.0, 1.0];
//     head.matrix.rotate(0, 1, 0, 0);
//       if(g_normalOn) head.textureNum = -3;

//     var headMatrixCopy = new Matrix4(head.matrix);
//     var headMatrixCopy2 = new Matrix4(head.matrix);
//     //i need that shit for the ears i think
//     head.matrix.scale(0.055* scale, 0.055* scale, 0.055* scale);
//     head.matrix.translate(0* scale, 6.05* scale, -2.75* scale);
//       head.normalMatrix.setInverseOf(head.matrix).transpose();

   
//     head.render();

//     var face = new Sphere();
//     //face.color = [0.0, 0.0, 0.0, 1.0];

//     // face.matrix.rotate(-10, 1, 0, 0);
//     if(g_normalOn) face.textureNum = -3;

//     face.matrix.rotate(0, 1, 0, 0);
//     face.matrix.scale(0.050* scale, 0.030* scale, 0.050* scale);
//     face.matrix.translate(0* scale, 9.55* scale, -3.75* scale);
//       face.normalMatrix.setInverseOf(face.matrix).transpose();

//     face.render();
// //fix head first

// var lefteye = new Cube();
// lefteye.color = [0.0, 0.0, 0.0, 1.0];
//   if(g_normalOn) lefteye.textureNum = -3;


// // lefteyeblack.matrix.rotate(-10, 1, 0, 0);
// lefteye.matrix.rotate(0, 1, 0, 0);
// lefteye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
// lefteye.matrix.translate(-2.001* scale, 5.5* scale, -6* scale);
// lefteye.normalMatrix.setInverseOf(lefteye.matrix).transpose();

// lefteye.render();

// var reye = new Cube();
// reye.color = [0, 0.0, 0.0, 1.0];
//   if(g_normalOn) reye.textureNum = -3;


// // righteyeblack.matrix.rotate(-10, 1, 0, 0);
// reye.matrix.rotate(0, 1, 0, 0);
// reye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
// reye.matrix.translate(1.001* scale, 5.5* scale, -6* scale);
// reye.normalMatrix.setInverseOf(reye.matrix).transpose();

// reye.render();


//     var rightear = new Pyramid();
//     rightear.color = [0.0, 0.0, 0.0, 0.0];
// //     rightear.matrix =  headMatrixCopy;

// //     rightear.matrix.rotate(-g_earAngle, 1, 0, 0);
// //     rightear.matrix.rotate(30, 0, 0, 1); //can i do 2 rotations?
// //  rightear.matrix.scale(0.09, 0.09, 0.09);
// // // rightear.matrix.translate(1.25, 4.5, -1.8);

// rightear.matrix = headMatrixCopy;
// // Position the ear correctly before rotating for the joint movement
// rightear.matrix.translate(-.1* scale, 0.40* scale, -0.2* scale);
// // Apply rotation for the ear's animation
// rightear.matrix.rotate(0, 1, 0, -1);
// rightear.matrix.rotate(30* scale, 0, 0, 1); // Additional rotation for alignment
// rightear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
//   rightear.normalMatrix.setInverseOf(rightear.matrix).transpose();

//     rightear.render();

//     var leftear = new Pyramid();

// leftear.color = [.9, .6, 0.0, 1.0];
// leftear.matrix = headMatrixCopy2;
// // Position the ear correctly before rotating for the joint movement
// leftear.matrix.translate(.045* scale, 0.44* scale, -0.2* scale);
// // Apply rotation for the ear's animation
// leftear.matrix.rotate(0, 1, 0, 1);
// leftear.matrix.rotate(-29* scale, 0, 0, 1); // Additional rotation for alignment
// leftear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
// leftear.normalMatrix.setInverseOf(leftear.matrix).transpose();
//       leftear.render();

//     //the world aint ready for this yet
   
//     // upper legs ============================
//     var frontleft = new Cube();
//     // frontleft.matrix.rotate(-10, 1, 0, 0);
//         frontleft.color = [0.6, 0.4, 0.2, 1.0];
//           if(g_normalOn) frontleft.textureNum = -3;


//     frontleft.matrix.setTranslate(0, 0, 0);
//     frontleft.matrix.rotate(0, 0, 0, 1); // Joint 1
//     var frontleftCoord = new Matrix4(frontleft.matrix);
//     frontleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
//     frontleft.matrix.translate(-1.25* scale, -.25* scale, -0.8* scale);
//       frontleft.normalMatrix.setInverseOf(frontleft.matrix).transpose();

//     frontleft.render();
 
//     var frontright = new Cube();
//     //frontright.color =  [0.0, 0.0, 0.0, 1.0];
//     // frontright.matrix.rotate(-10, 1, 0, 0);
//     frontright.matrix.setTranslate(0, 0, 0);
//       if(g_normalOn) frontright.textureNum = -3;

//     frontright.matrix.rotate(0, 0, 0, 1); // Joint 1
//     var frontrightCoord = new Matrix4(frontright.matrix);
//     frontright.matrix.scale(0.08* scale, -0.08* scale, 0.08)* scale;
//     frontright.matrix.translate(.37* scale, -.25* scale, -0.8* scale);
//       frontright.normalMatrix.setInverseOf(frontright.matrix).transpose();

//     frontright.render();
 
//     var backleft = new Cube();
//     //backleft.color  =[0.0, 0.0, 0.0, 1.0];
//     // backleft.matrix.rotate(-10, 1, 0, 0);
//     backleft.matrix.setTranslate(0, 0, 0);
//       if(g_normalOn) backleft.textureNum = -3;

//     backleft.matrix.rotate(0, 0, 0, 1); // Joint 1
//     var backleftCoord = new Matrix4(backleft.matrix);
//     backleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
//     backleft.matrix.translate(-1.25* scale, -.25* scale, 2* scale);
//       backleft.normalMatrix.setInverseOf(backleft.matrix).transpose();

//     backleft.render();
 
//     var backright = new Cube();
//     //backright.color =  [0.0, 0.0, 0.0, 1.0];
//     // backright.matrix.rotate(-10, 1, 0, 0);
//     backright.matrix.setTranslate(0, 0, 0);
//       if(g_normalOn) backright.textureNum = -3;

//     backright.matrix.rotate(0, 0, 0, 1); // Joint 1
//     var backrightCoord = new Matrix4(backright.matrix);
//     backright.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
//     backright.matrix.translate(.37* scale, -.25* scale, 2* scale);
//       backright.normalMatrix.setInverseOf(backright.matrix).transpose();

//     backright.render();
 
 
 
//     var frontleftlow = new Cube();
//       if(g_normalOn) frontleftlow.textureNum = -3;

//     frontleftlow.matrix = frontleftCoord;
//     // frontleftlow.matrix.rotate(-10, 1, 0, 0);
//         frontleftlow.color = [0.6, 0.4, 0.2, 1.0];

//     frontleftlow.matrix.rotate(0, 0, 0, 1);
//     frontleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
//     frontleftlow.matrix.translate(-1.25* scale, -1.75* scale, -.8* scale);
//       frontleftlow.normalMatrix.setInverseOf(frontleftlow.matrix).transpose();

//     frontleftlow.render();
 
//     var frontrightlow = new Cube();
//       if(g_normalOn) frontrightlow.textureNum = -3;

//     frontrightlow.matrix = frontrightCoord;
//         //frontleftlow.color = [0.6, 0.4, 0.2, 1.0];

//     // frontrightlow.matrix.rotate(-10, 1, 0, 0);
//     frontrightlow.matrix.rotate(0, 0, 0, 1);
//     frontrightlow.matrix.scale(0.08* scale, 0.08* scale* scale, 0.08* scale);
//     frontrightlow.matrix.translate(.37* scale, -1.75* scale, -.8* scale);
//       frontrightlow.normalMatrix.setInverseOf(frontrightlow.matrix).transpose();

//     frontrightlow.render();
 
//     var backleftlow = new Cube();
//     backleftlow.matrix = backleftCoord;
//       if(g_normalOn) backleftlow.textureNum = -3;

//     //backleftlow.color = [0.0, 0.0, 0.0, 1.0];
//     // backleftlow.matrix.rotate(-10, 1, 0, 0);
//     backleftlow.matrix.rotate(0, 0, 0, 1);
//     backleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
//     backleftlow.matrix.translate(-1.25* scale, -1.75* scale, 2* scale);
//       backleftlow.normalMatrix.setInverseOf(backleftlow.matrix).transpose();

//     backleftlow.render();
 
//     var backrightlow = new Cube();
//     backrightlow.color = [0.6, 0.4, 0.2, 1.0];
//       if(g_normalOn) backrightlow.textureNum = -3;

//     backrightlow.matrix = backrightCoord;
//     // backrightlow.matrix.rotate(-10, 1, 0, 0);
//     backrightlow.matrix.rotate(0, 0, 0, 1);
//     backrightlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
//     backrightlow.matrix.translate(.37* scale, -1.75* scale, 2* scale);
//       backrightlow.normalMatrix.setInverseOf(backrightlow.matrix).transpose();

//     backrightlow.render();


//       var tail1 = new Cube();
//       tail1.color =  [0.6, 0.4, 0.2, 1.0];
//             if(g_normalOn) tail1.textureNum = -3;

//       tail1.matrix = bodybase;
   
//       tail1.matrix.translate(0* scale, 0.25* scale, 0.23* scale);
//       tail1.matrix.rotate(0, -1, 0, 0);
//       tail1.matrix.rotate(30* scale , 1, 0, 0);
//       var tailseg = new Matrix4(tail1.matrix);
//       tail1.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//       tail1.normalMatrix.setInverseOf(tail1.matrix).transpose();


//     tail1.render();

//     var tail2 = new Cube();
//                 if(g_normalOn) tail2.textureNum = -3;

//     tail2.color = [.9, .6, 0.0, 1.0];
//     tail2.matrix = tailseg;
//     //  var tailseg2 = new Matrix4(tail2.matrix);
//     tail2.matrix.translate(0* scale, 0.18* scale, 0.0* scale);

//     tail2.matrix.rotate(0, -1, 0, 0);
//     tail2.matrix.rotate(-30* scale , 1, 0, 0);
//     var tailseg2 = new Matrix4(tail2.matrix);
//     tail2.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//           tail2.normalMatrix.setInverseOf(tail2.matrix).transpose();


//     tail2.render();

//       var tail3 = new Cube();
//                       if(g_normalOn) tail3.textureNum = -3;

//       tail3.color = [.9, .6, 0.0, 1.0];
//       tail3.matrix = tailseg2;
//     //  var tailseg3= new Matrix4(tail3.matrix);
//     tail3.matrix.translate(0* scale, 0.2* scale, 0* scale);

//     tail3.matrix.rotate(0, -1, 0, 0);
//     tail3.matrix.rotate(30* scale , 1, 0, 0);
//     var tailseg3= new Matrix4(tail3.matrix);
//     tail3.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
 
// //     tail3.matrix.rotate(0 , 1, 0, 0);
// //     tail3.matrix.scale(0.05, 0.2, 0.05);
// //   tail3.matrix.translate(0, 2.84, 6.2);

//       tail3.normalMatrix.setInverseOf(tail3.matrix).transpose();

//     tail3.render();

//       var tail4 = new Cube();
//                 if(g_normalOn) tail4.textureNum = -3;

//       tail4.color = [.0, 0.0, 0.0, .0];
//       tail4.matrix = tailseg3;
//       tail4.matrix.translate(0, 0.2, 0);
//     tail4.matrix.rotate(0, -1, 0, 0);
//     tail4.matrix.rotate(60* scale , 1, 0, 0);
//     tail4.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//           tail4.normalMatrix.setInverseOf(tail4.matrix).transpose();

//       tail4.render();


   
//     // var mom = new Sphere();
//     // mom.render();
//     //now the rendering is so strong its going to blow up my computer 

  


//     // var leftArm = new Cube();
//     // leftArm.color = [1, 1, 0, 1];
//     // leftArm.matrix.setTranslate(0, -0.5, 0.0);
//     // leftArm.matrix.rotate(-5, 1, 0, 0);
//     // leftArm.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1

//     // var armCoord = new Matrix4(leftArm.matrix);
//     // leftArm.matrix.scale(0.25, 0.7, 0.5);
//     // leftArm.matrix.translate(-0.5, 0, 0);
//     // leftArm.render();

//     // var box = new Cube();
//     // box.color = [1, 0, 1, 1];
//     // box.matrix = armCoord;
//     // box.matrix.translate(0, .65, 0, 0);
//     // box.matrix.rotate(g_jointAngle2,0,0,1);
//     // box.matrix.scale(.3,.3,.3);
//     // box.matrix.translate(-.5,0,-0.001);
//     // box.render();

 var ball = new Sphere();
   ball.color = [.9, .6, .95, 1];
   ball.textureNum = 1;
   if(g_normalOn) ball.textureNum = -3;
   ball.matrix.scale(.5, .5, .5);
   ball.matrix.translate(3, .75, -1.25);
    //ball.normalMatrix.setInverseOf(ball.matrix).transpose();
   ball.render();
   
  //   var box = new Cube();
  // box.color = [.9, .6, .95, 1];
  // box.textureNum = -2;
  // if(g_normalOn) box.textureNum = 0;
  // box.matrix.scale(.5, .5, .5);
  // box.matrix.translate(-3, .75, -1.25);
  // box.render(); //skybox takes care of box requirement
}
 

//the cat gotta go

function drawEnvironment() {
  
  //   gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  // gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
  // gl.uniform1i(u_lightOn, g_lightOn);
//can i just pass this in multiple times?

//i cant even call it once??
  
  let sky = new Cube();
   // sky.textureArray = [4, 7, 6, 8, 9, 1];
      if(g_normalOn) sky.textureNum = -3; //i put all this in?? where did it go??

       sky.color = [0.53, 0.81, 0.92, 1.0]; // Light blue color

     sky.matrix.scale(-10,-10,-10);
   sky.matrix.translate(-.5, -.5, -.5);
       //sky.normalMatrix.setInverseOf(sky.matrix).transpose();

   
  sky.render();

  let ground = new Cube();
    ground.matrix = new Matrix4();
    ground.textureNum = 0;
    if(g_normalOn) ground.textureNum = -3;
     //ground.matrix.setTranslate(-500, -2, -500);
    //not even translating that
      ground.matrix.translate(0,-.25,0);
   ground.matrix.scale(-100,1,-100); //the fact that y was 0 was what was ruining everything FALSE ALARM
   ground.matrix.translate(-.5, -1, -.5);
    
    ground.color = [0.0, 1.0, 0.0, 1.0];
    //ground.matrix.scale(100, 9, 100);
     //ground.matrix.setTranslate(0, 0, 0);
    //ground.textureArray = [3, 3, 3, 3, 3, 0];
    //ground.useColor = false;
    ground.render();


}

function drawCat() {
  
      var colorBody = [.9, .6, 0.0, 1.0];
    var colorSkin = [0.6, 0.4, 0.2, 1.0];
    var colorEyes = [0.0, 0.0, 0.0, 1.0];
    //shit getting messy
  
  var scale = 1;
      var body = new Cube();
      body.color = [.9, .6, 0.0, 1.0];
    //var bodybase = new Matrix4(body.matrix);
    if(g_normalOn) body.textureNum = -3;
    // body.matrix.translate(-.25, -.75, 0.0);
    // body.matrix.rotate(-5, 1, 0, 0);
    // body.matrix.scale(0.5, 0.3, 0.5);
    body.matrix.scale(.25* scale, 0.25* scale, 0.35* scale);
    body.matrix.translate(-.5* scale, 0* scale, -0.25* scale);
    // no longer attached to the joint -- come back for this
    body.normalMatrix.setInverseOf(body.matrix).transpose(); //why is it pissing itself it literally exists
    //is this ok

    body.render();


    var head = new Sphere();
   
    // head.matrix.rotate(-10, 1, 0, 0);
    head.color = [.9, .6, 0.0, 1.0];
    head.matrix.rotate(0, 1, 0, 0);
      if(g_normalOn) head.textureNum = -3;
      scale = 2;

    var headMatrixCopy = new Matrix4(head.matrix);
    var headMatrixCopy2 = new Matrix4(head.matrix);
    //i need that shit for the ears i think
    head.matrix.scale(0.055* scale, 0.055* scale, 0.055* scale);
    scale = 0.5;
    head.matrix.translate(0* scale , 6.05* scale, -2.75* scale);
      head.normalMatrix.setInverseOf(head.matrix).transpose();
scale = 1;
   
    head.render();

    var face = new Sphere();
    //face.color = [0.0, 0.0, 0.0, 1.0];

    // face.matrix.rotate(-10, 1, 0, 0);
    if(g_normalOn) face.textureNum = -3;
 scale = 2;
    face.matrix.rotate(0, 1, 0, 0);
    face.matrix.scale(0.050* scale, 0.030* scale, 0.050* scale);
        scale = 0.5;

    face.matrix.translate(0* scale, 9.55* scale, -3.75* scale);
      face.normalMatrix.setInverseOf(face.matrix).transpose();
      scale = 1;


    face.render();
//fix head first

var lefteye = new Cube();
lefteye.color = [0.0, 0.0, 0.0, 1.0];
  if(g_normalOn) lefteye.textureNum = -3;


// lefteyeblack.matrix.rotate(-10, 1, 0, 0);
lefteye.matrix.rotate(0, 1, 0, 0);
lefteye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
lefteye.matrix.translate(-2.001* scale, 5.5* scale, -6* scale);
lefteye.normalMatrix.setInverseOf(lefteye.matrix).transpose();

lefteye.render();

var reye = new Cube();
reye.color = [0, 0.0, 0.0, 1.0];
  if(g_normalOn) reye.textureNum = -3;


// righteyeblack.matrix.rotate(-10, 1, 0, 0);
reye.matrix.rotate(0, 1, 0, 0);
reye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
reye.matrix.translate(1.001* scale, 5.5* scale, -6* scale);
reye.normalMatrix.setInverseOf(reye.matrix).transpose();

reye.render();


    var rightear = new Cube();
    rightear.color = [.9, .6, 0.0, 1.0];
//     rightear.matrix =  headMatrixCopy;

//     rightear.matrix.rotate(-g_earAngle, 1, 0, 0);
//     rightear.matrix.rotate(30, 0, 0, 1); //can i do 2 rotations?
//  rightear.matrix.scale(0.09, 0.09, 0.09);
// // rightear.matrix.translate(1.25, 4.5, -1.8);

// rightear.matrix = headMatrixCopy;
// // Position the ear correctly before rotating for the joint movement
// scale = 1;
// rightear.matrix.translate(-.1* scale *0.8, 0.40*0.8 *scale, -0.2* scale);
// // Apply rotation for the ear's animation
// scale = 1;
// rightear.matrix.rotate(0, 1, 0, -1);
// rightear.matrix.rotate(30* scale, 0, 0, 1); // Additional rotation for alignment
// rightear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
//   rightear.normalMatrix.setInverseOf(rightear.matrix).transpose();

//     rightear.render();

//     var leftear = new Cube();

// leftear.color = [.9, .6, 0.0, 1.0];
// leftear.matrix = headMatrixCopy2;
// // Position the ear correctly before rotating for the joint movement
// leftear.matrix.translate(.045* scale * 0.8, 0.44*0.8* scale, -0.2* scale);
// // Apply rotation for the ear's animation
// leftear.matrix.rotate(0, 1, 0, 1);
// leftear.matrix.rotate(-29* scale, 0, 0, 1); // Additional rotation for alignment
// leftear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
// leftear.normalMatrix.setInverseOf(leftear.matrix).transpose();
//       leftear.render();

    //the world aint ready for this yet
   
    // upper legs ============================
    var frontleft = new Cube();
    // frontleft.matrix.rotate(-10, 1, 0, 0);
        frontleft.color = [0.6, 0.4, 0.2, 1.0];
          if(g_normalOn) frontleft.textureNum = -3;


    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(0, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    frontleft.matrix.translate(-1.25* scale, -.25* scale, -0.8* scale);
      frontleft.normalMatrix.setInverseOf(frontleft.matrix).transpose();

    frontleft.render();
 
    var frontright = new Cube();
    //frontright.color =  [0.0, 0.0, 0.0, 1.0];
    // frontright.matrix.rotate(-10, 1, 0, 0);
    frontright.matrix.setTranslate(0, 0, 0);
      if(g_normalOn) frontright.textureNum = -3;

    frontright.matrix.rotate(0, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
    frontright.matrix.scale(0.08* scale, -0.08* scale, 0.08)* scale;
    frontright.matrix.translate(.37* scale, -.25* scale, -0.8* scale);
      frontright.normalMatrix.setInverseOf(frontright.matrix).transpose();

    frontright.render();
 
    var backleft = new Cube();
    //backleft.color  =[0.0, 0.0, 0.0, 1.0];
    // backleft.matrix.rotate(-10, 1, 0, 0);
    backleft.matrix.setTranslate(0, 0, 0);
      if(g_normalOn) backleft.textureNum = -3;

    backleft.matrix.rotate(0, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
    backleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    backleft.matrix.translate(-1.25* scale, -.25* scale, 2* scale);
      backleft.normalMatrix.setInverseOf(backleft.matrix).transpose();

    backleft.render();
 
    var backright = new Cube();
    //backright.color =  [0.0, 0.0, 0.0, 1.0];
    // backright.matrix.rotate(-10, 1, 0, 0);
    backright.matrix.setTranslate(0, 0, 0);
      if(g_normalOn) backright.textureNum = -3;

    backright.matrix.rotate(0, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    backright.matrix.translate(.37* scale, -.25* scale, 2* scale);
      backright.normalMatrix.setInverseOf(backright.matrix).transpose();

    backright.render();
 
 
 
    var frontleftlow = new Cube();
      if(g_normalOn) frontleftlow.textureNum = -3;

    frontleftlow.matrix = frontleftCoord;
    // frontleftlow.matrix.rotate(-10, 1, 0, 0);
        frontleftlow.color = [0.6, 0.4, 0.2, 1.0];

    frontleftlow.matrix.rotate(0, 0, 0, 1);
    frontleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    frontleftlow.matrix.translate(-1.25* scale, -1.75* scale, -.8* scale);
      frontleftlow.normalMatrix.setInverseOf(frontleftlow.matrix).transpose();

    frontleftlow.render();
 
    var frontrightlow = new Cube();
      if(g_normalOn) frontrightlow.textureNum = -3;

    frontrightlow.matrix = frontrightCoord;
        //frontleftlow.color = [0.6, 0.4, 0.2, 1.0];

    // frontrightlow.matrix.rotate(-10, 1, 0, 0);
    frontrightlow.matrix.rotate(0, 0, 0, 1);
    frontrightlow.matrix.scale(0.08* scale, 0.08* scale* scale, 0.08* scale);
    frontrightlow.matrix.translate(.37* scale, -1.75* scale, -.8* scale);
      frontrightlow.normalMatrix.setInverseOf(frontrightlow.matrix).transpose();

    frontrightlow.render();
 
    var backleftlow = new Cube();
    backleftlow.matrix = backleftCoord;
      if(g_normalOn) backleftlow.textureNum = -3;

    //backleftlow.color = [0.0, 0.0, 0.0, 1.0];
    // backleftlow.matrix.rotate(-10, 1, 0, 0);
    backleftlow.matrix.rotate(0, 0, 0, 1);
    backleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    backleftlow.matrix.translate(-1.25* scale, -1.75* scale, 2* scale);
      backleftlow.normalMatrix.setInverseOf(backleftlow.matrix).transpose();

    backleftlow.render();
 
    var backrightlow = new Cube();
    backrightlow.color = [0.6, 0.4, 0.2, 1.0];
      if(g_normalOn) backrightlow.textureNum = -3;

    backrightlow.matrix = backrightCoord;
    // backrightlow.matrix.rotate(-10, 1, 0, 0);
    backrightlow.matrix.rotate(0, 0, 0, 1);
    backrightlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    backrightlow.matrix.translate(.37* scale, -1.75* scale, 2* scale);
      backrightlow.normalMatrix.setInverseOf(backrightlow.matrix).transpose();

    backrightlow.render();
    
        // Tail
    var tail1 = new Cube();
    tail1.color = colorSkin;
    if (g_normalOn) tail1.textureNum = -3;
    tail1.matrix.translate(0 * scale, 0.25 * scale, 0.23 * scale);
    tail1.matrix.rotate(30 * scale, 1, 0, 0);
    var tailseg = new Matrix4(tail1.matrix);
    tail1.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
    tail1.normalMatrix.setInverseOf(tail1.matrix).transpose();
    tail1.render();

    var tail2 = new Cube();
    tail2.color = colorBody;
    if (g_normalOn) tail2.textureNum = -3;
    tail2.matrix = tailseg;
    tail2.matrix.translate(0 * scale, 0.18 * scale, 0.0 * scale);
    tail2.matrix.rotate(-30 * scale, 1, 0, 0);
    var tailseg2 = new Matrix4(tail2.matrix);
    tail2.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
    tail2.normalMatrix.setInverseOf(tail2.matrix).transpose();
    tail2.render();

    var tail3 = new Cube();
    tail3.color = colorBody;
    if (g_normalOn) tail3.textureNum = -3;
    tail3.matrix = tailseg2;
    tail3.matrix.translate(0 * scale, 0.2 * scale, 0 * scale);
    tail3.matrix.rotate(30 * scale, 1, 0, 0);
    var tailseg3 = new Matrix4(tail3.matrix);
    tail3.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
    //tail3.normalMatrix.setInverseOf(tail3.matrix).transpose();
    tail3.render();

    var tail4 = new Cube();
    tail4.color = colorEyes;
    if (g_normalOn) tail4.textureNum = -3;
    tail4.matrix = tailseg3;
    tail4.matrix.translate(0, 0.2, 0);
    tail4.matrix.rotate(60 * scale, 1, 0, 0);
    tail4.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
    tail4.normalMatrix.setInverseOf(tail4.matrix).transpose();
    tail4.render();


//       var tail1 = new Cube();
//       tail1.color =  [0.6, 0.4, 0.2, 1.0];
//             if(g_normalOn) tail1.textureNum = -3;

//       tail1.matrix = bodybase;
   
//       tail1.matrix.translate(0* scale, 0.25* scale, 0.23* scale);
//       tail1.matrix.rotate(0, -1, 0, 0);
//       tail1.matrix.rotate(30* scale , 1, 0, 0);
//       var tailseg = new Matrix4(tail1.matrix);
//       tail1.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//       tail1.normalMatrix.setInverseOf(tail1.matrix).transpose();


//     tail1.render();

//     var tail2 = new Cube();
//                 if(g_normalOn) tail2.textureNum = -3;

//     tail2.color = [.9, .6, 0.0, 1.0];
//     tail2.matrix = tailseg;
//     //  var tailseg2 = new Matrix4(tail2.matrix);
//     tail2.matrix.translate(0* scale, 0.18* scale, 0.0* scale);

//     tail2.matrix.rotate(0, -1, 0, 0);
//     tail2.matrix.rotate(-30* scale , 1, 0, 0);
//     var tailseg2 = new Matrix4(tail2.matrix);
//     tail2.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//           tail2.normalMatrix.setInverseOf(tail2.matrix).transpose();


//     tail2.render();

//       var tail3 = new Cube();
//                       if(g_normalOn) tail3.textureNum = -3;

//       tail3.color = [.9, .6, 0.0, 1.0];
//       tail3.matrix = tailseg2;
//     //  var tailseg3= new Matrix4(tail3.matrix);
//     tail3.matrix.translate(0* scale, 0.2* scale, 0* scale);

//     tail3.matrix.rotate(0, -1, 0, 0);
//     tail3.matrix.rotate(30* scale , 1, 0, 0);
//     var tailseg3= new Matrix4(tail3.matrix);
//     tail3.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
 
// //     tail3.matrix.rotate(0 , 1, 0, 0);
// //     tail3.matrix.scale(0.05, 0.2, 0.05);
// //   tail3.matrix.translate(0, 2.84, 6.2);

//       tail3.normalMatrix.setInverseOf(tail3.matrix).transpose();

//     tail3.render();

//       var tail4 = new Cube();
//                 if(g_normalOn) tail4.textureNum = -3;

//       tail4.color = [.0, 0.0, 0.0, .0];
//       tail4.matrix = tailseg3;
//       tail4.matrix.translate(0, 0.2, 0);
//     tail4.matrix.rotate(0, -1, 0, 0);
//     tail4.matrix.rotate(60* scale , 1, 0, 0);
//     tail4.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
//           tail4.normalMatrix.setInverseOf(tail4.matrix).transpose();

//       tail4.render();
}

// function drawCat() {
//     var scale = 1.0; // Adjust this scale value as needed
//     var colorBody = [.9, .6, 0.0, 1.0];
//     var colorSkin = [0.6, 0.4, 0.2, 1.0];
//     var colorEyes = [0.0, 0.0, 0.0, 1.0];

//     // Body
//     var body = new Cube();
//     body.color = colorBody;
//     body.textureNum = -2;
//     if (g_normalOn) body.textureNum = -3;
//     body.matrix.scale(.25 * scale, 0.25 * scale, 0.35 * scale);
//     body.matrix.translate(-.5 * scale, 0 * scale, -0.25 * scale);
//     body.normalMatrix.setInverseOf(body.matrix).transpose();
//     body.render();

//     // Head
//     var head = new Cube();
//     head.color = colorBody;
//     head.textureNum = -2;
//     if (g_normalOn) head.textureNum = -3;
//     head.matrix.scale(0.35 * scale, 0.35 * scale, 0.35 * scale);
//     head.matrix.translate(-.5 * scale, 0.25 * scale, -1.25 * scale);
//     head.normalMatrix.setInverseOf(head.matrix).transpose();
//     head.render();

//     // Left Eye
//     var lefteye = new Cube();
//     lefteye.color = colorEyes;
//     if (g_normalOn) lefteye.textureNum = -3;
//     lefteye.matrix.scale(0.05 * scale, 0.061 * scale, 0.045 * scale);
//     lefteye.matrix.translate(-2.001 * scale, 5.5 * scale, -6 * scale);
//     lefteye.normalMatrix.setInverseOf(lefteye.matrix).transpose();
//     lefteye.render();

//     // Right Eye
//     var righteye = new Cube();
//     righteye.color = colorEyes;
//     if (g_normalOn) righteye.textureNum = -3;
//     righteye.matrix.scale(0.05 * scale, 0.061 * scale, 0.045 * scale);
//     righteye.matrix.translate(1.001 * scale, 5.5 * scale, -6 * scale);
//     righteye.normalMatrix.setInverseOf(righteye.matrix).transpose();
//     righteye.render();

//     // Left Ear
//     var leftear = new Cube();
//     leftear.color = colorBody;
//     leftear.textureNum = -2;
//     if (g_normalOn) leftear.textureNum = -3;
//     leftear.matrix.scale(0.09 * scale, 0.09 * scale, 0.09 * scale);
//     leftear.matrix.translate(.045 * scale, 0.44 * scale, -0.2 * scale);
//     leftear.matrix.rotate(0, 1, 0, 1);
//     leftear.matrix.rotate(-29 * scale, 0, 0, 1);
//     leftear.normalMatrix.setInverseOf(leftear.matrix).transpose();
//     leftear.render();

//     // Right Ear
//     var rightear = new Cube();
//     rightear.color = colorBody;
//     rightear.textureNum = -2;
//     if (g_normalOn) rightear.textureNum = -3;
//     rightear.matrix.scale(0.09 * scale, 0.09 * scale, 0.09 * scale);
//     rightear.matrix.translate(-.1 * scale, 0.40 * scale, -0.2 * scale);
//     rightear.matrix.rotate(0, 1, 0, -1);
//     rightear.matrix.rotate(30 * scale, 0, 0, 1);
//     rightear.normalMatrix.setInverseOf(rightear.matrix).transpose();
//     rightear.render();

//     // Upper Legs
//     var frontleft = new Cube();
//     frontleft.color = colorSkin;
//     if (g_normalOn) frontleft.textureNum = -3;
//     frontleft.matrix.scale(0.08 * scale, -0.08 * scale, 0.08 * scale);
//     frontleft.matrix.translate(-1.25 * scale, -.25 * scale, -0.8 * scale);
//     frontleft.normalMatrix.setInverseOf(frontleft.matrix).transpose();
//     frontleft.render();

//     var frontright = new Cube();
//     frontright.color = colorSkin;
//     if (g_normalOn) frontright.textureNum = -3;
//     frontright.matrix.scale(0.08 * scale, -0.08 * scale, 0.08 * scale);
//     frontright.matrix.translate(.37 * scale, -.25 * scale, -0.8 * scale);
//     frontright.normalMatrix.setInverseOf(frontright.matrix).transpose();
//     frontright.render();

//     var backleft = new Cube();
//     backleft.color = colorSkin;
//     if (g_normalOn) backleft.textureNum = -3;
//     backleft.matrix.scale(0.08 * scale, -0.08 * scale, 0.08 * scale);
//     backleft.matrix.translate(-1.25 * scale, -.25 * scale, 2 * scale);
//     backleft.normalMatrix.setInverseOf(backleft.matrix).transpose();
//     backleft.render();

//     var backright = new Cube();
//     backright.color = colorSkin;
//     if (g_normalOn) backright.textureNum = -3;
//     backright.matrix.scale(0.08 * scale, -0.08 * scale, 0.08 * scale);
//     backright.matrix.translate(.37 * scale, -.25 * scale, 2 * scale);
//     backright.normalMatrix.setInverseOf(backright.matrix).transpose();
//     backright.render();

//     // Lower Legs
//     var frontleftlow = new Cube();
//     frontleftlow.color = colorSkin;
//     if (g_normalOn) frontleftlow.textureNum = -3;
//     frontleftlow.matrix.rotate(170, 0, 1, 0);
//     frontleftlow.matrix.scale(0.08 * scale, 0.08 * scale, 0.08 * scale);
//     frontleftlow.matrix.translate(-1.25 * scale, -1.75 * scale, -.8 * scale);
//     frontleftlow.normalMatrix.setInverseOf(frontleftlow.matrix).transpose();
//     frontleftlow.render();

//     var frontrightlow = new Cube();
//     frontrightlow.color = colorSkin;
//     if (g_normalOn) frontrightlow.textureNum = -3;
//     frontrightlow.matrix.rotate(170, 0, 1, 0);
//     frontrightlow.matrix.scale(0.08 * scale, 0.08 * scale, 0.08 * scale);
//     frontrightlow.matrix.translate(.37 * scale, -1.75 * scale, -.8 * scale);
//     frontrightlow.normalMatrix.setInverseOf(frontrightlow.matrix).transpose();
//     frontrightlow.render();

//     var backleftlow = new Cube();
//     backleftlow.color = colorSkin;
//     if (g_normalOn) backleftlow.textureNum = -3;
//     backleftlow.matrix.rotate(170, 0, 1, 0);
//     backleftlow.matrix.scale(0.08 * scale, 0.08 * scale, 0.08 * scale);
//     backleftlow.matrix.translate(-1.25 * scale, -1.75 * scale, 2 * scale);
//     backleftlow.normalMatrix.setInverseOf(backleftlow.matrix).transpose();
//     backleftlow.render();

//     var backrightlow = new Cube();
//     backrightlow.color = colorSkin;
//     if (g_normalOn) backrightlow.textureNum = -3;
//     backrightlow.matrix.rotate(170, 0, 1, 0);
//     backrightlow.matrix.scale(0.08 * scale, 0.08 * scale, 0.08 * scale);
//     backrightlow.matrix.translate(.37 * scale, -1.75 * scale, 2 * scale);
//     backrightlow.normalMatrix.setInverseOf(backrightlow.matrix).transpose();
//     backrightlow.render();

//     // Tail
//     var tail1 = new Cube();
//     tail1.color = colorSkin;
//     if (g_normalOn) tail1.textureNum = -3;
//     tail1.matrix.translate(0 * scale, 0.25 * scale, 0.23 * scale);
//     tail1.matrix.rotate(30 * scale, 1, 0, 0);
//     var tailseg = new Matrix4(tail1.matrix);
//     tail1.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
//     tail1.normalMatrix.setInverseOf(tail1.matrix).transpose();
//     tail1.render();

//     var tail2 = new Cube();
//     tail2.color = colorBody;
//     if (g_normalOn) tail2.textureNum = -3;
//     tail2.matrix = tailseg;
//     tail2.matrix.translate(0 * scale, 0.18 * scale, 0.0 * scale);
//     tail2.matrix.rotate(-30 * scale, 1, 0, 0);
//     var tailseg2 = new Matrix4(tail2.matrix);
//     tail2.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
//     tail2.normalMatrix.setInverseOf(tail2.matrix).transpose();
//     tail2.render();

//     var tail3 = new Cube();
//     tail3.color = colorBody;
//     if (g_normalOn) tail3.textureNum = -3;
//     tail3.matrix = tailseg2;
//     tail3.matrix.translate(0 * scale, 0.2 * scale, 0 * scale);
//     tail3.matrix.rotate(30 * scale, 1, 0, 0);
//     var tailseg3 = new Matrix4(tail3.matrix);
//     tail3.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
//     tail3.normalMatrix.setInverseOf(tail3.matrix).transpose();
//     tail3.render();

//     var tail4 = new Cube();
//     tail4.color = colorEyes;
//     if (g_normalOn) tail4.textureNum = -3;
//     tail4.matrix = tailseg3;
//     tail4.matrix.translate(0, 0.2, 0);
//     tail4.matrix.rotate(60 * scale, 1, 0, 0);
//     tail4.matrix.scale(0.05 * scale, 0.2 * scale, 0.05 * scale);
//     tail4.normalMatrix.setInverseOf(tail4.matrix).transpose();
//     tail4.render();
// }



function drawWalls() { //add the map and walls? or make map global? not sure
//make the map global and not here

    // // var c = new Cube();
    // for(x=0; x<32; x++){
    //     for(y=0;y<32;y++){
    //         if(g_map[x][y] > 0){   
    //             for(z=0; z<g_map[x][y]; z++){
    //                 var cube = new Cube();
    //                 cube.textureNum = 1;
    //                 cube.matrix.translate(y-4, z-1.75, x-4);
    //                 cube.renderfast(); //not sure about this 
    //                 //renders only one face and then crashes
    //                 //cube.render(); //actually dogshit slow
    //                 console.log("walls render");
    //             }              
    //         } 
    //     }
    // }  
}