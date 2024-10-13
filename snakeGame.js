const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const unitSize = 15;
const width = canvas.width;
const height = canvas.height;
let snake = [{ x: width / 2, y: height / 2 }];
let food = {};
let direction = 'RIGHT';
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    update();
    draw();
}

function update() {
    moveSnake();
    checkCollision();
    checkFood();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawSnake();
    drawFood();
    drawScore();
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'UP': head.y -= unitSize; break;
        case 'DOWN': head.y += unitSize; break;
        case 'LEFT': head.x -= unitSize; break;
        case 'RIGHT': head.x += unitSize; break;
    }

    snake.unshift(head);
    snake.pop();
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => ctx.fillRect(part.x, part.y, unitSize, unitSize));
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (key === 38 && direction !== 'DOWN') direction = 'UP';
    if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        spawnFood();
        snake.push({}); // Add new part to snake
    }
}

function spawnFood() {
    food = {
        x: Math.floor((Math.random() * width) / unitSize) * unitSize,
        y: Math.floor((Math.random() * height) / unitSize) * unitSize
    };
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

setInterval(gameLoop, 80);
spawnFood();  // Initial food spawn
