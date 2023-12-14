let noiseStrength = 0.02; // Adjusted noise strength for more variation
let linesCount = 20;

function setup() {
  createCanvas(800, 600);
  noFill();
}

function draw() {
  background(0); // Set a black background

  // Create a grid of lines
  for (let y = 0; y < height; y += 20) {
    for (let x = 0; x < width; x += 20) {
      // Use Perlin noise to vary the length and angle of each line
      let length = noise(x * noiseStrength, y * noiseStrength) * 80; // Adjusted line length
      let angle = noise(x * noiseStrength, y * noiseStrength) * TWO_PI;

      // Apply wave-like effect to the length of the lines
      length += 10 * sin(frameCount * 0.05 + y * 0.1); // Increased wave effect

      // Neon colors
      let neonColor = getNeonColor(x, y);
      stroke(neonColor);

      // Calculate the end point of the line
      let endX = x + cos(angle) * length;
      let endY = y + sin(angle) * length;

      // Draw lines originating from the center
      line(x, y, endX, endY);
    }
  }
}

// Adjust the noise strength based on mouse position
function mouseMoved() {
  noiseStrength = map(mouseX, 0, width, 0.001, 0.1);
}

// Function to get neon color based on position
function getNeonColor(x, y) {
  let r = 127 + 127 * sin(x * 0.01);
  let g = 127 + 127 * sin(y * 0.01);
  let b = 127 + 127 * sin((x + y) * 0.01);
  return color(r, g, b, 180); // Increased alpha for a more visible effect
}
