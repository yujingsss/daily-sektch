let video;
let x = 0;
let button;

function setup() {
  c = createCanvas(windowWidth, 240);
  pixelDensity(1);
  video = createCapture(VIDEO, (ready) => {
    video.size(320, 240);
    x = 0;
  });
  button = createButton('save');
  button.mousePressed(() => {
    saveCanvas(c, 'slit-scan', 'jpg');
  });
}

function draw() {
  video.loadPixels();
  // image(video,0,0);
  let w = video.width;
  let h = video.height;
  copy(video, w / 2, 0, 1, h, x, 0, 1, h);
  x++;
  x = x > width ? 0 : x;
}