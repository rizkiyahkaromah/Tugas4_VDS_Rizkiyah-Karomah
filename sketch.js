let vs = []
function setup (){
  createCanvas( 650,500);
  v =new Vehicle (200,200);
}

function draw (){
   background(242);
  
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      stroke('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('red');
      ellipse(projPoint.x, projPoint.y, wanderRadius*1);
      
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    //warna hitam
    noStroke('Black');
    fill(0);
    rect(this.location.x-12, this.location.y-4, 2, 8);
    rect(this.location.x+10, this.location.y-4, 2, 8);
    rect(this.location.x-10, this.location.y-8, 2, 4);
    rect(this.location.x+8, this.location.y-8, 2, 4);
    rect(this.location.x-8, this.location.y-10, 4, 2);
    rect(this.location.x+4, this.location.y-10, 4, 2);
    rect(this.location.x-4, this.location.y-12, 8, 2);
    rect(this.location.x-10, this.location.y+4, 2, 4);
    rect(this.location.x+8, this.location.y+4, 2, 4);
    rect(this.location.x-8, this.location.y+8, 4, 2);
    rect(this.location.x+4, this.location.y+8, 4, 2);
    rect(this.location.x-4, this.location.y+10, 8, 2);
    

    //warna kuning
    noStroke();
    fill('yellow');
    rect(this.location.x-10, this.location.y-2, 6, 2);
    rect(this.location.x+4, this.location.y-2, 6, 2)
    rect(this.location.x-10, this.location.y-4, 8, 2);
    rect(this.location.x+2, this.location.y-4, 8, 2);
    rect(this.location.x-8, this.location.y-8, 16, 4);
    rect(this.location.x-4, this.location.y-10, 8, 2);
    rect(this.location.x-2, this.location.y-2, 4, 4);
    rect(this.location.x+2, this.location.y+2, 8, 2);
    rect(this.location.x-10, this.location.y+2, 8, 2);
    rect(this.location.x-8, this.location.y+4, 16, 4);
    rect(this.location.x-4, this.location.y+8, 8, 2);
  }
  
  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}