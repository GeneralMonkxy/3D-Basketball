// ===============================
// input.js
// ===============================

export class InputHandler {
    constructor(player, ball) {
        this.player = player;
        this.ball = ball;

        this.isShooting = false;
        this.shootPower = { x: 0, y: -10 }; // default shooting power

        // Key press tracking
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
        };

        // Event listeners
        window.addEventListener('keydown', (e) => this.keyDown(e));
        window.addEventListener('keyup', (e) => this.keyUp(e));
    }

    keyDown(e) {
        if (e.code === 'ArrowLeft') this.keys.ArrowLeft = true;
        if (e.code === 'ArrowRight') this.keys.ArrowRight = true;
        if (e.code === 'Space') this.keys.Space = true;
    }

    keyUp(e) {
        if (e.code === 'ArrowLeft') this.keys.ArrowLeft = false;
        if (e.code === 'ArrowRight') this.keys.ArrowRight = false;
        if (e.code === 'Space') {
            this.keys.Space = false;
            this.shootBall();
        }
    }

    update() {
        // Move player
        if (this.keys.ArrowLeft) this.player.x -= this.player.speed;
        if (this.keys.ArrowRight) this.player.x += this.player.speed;

        // Clamp player within canvas
        this.player.x = Math.max(0, Math.min(this.player.x, 400 - this.player.width)); // assuming canvas width 400
    }

    shootBall() {
        if (!this.ball.isMoving) {
            // Shoot from player's position
            const powerX = this.shootPower.x;
            const powerY = this.shootPower.y;
            this.ball.shoot(powerX, powerY);
        }
    }
}

// Connect InputHandler to game loop update
export function handleInput(player, ball) {
    const input = new InputHandler(player, ball);
    function loop() {
        input.update();
        requestAnimationFrame(loop);
    }
    loop();
}

