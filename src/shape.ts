import {canvas} from "./canvas";
import Utils from "./utils";
import {speed_num} from "./config";

const {c} = canvas;
let {width, height} = canvas.canvas;

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

    constructor(public x: number, public y: number, public radius: number, private color: string) {
        this.velocity = 0.05;
        this.radians = Math.random() * Math.PI * 2;
        this.distance_from_center = Utils.randomIntFromRange(150, 200);
        this.center_pos = {x: x, y: y};
        this.directions = {
            x: Math.random() * (speed_num.max - (speed_num.min) + 1) + speed_num.min,
            y: Math.random() * (speed_num.max - (speed_num.min) + 1) + speed_num.min
        };
    }

    private draw(last_position: { x: number, y: number }) {
        this.directions.x = Math.random() * (speed_num.max - (speed_num.min) + 1) + speed_num.min;
        this.directions.y =  Math.random() * (speed_num.max - (speed_num.min) + 1) + speed_num.min;
        c.beginPath();
        c.lineWidth = this.radius;
        c.strokeStyle = this.color;
        c.moveTo(last_position.x, last_position.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    public update() {
        let last_position = {
            x: this.x,
            y: this.y
        };
        let {x, y} = this.center_pos;
        const {distance_from_center, radians, directions, velocity} = this;
        if (x + distance_from_center > width || x - distance_from_center < 0) {
            this.directions.x *= -1
        }
        if (y + distance_from_center > height || y - distance_from_center < 0) {
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
}

export default Shape;