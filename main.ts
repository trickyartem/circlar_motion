class Utils {
    static randomIntFromRange(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static pick_random_thing<T>(ma_stuff: Array<T>) : T{
        return ma_stuff[Math.floor(Math.random() * ma_stuff.length)]
    }
}

interface Point {
    x: number;
    y: number;
}

interface Speed {
    dx: number;
    dy: number;
}

class Shape {
    private velocity            : number;
    private radians             : number;
    private distance_from_center: number;
    private center_pos          : Point;
    private directions          : Speed;

    constructor(public x: number, public y: number, public radius:number, private color: string) {
        this.velocity             = 0.05;
        this.radians              = Math.random() * Math.PI * 2;
        this.distance_from_center = Utils.randomIntFromRange(150, 200);
        this.center_pos           = { x : x, y : y };
        this.directions           = {
            dx: Utils.pick_random_thing(speed_num),
            dy: Utils.pick_random_thing(speed_num)
        };
    }

    private draw(last_position: { x: number, y: number }) {
        c.beginPath();
        c.lineWidth   = this.radius;
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
        }
        let {x, y} = this.center_pos;
        const {distance_from_center} = this;
        if (x + distance_from_center > innerWidth  || x - distance_from_center < 0) { this.directions.dx *= -1 }
        if (y + distance_from_center > innerHeight || y - distance_from_center < 0) { this.directions.dy *= -1 }

        this.x += this.directions.dx;
        this.y += this.directions.dy;
        
        this.center_pos.x += this.directions.dx * 0.05;
        this.center_pos.y += this.directions.dy * 0.05;
        
        this.radians += this.velocity;
        
        this.x = this.center_pos.x + Math.cos(this.radians) * this.distance_from_center;
        this.y = this.center_pos.y + Math.sin(this.radians) * this.distance_from_center;

        this.draw(last_position);
    }
}

const canvas = document.createElement('canvas');
const c      = canvas.getContext('2d');

canvas.height         = window.innerHeight;
canvas.width          = window.innerWidth;
canvas.style.position = 'fixed';
canvas.style.top      = '0';
canvas.style.left     = '0';
canvas.style.zIndex   = '-10';
 
document.body.appendChild(canvas);

const colors  = ['#2185C5', '#7ECEFD', '#FF7F66', '#6C3483', '#D35400', '#FA8072'];
// let speed_num = [20, -20];

let speed_num: Array<number> = [];
for (let i = 0; i < 100; i++) {
    speed_num.push(Utils.randomIntFromRange(-40, 40));
}

let   mouse   = { x: 0, y: 0 };

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

let particles: Array<Shape> = [];

function init() {
    particles = [];

    for (let i = 0; i < 5000; i++) {
        let radius = Utils.randomIntFromRange(1, 5);
        let x      = canvas.width / 2;
        let y      = canvas.height / 2;
        let color  = Utils.pick_random_thing(colors);

        particles.push(new Shape(x, y, radius, color));
    }
}

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(225, 225, 225, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        particle.update();
    }

    requestAnimationFrame(animate);
}

init();
animate();
