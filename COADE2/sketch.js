let planets=[];
let ships=[];
let planetsCount=3;
let shipsCount=0;
let g=6.67e-11;
let distanceScale=1e-9;
  //1 pixel = 10e9 m
  //1 million km
  //1 tick = 1 day
  //UNITS 
  //TIME IS IN DAYS
  //DISTANCE IS IN METERS
  //MASS IS IN KG
  let timeScale=86400;
function setup() {
  g*=distanceScale*distanceScale*distanceScale*timeScale*timeScale;
  createCanvas(windowWidth, windowHeight,WEBGL);
  planets[0] = new Planet(1.98900e30,createVector(0,0,0),createVector(0.0,0.0,0.0),0,10);
  planets[1] = new Planet(3.28500e27,createVector(5.79e10*distanceScale,0,0),createVector(0.0,1000*47.36 * timeScale * distanceScale,0.0),1,10);
  planets[2] = new Planet(1e24,createVector(1.08e11*distanceScale,0,0),createVector(0.0,1000*35.02*timeScale*distanceScale,0.0),2,10);
  background(0);
}


//main loop
function draw() {
  background(0);
  fill(255);
  stroke(255);
  for (let i=0;i<planetsCount;i++) {
  planets[i].gravity();
  planets[i].display();
  }
  for (let i=0;i<planetsCount;i++) {
  planets[i].update();
  }

}

class Planet {
constructor(mass,position,velocity,index,size) {
this.position=position;
this.velocity=velocity;
this.index=index;
this.mass=mass;
this.acceleration=createVector(0,0,0);
this.size=size;
}
gravity() {
  this.acceleration=createVector(0.00000001,0.00000001,0.00000001);
for (let i=0;i<planetsCount;i++) {
if (i!=this.index) {
let r=this.position.dist(planets[i].position);
r*=abs(r);
if (r!=0) {
let G=g*(planets[i].mass)/r;
this.acceleration.add((p5.Vector.sub(planets[i].position,this.position)).setMag(G));
}
}
}
}

update() {
  this.velocity.add(this.acceleration);
this.position.add(this.velocity);
}
display() {
push();
fill(255);
translate(this.position);
ellipse(0,0,this.size);
pop();
}
}


class Ship {
constructor() {

}
}
