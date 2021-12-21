/* ------------ https://github.com/0-harshit-0/Utility-HTML5Canvas ------------------- */

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
}
