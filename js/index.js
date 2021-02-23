
let canvasSize = document.querySelector('.art').clientHeight;

const ShapesSketch = function( p ) {
  p.setup = function() {
    const drawFunctions = [drawEllipse, drawLine, drawRectangle, drawTriangle];
    const roughSize = 200;
    const numRepeats = 5;
    p.createCanvas(canvasSize, canvasSize); 
    p.background('#62c9c4');
    for (let i = 0; i < numRepeats; i++) {
      drawFunctions.forEach(draw => {
        let x = p.random(0,canvasSize);
        let y = p.random(0,canvasSize);
        let color = getRandomColorHex();
        p.fill(color);
        draw(x,y,roughSize);
      });  
    }
  }
  
  function drawEllipse(x,y,size) {
      width = p.random(0.5,1) * size;
      height = p.random(0.5,1) * size;
      p.ellipse(x,y,width,height);
  }
  
  function drawLine(x,y) {
    let len = p.height
    let drawVertical = p.random(0,1);
    let x1,y1,x2,y2;
    if (drawVertical > 0.5) {
        x1 = x;
        x2 = x;
        y1 = y - len / 2;
        y2 = y + len / 2;
    } else {
        x1 = x - len / 2;
        x2 = x + len / 2;
        y1 = y;
        y2 = y;
    }
    p.line(x1,y1,x2,y2);
  }

  function drawRectangle(x,y,size) {
    let width = p.random(0.1,1) * 2 * size;
    let height = p.random(0.1,1) * 2 * size;
    p.rect(x,y,width,height);
  }

  function drawTriangle(x,y,size) {
    let topPoint = [x,p.random(0.5,1)*(y+size)];
    let leftPoint = [p.random(0.5,1)*(x-size),y-size];
    let rightPoint = [p.random(0.5,1)*(x+size),y-size];
    let points = [...topPoint,...leftPoint,...rightPoint];
    p.triangle(...points);
  }
  
};

var circlesSketch = function( p ) {
  p.setup = function() {
    p.createCanvas(canvasSize, canvasSize);
    radius = 30;
    for (let i = 0; i < 10000; i ++) {
        let x = p.random(0,canvasSize);
        let y = p.random(0,canvasSize);
        let color = p.random(0,255);
        p.fill(color);
        let currentRadius = p.random(0.7*radius,1.4*radius);
        p.ellipse(x,y,currentRadius,currentRadius);
    }

  }
};

const flowersSketch = function( p ) {
    p.setup = function() {
        p.createCanvas(canvasSize, canvasSize);
        p.background('rgb(67, 155, 147)');
        for (let i = 0; i < 6; i ++) {
            let x = p.random(0,canvasSize);
            let y = p.random(0,canvasSize);
            let color = p.random(180,255);
            p.fill(color)
            p.translate(x,y);
            for (let j = 0; j < 10; j++) {
                p.ellipse(10,40,20,85);
                p.rotate(Math.PI/5);
            }
            p.translate(-x,-y);
        }
    }
};


const linesSketch = function( p ) {
    p.setup = function() {
        p.createCanvas(canvasSize, canvasSize);
        p.background(0);
        p.stroke(255);
        p.noFill();

        paramArr = new Array(8).fill(0);
        
        for (let i = 0; i < 100; i += 1) {
            paramArr = paramArr.map(x => p.random(0,canvasSize));
            p.strokeWeight(p.random(1,2));
            p.bezier(...paramArr);
        }
    }
};


const nightSketch = function( p ) {
    let yoff = 0.0; // 2nd dimension of perlin noise
    p.setup = function() {
        p.createCanvas(canvasSize, canvasSize);
        p.frameRate(30);
    }
    let chords = [];
    let stars = [];
    p.draw = function() {
        p.background(0);
        p.fill(255);
        p.stroke(255);

        p.beginShape();
        let xoff = 0; 
        for (let x = 0; x <= p.width; x += 10) {
            let y = p.map(p.noise(xoff, yoff), 0, 1, 0.8 * canvasSize, 0.4 * canvasSize);
            p.vertex(x, y);
            xoff += 0.05;
        }
        yoff += 0.01;
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);
        
        chords.push(randomChord());
        if (chords.length > 300) {
            chords.shift();
        }
        for (let chord of chords) {
            p.line(...chord);
        }

        function randomChord() {
            let angle1 = p.random(0, 2 * Math.PI);
            let xpos1 = 100 + 50 * p.cos(angle1);
            let ypos1 = 100 + 50* p.sin(angle1);
          

            let angle2 = p.random(0, 2 * Math.PI);
            let xpos2 = 100 + 50 * p.cos(angle2);
            let ypos2 = 100 + 50 * p.sin(angle2);
          
            return [xpos1,ypos1,xpos2,ypos2];
        }

        stars.push(randomStar());
        if (stars.length > 50) {
            stars.shift();
        }
        for (let star of stars) {
            p.ellipse(...star);
        }

        function randomStar() {
            let x = p.random(0,canvasSize);
            let y = p.random(0,Math.random(0.45)*canvasSize);
            let size = p.random(1,5);
            return [x,y,size,size];
        }


    }

};

new p5(ShapesSketch,'shapes');
new p5(circlesSketch,'circles');
new p5(linesSketch,'lines');
new p5(nightSketch,'night');
new p5(flowersSketch,'flowers');

function getRandomColorHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}