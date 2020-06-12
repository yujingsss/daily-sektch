//julia set
//http://paulbourke.net/fractals/juliaset/


let maxiterations = 100;
let ca, cb;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  // colorMode(HSB, 1);
  // ca = -0.54;
  // cb = 0.54;
}

function draw() {

  background(255);
  ca = cos(angle * 1.5);
  cb = sin(angle * 0.5);
  angle += 0.03;

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //let w = abs(sin(angle)) * 5;
  let w = 4;
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

      // let bright = map(n, 0, maxiterations, 0, 255);
      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
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
}