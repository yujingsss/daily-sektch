//number each dot on a circle, connect each dot to its doubled number dots.

let total;
let radius;
let factor;

function setup() {
  createCanvas(600, 600);
  // background(0);
  radius = width / 3;
  strokeWeight(0.25);
  factor = 0.5;
  total = 200;
}

function draw() {
  background(0);
  // total = map(mouseX, 0, width, 60, 300);

  // factor = map(mouseY, 0, height, 2, 21);
  factor += 0.01;

  translate(width / 2, height / 2);

  stroke(255);
  noFill();
  circle(0, 0, radius * 2);

  for (let i = 0; i < total; i++) {
    // let angle = map(i, 0, total, 0, TWO_PI);
    // let x = radius * cos(angle);
    // let y = radius * sin(angle);
    let v = getVector(i);
    fill(255);
    // circle(x, y, 10);
    circle(v.x, v.y, 0.25);
  }
  for (let i = 0; i < total; i++) {
    let a = getVector(i);
    let b = getVector(i * factor);
    line(a.x, a.y, b.x, b.y);
  }

}

function getVector(index) {
  let angle = map(index % total, 0, total, 0, TWO_PI);
  // let v = p5.Vector.fromAngle(angle);
  let v = p5.Vector.fromAngle(angle + PI);
  v.mult(radius);
  return v;
}

function keyTyped() {
  if (key === 's') {
    save('cardioid');
  }
}
function mousePressed () {
  factor = 0;
}
function mouseMoved() {
  total = map(mouseX, 0, width, 60, 1000);
  // factor = map(mouseY, 0, height, 2, 21);
}