let r, g, b;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let r = map(i, mouseX, width, 0, 255);
      let g = map(j, mouseY, height, 0, 255);
      stroke(r, g, 175);
      point(i, j);
    }
  }
}