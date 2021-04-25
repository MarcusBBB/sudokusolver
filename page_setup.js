let grid = document.getElementById('sudokugrid');

function create_element(
	parent,
	type,
	classNames = null,
	id = null,
	attributes = null,
	innertext = ''
) {
	let new_element = document.createElement(type);
	if (classNames) {
		for (let className in classNames) {
			new_element.classList.add(className);
		}
	}
	if (attributes) {
		for (let attribute_type in attributes) {
			new_element.setAttribute(attribute_type, attributes[attribute_type]);
		}
	}
	if (id) {
		new_element.id = id;
	}
	new_element.innerText = innertext;

	parent.appendChild(new_element);
}

function return_child_element_setup(
	type,
	classNames,
	id,
	attributes,
	innertext,
	children
) {
	return {
		type,
		classNames,
		id,
		attributes,
		innertext,
		children,
	};
}

let select_elements = [
	return_child_element_setup('option', null, null, { value: '' }, '', []),
];
for (let j = 1; j <= 9; j++) {
	select_elements.push(
		return_child_element_setup('option', null, null, { value: j }, j, [])
	);
}

for (let h = 0; h < 9; h++) {
	let block = document.createElement('div');
	block.classList.add('grid');
	block.classList.add('block_' + h);
	if (h % 2 == 0) {
		//select.style.backgroundColor('grey');
		block.classList.add('grey');
	}
	for (let i = 0; i < 9; i++) {
		let select = document.createElement('select');
		select.id = `block_${h}block_number_${i}`;
		select.setAttribute('name', 'numbers');
		select.classList.add(`block_${h}`);
		select.classList.add(`block_number_${i}`);
		console.log(select_elements);
		for (element_setup of select_elements) {
			console.log(element_setup);
			create_element(
				select,
				element_setup.type,
				element_setup.classNames,
				element_setup.id,
				element_setup.attributes,
				element_setup.innertext
			);
		}
		/* create_element(select, 'option', null, null, { value: '' }, '');
		for (let j = 1; j <= 9; j++) {
			create_element(select, 'option', null, null, { value: j }, j);
		} */

		block.appendChild(select);
	}

	grid.append(block);
}

/*  */
