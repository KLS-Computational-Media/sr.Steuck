let planets = [];
let scaleFactor = 1;
let offsetX = 0;
let offsetY = 0;
let startDragX, startDragY;

function setup() {
  createCanvas(windowWidth, windowHeight);

   planets.push(new Planet(50, 0, 0, color(255, 215, 0), 0.005, true)); // Sun with solar activity
   planets.push(new Planet(5, 80, 0, color(255, 0, 255), 0.00166666666666666666)); // Mercury (1 rotation in 1 minute)
  planets.push(new Planet(10, 120, 0, color(255, 140, 0), 0.00011111111111111111)); // Venus (1 rotation in 42 minutes)
  planets.push(new Planet(10, 180, 0, color(0, 0, 255), 0.00002777777777777777)); // Earth (1 rotation in 1 hour)
  planets.push(new Planet(15, 240, 0, color(255, 69, 0), 0.000059583333333333335)); // Mars (1 rotation in 4 hours)
  planets.push(new Planet(30, 360, 0, color(255, 165, 0), 0.000009930555555555555)); // Jupiter (1 rotation in 12 hours)
  planets.push(new Planet(17, 480, 0, color(184, 134, 11), 0.0000021550925925925926)); // Saturn (1 rotation in 1 day)
  planets.push(new Planet(34, 480, 0, color(184, 134, 11, 100), 0.0000021550925925925926)); // Saturn's rings (assumed to rotate with Saturn)
  planets.push(new Planet(14, 600, 0, color(173, 216, 230), 0.0000008275347222222223)); // Uranus (1 rotation in 1 week)
  planets.push(new Planet(13, 720, 0, color(0, 0, 128), 0.00000019847222222222224)); // Neptune (1 rotation in 30 days)
  
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  scale(scaleFactor);
  translate(offsetX, offsetY);

  for (let planet of planets) {
    planet.update();
    planet.display();
  }
}

function mousePressed() {
  startDragX = mouseX - offsetX;
  startDragY = mouseY - offsetY;
}

function mouseDragged() {
  offsetX = mouseX - startDragX;
  offsetY = mouseY - startDragY;
}

function mouseWheel(event) {
  let zoomSpeed = 0.01;
  scaleFactor += event.delta * zoomSpeed;
  scaleFactor = constrain(scaleFactor, 0.5, 5);
  return false;
}

class Planet {
  constructor(radius, distance, angle, planetColor, orbitSpeed, hasRings = false, moonCount = 0, hasSolarActivity = false) {
    this.radius = radius;
    this.distance = distance;
    this.angle = angle;
    this.planetColor = planetColor;
    this.orbitSpeed = orbitSpeed;
    this.hasRings = hasRings;
    this.moons = [];
    this.solarActivity = hasSolarActivity;

    // Create moons for Jupiter
    if (moonCount > 0 && this === planets[6]) {
      for (let i = 0; i < moonCount; i++) {
        let moonRadius = random(2, 6);
        let moonDistance = random(25, 40);
        let moonOrbitSpeed = random(0.01, 0.03);
        this.moons.push(new Planet(moonRadius, moonDistance, random(TWO_PI), color(255, 255, 255, 150), moonOrbitSpeed));
      }
    }
  }

  update() {
    this.angle += this.orbitSpeed;
    for (let moon of this.moons) {
      moon.update();
    }
  }

  display() {
    let x = this.distance * cos(this.angle);
    let y = this.distance * sin(this.angle);

    noStroke();

    if (this.solarActivity) {
      this.displaySolarActivity(x, y);
    } else {
      fill(this.planetColor);
      // Draw the planet
      ellipse(x, y, this.radius * 2, this.radius * 2);
    }

    // Display moons
    for (let moon of this.moons) {
      moon.display();
    }
    
    

  }

  displaySolarActivity(x, y) {
    fill(random(255), random(255), 0, random(150, 255));
    ellipse(x + random(-10, 10), y + random(-10, 10), this.radius * 2 + random(10), this.radius * 2 + random(10));
  }
}
