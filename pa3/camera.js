class Camera{ //this class is tweaking. sometimes it moves without my permission
//idk why but it just twitches
    constructor(){
       this.fov = 60; //wait why do we need this? jk its a requirement
       this.eye = new Vector3([0,2,-10]);
       this.at  = new Vector3([0,0,0]);
       this.up  = new Vector3([0,1,0]);
       this.viewMat = new Matrix4();
       
       //new added. now we dont have to do this outside. 
       this.viewMat.setLookAt(
          this.eye.elements[0], this.eye.elements[1],  this.eye.elements[2],
          this.at.elements[0],  this.at.elements[1],   this.at.elements[2],
          this.up.elements[0],  this.up.elements[1],   this.up.elements[2]); // (eye, at, up)
         //this has to be fine. 
         
         //wait is this wrong?? why am i under the ground???
         //init was wrong
          
          
       this.projMat = new Matrix4(); //cant use a predefined matrix for some reason???
       this.projMat.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000);
       
       //yeah no this isn't even wrong. idk what's the issue
    }

    setEye(x, y, z) {
        this.eye = new Vector3([x, y, z]);
        renderScene();
        //this.updateViewMatrix(); // Ensure the view matrix is updated
    }
 
    forward(){
       var f = new Vector3([0,0,0]);
       f.set(this.at);
       f.sub(this.eye); //reverse these too just in case
       f = f.normalize();
       f.mul(0.5);
       this.at.add(f);
       this.eye.add(f);
    }
    //this function is fine
 
    back(){ //this function starts killing itself but there is space to move back
       var b = new Vector3([0,0,0]);
       b.set(this.eye);
       b.sub(this.at); //reversed these
       b = b.normalize();
       b.mul(0.5);
       this.at.add(b);
       this.eye.add(b);
    }
 
    //function is fine, the key binding is inverted
    left(){
       var l = new Vector3([0,0,0]);
       l.set(this.at);
       l.sub(this.eye);
       var s  = Vector3.cross( this.up, l); // the variables were reversed oops
       s = s.normalize();
      s.mul(0.3);
      this.eye.add(s);
      this.at.add(s);
      
       
    }
 //keybinding inverted oopsies
 //fix this from copying panright/panleft. this should not be moving around the camera axis
    right(){
       var r = new Vector3([0,0,0]);
       r.set(this.at);
       r.sub(this.eye);
       var s = Vector3.cross(r, this.up);
       s.normalize();
       s.mul(0.3);
       this.eye.add(s);
       this.at.add(s);
       //ok yeah was accidentally multiplying wrong var
      
    }
 
    panLeft(){
       var f = new Vector3([0,0,0]);
       f.set(this.at);
       f.sub(this.eye);
       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(10, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
       var f_prime = new Vector3([0,0,0]);
       f_prime = rotationMatrix.multiplyVector3(f);
       var tempEye = new Vector3([0,0,0]);
       tempEye.set(this.eye);
       this.at = tempEye.add(f_prime);
       
    }
 
    panRight(){
       var f = new Vector3([0,0,0]);
       f.set(this.at);
       f.sub(this.eye);
       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(-10, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
       var f_prime = new Vector3([0,0,0]);
       f_prime = rotationMatrix.multiplyVector3(f);
       var tempEye = new Vector3([0,0,0]);
       tempEye.set(this.eye);
       this.at = tempEye.add(f_prime);
       
    }
 
    panMLeft(deg){ //FOR MOUSE FOR MOUSE FOR MOUSE DO NOT FORGET
       var f = new Vector3([0,0,0]);
       f.set(this.at);
       f.sub(this.eye);
       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(deg, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
       var f_prime = new Vector3([0,0,0]);
       f_prime = rotationMatrix.multiplyVector3(f);
       var tempEye = new Vector3([0,0,0]);
       tempEye.set(this.eye);
       this.at = tempEye.add(f_prime);
       //same function but for mouse

    }
 
    panMRight(deg){ //FOR MOUSE FOR MOUSE FOR MOUSE DO NOT FORGET
       var f = new Vector3([0,0,0]);
       f.set(this.at);
       f.sub(this.eye);
       var rotationMatrix = new Matrix4();
       rotationMatrix.setRotate(deg, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
       var f_prime = new Vector3([0,0,0]);
       f_prime = rotationMatrix.multiplyVector3(f);
       var tempEye = new Vector3([0,0,0]);
       tempEye.set(this.eye);
       this.at = tempEye.add(f_prime);
   //same function
    }
    
     Up() {
        this.eye.elements[1] += 0.5;
    }
    //tf you mean this isn't a function??? its right here!!!
    // jk browser cache

    Down() {
        this.eye.elements[1] -= 0.5; //up down on the corrext axis
    }
    
    perspective(fov) { // forgot this requirement
        this.fov = fov;
        this.projMat.setPerspective(this.fov, 1, 0.1, 1000);
    }
 }
 
 