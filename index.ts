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

    public static updateScore(newScore:number, target:number) {
        let scoreDoc:HTMLElement | null = document.getElementById('score')
        if(scoreDoc) {
            // Update text on screen
            scoreDoc.innerText = newScore.toString()

            if(newScore == target) {
                alert('CONGRATs! You have won this game')
                location.reload()
            }
        }
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

    public getSpeed():number {
        return this.speed
    }

    public getPos():number[][] {
        return this.pos
    }

    public getSize():number {
        return this.g
    }

    // draw snake on canvas
    public draw() {
        this.ctx.fillStyle = this.color
        for(let i=0; i < this.pos.length; i++) {
            this.ctx.strokeStyle = 'green'
            this.ctx.fillRect(this.pos[i][0], this.pos[i][1], this.g, this.g)
            this.ctx.strokeRect(this.pos[i][0], this.pos[i][1], this.g, this.g)
        }
    }

    // Move snake body position
    public movePos(x:number, y:number, moveBy:number) {
        // move snake bodies by updating all block form the back of the array
        if(this.pos.length > 1) {
            for(let i = this.pos.length - 1; i > 0; i--) {
                this.pos[i][0] = this.pos[i - 1][0]
                this.pos[i][1] = this.pos[i - 1][1]
            }
        }

        this.pos[x][y] += moveBy

        // Check to see if the snake hits the border
        if(this.pos[0][0] == this.width || this.pos[0][0] == -this.g || this.pos[0][1] == this.height || this.pos[0][1] == -this.g)
            this.dead()

        // Check to see if the snake hits its own body
        if(this.pos.length > 1) {
            for(let i = 1; i < this.pos.length; i++) {
                if(this.pos[0][0] == this.pos[i][0] && this.pos[0][1] == this.pos[i][1])
                    this.dead()
            }
        }
    }
    
    // snake eats food
    public eat(toBeAdded:number[]) {
        this.pos.unshift(toBeAdded)
        this.score += 10
        Game.updateScore(this.score, this.width * this.height * 10 - 10)
    }

    // Snake died, game over
    public dead() {
        // Alert game over and last score
        alert('GAME OVER\nYour score was: ' + this.score)
        location.reload()
    }
}

class Food extends Game {
    private color:string
    private x:number=0
    private y:number=0

    constructor(_ctx: CanvasRenderingContext2D, _width:number, _height:number, _g:number, _color:string) {
        super(_ctx, _width, _height, _g)
        this.color = _color
    }

    public getX():number {
        return this.x
    }
    public getY():number {
        return this.y
    }

    public draw(_snakePos:number[][], isRandom:boolean):boolean {
        if(isRandom) {
            // If snake occupies all spots return
            if(_snakePos.length == (this.width/this.g) * (this.height/this.g)) {
                return true
            }

            let randX:number = Math.random() * this.width - g //Random for X position of food
            let randY:number = Math.random() * this.height - g //Random for Y position of food
            this.x = randX - (randX % 20)
            this.y = randY - (randY % 20)

            // Make sure the food doesn't appear inside snake's body
            for(let i = 0; i < _snakePos.length; i++) {
                if(this.x == _snakePos[i][0] && this.y == _snakePos[i][1]) {
                    let ok:boolean = this.draw(_snakePos, isRandom)
                    if(ok) return true
                }
            }
    }
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, this.y, this.g, this.g)
        return true
    }
}

let canvas:HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
let ctx:CanvasRenderingContext2D | null = canvas.getContext("2d")
let g:number = 20 // size of one grid block
let intv:number // interval variable

if(ctx) {
    // fillRect() draws a filled rectangle whose starting point is at (x, y) and 
    // whose size is specified by width and height
    // in bellow line, we create black background 24 blocks each
    ctx.fillRect(0, 0, 24 * g, 24 * g)

    // Create snake
    let snake = new Snake(
        ctx,
        canvas.width, canvas.height, g, 
        130, // reduce to speed up the snake
        [[ canvas.width / 2, canvas.height/2 ]], // middle of the canvas
        'yellow'
    )
    snake.draw()

    // Create food
    let food = new Food(
        ctx,
        canvas.width, canvas.height, g,
        'red'
    )
    food.draw(snake.getPos(), true)

    // Keyboard event handler
    // Move snake depending on keyboard event
    document.addEventListener('keydown', (e:KeyboardEvent) => {
        e.preventDefault()

        // flag variable for snake movement
        // true when one of arrow key is pressed by user
        let isMoved:boolean = true
        let snakePos:number[][] = snake.getPos()
        let snakeSize:number = snake.getSize()
        let toBeAdded:number[] = []
        let i = 0, j = 0 // snake position to be updated
        let moveBy:number = 0

        // Get string for keyboard event
        switch(e.key) {
            case 'ArrowUp':
                // Add one new body to snake (if snake eats the food)
                toBeAdded = [food.getX(), food.getY() - snakeSize]
                i = 0; j = 1; moveBy = -g
                break
            case 'ArrowDown':
                // Add one new body to snake (if snake eats the food)
                toBeAdded = [food.getX(), food.getY() + snakeSize]
                i = 0; j = 1; moveBy = g
                break
            case 'ArrowRight':
                // Add one new body to snake (if snake eats the food)
                toBeAdded = [food.getX() + snakeSize, food.getY()]
                i = 0; j = 0; moveBy = g
                break
            case 'ArrowLeft':
                // Add one new body to snake (if snake eats the food)
                toBeAdded = [food.getX() - snakeSize, food.getY()]
                i = 0; j = 0; moveBy = -g
                break
            default:
                isMoved = false
                break
        }

        if(isMoved) {
            // Clear previous interval
            clearInterval(intv)

            // Set new interval
            intv = setInterval(() => {
                // Clear all previous drawings
                ctx!.fillStyle = 'black'
                ctx!.fillRect(0, 0, canvas.width, canvas.height)

                // Check for collision
                if(snakePos[0][0] == food.getX() && snakePos[0][1] == food.getY()) {
                    snake.eat(toBeAdded)
                    food.draw(snake.getPos(), true)
                } else { // No collision, draw the food at the same spot
                    food.draw(snakePos, false) // redraw food
                }

                // update snake position
                snake.movePos(i, j, moveBy)
                snake.draw() // redraw snake
            }, snake.getSpeed())
        }
    }, false)
}