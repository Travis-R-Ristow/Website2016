if(!temp){
	var temp = 42;
}
//CONSTRANTS
var COLS = 25;
var ROWS = 25;
//IDs
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;
var CANDY = 3;

var LEFT=0, UP=1, RIGHT=2, DOWN=3;
var KEY_LEFT=37, KEY_UP=38, KEY_RIGHT=39, KEY_DOWN=40;

var grid ={
	width: null,
	height: null,
	_grid: null,

	init: function(dirc, COLS, ROWS){
		this.width = COLS;
		this.height = ROWS;
		this._grid = []

		for(var x = 0; x < COLS; x++){
			this._grid.push([]);
			for(var y = 0; y < ROWS; y++){
				this._grid[x].push(dirc);

			}
		}

	},
	set: function(value, x, y){
		this._grid[x][y] = value;
	},
	get: function(x, y){
		return this._grid[x][y]
	},
}//grid

//SNAKE
var snake = {
	direction: null,
	last: null,
	_queue: null,

	init: function(dirc, x, y){
		this.direction = dirc;
		this._queue = [];
		this.insert(x, y);

	},
	insert: function(x, y){
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},
	remove: function(){
		return this._queue.pop();
	},
}
//SNAKE ENDs

//FOODS
	function setFood(){
		var empty = [];
		for(var x = 0; x < grid.width; x++){
			for(var y = 0; y < grid.height; y++){
				if(grid.get(x, y) === EMPTY){
					empty.push({x:x, y:y});
				}
			}
		}
		var randPos = empty[Math.floor(Math.random()*empty.length)];
		grid.set(FRUIT, randPos.x, randPos.y);
	}
	function setCandy(){
		var empty = [];
		var rando = Math.floor(Math.random()*6);
		if(rando >3){
			for(var x = 0; x < grid.width; x++){
				for(var y = 0; y < grid.height; y++){
					if(grid.get(x, y) === EMPTY){
						empty.push({x:x, y:y});
					}
				}
			}
		var randPos = empty[Math.floor(Math.random()*empty.length)];
		grid.set(CANDY, randPos.x, randPos.y);
		}else{}
	}
//FOODS ENDs

var ctx;
var speed;
var canvas;
var keystate;
var score;


	function main(){
		canvas = document.createElement("canvas");
		canvas.width = COLS * 25;
		canvas.height = ROWS * 25;
		ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);

		speed = 0;
		keystate = {};
		document.addEventListener("keydown", function(event){
			keystate[event.keyCode] = true;
		});
		document.addEventListener("keyup", function(event){
			delete keystate[event.keyCode];
		});
		init();

		loop();
	}

	function init(){
		score = 0;
		grid.init(EMPTY, COLS, ROWS);
		var startPos = {x:Math.floor(COLS/2), y:ROWS-3};
		snake.init(UP, startPos.x, startPos.y);
		grid.set(SNAKE, startPos.x, startPos.y);
		setCandy();
		setFood();
	}

	function loop(){
		update();
		draw();
		window.requestAnimationFrame(loop, canvas);
	}

	function update(){
		speed ++;

		if(keystate[KEY_LEFT] && snake.direction !== RIGHT){snake.direction = LEFT;}
		if(keystate[KEY_UP] && snake.direction !== DOWN){snake.direction = UP;}
		if(keystate[KEY_RIGHT] && snake.direction !== LEFT){snake.direction = RIGHT;}
		if(keystate[KEY_DOWN] && snake.direction !== UP){snake.direction = DOWN;}

		if(speed % 8 === 0){
			var snakeX = snake.last.x;
			var snakeY = snake.last.y;

			switch(snake.direction){
				case LEFT: 
					snakeX--;
						break;
				case UP:
					snakeY--;
						break;
				case RIGHT:
					snakeX++;
						break;
				case DOWN:
					snakeY++;
						break;
			}
			console.log('temp0',temp);
			if(snakeX < 0 || snakeX > grid.width-1 || snakeY < 0 || snakeY > grid.height-1 || grid.get(snakeX, snakeY) === SNAKE){
				console.log("GAME OVER\n YOU DIED\n Your SCORE:",score);

				if(score > temp){
					document.getElementById("score").innerHTML = score;
					temp = score;
					console.log('temp1:',temp);
				}
				console.log('temp2:',temp);
				return init();
			}
			if(grid.get(snakeX, snakeY) === FRUIT){
				var tail = {x:snakeX, y:snakeY};
				score ++;
				setFood();
				setCandy();
			}
			else if(grid.get(snakeX, snakeY) === CANDY){
				var tail = {x:snakeX, y:snakeY};
				score +=2;
			}
			else{
				var tail = snake.remove();
				grid.set(EMPTY, tail.x, tail.y);
				tail.x = snakeX;
				tail.y = snakeY;
			}
			grid.set(SNAKE, tail.x, tail.y);

			snake.insert(tail.x, tail.y);
		}
	}

	function draw(){
		var tarW = canvas.width/grid.width;
		var tarH = canvas.height/grid.height;

		for(var x = 0; x < grid.width; x++){
			for(var y = 0; y < grid.height; y++){
				switch(grid.get(x, y)){
					case EMPTY:
						ctx.fillStyle = "#fff";
						break;
					case SNAKE:
						ctx.fillStyle = "green";
						break;
					case FRUIT:
						ctx.fillStyle = "red";
						break;
					case CANDY:
						ctx.fillStyle = "orange";
						break;

				}
				ctx.fillRect(x*tarW, y*tarH, tarW, tarH);
			}
		}
		ctx.fillStyle ='black';
		ctx.font = "35px Impact";
		ctx.fillText('SCORE: '+score, 1, canvas.height-1);
	}

main();