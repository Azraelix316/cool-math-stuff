let groups=[];
let particles=[];
let countP=100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0;i<countP;i++) {
  particles[i]=new particle(random(width),random(height),5,5)
  }
}

function draw() {
  background(220);
  for (let i=0;i<countP;i++) {
    particles[i].display();
    particles[i].move(createVector(0,0))
    }
}


class particle {
  constructor(x,y,dX,dY) {
  this.pos=createVector(x,y)
  this.vel=createVector(dX,dY)
  }
  move(accel) {
  this.vel.add(accel);
  this.pos.add(this.vel);
  }
  display() {
  point(this.pos.x,this.pos.y);
  }
}