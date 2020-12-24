var canvas;
var img, bkimg;
var anim;
var timer;

//初期化処理
function initial(){
	canvas = document.querySelector('#canvas')  
    img = new Image();
    img.src = "suzume背景透過.png";
    bkimg = new Image();
    bkimg.src = "背景1.JPG";
    bkimg.onload = function(){
    	anim = new Anim();
    	canvas.onclick = makeCharacter;
    	timer = setInterval(doTimer, 50);　//50ミリ秒ごとにdraw関数を呼び出し
    }
}

//クリックしてキャラクターを追加
function makeCharacter(event){
	anim.click(event);
}

//タイマーで実行する処理
function doTimer(){
	anim.draw();
}

//アニメーションを管理するオブジェクト
function Anim(){
	this.imgs =[];

	//クリックした地点にAnimImageを作成
	this.click = function(event){
		var x = event.clientX - canvas.offsetLeft - img.width/2;
		var y = event.clientY - canvas.offsetTop - img.height/2;
		this.imgs.push(new AnimeImage(img,x,y));
	}

	//イメージの描画
	this.draw = function(){
		this.drawBackground();
		for (var n in this.imgs){
			this.imgs[n].drawImage();
		}
	}

	//背景の描画
	this.drawBackground = function(){
		var context = canvas.getContext('2d');
	    context.clearRect(0,0,1487,837);
	    context.drawImage(bkimg,0,0,1487,837);
	}
}

//アニメーションキャラクタのオブジェクト
function AnimeImage(img,x,y){
	this.img = img;
	this.x = x;
	this.y = y;
	this.dx = Math.floor( Math.random()*10)+1;
	this.dy = Math.floor( Math.random()*10)+1;

	//イメージの描画
	this.drawImage = function(){
		var context = canvas.getContext('2d');
		this.x += this.dx;
		this.y += this.dy;
		if (this.x < 0){ this.dx *= -1;}
		if (this.y < 0){ this.dy *= -1;}
		if (this.x + this.img.width > 1487){ this.dx *= -1;}
		if (this.y + this.img.width > 837){ this.dy *= -1;}
		context.drawImage(this.img, this.x, this.y);
	}
}
