let  [a,b,c,d,a2,b2,c2,d2]=[0.6291706319392305, 0.7946044307604043, -0.45368851645385755, -0.6115654540463864, 0.4064387682142918, -0.5318267957070879, 0.6797250145256681, -0.7650194289180603]
let mX,mY,mZ,mI;
let pX,pY,pZ,pI;
let nPoints=500;
let scale=22;
function setup() {
  createCanvas(windowWidth, windowHeight);
  mX=random(-1,1)
  mY=random(-1,1)
  mZ=random(-1,1)
  mI=random(-1,1)
  pX=0
  pY=0 
  pZ=0
  pI=0
  background(250)
  strokeWeight(0.75)
}

function draw() {
  translate(width/2,height/2)
  for (let i=0;i<nPoints;i++) {
    pX=mX;
    pY=mY;
    pZ=mZ;
    pI=mI;
    mX=sin(b*pY)-c*sin(b*pX)+1/sin(b2*pZ)-c2*1/sin(b2*pI)
    mY=sin(a*pX)-d*sin(a*pY)+1/sin(a2*pZ)-d2*1/sin(a2*pI)
    mZ=sin(b2*pY)-c2*sin(b2*pX)+1/sin(b*pI)-c*1/sin(b*pZ)
    mI=sin(b2*pX)-d2*sin(b*pY)+1/sin(b*pI)-c*1/sin(b*pZ)
point4D(mX*scale,mY*scale,mZ,mI)
  }
}

function point4D(x,y,z,i) {
  stroke(0,i*250)
  strokeWeight(log(z)*0.5)
  push()
  translate(x,y)
  point(0,0)
  pop()
}

function mouseClicked() {
  background(255);
  a=random(-1,1)
  b=random(-1,1)
  c=random(-1,1)
  d=random(-1,1)
  a2=random(-1,1)
  b2=random(-1,1)
  c2=random(-1,1)
  d2=random(-1,1)
  mX=random(-1,1)
  mY=random(-1,1)
  mZ=random(-1,1)
  mI=random(-1,1)
  pX=0
  pY=0 
  pZ=0
  pI=0
}

function keyPressed() {
  background(255);
  a=random(-1,1)
  b=random(-1,1)
  c=random(-1,1)
  d=random(-1,1)
  a2=random(-1,1)
  b2=random(-1,1)
  c2=random(-1,1)
  d2=random(-1,1)
  mX=random(-1,1)
  mY=random(-1,1)
  mZ=random(-1,1)
  mI=random(-1,1)
  pX=0
  pY=0 
  pZ=0
  pI=0
}