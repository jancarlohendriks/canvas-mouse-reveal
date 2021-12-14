let t = 0;
let mouseX = 0;
let mouseY = 0;
const MIN_SIZE = 1;
const MAX_SIZE = 20;
const canvas = document.getElementById('output')
const ctx = canvas.getContext('2d')
const imgXtra = new Image();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// imgXtra.src = "https://images.unsplash.com/photo-1529943247435-a5974e63d6e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";
imgXtra.src = "bg.jpg";
// imgXtra.crossOrigin="anonymous"

let isDrawing = false;

document.onpointerdown = (e) => {
	i = 0
  isDrawing = true
	timeInterval = setInterval(function() {
		if (isDrawing) {
			i += 1, console.log(i)
		}
	}, 1);
}

document.onpointerup = (e) => {
	isDrawing = false;
	clearInterval(timeInterval)
	downloadImage();
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
	update: function() {
		this.x = lerp(this.x, mouseX, 0.075)
		this.y = lerp(this.y, mouseY, 0.075)
		this.size = Math.abs(Math.round(Math.sin(t) * MAX_SIZE));
	},
	draw: function() {
		// ctx.beginPath();
		// ctx.moveTo(this.x, this.y);
		// ctx.lineTo(this.x + 20, this.y);
		// ctx.lineTo(this.x + 20, this.y + 100);
		// ctx.lineTo(this.x, this.y + 100);
		// ctx.fillRect(this.x, this.y, 40, 60);
		ctx.ellipse(this.x+40, this.y+40, this.size+20, this.size+20, Math.PI / 4, 0, 2 * Math.PI);
		// ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		// ctx.closePath();
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
	ctx.restore();
	ctx.globalCompositeOperation='source-over';
}

let timeInterval;
let i = 10;

function loop() {
	requestAnimationFrame(loop);
	circle.update()
	if (isDrawing) {
		t = 0.01 * i;
		// t = 0.001 * Date.now();
		render();
	}
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