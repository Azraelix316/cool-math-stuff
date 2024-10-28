let planets = [];
let ships = [];
let planetsCount = 9;
let shipsCount = 0;
let g = 6.67e-11;
let distanceScale = 1e-9;
//1 pixel = 10e9 m
//1 million km
//1 tick = 1 day
//UNITS 
//TIME IS IN seconds/frame
//DISTANCE IS IN METERS
//MASS IS IN KG
let timeScale = 86400;
let start=0;
let end=300;
function setup() {
  g *= distanceScale * distanceScale * distanceScale * timeScale * timeScale;
  createCanvas(windowWidth, windowHeight, WEBGL);
  planets[0] = new Planet(1.98900e30, createVector(0, 0, 0), createVector(0.0, 0.0, 0.0), 0, 1.391e7 * distanceScale * 1000);
  planets[1] = new Planet(3.28500e23, createVector(5.79e10 * distanceScale, 0, 0), createVector(0.0, 1000 * 47.36 * timeScale * distanceScale, 0.0), 1, 4879 * distanceScale * 1000);
  planets[2] = new Planet(1e24, createVector(1.08e11 * distanceScale, 0, 0), createVector(0.0, 1000 * 35.02 * timeScale * distanceScale, 0.0), 2, 12104 * distanceScale * 1000);
  planets[3] = new Planet(5.972e24, createVector(1.496e11 * distanceScale, 0, 0), createVector(0.0, 1000 * timeScale * 29.78 * distanceScale, 0.0), 3, 12756 * distanceScale * 1000);
  planets[4] = new Planet(0.642e24, createVector(2.280e11 * distanceScale, 0, 0), createVector(0, 24.1 * 1000 * distanceScale * timeScale, 0), 4, 6792 * distanceScale * 1000)
  planets[5] = new Planet(1898e24, createVector(778.5e9 * distanceScale, 0, 0), createVector(0, 13.1 * 1000 * distanceScale * timeScale, 0), 5, 142984 * distanceScale * 1000)
  planets[6] = new Planet(568e24, createVector(1432e9 * distanceScale, 0, 0), createVector(0, 9.7 * 1000 * distanceScale * timeScale, 0), 6, 120536 * distanceScale * 1000)
  planets[7] = new Planet(86.8e24, createVector(2867e9 * distanceScale, 0, 0), createVector(0, 6.8 * 1000 * distanceScale * timeScale, 0), 7, 51118 * distanceScale * 1000)
  planets[8] = new Planet(102e24, createVector(4515e9 * distanceScale, 0, 0), createVector(0, 5.4 * 1000 * distanceScale * timeScale, 0), 8, 49528 * distanceScale * 1000)
  planets[9] = new Planet(0.013e24, createVector(5906e9 * distanceScale, 0, 0), createVector(0, 4.7 * 1000 * distanceScale * timeScale, 0), 9, 2376 * distanceScale * 1000)
  // planets[0] = new Planet(10000,createVector(30,0,0),createVector(0,0.3,0),0,10)
  // planets[1] = new Planet(10000,createVector(10,0,0),createVector(0,0.5,0),1,10)
  // planets[2] = new Planet(10000,createVector(0,0,0),createVector(0,0.0,0),2,10)

  background(0);
  for (let i = 0; i < planetsCount; i++) {
    planets[i].push();
  }
  for (let j=0;j<planetsCount;j++) {
    for (let i=start;i<end;i++) {
      planets[j].display();
      update();
    }
  }
  frameRate(60);
}


//main loop
function draw() {
  background(0);
  start++;
  end++;
  for (let j=0;j<planetsCount;j++) {
    beginShape(LINES);
  for (let i=start;i<end;i++) {
    // push()
    // translate(planets[j].positions[i])
    // sphere(planets[j].size)
    // pop()
    vertex(planets[j].positions[i].x,planets[j].positions[i].y,planets[j].positions[i].z);
  //line(planets[j].positions[i].x,planets[j].positions[i].y,planets[j].positions[i].z,planets[j].positions[i+1].x,planets[j].positions[i+1].y,planets[j].positions[i+1].z)
  }
  endShape();
  }
  orbitControl();
  fill(255);
  stroke(255);
  update();
  for (let j=0;j<planetsCount;j++) {
    planets[j].display();
  }
}

function rk4() {
  pushAll();
  for (let i = 0; i < planetsCount; i++) {
    planets[i].k1 = planets[i].gravity();
  }
  popAll();
  for (let i = 0; i < planetsCount; i++) {
    planets[i].velocity.mult(0.5)
    planets[i].updateHalf(planets[i].k1);
    planets[i].velocity.mult(2)

  }
  for (let i = 0; i < planetsCount; i++) {
    planets[i].k2 = planets[i].gravity();
  }
  popAll();
  for (let i = 0; i < planetsCount; i++) {
    planets[i].velocity.mult(0.5)
    planets[i].updateHalf(planets[i].k2);
    planets[i].velocity.mult(2)

  }
  for (let i = 0; i < planetsCount; i++) {
    planets[i].k3 = planets[i].gravity();
  }
  popAll();
  for (let i = 0; i < planetsCount; i++) {
    planets[i].update(planets[i].k3);
  }
  for (let i = 0; i < planetsCount; i++) {
    planets[i].k4 = planets[i].gravity();
  }
  popAll();

  //k1= f(t,yn)
  //k2 = f(t + dt/2, yn+k1/2)
  //k3 = f(t+dt/2, y+ k2/2)
  //k4= f(t+dt, y+ k3)
  //y= y+1/6(k1,2k2,2k3,k4)
}

function update() {
  rk4();
  for (let i = 0; i < planetsCount; i++) {
    initialPos=planets[i].position;
    planets[i].velocity.mult(0.5)
    planets[i].updateHalf(planets[i].k1)
    planets[i].updateHalf(planets[i].k2)
    //planets[i].updateHalf(planets[i].k2.add(planets[i].k3).mult(0.5))
    //planets[i].updateHalf(planets[i].k4)
    planets[i].velocity.mult(2)
    stroke(0,255,255);
    stroke(255);
    planets[i].display();
    //line(initialPos.x,initialPos.y,initialPos.z,planets[i].stashPos.x,planets[i].stashPos.y,planets[i].stashPos.z);
  }
  // for (let i=0;i<planetsCount;i++) {
  // planets[i].update(planets[i].k1)
  // planets[i].display()
  // }




}
function pushAll2() {
  for (let i = 0; i < planetsCount; i++) {
    planets[i].push2();
  }
}
function popAll2() {
  for (let i = 0; i < planetsCount; i++) {
    planets[i].pop2();
  }
}
function pushAll() {
  for (let i = 0; i < planetsCount; i++) {
    planets[i].push();
  }
}
function popAll() {
  for (let i = 0; i < planetsCount; i++) {
    planets[i].pop();
  }
}

class Planet {
  constructor(mass, position, velocity, index, size) {
    this.position = position;
    this.velocity = velocity;
    this.index = index;
    this.mass = mass;
    this.acceleration = createVector(0, 0, 0);
    this.size = size;
    this.positions=[];

  }
  gravity() {
    this.acceleration = createVector(0.000001, 0.000001, 0.000001);
    for (let i = 0; i < planetsCount; i++) {
      if (i != this.index) {
        let r = this.position.dist(planets[i].position);
        r *= abs(r);
        if (r != 0) {
          let G = g * (planets[i].mass) / r;
          this.acceleration.add((p5.Vector.sub(planets[i].position, this.position)).setMag(G));
        }
      }
    }
    return this.acceleration;
  }

  kAdd() {
    this.k1 = this.k1.mult(1)
    this.k2 = this.k2.mult(2)
    this.k3 = this.k3.mult(2)
    this.k4 = this.k4.mult(1)
    this.vector = this.k1.add(this.k2.add(this.k3.add(this.k4))).mult(1 / 6)
    return this.vector;
  }

  updateHalf(accel = this.acceleration) {
    this.velocity.add(p5.Vector.mult(accel, 0.25));
    this.position.add(this.velocity);
  }
  update(accel = this.acceleration) {
    this.velocity.add(accel);
    this.position.add(this.velocity);
  }
  display() {
    // push();
    // fill(255);
    // translate(p5.Vector.sub(this.position, planets[0].position));
    // sphere(this.size);
    // pop();
    this.positions.push(this.position);
  }

  push() {
    this.stashVel = (this.velocity).copy();
    this.stashPos = this.position.copy();
    this.stashAccel = this.acceleration.copy();
  }
  push2() {
    this.stashStashVel = this.velocity.copy();
    this.stashStashPos = this.position.copy();
    this.stashStashAccel = this.acceleration.copy();
  }
  pop2() {
    this.velocity = this.stashStashVel.copy();
    this.position = this.stashStashPos.copy();
    this.acceleration = this.stashStashAccel.copy();
  }
  pop() {
    this.velocity = this.stashVel.copy();
    this.position = this.stashPos.copy();
    this.acceleration = this.stashAccel.copy();
  }


}


class Ship {
  constructor() {

  }
}
