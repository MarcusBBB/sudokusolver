solveSudoku = function () {
	sudokuGrid = getGrid();
	console.log(sudokuGrid);
	let solved = Solver.solveSudoku(sudokuGrid);
	Solver.printSudoku(solved);
	console.log(solved);
};

function getGrid() {
	let sudokuGrid = [[], [], [], [], [], [], [], [], []];
	let blockNum = 0;
	for (let block of grid.children) {
		let numInBlock = 0;
		for (let select_element of block.children) {
			let rowNumber = Math.floor(blockNum / 3) * 3 + Math.floor(numInBlock / 3);
			sudokuGrid[rowNumber].push(
				select_element.value == '' ? 0 : parseInt(select_element.value)
			);
			numInBlock++;
		}
		blockNum++;
	}
	return sudokuGrid;
}

const Solver = {
	getEmptyPlaces(sudoku) {
		let unfilledPositions = [];
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (sudoku[i][j] === 0) {
					unfilledPositions.push({
						y: i,
						x: j,
					});
				}
			}
		}
		return unfilledPositions;
	},
	printSudoku(sudoku) {
		console.log('\nSudoku:');
		if (sudoku !== undefined) {
			for (let row of sudoku) {
				console.log(row.join(' '));
			}
		} else {
			console.log('sudoku was undefined');
		}
	},
	solveSudoku(sudoku) {
		for (let y = 0; y < 9; y++) {
			for (let x = 0; x < 9; x++) {
				if (sudoku[y][x] === 0) {
					for (let num = 1; num <= 9; num++) {
						if (this.numPossible(sudoku, y, x, num)) {
							sudoku[y][x] = num;
							let newSudoku = this.solveSudoku(sudoku);
							if (newSudoku === undefined) {
								sudoku[y][x] = 0;
							} else {
								return newSudoku;
							}
						}
					}
					return undefined;
				}
			}
		}
		return sudoku;
	},

	numPossible(sudoku, y, x, num) {
		let kwadrantYstart = Math.floor(y / 3) * 3;
		let kwadrantXstart = Math.floor(x / 3) * 3;

		for (let yOrX = 0; yOrX < 9; yOrX++) {
			if (sudoku[yOrX][x] === num || sudoku[y][yOrX] === num) {
				return false;
			}
		}
		for (let kwadrantY = 0; kwadrantY < 3; kwadrantY++) {
			for (let kwadrantX = 0; kwadrantX < 3; kwadrantX++) {
				if (
					sudoku[kwadrantYstart + kwadrantY][kwadrantXstart + kwadrantX] === num
				) {
					return false;
				}
			}
		}
		return true;
	},

	sudokuSolver(sudoku) {
		let unfilledPositions = [];
		let length = sudoku.length;

		let verticalSudoku = [];
		for (let i = 0; i < length; i++) {
			let verticalRow = [];
			for (let j = 0; j < length; j++) {
				verticalRow.push(sudoku[j][i]);
				if (sudoku[i][j] === undefined) {
					let unfilledNum = unfilledPositions.length + 1;
					unfilledPositions.push({
						y: i,
						x: j,
						falseNums: [],
						number: unfilledNum,
					});
				}
			}
			verticalSudoku.push(verticalRow);
		}
		for (let i = 0; i < unfilledPositions.length; i++) {
			let falseNums = unfilledPositions[i].falseNums;
			let yRow = sudoku[unfilledPositions[i].y];
			let xRow = verticalSudoku[unfilledPositions[i].x];
			let newValue = this.GetFreeNumberFromMoreArrays(
				length,
				falseNums,
				yRow,
				xRow
			);
			if (newValue === undefined) {
				i -= 1;
				let valueGivenPreviousNum =
					sudoku[unfilledPositions[i].y][unfilledPositions[i].x];
				unfilledPositions[i].falseNums.push(valueGivenPreviousNum);
				i -= 1;
			} else {
				sudoku[unfilledPositions[i].y][unfilledPositions[i].x] = newValue;
			}
		}
		return sudoku;
	},
	returnSudoku2x2(sudoku) {
		return this.sudokuSolver(sudoku);
	},
	returnSudoku3x3(sudoku) {
		return this.sudokuSolver(sudoku);
	},
	GetFreeNumberFromMoreArrays(numberLength, ...arr) {
		let numberArr = [];
		for (let i = 1; i <= numberLength; i++) {
			numberArr.push(i);
		}
		arr.forEach((a) => {
			for (let v of a) {
				numberArr[v - 1] = 0;
			}
		});
		for (let i of numberArr) {
			if (i !== 0) {
				return i;
			}
		}
	},
};
