import Shape from "./Shape";
import Utils from "./utils";
import { Canvas } from "./Canvas";
import Config from "./Config";

const canvas = new Canvas({
	width: window.innerWidth,
	height: window.innerHeight
});
const { width, height } = canvas.getSize();

let mouse = { x: 0, y: 0 };

addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', () => {
	canvas.canvas.width = window.innerWidth;
	canvas.canvas.height = window.innerHeight;

	init();
});

let particles: Shape[] = [];

function init() {
	particles = [];

	for (let i = 0; i < 2500; i++) {
		let radius = Utils.randomIntFromRange(1, 5);
		let x = width / 2;
		let y = height / 2;
		let color = Utils.pick_random_thing(Config.colors);

		particles.push(new Shape(canvas, x, y, radius, color));
	}
}

const animate = () => {
	canvas.c.clearRect(0, 0, innerWidth, innerHeight);
	canvas.c.fillStyle = 'rgba(225, 225, 225, 0.1)';
	canvas.c.fillRect(0, 0, width, height);

	for (const particle of particles) {
		particle.update();
	}

	requestAnimationFrame(animate);
};

init();
animate();
