import Shape from "./shape";
import {canvas} from "./canvas";
import Utils from "./utils";
import {colors} from "./config";

const {c} = canvas;
let {width, height} = canvas.canvas;

let mouse = {x: 0, y: 0};

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.canvas.width = window.innerWidth;
    canvas.canvas.height = window.innerHeight;

    init();
});

let particles: Array<Shape> = [];

function init() {
    particles = [];

    for (let i = 0; i < 2500; i++) {
        let radius = Utils.randomIntFromRange(1, 5);
        let x = width / 2;
        let y = height / 2;
        let color = Utils.pick_random_thing(colors);

        particles.push(new Shape(x, y, radius, color));
    }
}

const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(225, 225, 225, 0.1)';
    c.fillRect(0, 0, width, height);

    for (const particle of particles) {
        particle.update();
    }

    requestAnimationFrame(animate);
};

init();
animate();
