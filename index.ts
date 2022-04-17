class Game {
    protected ctx:CanvasRenderingContext2D
    protected width:number
    protected height:number
    protected g:number = 20 // size of one grid block
    protected score:number = 0

    constructor(_ctx:CanvasRenderingContext2D, _width:number, _height:number, _g:number) {
        this.ctx = _ctx
        this.width = _width
        this.height = _height
        this.g = _g
    }

    // Randomize food location
    protected randFood() {
        let randX:number = Math.random() * this.width - this.g
    }
}

class Snake extends Game {
    private speed:number // smaller the value, faster the snake be
    private pos:number[][] // snake position in x, y
    private color:string

    constructor(_ctx: CanvasRenderingContext2D, _width:number, _height:number, _g:number, _speed:number, _pos:number[][], _color:string) {
        super(_ctx, _width, _height, _g)
        this.speed = _speed
        this.pos = _pos
        this.color = _color
    }

    // snake eats food
    public eat() {}

    // draw snake on canvas
    public draw() {
        this.ctx.fillStyle = this.color
        for(let i=0; i < this.pos.length; i++) {
            this.ctx.fillRect(this.pos[i][0], this.pos[i][1], this.width, this.height)
            this.ctx.strokeRect(this.pos[i][0], this.pos[i][1], this.width, this.height)
        }
    }
}

let canvas:HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
let ctx:CanvasRenderingContext2D | null = canvas.getContext("2d")
let g:number = 20 // size of one grid block
let intv // interval variable

if(ctx) {
    // fillRect() draws a filled rectangle whose starting point is at (x, y) and 
    // whose size is specified by width and height
    // in bellow line, we create black background 24 blocks each
    ctx.fillRect(0, 0, 24 * g, 24 * g)
    // ctx.strokeStyle = 'green'

    // Create objects
    let snake = new Snake(
        ctx,
        canvas.width, canvas.height, g, 
        130, // reduce to speed up the snake
        [[ canvas.width / 2, canvas.height/2 ]], // middle of the canvas
        'yellow'
    )

    snake.draw()
}