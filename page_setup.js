let block = document.createElement('div');
block.classList.add('grid');
block.classList.add('1');
for (let i = 0; i < 9; i++) {
	let number = document.createElement('input');
	number.setAttribute('type', 'number');
	number.setAttribute('min', '1');
	number.setAttribute('max', '9');
	block.appendChild(number);
}
let grid = document.getElementById('sudokugrid');
grid.append(block);
