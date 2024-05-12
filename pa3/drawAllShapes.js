function drawAllShapes(scaleFactor){
  
  var scale = scaleFactor || 1.0;

    //this will be a cat
    //allegedly

    //var orange = [.9, .6, 0.0, 1.0];

    var body = new Cube();
    body.color = [0.0, 0.0, 0.0, 1.0];
    var bodybase = new Matrix4(body.matrix);
    // body.matrix.translate(-.25, -.75, 0.0);
    // body.matrix.rotate(-5, 1, 0, 0);
    // body.matrix.scale(0.5, 0.3, 0.5);
    body.matrix.scale(.25* scale, 0.25* scale, 0.35* scale);
    body.matrix.translate(-.5* scale, 0* scale, -0.25* scale);
    // no longer attached to the joint -- come back for this
    body.render();


    var head = new Sphere();
   
    // head.matrix.rotate(-10, 1, 0, 0);
    head.color = [0.0, 0.0, 0.0, 1.0];
    head.matrix.rotate(0, 1, 0, 0);
    var headMatrixCopy = new Matrix4(head.matrix);
    var headMatrixCopy2 = new Matrix4(head.matrix);
    head.matrix.scale(0.055* scale, 0.055* scale, 0.055* scale);
    head.matrix.translate(0* scale, 6.05* scale, -2.75* scale);
   
    head.render();

    var face = new Sphere();
     face.color = [0.0, 0.0, 0.0, 1.0];

    // face.matrix.rotate(-10, 1, 0, 0);
    face.matrix.rotate(0, 1, 0, 0);
    face.matrix.scale(0.050* scale, 0.030* scale, 0.050* scale);
    face.matrix.translate(0* scale, 9.55* scale, -3.75* scale);
    face.render();
//fix head first

var lefteye = new Cube();
lefteye.color = [1.0, 0.0, 0.0, 1.0];

// lefteyeblack.matrix.rotate(-10, 1, 0, 0);
lefteye.matrix.rotate(0, 1, 0, 0);
lefteye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
lefteye.matrix.translate(-2.001* scale, 5.5* scale, -6* scale);
lefteye.render();

var reye = new Cube();
reye.color = [1.0, 0.0, 0.0, 1.0];

// righteyeblack.matrix.rotate(-10, 1, 0, 0);
reye.matrix.rotate(0, 1, 0, 0);
reye.matrix.scale(0.05* scale, 0.061* scale, 0.045* scale);
reye.matrix.translate(1.001* scale, 5.5* scale, -6* scale);
reye.render();


    var rightear = new Pyramid();
    rightear.color = [0.0, 0.0, 0.0, 1.0];
//     rightear.matrix =  headMatrixCopy;

//     rightear.matrix.rotate(-g_earAngle, 1, 0, 0);
//     rightear.matrix.rotate(30, 0, 0, 1); //can i do 2 rotations?
//  rightear.matrix.scale(0.09, 0.09, 0.09);
// // rightear.matrix.translate(1.25, 4.5, -1.8);

rightear.matrix = headMatrixCopy;
// Position the ear correctly before rotating for the joint movement
rightear.matrix.translate(-.1* scale, 0.40* scale, -0.2* scale);
// Apply rotation for the ear's animation
rightear.matrix.rotate(0, 1, 0, -1);
rightear.matrix.rotate(30* scale, 0, 0, 1); // Additional rotation for alignment
rightear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
    rightear.render();

    var leftear = new Pyramid();

leftear.color = [0.0, 0.0, 0.0, 1.0];
leftear.matrix = headMatrixCopy2;
// Position the ear correctly before rotating for the joint movement
leftear.matrix.translate(.045* scale, 0.44* scale, -0.2* scale);
// Apply rotation for the ear's animation
leftear.matrix.rotate(0, 1, 0, 1);
leftear.matrix.rotate(-29* scale, 0, 0, 1); // Additional rotation for alignment
leftear.matrix.scale(0.09* scale, 0.09* scale, 0.09* scale);
      leftear.render();

    //the world aint ready for this yet
   
    // upper legs ============================
    var frontleft = new Cube();
    // frontleft.matrix.rotate(-10, 1, 0, 0);
    frontleft.color = [0.0, 0.0, 0.0, 1.0];
    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(0, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    frontleft.matrix.translate(-1.25* scale, -.25* scale, -0.8* scale);
    frontleft.render();
 
    var frontright = new Cube();
    frontright.color =  [0.0, 0.0, 0.0, 1.0];
    // frontright.matrix.rotate(-10, 1, 0, 0);
    frontright.matrix.setTranslate(0, 0, 0);
    frontright.matrix.rotate(0, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
    frontright.matrix.scale(0.08* scale, -0.08* scale, 0.08)* scale;
    frontright.matrix.translate(.37* scale, -.25* scale, -0.8* scale);
    frontright.render();
 
    var backleft = new Cube();
    backleft.color  =[0.0, 0.0, 0.0, 1.0];
    // backleft.matrix.rotate(-10, 1, 0, 0);
    backleft.matrix.setTranslate(0, 0, 0);
    backleft.matrix.rotate(0, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
    backleft.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    backleft.matrix.translate(-1.25* scale, -.25* scale, 2* scale);
    backleft.render();
 
    var backright = new Cube();
    backright.color =  [0.0, 0.0, 0.0, 1.0];
    // backright.matrix.rotate(-10, 1, 0, 0);
    backright.matrix.setTranslate(0, 0, 0);
    backright.matrix.rotate(0, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(0.08* scale, -0.08* scale, 0.08* scale);
    backright.matrix.translate(.37* scale, -.25* scale, 2* scale);
    backright.render();
 
 
 
    // lower leg =======================================
    var frontleftlow = new Cube();
    frontleftlow.matrix = frontleftCoord;
    // frontleftlow.matrix.rotate(-10, 1, 0, 0);
    frontleftlow.color = [0.0, 0.0, 0.0, 1.0];
    frontleftlow.matrix.rotate(0, 0, 0, 1);
    frontleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    frontleftlow.matrix.translate(-1.25* scale, -1.75* scale, -.8* scale);
    frontleftlow.render();
 
    var frontrightlow = new Cube();
    frontrightlow.matrix = frontrightCoord;
    frontrightlow.color = [0.0, 0.0, 0.0, 1.0];
    // frontrightlow.matrix.rotate(-10, 1, 0, 0);
    frontrightlow.matrix.rotate(0, 0, 0, 1);
    frontrightlow.matrix.scale(0.08* scale, 0.08* scale* scale, 0.08* scale);
    frontrightlow.matrix.translate(.37* scale, -1.75* scale, -.8* scale);
    frontrightlow.render();
 
    var backleftlow = new Cube();
    backleftlow.matrix = backleftCoord;
    backleftlow.color = [0.0, 0.0, 0.0, 1.0];
    // backleftlow.matrix.rotate(-10, 1, 0, 0);
    backleftlow.matrix.rotate(0, 0, 0, 1);
    backleftlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    backleftlow.matrix.translate(-1.25* scale, -1.75* scale, 2* scale);
    backleftlow.render();
 
    var backrightlow = new Cube();
    backrightlow.color = [0.0, 0.0, 0.0, 1.0];
    backrightlow.matrix = backrightCoord;
    // backrightlow.matrix.rotate(-10, 1, 0, 0);
    backrightlow.matrix.rotate(0, 0, 0, 1);
    backrightlow.matrix.scale(0.08* scale, 0.08* scale, 0.08* scale);
    backrightlow.matrix.translate(.37* scale, -1.75* scale, 2* scale);
    backrightlow.render();


      var tail1 = new Cube();
      tail1.color =  [0.0, 0.0, 0.0, 1.0];
      tail1.matrix = bodybase;
   
      tail1.matrix.translate(0* scale, 0.25* scale, 0.23* scale);
      tail1.matrix.rotate(0, -1, 0, 0);
      tail1.matrix.rotate(30* scale , 1, 0, 0);
      var tailseg = new Matrix4(tail1.matrix);
      tail1.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);


    tail1.render();

    var tail2 = new Cube();
    tail2.color =[0.0, 0.0, 0.0, 1.0];
    tail2.matrix = tailseg;
    //  var tailseg2 = new Matrix4(tail2.matrix);
    tail2.matrix.translate(0* scale, 0.18* scale, 0.0* scale);

    tail2.matrix.rotate(0, -1, 0, 0);
    tail2.matrix.rotate(-30* scale , 1, 0, 0);
    var tailseg2 = new Matrix4(tail2.matrix);
    tail2.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);

    tail2.render();

      var tail3 = new Cube();
      tail3.color = [0.0, 0.0, 0.0, 1.0];
      tail3.matrix = tailseg2;
    //  var tailseg3= new Matrix4(tail3.matrix);
    tail3.matrix.translate(0* scale, 0.2* scale, 0* scale);

    tail3.matrix.rotate(0, -1, 0, 0);
    tail3.matrix.rotate(30* scale , 1, 0, 0);
    var tailseg3= new Matrix4(tail3.matrix);
    tail3.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
 
//     tail3.matrix.rotate(0 , 1, 0, 0);
//     tail3.matrix.scale(0.05, 0.2, 0.05);
//   tail3.matrix.translate(0, 2.84, 6.2);
    tail3.render();

      var tail4 = new Cube();
      tail4.color = [0.0, 0.0, 0.0, 1.0];
      tail4.matrix = tailseg3;
      tail4.matrix.translate(0, 0.2, 0);
    tail4.matrix.rotate(0, -1, 0, 0);
    tail4.matrix.rotate(60* scale , 1, 0, 0);
    tail4.matrix.scale(0.05* scale, 0.2* scale, 0.05* scale);
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
 

//the cat gotta go

function drawEnvironment() {
  let sky = new Cube();
  sky.textureNum = 0;
   // sky.textureArray = [4, 7, 6, 8, 9, 1];
  sky.matrix.scale(1000, 1000, 1000);
  sky.matrix.translate(-.50, -.5, -.50);
  sky.render();

  let ground = new Cube();
    ground.matrix = new Matrix4();
     ground.matrix.setTranslate(-500, -2, -500);
    //not even translating that
    
    ground.textureNum = 1;
    ground.matrix.scale(10000, 1, 10000);
     //ground.matrix.setTranslate(0, 0, 0);
    //ground.textureArray = [3, 3, 3, 3, 3, 0];
    ground.useColor = false;
    ground.render();


  var ball = new Cube();
  //box.textureNum = -2; //means use color
   
  ball.color = [1, 0, 1, 1];
  //box.matrix.translate(0, .65, 0, 0);
  //box.matrix.rotate(g_jointAngle2,0,0,1);
  ball.matrix.scale(0.5,0.5,0.5);
  ball.matrix.translate(6,3.5,-6);
  console.log("drawing sphere");
  ball.render();
   
  // var ball1 = new Cube();
  // //box.textureNum = -2; //means use color
   
  // ball1.color = [1, 0, 1, 1];
  // //box.matrix.translate(0, .65, 0, 0);
  // //box.matrix.rotate(g_jointAngle2,0,0,1);
  // ball1.matrix.scale(0.5,0.5,0.5);
  // ball1.matrix.translate(-6,3.5,6);
  // console.log("drawing sphere1");
  // ball1.render();
   
  //   var box1 = new Cube();
  // box1.textureNum = 0; //means use color
   
  // //box.color = [1, 0, 1, 1];
  // //box.matrix.translate(0, .65, 0, 0);
  // //box.matrix.rotate(g_jointAngle2,0,0,1);
  // box1.matrix.scale(1,1,1);
  // box1.matrix.translate(-5,1,0);
  // box1.render();
   
   
  //   var box2 = new Cube();
  // box2.textureNum = 1; //means use color
   
  // //box.color = [1, 0, 1, 1];
  // //box.matrix.translate(0, .65, 0, 0);
  // //box.matrix.rotate(g_jointAngle2,0,0,1);
  // box2.matrix.scale(1,1,1);
  // box2.matrix.translate(5,1,0);
  // box2.render();
}


function drawWalls() { //add the map and walls? or make map global? not sure
//make the map global and not here

    // var c = new Cube();
    for(x=0; x<32; x++){
        for(y=0;y<32;y++){
            if(g_map[x][y] > 0){   
                for(z=0; z<g_map[x][y]; z++){
                    var cube = new Cube();
                    cube.textureNum = 1;
                    cube.matrix.translate(y-4, z-1.75, x-4);
                    cube.renderfast(); //not sure about this 
                    //renders only one face and then crashes
                    //cube.render(); //actually dogshit slow
                    console.log("walls render");
                }              
            } 
        }
    }  
}