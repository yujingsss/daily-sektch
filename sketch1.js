//cr. ins hand.inc

let spanx = 600;
let spany = 600;

function setup() {
  createCanvas(spanx, spany + 50);
  background(0);
  let s = 'press S to save image';
  fill(255);
  // text(s, 30, 30);
  console.log(s);
}

function draw() {
  // background(0,1);
  let top = 50;
  translate(0, top);
  stroke(255,50);
  strokeWeight(0.1);
  if (mouseIsPressed && mouseY > top) {
    for (let x = 0; x < spany; x += 10) {
      line(mouseX, mouseY - 100, 0, x);
    }
    for (let x = 0; x < spany; x += 10) {
      line(mouseX, mouseY - 100, x, 0);
    }
    for (let x = 0; x < spany; x += 10) {
      line(mouseX, mouseY - 100, 0, 800);
    }
  }
}

function keyTyped() {
  if (key === 's') {
    save();
  }
  if (key === 'a'){
  background(0);
  }
}