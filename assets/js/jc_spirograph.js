
const doc_R = document.getElementById('R');
const doc_r = document.getElementById('r');
const doc_O = document.getElementById('O');
const seed_button = document.getElementById('seed_button');
const draw_button = document.getElementById('draw_button');
const canvas = document.getElementById('plot');
const ctx = canvas.getContext('2d');

seed_button.addEventListener('click', seed);
draw_button.addEventListener('click', graph_spiro);

function seed() {
	doc_R.value = randomize(2, 100);
	doc_r.value = randomize(1, Number(doc_R.value) - 1);
	doc_O.value = randomize(1, Number(doc_r.value));
	graph_spiro();
}

function randomize(minimum, maximum) {
	const delta = maximum - minimum + 1;
	return Math.floor(Math.random() * delta) + minimum;
}


function graph_spiro() {
	const R = Number(doc_R.value);
	const r = Number(doc_r.value);
	const O = Number(doc_O.value);
	if(isNaN(R) || isNaN(r) || isNaN(O)) {
		alert("please enter only numbers for R, r, and O");
		return;
	}
	if((R < r) || (r < O) || (O < 1)) {
		alert("please ensure that R is greater than r, which should be greater than or equal to O, which should be greater than 0.");
		return;
	}
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	const usable_size = Math.min(canvas.width, canvas.height);
	const max_r_pen = (R - r) + O;
	const scale = usable_size / (2.1 * max_r_pen);
	const CR = 2 * Math.PI * R;
	const Cr = 2 * Math.PI * r;
	const max_t = CR * Cr;
	ctx.beginPath();
	let first_point = true;
	const step = 0.05;	
	for(let t = 0; t <= max_t; t += step) {
		const x = (R - r) * Math.cos(t) + O * Math.cos(((R - r) / r) * t);
		const y = (R - r) * Math.sin(t) - O * Math.sin(((R - r) / r) * t);
		const canvas_x = x * scale;
		const canvas_y = -y * scale;
		if(first_point) {
			ctx.moveTo(canvas_x, canvas_y);
			first_point = false;
		} else {
			ctx.lineTo(canvas_x, canvas_y);
		}
	}
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 0.8;
	ctx.stroke();
	ctx.restore();
}




