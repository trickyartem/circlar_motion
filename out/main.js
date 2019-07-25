var Utils = (function () {
    function Utils() {
    }
    Utils.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.pick_random_thing = function (ma_stuff) {
        return ma_stuff[Math.floor(Math.random() * ma_stuff.length)];
    };
    return Utils;
}());
var Shape = (function () {
    function Shape(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = 0.05;
        this.radians = Math.random() * Math.PI * 2;
        this.distance_from_center = Utils.randomIntFromRange(150, 200);
        this.center_pos = { x: x, y: y };
        this.directions = {
            dx: Utils.pick_random_thing(speed_num),
            dy: Utils.pick_random_thing(speed_num)
        };
    }
    Shape.prototype.draw = function (last_position) {
        c.beginPath();
        c.lineWidth = this.radius;
        c.strokeStyle = this.color;
        c.moveTo(last_position.x, last_position.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };
    Shape.prototype.update = function () {
        var last_position = {
            x: this.x,
            y: this.y
        };
        var _a = this.center_pos, x = _a.x, y = _a.y;
        var distance_from_center = this.distance_from_center;
        if (x + distance_from_center > innerWidth || x - distance_from_center < 0) {
            this.directions.dx *= -1;
        }
        if (y + distance_from_center > innerHeight || y - distance_from_center < 0) {
            this.directions.dy *= -1;
        }
        this.x += this.directions.dx;
        this.y += this.directions.dy;
        this.center_pos.x += this.directions.dx * 0.05;
        this.center_pos.y += this.directions.dy * 0.05;
        this.radians += this.velocity;
        this.x = this.center_pos.x + Math.cos(this.radians) * this.distance_from_center;
        this.y = this.center_pos.y + Math.sin(this.radians) * this.distance_from_center;
        this.draw(last_position);
    };
    return Shape;
}());
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-10';
document.body.appendChild(canvas);
var colors = ['#2185C5', '#7ECEFD', '#FF7F66', '#6C3483', '#D35400', '#FA8072'];
var speed_num = [];
for (var i = 0; i < 100; i++) {
    speed_num.push(Utils.randomIntFromRange(-40, 40));
}
var mouse = { x: 0, y: 0 };
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
var particles = [];
function init() {
    particles = [];
    for (var i = 0; i < 5000; i++) {
        var radius = Utils.randomIntFromRange(1, 5);
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var color = Utils.pick_random_thing(colors);
        particles.push(new Shape(x, y, radius, color));
    }
}
function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(225, 225, 225, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
        var particle = particles_1[_i];
        particle.update();
    }
    requestAnimationFrame(animate);
}
init();
animate();
//# sourceMappingURL=main.js.map