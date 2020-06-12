//perlin noise in 2 dimension
// https://youtu.be/BjoM9oKOAKY
//pixels[] -> vector directions according to perlin noise

let inc = 0.05;
let scl = 10; 
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;

function setup() {
  // createCanvas(600,600);
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(4);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 200);
//       push();
//       translate(x * scl, y * scl);
//       rotate(v.heading());
//       strokeWeight(1);
//       line(0, 0, scl, 0);
//       pop();
    }
    yoff += inc;
    zoff += 0.0005;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}


function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 10;

  this.prevPos = this.pos.copy();
  //start with previous pos

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  //play w/ show() to have various effects
  this.show = function() {
    stroke(0, 5);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  this.edges = function() {
    if (this.pos.x > windowWidth) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = windowWidth;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = windowHeight;
      this.updatePrev();
    }
  }
}