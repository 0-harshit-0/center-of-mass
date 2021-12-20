let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let s = new Shapes(ctx);
let timeout = false;
function getDimensions() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
}
getDimensions();
addEventListener('resize', function(e) {//debounce
	clearTimeout(timeout);
	timeout = setTimeout(getDimensions, 500);
});

const container = document.querySelector('#container');
const download = document.querySelector('#download');
let imageFile = document.querySelector('#image');
var dataUrl, reader = new FileReader();

imageFile.addEventListener('change', (e) => {
	reader.readAsDataURL(imageFile.files[0]);
});
reader.onload = (event) => {
	dataUrl = event.target.result;
	img.src = dataUrl;
};


