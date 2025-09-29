// ===============================
// game.js
// ===============================

import { Player, Ball, Hoop } from './entities.js';
import { InputHandler } from './input.js';
import { AI } from './ai.js';
import { clamp, randomRange } from './utils.js';

// ----- Game Variables -----
let canvas, ctx;
let player, ball, hoop;
let score = 0;
let timeLeft = 60; // seconds
let isGameOver = false;

// ----- Initialize Game -----
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Create Entities
    player = new Player(200, 400);
    ball = new Ball(200, 400);
    hoop = new Hoop(200, 100);

    // Input
    new InputHandler(player, ball);

    // AI (if opponent or moving hoop)
    new AI(hoop);

    // Start Timer
    startTimer();

    // Start Game Loop
    requestAnimationFrame(gameLoop);
}

// ----- Game Loop -----
function gameLoop() {
    if (isGameOver) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Entities
    player.update();
    ball.update();
    hoop.update();

    // Check Collisions & Scoring
    if (ball.checkScore(hoop)) {
        score++;
        ball.reset(player.x, player.y);
    }

    // Draw Everything
    hoop.draw(ctx);
    player.draw(ctx);
    ball.draw(ctx);

    // Draw HUD
    drawHUD();

    // Next frame
    requestAnimationFrame(gameLoop);
}

// ----- Draw HUD -----
function drawHUD() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(`Time: ${timeLeft}`, 20, 60);
}

// ----- Timer -----
function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            isGameOver = true;
            clearInterval(timerInterval);
            alert(`Game Over! Your score: ${score}`);
        }
    }, 1000);
}

// ----- Start the Game -----
window.addEventListener('load', init);

