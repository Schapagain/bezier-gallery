
const pixelSize = 5;

let width = 860;
let height = 860;
let pixel, randomColor;
// generatePixelArt(width,height);
// generateCircleArt();

function generatePixelArt(width,height) {
    let canvas = document.getElementById("pixels");
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel')
            pixel.style.backgroundColor = getRandomColorHex();
            canvas.appendChild(pixel);
        }
    }
}

function getRandomColorHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

var circles = function( sketch ) {
  sketch.setup = function() {
    sketch.createCanvas(860, 860);
    lower = 0;
    upper = 860;
    radius = 30;

    for (let i = 0; i < 10000; i ++) {
        let x = getRandomInt(lower,upper);
        let y = getRandomInt(lower,upper);
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
        sketch.createCanvas(860, 860);
        sketch.background('rgb(67, 155, 147)');
        lower = 0;
        upper = 860;
        radius = 30;
        for (let i = 0; i < 6; i ++) {
            let x = getRandomInt(lower,upper);
            let y = getRandomInt(lower,upper);
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
        sketch.createCanvas(860, 860);
        sketch.background(0);
        sketch.stroke(255);
        sketch.noFill();

        paramArr = new Array(8).fill(0);
        
        for (let i = 0; i < 100; i += 1) {
            paramArr = paramArr.map(x => getRandomInt(0,width));
            sketch.strokeWeight(getRandomInt(1,2));
            sketch.bezier(...paramArr);
        }
    }
};
new p5(lines,'lines');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}