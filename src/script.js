
let light = document.querySelector('#lighting');
let bgColr = document.querySelector('#bgClr');
let imageFile = document.querySelector('#image');
let dataUrl, reader = new FileReader(), img;
let wrap = document.querySelector(".wrap");
let scale = 80/100;


imageFile.addEventListener('change', (e) => {
	if(!imageFile.files.length) return;

	reader.readAsDataURL(imageFile.files[0]);
});
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

		getDimensions(img.width, img.height, showImage);
	}
};
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let s = new Shapes(ctx), timeout = false;
let colors, store=[];

function getDimensions(w, h, callback) {
	canvas.width = w;
	canvas.height = h;

	if(callback) callback(w, h);
}
addEventListener('resize', function(e) {//debounce

	clearTimeout(timeout);
	timeout = setTimeout(()=> {
		if(!img) return;

		let scaleX = innerWidth*(80/100);
		let scaleY = innerHeight*(80/100);
		let temp = calculateAspectRatioFit(img.width, img.height, scaleX, scaleY);
		img.width = temp.width;
		img.height = temp.height;

		getDimensions(img.width, img.height, showImage);
	}, 500);
});

let radii = 1, count=0;
let prevX=0, prevY=0;
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
	colors, store=[];
	prevX=0, prevY=0;
	let sumX=0, sumY=0, sumnwp=0;

	s.clear(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.drawImage(img, 0, 0, w, h);
	colors = ctx.getImageData(0, 0, w, h).data;
	s.clear(0,0,w,h);

	let tempClr = hexToRgb(bgColr.value);
	
	for(var y = 0; y < h; y += 1) {
	  	for(var x = 0; x < w; x += 1) {

	  		let red = colors[((w * y) + x) * 4];
	    	let green = colors[((w * y) + x) * 4 + 1];
	    	let blue = colors[((w * y) + x) * 4 + 2];
	    	let alpha = colors[((w * y) + x) * 4 + 3];

	    	if ((red < tempClr.r-light.value || red > tempClr.r+light.value) &&
	    		(green < tempClr.g-light.value || green > tempClr.g+light.value) &&
	    		(blue < tempClr.b-light.value || blue > tempClr.b+light.value)) {
	    		
	    		sumX += x;
	  			sumY += y;
		    	sumnwp++;

		    	var clr = 'rgba('+ red + ',' + green + ',' + blue + ',' + alpha +')';
		    	store.push(new Particle(x, y, clr));
		    	store[sumnwp-1].draw();
	    	}
	    	if (red < 250 && green < 250 && blue < 250) {
	    		if(y > prevY) {prevY = y;}
	    	}
	 	}
	}
	
	/*=---draw----=*/
	s.circle(sumX/sumnwp, sumY/sumnwp, 7);
	s.fill('red');
	s.circle(sumX/sumnwp, sumY/sumnwp, 3);
	s.fill('white');

	
	s.line(sumX/sumnwp, sumY/sumnwp+3, sumX/sumnwp, prevY, 5);
	s.stroke('red');
}

getDimensions(parseInt(getComputedStyle(wrap).width)*scale, parseInt(getComputedStyle(wrap).height)*scale);

bgColr.onchange = () => {
	if(!img) return;
	
	showImage(img.width, img.height);
}
light.onchange = () => {
	if(!img) return;
	
	showImage(img.width, img.height);
}