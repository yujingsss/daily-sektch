let stars = [];
let speed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600,600);
  for (let i = 0; i < 2000; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background(0,10);
  speed = map(mouseX, 0, width, 3, 18);
  background(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}



class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
  }

  update() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }
  show() {
    fill(255);
    noStroke();

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);

    this.r = map(this.z, 0, width, 8, 0);
    ellipse(this.sx, this.sy, this.r, this.r);

    this.px = map(this.x / this.pz, 0, 1, 0, width);
    this.py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;
    stroke(255);

    line(this.px, this.py, this.sx, this.sy);
  }
}