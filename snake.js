var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var g = 20; //Size of one grid block
var intv; //Set interval variable

ctx.fillRect(0, 0, 24 * g, 24 * g); //Create black background, 25 blocks each
ctx.strokeStyle = 'green';

function clearAll() { //Clear all previous drawing
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 480, 480);
}

function move(event) { //Move the snake depending on keyboard event
  event.preventDefault();
  var kstring = event.key; //Get string for keyboard event

  if(kstring == 'ArrowUp') { //Up button
    clearInterval(intv); //Clear previous direction

    intv = setInterval(function up(){
      clearAll();

      if(snake.pos[0][0] == food.x && snake.pos[0][1] == food.y) { //If collide form right direction

        snake.pos.unshift([food.x, food.y - g]); //Add one new body to snake (at beginning)
        snake.eat();
        snake.draw();
      }
      updatePos(); //Update all position BACKWARD

      snake.pos[0][1] += -g; //Move snake's head
      snake.draw(); //Draw all
      ifHit(); //Test to see if the snake hit its own body

    }, snake.speed);
  }
  if(kstring == 'ArrowDown') { //Down button
    clearInterval(intv); //Clear previous direction

    intv = setInterval(function down(){
      clearAll();

      if(snake.pos[0][0] == food.x && snake.pos[0][1] == food.y) { //If collide form right direction
        snake.pos.unshift([food.x, food.y + g]); //Add one new body to snake (at beginning)
        snake.eat();
        snake.draw();
      }
      updatePos(); //Update all position BACKWARD

      snake.pos[0][1] += g; //Move snake's head
      snake.draw(); //Draw all
      ifHit(); //Test to see if the snake hit its own body

    }, snake.speed);
  }
  if(kstring == 'ArrowRight') { //Right button
    clearInterval(intv); //Clear previous direction

    intv = setInterval(function right(){
      clearAll();

      if(snake.pos[0][0] == food.x && snake.pos[0][1] == food.y) { //If collide form right direction
        snake.pos.unshift([food.x + g, food.y]); //Add one new body to snake (at beginning)
        snake.eat();
        snake.draw();
      }
      updatePos(); //Update all position BACKWARD

      snake.pos[0][0] += g; //Move the snake's head
      snake.draw(); //Draw all
      ifHit(); //Test to see if the snake hit its own body

    }, snake.speed);
  }
  if(kstring == 'ArrowLeft') { //Left Button
    clearInterval(intv); //Clear previous direction

    intv = setInterval(function left(){
      clearAll();

      if(snake.pos[0][0] == food.x && snake.pos[0][1] == food.y) { //If collide form right direction
        snake.pos.unshift([food.x - g, food.y]); //Add one new body to snake (at beginning)
        snake.eat();
        snake.draw();
      }
      updatePos(); //Update all position BACKWARD

      snake.pos[0][0] += -g; //Move snake's head
      snake.draw(); //Draw all
      //ifHit(); //Test to see if the snake hit its own body

    }, snake.speed);
  }
}

/* Food Object */
var randX = Math.random() * canvas.width - g, //Random for X position of food
    randY = Math.random() * canvas.height - g; //Random for Y position of food

function randFood() { //Random food location func
  randX = Math.random() * canvas.width - g;
  randY = Math.random() * canvas.height - g;
  food.x = randX - (randX % 20);
  food.y = randY - (randY % 20);

  for(var i = 0; i < snake.pos.length; i++) {
    while(food.x == snake.pos[i][0] && food.y == snake.pos[i][1]) { //Make sure the food doesnt appear inside snake's body
      randFood();
    }
    food.draw();
  }
}

var food = {
  width:g,
  height: g,
  color: 'red',
  x: 0,
  y: 0,
  draw: function() {
    this.x =  randX - (randX % 20);
    this.y =  randY - (randY % 20);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateScore() { //Update user score after eat the food
  document.getElementById('score').innerHTML = snake.score;
  if(snake.score == canvas.width * canvas.height * 10) { //If the occupy all grids
    alert('CONGRATs! You have won this game.');
  }
}

function updatePos() { //Update snake body position
  if(snake.pos.length > 1) { //Update all position BACKWARD
    for(var i = snake.pos.length - 1; i > 0; i--) {
      snake.pos[i][0] = snake.pos[i - 1][0];
      snake.pos[i][1] = snake.pos[i - 1][1];
    }
  }
}

function ifHit() { //Check whether the snake hit one of its own body
  if(snake.pos.length > 1) {
    for(var i = 1; i < snake.pos.length; i++) {
      if(snake.pos[0][0] == snake.pos[i][0] && snake.pos[0][1] == snake.pos[i][1]) {
        death(); //Call snake died function
        return;
      }
    }
  }
}

function death() { //If the snake died
  clearInterval(intv); //Clear previous interval
  alert('GAME OVER\nYour score was: ' + snake.score); //Alert game over and last score
  snake.score = 0; //Reset score
  updateScore();

  snake.pos = [[canvas.width/2, canvas.height/2]];

  clearAll();

  ctx.fillStyle = snake.color;
  ctx.fillRect(12 * snake.width, 12 * g, snake.height, snake.height); //Reposition the snake to start
  ctx.strokeRect(12 * snake.width, 12 * g, snake.height, snake.height);
  food.draw(); //Draw the last food
}

/* Snake Object */
var snake = {
  speed: 130, //Reduce this value to speed up
  width: g,
  height: g,
  pos: [[canvas.width/2, canvas.height/2]],
  score: 0,
  color: 'yellow',
  eat: function() { //Snake eats the food
    randFood();
    snake.score += 10;
    updateScore();
  },
  draw: function() {
    food.draw();
    if(this.pos[0][0] == canvas.width || this.pos[0][0] == -g || this.pos[0][1] == canvas.height || this.pos[0][1] == -g) { //If the snake hit the border
      death(); //Call snake died function
    clearInterval(intv);
    }

    ctx.fillStyle = this.color;
    for(var i = 0; i < this.pos.length; i++) {
      ctx.fillRect(this.pos[i][0], this.pos[i][1], this.width, this.height);
      ctx.strokeRect(this.pos[i][0], this.pos[i][1], this.width, this.height);
    }
  }//End of snake draw func
}

document.addEventListener('keydown', move, false); //When keyboard was clicked

randFood();
snake.draw();
