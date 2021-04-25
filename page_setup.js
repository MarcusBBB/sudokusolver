let grid = document.getElementById('sudokugrid');

function create_element(
	parent,
	type,
	classNames = null,
	id = null,
	attributes = null,
	innertext = '',
	children
) {
	let new_element = document.createElement(type);
	if (classNames) {
		for (let className of classNames) {
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
	if (children) {
		for (child of children) {
			create_element(
				new_element,
				child.type,
				child.classNames,
				child.id,
				child.attributes,
				child.innertext,
				child.children
			);
		}
	}
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

let option_elements = [
	return_child_element_setup('option', null, null, { value: '' }, '', []),
];

for (let j = 1; j <= 9; j++) {
	option_elements.push(
		return_child_element_setup('option', null, null, { value: j }, j, [])
	);
}

for (let h = 0; h < 9; h++) {
	let select_elements = [];
	for (let i = 0; i < 9; i++) {
		select_elements.push(
			return_child_element_setup(
				'select',
				[`block_${h}`, `block_number_${i}`],
				`block_${h}block_number_${i}`,
				{ name: 'numbers' },
				'',
				option_elements
			)
		);
	}
	create_element(
		grid,
		'div',
		['grid', `block_${h}`, h % 2 == 0 ? 'grey' : 'white'],
		null,
		null,
		'',
		select_elements
	);
}
