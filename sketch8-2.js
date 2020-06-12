//julia set
//http://paulbourke.net/fractals/juliaset/


let maxiterations = 100;
let ca, cb;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  // colorMode(HSB, 1);
  ca = -0.54;
  cb = 0.54;
}

function draw() {

  background(255);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //let w = abs(sin(angle)) * 5;
  let w = 2;
  let h = (w * height) / width;

  // Start at negative half the width and height
  let xmin = -w / 2;
  let ymin = -h / 2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // x goes from xmin to xmax
  let xmax = xmin + w;
  // y goes from ymin to ymax
  let ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  let dx = (xmax - xmin) / width;
  let dy = (ymax - ymin) / height;

  // Start y
  let y = ymin;

  for (let j = 0; j < height; j++) {
    //start x
    let x = xmin;
    for (let i = 0; i < width; i++) {
      let a = x;
      let b = y;
      let n = 0;

      while (n < maxiterations) {
        let aa = a * a;
        let bb = b * b;
        if (aa + bb > 4) {
          break;
        }
        let twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 255);
      // let bright = map(n, 0, maxiterations, 0, 1);
      // bright = map(sqrt(bright), 0, 1, 0, 255);
      if (n == maxiterations) {
        bright = 0;
      }

      let pix = (i + j * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}

function keyTyped() {
  if (key === 's') {
    save('julia-set');
  }
  if (key === '1') {
    ca = 0;
    cb = 0.8;
  }
  if (key === '2') {
    ca = 0.37;
    cb = 0.1;
  }
  if (key === '3') {
    ca = 0.355;
    cb = 0.355;
  }
  if (key === '4') {
    ca = -0.54;
    cb = 0.54;
  }
  if (key === '5') {
    ca = -0.4;
    cb = -0.59;
  }
  if (key === '6') {
    ca = 0.34;
    cb = -0.05;
  }
  if (key === '7') {
    ca = 0.355534;
    cb = -0.337292;
  }
  if (key === '8') {
    ca = -1.34882125854492;
    cb = -0.454237874348958;
  }
}
function mouseMoved() {
  ca = map(mouseX, 0, width, -2,2);
  cb = map(mouseY, 0, height, -2,2);
}