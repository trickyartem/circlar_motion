import Utils from "./utils";
import { Canvas } from "./Canvas";
import Config from "./Config";

interface Point {
	x: number;
	y: number;
}

class Shape {
	private readonly velocity: number;
	private radians: number;
	private readonly distance_from_center: number;
	private readonly center_pos: Point;
	private directions: Point;

	constructor(private canvas: Canvas, public x: number, public y: number, public radius: number, private color: string) {
		const { max, min } = Config.maxSpeed;
		this.velocity = 0.05;
		this.radians = Math.random() * Math.PI * 2;
		this.distance_from_center = Utils.randomIntFromRange(150, 200);
		this.center_pos = { x: x, y: y };
		this.directions = {
			x: Math.random() * (max - (min) + 1) + min,
			y: Math.random() * (max - (min) + 1) + min
		};
	}

	private draw(last_position: { x: number, y: number }) {
		const { max, min } = Config.maxSpeed;

		this.directions.x = Math.random() * (max - (min) + 1) + min;
		this.directions.y = Math.random() * (max - (min) + 1) + min;
		this.canvas.c.beginPath();
		this.canvas.c.lineWidth = this.radius;
		this.canvas.c.strokeStyle = this.color;
		this.canvas.c.moveTo(last_position.x, last_position.y);
		this.canvas.c.lineTo(this.x, this.y);
		this.canvas.c.stroke();
		this.canvas.c.closePath();
	}

	public update() {
		let last_position = {
			x: this.x,
			y: this.y
		};
		let { x, y } = this.center_pos;
		const { distance_from_center, radians, directions, velocity } = this;
		if (this.isInViewbox(x, y)) {
			this.directions.x *= -1
			this.directions.y *= -1
		}

		this.x += directions.x;
		this.y += directions.y;

		this.center_pos.x += directions.x * 0.05;
		this.center_pos.y += directions.y * 0.05;

		this.radians += velocity;

		this.x = x + Math.cos(radians) * distance_from_center;
		this.y = y + Math.sin(radians) * distance_from_center;

		this.draw(last_position);
	}
	
	private isInViewbox(x: number, y: number) {
		if (x + distance_from_center > width || x - distance_from_center < 0) {
			return false;
		}
		if (y + distance_from_center > height || y - distance_from_center < 0) {
			return false;
		}
		
		return true;
	}
}

export default Shape;
