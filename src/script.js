
let imageFile = document.querySelector('#image');
let dataUrl, reader = new FileReader(), img;
let wrap = document.querySelector(".wrap");
let scale = 80/100;

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}


imageFile.addEventListener('change', (e) => {
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
let s = new Shapes(ctx);
let colors, store=[];


function getDimensions(w, h, callback) {
	canvas.width = w;
	canvas.height = h;
	center = new Vector2D(canvas.width/2, canvas.height/2);

	if(callback) callback(w, h);
}

function showImage(w, h) {
	colors, store=[];
	let sumX=0, sumY=0, sumnwp=0;

	s.clear(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.drawImage(img, 0, 0, w, h);
	colors = ctx.getImageData(0, 0, w, h).data;
	
	for(var y = 0; y < h; y += 1) {
	  	for(var x = 0; x < w; x += 1) {

	  		let red = colors[((w * y) + x) * 4];
	    	let green = colors[((w * y) + x) * 4 + 1];
	    	let blue = colors[((w * y) + x) * 4 + 2];
	    	let alpha = colors[((w * y) + x) * 4 + 3];

	    	if (red < 250 && green < 250 && blue < 250) {
	    		sumX += x;
	  			sumY += y;
		    	sumnwp++;
	    	}
	 	}
	}
	
	/*=---draw----=*/
	s.circle(sumX/sumnwp, sumY/sumnwp, 5);
	s.fill('red');
	ctx.lineWidth = 5;
	s.line(sumX/sumnwp, sumY/sumnwp, sumX/sumnwp, sumY/sumnwp+canvas.height);
	s.stroke('red');
}

getDimensions(parseInt(getComputedStyle(wrap).width)*scale, parseInt(getComputedStyle(wrap).height)*scale);