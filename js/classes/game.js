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
