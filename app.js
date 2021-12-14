let t;
let mouseX = 0;
let mouseY = 0;
const MIN_SIZE = 10;
const MAX_SIZE = 50;
const canvas = document.getElementById('output')
const ctx = canvas.getContext('2d')
const imgXtra = new Image();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
imgXtra.src = "https://images.unsplash.com/photo-1529943247435-a5974e63d6e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";
imgXtra.crossOrigin="anonymous"

let isActive = false;

document.onpointerdown = (e) => {
  isActive = true
}

document.onpointerup = (e) => {
	isActive = false;
	// downloadImage();
}

// document.onmousemove = (e) => {
// 	mouseX = e.clientX;
// 	mouseY = e.clientY;
// }

canvas.onmousemove = (e) => {
	mouseX = e.offsetX;
	mouseY = e.offsetY;
}

var circle = {
	x: 0,
	y: 0,
	size: 0,
	// maxSize: 50,
	// _needsRandomized: false,
	update: function() {
		this.x = lerp(this.x, mouseX, 0.045)
		this.y = lerp(this.y, mouseY, 0.045)
		this.size = Math.abs(Math.round(Math.sin(t) * MAX_SIZE));
		// this.size = MAX_SIZE;
		// if (this.size < 2) {
		// 	if (this._needsRandomized) {
		// 		this.randomize();
		// 		this._needsRandomized = false;
		// 	}
		// } else {
		// 	this._needsRandomized = true;
		// }
	},
	// randomize: function() {
	// 	this.x = getRndInt(50, canvas.width - 50);
	// 	this.y = getRndInt(50, canvas.height - 50);
	// 	this.maxSize = getRndInt(MIN_SIZE, MAX_SIZE);
	// },
	draw: function() {
		// ctx.moveTo(this.x, this.y);
		// ctx.beginPath();
		// ctx.fillRect(this.x, this.y, 40, 60);
		// ctx.clip();
		// ctx.closePath();
		ctx.ellipse(this.x, this.y, this.size, this.size + 10, Math.PI / 4, 0, 2 * Math.PI);
		// ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	}
};

function render() {
	ctx.globalCompositeOperation='destination-out';
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(mouseX,mouseY);
	circle.draw();
	ctx.closePath();
	ctx.clip();
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(imgXtra, 0, 0);
	scaleToFill(imgXtra) // ctx.drawImage(imgXtra, 0, 0);
	// ctx.globalCompositeOperation='source-over';
	ctx.restore();
}

let timeInterval;

function loop() {
	requestAnimationFrame(loop);
	circle.update()
	// t = 0
	if (isActive) {
		// t = 0.001
		// timeInterval = setInterval(function(){ t = t+1 }, 1000);
		t = 0.001 * Date.now();
		// console.log(t)
		render();
	}
	// clearInterval(timeInterval)
}

document.addEventListener("DOMContentLoaded", function(event) {
  // ctx.drawImage(imgBase, 0, 0);
	ctx.fillStyle = "#D8F34E";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	loop();
});


function scaleToFill(img){
	var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
	var x = (canvas.width / 2) - (img.width / 2) * scale;
	var y = (canvas.height / 2) - (img.height / 2) * scale;
	ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var scaleX = window.innerWidth / canvas.width;
// var scaleY = window.innerHeight / canvas.height;

// var scaleToFit = Math.min(scaleX, scaleY);
// var scaleToCover = Math.max(scaleX, scaleY);

// canvas.style.transformOrigin = '0 0'; //scale from top left: ;
// canvas.style.transform = 'scale(' + scaleToCover + ')';

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

// Save | Download image
function downloadImage(filename = "untitled.jpeg") {
	var data = canvas.toDataURL("image/jpeg", 1.0);
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}