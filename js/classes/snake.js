"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Snake;
