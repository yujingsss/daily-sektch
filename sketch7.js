//https://en.wikipedia.org/wiki/Mandelbrot_set

//complex number
//square root
//sqrt(4) = 2  
// !!sqrt(-1) = i?
// 3 + i (real + imaginary) = compex number
// a + bi
// 实数 + 虚数
//f(z) = sqr(z) + c (c = a +bi)
//z1 = 0 => z1 = sqr(z) + c = c
//z2 = sqr(c) + c
//z3 = sqr(sqr(c)+c)+c

//sqr(c) =?
//sqr(c) = (a + bi) * (a + bi)
//       = sqr(a) + 2*a*bi + sqr(b)*sqr(i)
//       = sqr(a) + 2*a*bi - sqr(b)
//       = sqr(a) - sqr(b) + 2*a*bi(complexNumber)



// let minval = -1;
// let maxval = 1;
let minslider;
let macslider;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  minslider = createSlider(-2.5, 0, -2.5, 0.01);
  maxslider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
  let maxiterations = 100;
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minslider.value(), maxslider.value());
      let b = map(y, 0, height, minslider.value(), maxslider.value());

      let ca = a;
      let cb = b;

      let n = 0;

      while (n < maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (a + b > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 255);
      // let bright = map(n, 0, maxiterations, 0, 1);
      // bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n === maxiterations) {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

function keyTyped() {
  if (key === 's') {
    save('mandelbrot');
  }
}