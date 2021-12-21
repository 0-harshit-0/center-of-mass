/* ------------ https://github.com/0-harshit-0/Utility-HTML5Canvas ------------------- */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

class Vector2D {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}
class Shapes {
	constructor(context) {
		this.c = context;
		//console.log('working');

		//ctx.lineCap = 'round';
	}
	fill(clr) {
		this.c.fillStyle = clr;
		this.c.fill();
	}
	stroke(clr) {
		this.c.strokeStyle = clr;
		this.c.stroke();
	}
	clear(x=0,y=0,w=10,h=10) {
		this.c.clearRect(x,y,w,h);
	}
	//storke and fill
	line(a=0, b=0, c=10, d=10, w=2) {
		this.c.beginPath();
		this.c.lineWidth = w;
		this.c.moveTo(a, b);
		this.c.lineTo(c, d);
		//this.c.closePath();
	}
	circle(x=0, y=0, r=10) {
		this.c.beginPath();
		this.c.arc(x, y, r, 0, Math.PI*2, false);
		//this.c.closePath();
	}
	box(x=0, y=0, w=10, h=10) {
		this.c.beginPath();
		this.c.rect(x, y, w, h);
		//this.c.closePath();
	}
}
