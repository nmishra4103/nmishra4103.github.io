function drawAllShapes(){

   //this will be a cat
   //allegedly

   //var orange = [.9, .6, 0.0, 1.0];

   var body = new Cube();
   body.color = [.9, .6, 0.0, 1.0];
   var bodybase = new Matrix4(body.matrix);
   // body.matrix.translate(-.25, -.75, 0.0);
   // body.matrix.rotate(-5, 1, 0, 0);
   // body.matrix.scale(0.5, 0.3, 0.5);
   body.matrix.scale(.25, 0.25, 0.35);
   body.matrix.translate(-.5, 0, -0.25);
   // no longer attached to the joint -- come back for this
   body.render();


   var head = new Sphere();
   
   // head.matrix.rotate(-10, 1, 0, 0);
   head.color = [.9, .6, 0.0, 1.0];
   head.matrix.rotate(-head_animation, 1, 0, 0);
   var headMatrixCopy = new Matrix4(head.matrix);
   var headMatrixCopy2 = new Matrix4(head.matrix);
   head.matrix.scale(0.055, 0.055, 0.055);
   head.matrix.translate(0, 6.05, -2.75);
   
   head.render();

   var face = new Sphere();
   // face.color = [1.0, 0.0, 0.0, 1.0];

   // face.matrix.rotate(-10, 1, 0, 0);
   face.matrix.rotate(-head_animation, 1, 0, 0);
   face.matrix.scale(0.050, 0.030, 0.050);
   face.matrix.translate(0, 9.55, -3.75);
   face.render();
//fix head first

var lefteye = new Cube();
lefteye.color = [0.0, 0.0, 0.0, 1.0];

// lefteyeblack.matrix.rotate(-10, 1, 0, 0);
lefteye.matrix.rotate(-head_animation, 1, 0, 0);
lefteye.matrix.scale(0.05, 0.061, 0.045);
lefteye.matrix.translate(-2.001, 5.5, -6);
lefteye.render();

var reye = new Cube();
reye.color = [0, 0.0, 0.0, 1.0];

// righteyeblack.matrix.rotate(-10, 1, 0, 0);
reye.matrix.rotate(-head_animation, 1, 0, 0);
reye.matrix.scale(0.05, 0.061, 0.045);
reye.matrix.translate(1.001, 5.5, -6);
reye.render();


    var rightear = new Pyramid();
    rightear.color = [.0, .0, 0.0, 0.0];
//     rightear.matrix =  headMatrixCopy;

//     rightear.matrix.rotate(-g_earAngle, 1, 0, 0);
//     rightear.matrix.rotate(30, 0, 0, 1); //can i do 2 rotations?
//  rightear.matrix.scale(0.09, 0.09, 0.09);
// // rightear.matrix.translate(1.25, 4.5, -1.8);

rightear.matrix = headMatrixCopy;
// Position the ear correctly before rotating for the joint movement
rightear.matrix.translate(-.1, 0.40, -0.2);
// Apply rotation for the ear's animation
rightear.matrix.rotate(-g_earAngle, 1, 0, -1);
rightear.matrix.rotate(30, 0, 0, 1); // Additional rotation for alignment
rightear.matrix.scale(0.09, 0.09, 0.09);
    rightear.render();

   var leftear = new Pyramid();

leftear.color = [.9, .6, 0.0, 1.0];
leftear.matrix = headMatrixCopy2;
// Position the ear correctly before rotating for the joint movement
leftear.matrix.translate(.045, 0.44, -0.2);
// Apply rotation for the ear's animation
leftear.matrix.rotate(-g_earAngle, 1, 0, 1);
leftear.matrix.rotate(-29, 0, 0, 1); // Additional rotation for alignment
leftear.matrix.scale(0.09, 0.09, 0.09);
     leftear.render();

   //the world aint ready for this yet
   
    // upper legs ============================
    var frontleft = new Cube();
    // frontleft.matrix.rotate(-10, 1, 0, 0);
    frontleft.color = [0.6, 0.4, 0.2, 1.0];
    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleft.matrix.scale(0.08, -0.08, 0.08);
    frontleft.matrix.translate(-1.25, -.25, -0.8);
    frontleft.render();
 
    var frontright = new Cube();
    // frontright.matrix.rotate(-10, 1, 0, 0);
    frontright.matrix.setTranslate(0, 0, 0);
    frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
    frontright.matrix.scale(0.08, -0.08, 0.08);
    frontright.matrix.translate(.37, -.25, -0.8);
    frontright.render();
 
    var backleft = new Cube();
    // backleft.matrix.rotate(-10, 1, 0, 0);
    backleft.matrix.setTranslate(0, 0, 0);
    backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
    backleft.matrix.scale(0.08, -0.08, 0.08);
    backleft.matrix.translate(-1.25, -.25, 2);
    backleft.render();
 
    var backright = new Cube();
    // backright.matrix.rotate(-10, 1, 0, 0);
    backright.matrix.setTranslate(0, 0, 0);
    backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(0.08, -0.08, 0.08);
    backright.matrix.translate(.37, -.25, 2);
    backright.render();
 
 
 
    // lower leg =======================================
    var frontleftlow = new Cube();
    frontleftlow.matrix = frontleftCoord;
    // frontleftlow.matrix.rotate(-10, 1, 0, 0);
    frontleftlow.color = [0.6, 0.4, 0.2, 1.0];
    frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    frontleftlow.matrix.scale(0.08, 0.08, 0.08);
    frontleftlow.matrix.translate(-1.25, -1.75, -.8);
    frontleftlow.render();
 
    var frontrightlow = new Cube();
    frontrightlow.matrix = frontrightCoord;
    // frontrightlow.matrix.rotate(-10, 1, 0, 0);
    frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    frontrightlow.matrix.scale(0.08, 0.08, 0.08);
    frontrightlow.matrix.translate(.37, -1.75, -.8);
    frontrightlow.render();
 
    var backleftlow = new Cube();
    backleftlow.matrix = backleftCoord;
    // backleftlow.matrix.rotate(-10, 1, 0, 0);
    backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    backleftlow.matrix.scale(0.08, 0.08, 0.08);
    backleftlow.matrix.translate(-1.25, -1.75, 2);
    backleftlow.render();
 
    var backrightlow = new Cube();
   backrightlow.color = [0.6, 0.4, 0.2, 1.0];
    backrightlow.matrix = backrightCoord;
    // backrightlow.matrix.rotate(-10, 1, 0, 0);
    backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    backrightlow.matrix.scale(0.08, 0.08, 0.08);
    backrightlow.matrix.translate(.37, -1.75, 2);
    backrightlow.render();


     var tail1 = new Cube();
     tail1.color =  [0.6, 0.4, 0.2, 1.0];
     tail1.matrix = bodybase;
   
     tail1.matrix.translate(0, 0.25, 0.23);
     tail1.matrix.rotate(-head_animation, -1, 0, 0);
     tail1.matrix.rotate(30 , 1, 0, 0);
     var tailseg = new Matrix4(tail1.matrix);
     tail1.matrix.scale(0.05, 0.2, 0.05);


    tail1.render();

    var tail2 = new Cube();
    tail2.color = [.9, .6, 0.0, 1.0];
    tail2.matrix = tailseg;
   //  var tailseg2 = new Matrix4(tail2.matrix);
    tail2.matrix.translate(0, 0.18, 0.0);

    tail2.matrix.rotate(-g_tailJoint1, -1, 0, 0);
    tail2.matrix.rotate(-30 , 1, 0, 0);
    var tailseg2 = new Matrix4(tail2.matrix);
    tail2.matrix.scale(0.05, 0.2, 0.05);

    tail2.render();

     var tail3 = new Cube();
     tail3.color = [.9, .6, 0.0, 1.0];
     tail3.matrix = tailseg2;
   //  var tailseg3= new Matrix4(tail3.matrix);
    tail3.matrix.translate(0, 0.2, 0);

    tail3.matrix.rotate(-g_tailJoint2, -1, 0, 0);
    tail3.matrix.rotate(30 , 1, 0, 0);
    var tailseg3= new Matrix4(tail3.matrix);
    tail3.matrix.scale(0.05, 0.2, 0.05);
 
//     tail3.matrix.rotate(0 , 1, 0, 0);
//     tail3.matrix.scale(0.05, 0.2, 0.05);
//   tail3.matrix.translate(0, 2.84, 6.2);
    tail3.render();

     var tail4 = new Cube();
     tail4.color = [.0, 0.0, 0.0, .0];
     tail4.matrix = tailseg3;
     tail4.matrix.translate(0, 0.2, 0);
    tail4.matrix.rotate(-g_tailJoint3, -1, 0, 0);
    tail4.matrix.rotate(60 , 1, 0, 0);
    tail4.matrix.scale(0.05, 0.2, 0.05);
     tail4.render();


   
   // var mom = new Sphere();
   // mom.render();
   //now the rendering is so strong its going to blow up my computer 

  


   // var leftArm = new Cube();
   // leftArm.color = [1, 1, 0, 1];
   // leftArm.matrix.setTranslate(0, -0.5, 0.0);
   // leftArm.matrix.rotate(-5, 1, 0, 0);
   // leftArm.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1

   // var armCoord = new Matrix4(leftArm.matrix);
   // leftArm.matrix.scale(0.25, 0.7, 0.5);
   // leftArm.matrix.translate(-0.5, 0, 0);
   // leftArm.render();

   // var box = new Cube();
   // box.color = [1, 0, 1, 1];
   // box.matrix = armCoord;
   // box.matrix.translate(0, .65, 0, 0);
   // box.matrix.rotate(g_jointAngle2,0,0,1);
   // box.matrix.scale(.3,.3,.3);
   // box.matrix.translate(-.5,0,-0.001);
   // box.render();
}
