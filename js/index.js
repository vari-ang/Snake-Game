"use strict";
class Game {
    constructor(_ctx, _width, _height, _g) {
        this.g = 20; // size of one grid block
        this.score = 0;
        this.ctx = _ctx;
        this.width = _width;
        this.height = _height;
        this.g = _g;
    }
}
class Snake extends Game {
    constructor(_ctx, _width, _height, _g, _speed, _pos, _color) {
        super(_ctx, _width, _height, _g);
        this.speed = _speed;
        this.pos = _pos;
        this.color = _color;
    }
    getSpeed() {
        return this.speed;
    }
    getPos() {
        return this.pos;
    }
    getSize() {
        return this.g;
    }
    movePos(i, j, moveBy) {
        this.pos[i][j] += moveBy;
    }
    // draw snake on canvas
    draw() {
        this.ctx.fillStyle = this.color;
        for (let i = 0; i < this.pos.length; i++) {
            this.ctx.strokeStyle = 'green';
            this.ctx.fillRect(this.pos[i][0], this.pos[i][1], this.g, this.g);
            this.ctx.strokeRect(this.pos[i][0], this.pos[i][1], this.g, this.g);
        }
    }
    // snake eats food
    eat() { }
}
class Food extends Game {
    constructor(_ctx, _width, _height, _g, _color) {
        super(_ctx, _width, _height, _g);
        this.x = 0;
        this.y = 0;
        this.color = _color;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    draw(_snakePos = []) {
        let randX = Math.random() * this.width - g; //Random for X position of food
        let randY = Math.random() * this.height - g; //Random for Y position of food
        this.x = randX - (randX % 20);
        this.y = randY - (randY % 20);
        // Make sure the food doesn't appear inside snake's body
        for (let i = 0; i < _snakePos.length; i++) {
            if (this.x == _snakePos[i][0] && this.y == _snakePos[i][1]) {
                let ok = this.draw(_snakePos);
                if (ok)
                    return true;
            }
        }
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.g, this.g);
        return true;
    }
}
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let g = 20; // size of one grid block
let intv; // interval variable
if (ctx) {
    // fillRect() draws a filled rectangle whose starting point is at (x, y) and 
    // whose size is specified by width and height
    // in bellow line, we create black background 24 blocks each
    ctx.fillRect(0, 0, 24 * g, 24 * g);
    // Create snake
    let snake = new Snake(ctx, canvas.width, canvas.height, g, 130, // reduce to speed up the snake
    [[canvas.width / 2, canvas.height / 2]], // middle of the canvas
    'yellow');
    snake.draw();
    // Create food
    let food = new Food(ctx, canvas.width, canvas.height, g, 'red');
    food.draw(snake.getPos());
    // Keyboard event handler
    // Move snake depending on keyboard event
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        // flag variable for snake movement
        // true when one of arrow key is pressed by user
        let isMoved = true;
        let snakePos = snake.getPos();
        let snakeSize = snake.getSize();
        let newSnakePos = [];
        let i = 0, j = 0; // snake position to be updated
        let moveBy = 0;
        // Get string for keyboard event
        switch (e.key) {
            case 'ArrowUp':
                // Add one new body to snake (if snake eats the food)
                newSnakePos = [food.getX(), food.getY() - snakeSize];
                i = 0;
                j = 1;
                moveBy = -g;
                break;
            case 'ArrowDown':
                // Add one new body to snake (if snake eats the food)
                newSnakePos = [food.getX(), food.getY() + snakeSize];
                i = 0;
                j = 1;
                moveBy = g;
                break;
            case 'ArrowRight':
                // Add one new body to snake (if snake eats the food)
                newSnakePos = [food.getX() + snakeSize, food.getY()];
                i = 0;
                j = 0;
                moveBy = g;
                break;
            case 'ArrowLeft':
                // Add one new body to snake (if snake eats the food)
                newSnakePos = [food.getX() - snakeSize, food.getY()];
                i = 0;
                j = 0;
                moveBy = -g;
                break;
            default:
                isMoved = false;
                break;
        }
        if (isMoved) {
            // Clear previous interval
            clearInterval(intv);
            // Set new interval
            intv = setInterval(() => {
                // update snake position
                snake.movePos(i, j, moveBy);
                snake.draw(); // redraw snake
            }, snake.getSpeed());
        }
    }, false);
}
