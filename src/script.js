
let imageFile = document.querySelector('#image');
imageFile.addEventListener('change', (e) => {
	reader.readAsDataURL(imageFile.files[0]);
});

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

let dataUrl, reader = new FileReader(), img;
reader.onload = (event) => {
	img = new Image();
	dataUrl = event.target.result;
	img.src = dataUrl;

	img.onload = () => {
		let scaleX = innerWidth*(80/100);
		let scaleY = innerHeight*(80/100);
		let temp = calculateAspectRatioFit(img.width, img.height, scaleX, scaleY);
		img.width = temp.width;
		img.height = temp.height;
		getDimensions(img.width, img.height);
		showImage(img.width, img.height);
	}
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

let radii = 1, imgData, colors, store=[];
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

function showImage(w, h) {
	imgData, colors, store=[];
	let sumX=0, sumY=0, sumnwp=0;

	s.clear(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.drawImage(img, 0, 0, w, h);
	colors = ctx.getImageData(0, 0, w, h).data;
	//s.clear(0,0,canvas.width, canvas.height);
	
	for(var y = 0; y < h; y += radii) {
	  	for(var x = 0; x < w; x += radii) {

	  		let red = colors[((w * y) + x) * 4];
	    	let green = colors[((w * y) + x) * 4 + 1];
	    	let blue = colors[((w * y) + x) * 4 + 2];
	    	let alpha = colors[((w * y) + x) * 4 + 3];

	    	if (red < 255 && green < 255 && blue < 255) {
	    		sumX += x;
	  			sumY += y;

		    	/*var clr = 'rgba('+ red + ',' + green + ',' + blue + ',' + alpha +')';
		    	store.push(new Particle(x, y, clr));
		    	store[sumnwp].draw();*/
		    	sumnwp++;
	    	}
	 	}
	}
	s.circle(sumX/sumnwp, sumY/sumnwp);
	s.fill('red');
}


let wrap = document.querySelector(".wrap");
let scale = 80/100;
getDimensions(parseInt(getComputedStyle(wrap).width)*scale, parseInt(getComputedStyle(wrap).height)*scale);