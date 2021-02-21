
let canvasSize = 560;

// var sketchpad = function(sketch) {
//     sketch.setup = function() {
//         sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
//         sketch.frameRate(10);
//     }

//     sketch.draw = function() {
//         sketch.fill('rgb(113, 101, 124)');
//         sketch.rect(0, 0, sketch.width, sketch.height);
//         sketch.fill(255);
//         sketch.noStroke();
//         randRadius = getRandomInt(30,50)
//         x = getRandomInt(0,sketch.width);
//         y = getRandomInt(0,sketch.height);
//         sketch.ellipse(x, y, randRadius, randRadius);
//     }
// }
// new p5(sketchpad,'sketchpad');


var shapes = function( sketch ) {
    sketch.setup = function() {
        drawFunctions = [drawEllipse,drawRectange,drawTriangle,drawLine];
        sketch.createCanvas(canvasSize, canvasSize); 
        sketch.background('#62c9c4');
        for (let i = 0; i < 5; i ++) {
            let sz = 200;
            for (let draw of drawFunctions) {
                let x = getRandomInt(0,canvasSize);
                let y = getRandomInt(0,canvasSize);
                let color = getRandomColorHex();
                sketch.fill(color);
                draw(x,y,sz);
            }
        }
    }

    function drawLine(x,y) {
        let len = sketch.height
        let drawVertical = getRandomFloat(0,1);
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
        sketch.line(x1,y1,x2,y2);
    }

    function drawEllipse(x,y,size) {
        size1 = getRandomFloat(0.5,1) * size;
        size2 = getRandomFloat(0.5,1) * size;
        sketch.ellipse(x,y,size1,size2);
    }

    function drawRectange(x,y,size) {
        let width = getRandomFloat(0.1,1) * 2 * size;
        let height = getRandomFloat(0.1,1) * 2 * size;
        sketch.rect(x,y,width,height);
    }

    function drawTriangle(x,y,size) {
        let topPoint = [x,getRandomFloat(0.5,1)*(y+size)];
        let leftPoint = [getRandomFloat(0.5,1)*(x-size),y-size];
        let rightPoint = [getRandomFloat(0.5,1)*(x+size),y-size];
        let points = [...topPoint,...leftPoint,...rightPoint];
        sketch.triangle(...points);
    }
};
new p5(shapes,'shapes');

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
    let yoff = 0.0; 
    sketch.setup = function() {
        sketch.createCanvas(canvasSize, canvasSize);
        sketch.frameRate(20);
    }
    let chords = [];
    let stars = [];
    sketch.draw = function() {
        sketch.background(0);
        sketch.fill(255);
        sketch.stroke(255);
        sketch.beginShape();
        let xoff = 0; 
        for (let x = 0; x <= sketch.width; x += 10) {
            let y = sketch.map(sketch.noise(xoff, yoff), 0, 1, 0.8 * canvasSize, 0.4 * canvasSize);
            sketch.vertex(x, y);
            xoff += 0.05;
        }
        yoff += 0.01;
        sketch.vertex(sketch.width, sketch.height);
        sketch.vertex(0, sketch.height);
        sketch.endShape(sketch.CLOSE);
        
        chords.push(randomChord());
        if (chords.length > 300) {
            chords.shift();
        }
        for (let chord of chords) {
            sketch.line(...chord);
        }

        function randomChord() {
            let angle1 = sketch.random(0, 2 * Math.PI);
            let xpos1 = 100 + 50 * sketch.cos(angle1);
            let ypos1 = 100 + 50* sketch.sin(angle1);
          
            let angle2 = sketch.random(0, 2 * Math.PI);
            let xpos2 = 100 + 50 * sketch.cos(angle2);
            let ypos2 = 100 + 50 * sketch.sin(angle2);
          
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
            let y = getRandomInt(0,getRandomFloat(0,0.5)*canvasSize);
            let size = getRandomInt(1,5);
            return [x,y,size,size];
        }


    }

};
new p5(night,'night');

function getRandomFloat(min,max) {
    return (Math.random() * (max - min) + min).toFixed(4)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}