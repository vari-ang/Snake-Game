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
    // Randomize food location
    randFood() {
        let randX = Math.random() * this.width - this.g;
    }
}
class Snake extends Game {
    constructor(_ctx, _width, _height, _g, _speed, _pos, _color) {
        super(_ctx, _width, _height, _g);
        this.speed = _speed;
        this.pos = _pos;
        this.color = _color;
    }
    // snake eats food
    eat() { }
    // draw snake on canvas
    draw() {
        this.ctx.fillStyle = this.color;
        for (let i = 0; i < this.pos.length; i++) {
            this.ctx.fillRect(this.pos[i][0], this.pos[i][1], this.width, this.height);
            this.ctx.strokeRect(this.pos[i][0], this.pos[i][1], this.width, this.height);
        }
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
    // ctx.strokeStyle = 'green'
    // Create objects
    let snake = new Snake(ctx, canvas.width, canvas.height, g, 130, // reduce to speed up the snake
    [[canvas.width / 2, canvas.height / 2]], // middle of the canvas
    'yellow');
    snake.draw();
}
