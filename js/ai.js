// ===============================
// ai.js
// ===============================

export class AI {
    constructor(cpuPlayer, ball, hoop) {
        this.cpuPlayer = cpuPlayer;
        this.ball = ball;
        this.hoop = hoop;
        this.shootInterval = 120; // frames between CPU shots (~2 seconds at 60fps)
        this.frameCount = 0;

        this.update();
    }

    update() {
        const loop = () => {
            // Move CPU left/right randomly
            const direction = Math.random() < 0.5 ? -1 : 1;
            this.cpuPlayer.x += direction * this.cpuPlayer.speed * 0.5; // slower movement
            // Clamp CPU inside canvas
            this.cpuPlayer.x = Math.max(0, Math.min(this.cpuPlayer.x, 400 - this.cpuPlayer.width));

            // Auto-shoot
            this.frameCount++;
            if (this.frameCount >= this.shootInterval) {
                this.frameCount = 0;
                if (!this.ball.isMoving) {
                    // shoot ball toward hoop
                    const powerX = (this.hoop.x + this.hoop.width/2 - this.cpuPlayer.x) * 0.1;
                    const powerY = -10;
                    this.ball.shoot(powerX, powerY);
                }
            }

            requestAnimationFrame(loop);
        };
        loop();
    }
}

