

class wall{
	constructor(x){
		this.xWall = x;
		this.yWall = randY();
	}
	
	move(){
		this.xWall = this.xWall + dWall;
		if(this.xWall + wWall <= 0){
			this.xWall = canvas.width;
			this.yWall = randY();
		}
	}
	
	check(){
		if(xDoge + sizeDoge < this.xWall || xDoge > this.xWall + wWall){
			
		}
		else{
			if(this.yWall - hWall < yDoge && yDoge + sizeDoge < this.yWall){
				
			}
			else{
				gameover();
			}
		}
	}
}

function randY(){
	 return (200 + Math.floor(Math.random() * (canvas.height - 201)));
}

function init(){
	window.canvas = document.getElementById('game');
	window.scr = canvas.getContext('2d');
	window.imgDoge = new Image();
	imgDoge.src = 'doge.jpg';
	
	window.dWall = -4;
	window.wWall = 100;
	window.hWall = 300;
		
	window.dDoge = 2;
	window.yDoge = 200;
	window.xDoge = 200;
	window.sizeDoge = 100;
		
	imgDoge.onload = function(){
		scr.drawImage(imgDoge, xDoge, yDoge, sizeDoge, sizeDoge);
	}
	
	window.addEventListener('resize', updateSize);
	window.addEventListener('keydown', moveDoge);
	
	updateSize();
	
	window.walls = [new wall(canvas.width), new wall(canvas.width * 1.33), new wall(canvas.width * 1.66)];
	play();
}	

function updateSize(){
	window.canvas.width = document.body.clientWidth;
	window.canvas.height = document.body.clientHeight;
}

function play(){
	window.playing = setInterval(draw, 10);
}

function gameover(){
	clearInterval(playing);
	scr.clearRect(0,0,canvas.width,canvas.height);
	scr.fillStyle = 'black';
	scr.font = '60px consolas';
	scr.fillText('GAME OVER!!', canvas.width/3, canvas.height/2);
}

function moveDoge(){
	if(dDoge > -11){
		dDoge = -8;
	}
}

function inCanvas(){
	let temp = yDoge + dDoge;
	
	if(temp < 0){
		yDoge = 0;
	}
	else if(temp > canvas.height - sizeDoge){
		yDoge = canvas.height - sizeDoge;
	}
	else{
		yDoge = yDoge + dDoge;
	}
}

function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
	drawDoge(200, yDoge);
	for(let i=0; i<3; i++){
		drawWall(walls[i].xWall, walls[i].yWall, wWall, hWall);
		walls[i].move();
		walls[i].check();
	}

	inCanvas();
	if(dDoge < 16){
		dDoge += 0.3;
	}
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
}

function drawDoge(x, y){
	scr.drawImage(imgDoge, x, y, sizeDoge, sizeDoge);
}

function drawWall(x, y, w, h){
	scr.fillStyle = 'rgba(0,100,0, 1)';
	scr.fillRect(x, 0, wWall, y - hWall);
	scr.fillRect(x, y, wWall, canvas.height - y);
}