// Define an array to store the particles
let particles = [];
// Define the repulsion radius
let repelRadius = 80;

// Setup the canvas and initialize particles
function setup() {
  createCanvas(800, 800);
  // Create 100 particles with random positions on the canvas
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

// Draw function, clears the background and updates/draws each particle
function draw() {
  background(255);

  // Loop through each particle
  for (let i = 0; i < particles.length; i++) {
    // Update the particle's position based on the mouse position
    particles[i].update(mouseX, mouseY);
    // Display the particle
    particles[i].show();
  }
}

// Particle class to define the behavior of a particle
class Particle {
  // Constructor to initialize the particle's properties
  constructor(x, y) {
    this.pos = createVector(x, y); // Position of the particle
    this.vel = p5.Vector.random2D(); // Velocity with random direction
    this.acc = createVector(); // Acceleration initially set to zero
    this.maxSpeed = 2; // Maximum speed the particle can move
    this.prevPos = this.pos.copy(); // Previous position to create smooth motion
  }

  // Update function to update the particle's position based on the target position
  update(targetX, targetY) {
    // Create a vector from the mouse position
    let target = createVector(targetX, targetY);
    // Calculate the desired vector to move towards the target
    let desired = p5.Vector.sub(target, this.pos);
    // Calculate the distance between the particle and the mouse
    let d = desired.mag();
    // If the particle is within the repulsion radius
    if (d < repelRadius) {
      // Steer the particle away from the mouse
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(0.1);
      this.applyForce(steer);
    } else {
      // If not within the repulsion radius, apply a force based on Perlin noise for smooth, wavy motion
      let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI;
      let wind = p5.Vector.fromAngle(angle);
      this.applyForce(wind);
    }

    // Update the particle's velocity, position, and reset acceleration
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Call the edges function to handle wrapping around the canvas
    this.edges();
  }

  // Apply a force to the particle
  applyForce(force) {
    this.acc.add(force);
  }

  // Display the particle as a line
  show() {
    stroke(0);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  // Update the previous position for smooth motion
  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  // Handle the edges of the canvas for continuous motion
  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
