let planets=[];
let ships=[];
let scale=0;
let planetsCount=1;
let shipsCount=0;
function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  planets[0] = new Planet(200,createVector(0,0,0),createVector(0.0,0.0,10.0),0,10);
  background(0);
}


//main loop
function draw() {
  background(0);
  fill(255);
  stroke(255);
  planets[0].update();
  planets[0].display();
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
