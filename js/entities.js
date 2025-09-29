// ===============================
// entities.js
// ===============================

// ----- Player Class -----
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = 'blue';
        this.speed = 5;
    }

    update() {
        // Movement handled via input.js, so no logic here
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// ----- Ball Class -----
export class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.color = 'orange';
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0.5;
        this.isMoving = false;
    }

    shoot(powerX, powerY) {
        this.vx = powerX;
        this.vy = powerY;
        this.isMoving = true;
    }

    update() {
        if (!this.isMoving) return;

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off floor
        if (this.y + this.radius > 500) { // assuming canvas height ~500
            this.y = 500 - this.radius;
            this.vy *= -0.6; // bounce with damping
        }

        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > 400) { // assuming canvas width ~400
            this.vx *= -0.6;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    checkScore(hoop) {
        // Simple collision: ball inside hoop rectangle
        if (
            this.x > hoop.x &&
            this.x < hoop.x + hoop.width &&
            this.y - this.radius < hoop.y + hoop.height &&
            this.y + this.radius > hoop.y
        ) {
            return true;
        }
        return false;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
    }
}

// ----- Hoop Class -----
export class Hoop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 10;
        this.color = 'red';
    }

    update() {
        // Can move hoop if AI.js controls it
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

