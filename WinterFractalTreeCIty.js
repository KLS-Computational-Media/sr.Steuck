// Declare variables for the angle slider and arrays to store buildings and trees
let angleSlider;  // Slider to control the angle of tree branches
let buildings = [];  // Array to store information about buildings
let trees = [];  // Array to store information about trees

// Set up the initial canvas and controls
function setup() {
  createCanvas(800, 500); // Create a drawing area with a width of 800 pixels and height of 500 pixels
  angleSlider = createSlider(0, PI / 2, PI / 4, 0.01); 
  // Create a slider with a range from 0 to π/2 (90 degrees), starting value at π/4 (45 degrees), and step size of 0.01

  // Initialize buildings array with random heights and widths
  for (let i = 0; i < 5; i++) {
    buildings.push({
      x: i * width / 5,  // Set x position based on the iteration and canvas width
      height: random(50, 200),  // Set random height between 50 and 200 pixels
      width: random(30, 80),  // Set random width between 30 and 80 pixels
    });
  }

  // Initialize trees array with specific sizes and positions
  trees.push({
    x: width / 4,  // Set x position for the first tree
    size: 120,  // Set size of the first tree
  });
  trees.push({
    x: width / 2,  // Set x position for the second tree
    size: trees[0].size * 0.6,  // Set size based on a fraction of the size of the first tree
  });
  trees.push({
    x: 3 * width / 4,  // Set x position for the third tree
    size: trees[0].size * 0.5,  // Set size based on a fraction of the size of the first tree
  });

  // Additional trees
  trees.push({
    x: width / 6,  // Set x position for the fourth tree
    size: trees[0].size * 0.8,  // Set size based on a fraction of the size of the first tree
  });
  trees.push({
    x: 5 * width / 6,  // Set x position for the fifth tree
    size: trees[0].size * 0.4,  // Set size based on a fraction of the size of the first tree
  });
}

// Continuous drawing function
function draw() {
  background(220); // Set background color

  // Draw the cityscape
  drawCity();

  // Draw recursive tree patterns
  for (let i = 0; i < trees.length; i++) {
    push();
    // Adjust translation based on tree size
    let translation = map(trees[i].size, 50, 120, 0, 60); 
    // Map the tree size to a translation value, so larger trees are lower on the screen
    translate(trees[i].x, height - trees[i].size - translation); 
    // Move the coordinate system to the base of the tree
    let scaleFactor = map(i, 0, trees.length - 1, 0.3, 1); 
    // Map tree position to a scaling factor, so trees closer to the center are larger
    scale(scaleFactor); 
    // Scale the drawing based on the calculated factor
    branch(100 * scaleFactor); // Draw tree branches
    pop(); 
    // Restore the previous coordinate system
  }
}

// Function to draw the cityscape
function drawCity() {
  fill(255); // Set fill color for the ground (snowy ground)
  rect(0, height / 2, width, height / 2); // Draw the ground

  // Draw buildings
  fill(150); // Set fill color for buildings
  stroke(100); // Set outline color for buildings
  strokeWeight(2); // Set outline thickness for buildings

  // Loop through buildings array and draw each building
  for (let i = 0; i < buildings.length; i++) {
    rect(buildings[i].x, height / 2 - buildings[i].height, buildings[i].width, buildings[i].height);

    // Draw windows
    fill(50); // Set fill color for windows
    noStroke();
    // Draw windows on each building
    for (let y = height / 2 - buildings[i].height + 20; y < height / 2; y += 20) {
      rect(buildings[i].x + 10, y, buildings[i].width - 20, 10);
    }
  }
}

// Recursive function to draw tree branches
function branch(len) {
  let angle = angleSlider.value(); 
  // Get the current value of the angle slider
  stroke(random(100, 200), random(100, 200), random(150, 255)); 
  // Set a random color for tree branches
  strokeWeight(2); // Set thickness for branches

  line(0, 0, 0, -len); // Draw the main branch line
  translate(0, -len); 
  // Move the coordinate system to the end of the branch

  // Recursively draw branches with a certain angle
  if (len > 4) { 
    // Base case: stop drawing branches when length is very small
    push();
    rotate(angle); 
    // Rotate the coordinate system for the first branch
    branch(len * 0.67); 
    // Recursively draw a smaller branch
    pop(); 
    // Restore the previous coordinate system

    push();
    rotate(-angle); 
    // Rotate the coordinate system for the second branch
    branch(len * 0.67); 
    // Recursively draw a smaller branch in the opposite direction
    pop(); 
    // Restore the previous coordinate system
  }
}
