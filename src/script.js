const container = document.querySelector('#container');
const download = document.querySelector('#download');
let imageFile = document.querySelector('#image');
var dataUrl, reader = new FileReader(), img = new Image();

imageFile.addEventListener('change', (e) => {
	reader.readAsDataURL(imageFile.files[0]);
});
reader.onload = (event) => {
	dataUrl = event.target.result;
	img.src = dataUrl;
};

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let s = new Shapes(ctx);
let timeout = false, center;
function getDimensions(w, h, callback) {
	canvas.width = w;
	canvas.height = h;
	center = new Vector2D(canvas.width/2, canvas.height/2);

	if(callback) callback();
}

let radii = 1, count=0;
class Particle{
	constructor(x, y, color) {
		this.pos = new Vector2D(x, y);
		this.c = color;
		this.r = radii;
	}
	
	draw() {
		s.box(this.pos.x, this.pos.y, this.r, this.r);
		s.fill(this.c);
	}
	update() {
		this.draw();
	}
}
let imgData, colors, store=[];
let prevX=0, prevY=0;
function showImage() {
	imgData, colors, store=[];
	//prevX=0, prevY=0;
	let sumX=0, sumY=0, sumnwp=0;

	s.clear(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.drawImage(img, center.x-img.width/2, center.y-img.height/2);
	colors = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	s.clear(0,0,canvas.width, canvas.height);
	
	for(var y = 0; y < img.height; y += radii) {
		//if(y > prevY) {prevY = y;}
	  	for(var x = 0; x < img.width; x += radii) {

	  		let red = colors[((img.width * y) + x) * 4];
	    	let green = colors[((img.width * y) + x) * 4 + 1];
	    	let blue = colors[((img.width * y) + x) * 4 + 2];
	    	let alpha = colors[((img.width * y) + x) * 4 + 3];

	    	if (red < 255 && green < 255 && blue < 255) {
	    		//if(x > prevX) {prevX = x;}
	    		sumX += x;
	  			sumY += y;
	  			sumnwp++;

		    	var clr = 'rgba('+ red + ',' + green + ',' + blue + ',' + alpha +')';
		    	store.push(new Particle(x, y, clr));
	    	}
	 	}
	}
	//getDimensions(prevX, prevY);
	store.forEach(z=> {
		z.draw();
	});
	let tempC = new Vector2D(prevX/2, prevY/2);

	s.circle(sumX/sumnwp, sumY/sumnwp);
	s.fill('red');
}
img.onload = () => {
	getDimensions(img.width, img.height, showImage);
}

