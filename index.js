
let canvasSize = 560;

var sketchpad = function(sketch) {
    sketch.setup = function() {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.frameRate(10);
    }

    sketch.draw = function() {
        sketch.fill('rgb(113, 101, 124)');
        sketch.rect(0, 0, sketch.width, sketch.height);
        sketch.fill(255);
        sketch.noStroke();
        randRadius = getRandomInt(30,50)
        x = getRandomInt(0,sketch.width);
        y = getRandomInt(0,sketch.height);
        sketch.ellipse(x, y, randRadius, randRadius);
    }
}
// new p5(sketchpad,'sketchpad');

var circles = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(canvasSize, canvasSize);
    radius = 30;
    for (let i = 0; i < 10000; i ++) {
        let x = getRandomInt(0,canvasSize);
        let y = getRandomInt(0,canvasSize);
        let color = getRandomInt(0,255);
        sketch.fill(color);
        let currentRadius = getRandomInt(0.7*radius,1.4*radius);
        sketch.ellipse(x,y,currentRadius,currentRadius);
    }

  }
};
new p5(circles,'circles');

const flowers = function( sketch ) {
    sketch.setup = function() {
        sketch.createCanvas(canvasSize, canvasSize);
        sketch.background('rgb(67, 155, 147)');
        for (let i = 0; i < 6; i ++) {
            let x = getRandomInt(0,canvasSize);
            let y = getRandomInt(0,canvasSize);
            let color = getRandomInt(180,255);
            sketch.fill(color)
            sketch.translate(x,y);
            for (let j = 0; j < 10; j++) {
                sketch.ellipse(10,40,20,85);
                sketch.rotate(Math.PI/5);
            }
            sketch.translate(-x,-y);
        }
    }
};
new p5(flowers,'flowers');


const lines = function( sketch ) {
    sketch.setup = function() {
        sketch.createCanvas(canvasSize, canvasSize);
        sketch.background(0);
        sketch.stroke(255);
        sketch.noFill();

        paramArr = new Array(8).fill(0);
        
        for (let i = 0; i < 100; i += 1) {
            paramArr = paramArr.map(x => getRandomInt(0,canvasSize));
            sketch.strokeWeight(getRandomInt(1,2));
            sketch.bezier(...paramArr);
        }
    }
};
new p5(lines,'lines');

const night = function( sketch ) {
    let yoff = 0.0; // 2nd dimension of perlin noise
    sketch.setup = function() {
        sketch.createCanvas(canvasSize, canvasSize);
        sketch.frameRate(30);
    }
    let chords = [];
    let stars = [];
    sketch.draw = function() {
        sketch.background(0);
        sketch.fill(255);
        sketch.stroke(255);
        // We are going to draw a polygon out of the wave points
        sketch.beginShape();

        let xoff = 0; // Option #1: 2D Noise
        // let xoff = yoff; // Option #2: 1D Noise

        // Iterate over horizontal pixels
        for (let x = 0; x <= sketch.width; x += 10) {
            // Calculate a y value according to noise, map to

            // Option #1: 2D Noise
            let y = sketch.map(sketch.noise(xoff, yoff), 0, 1, 0.8 * canvasSize, 0.4 * canvasSize);

            // Option #2: 1D Noise
            // let y = map(noise(xoff), 0, 1, 200,300);

            // Set the vertex
            sketch.vertex(x, y);
            // Increment x dimension for noise
            xoff += 0.05;
        }
        // increment y dimension for noise
        yoff += 0.01;
        sketch.vertex(sketch.width, sketch.height);
        sketch.vertex(0, sketch.height);
        sketch.endShape(sketch.CLOSE);
        
        chords.push(randomChord());
        if (chords.length > 200) {
            chords.shift();
        }
        for (let chord of chords) {
            sketch.line(...chord);
        }

        function randomChord() {
            // find a random point on a circle
            let angle1 = sketch.random(0, 2 * Math.PI);
            let xpos1 = 100 + 50 * sketch.cos(angle1);
            let ypos1 = 100 + 50* sketch.sin(angle1);
          
            // find another random point on the circle
            let angle2 = sketch.random(0, 2 * Math.PI);
            let xpos2 = 100 + 50 * sketch.cos(angle2);
            let ypos2 = 100 + 50 * sketch.sin(angle2);
          
            // add a new chord
            return [xpos1,ypos1,xpos2,ypos2];
        }

        stars.push(randomStar());
        if (stars.length > 50) {
            stars.shift();
        }
        for (let star of stars) {
            sketch.ellipse(...star);
        }

        function randomStar() {
            let x = getRandomInt(0,canvasSize);
            let y = getRandomInt(0,0.4*canvasSize);
            let size = getRandomInt(1,5);
            return [x,y,size,size];
        }


    }

};
new p5(night,'night');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}