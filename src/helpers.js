export function createPuzzle() {
	let set = new Set();
	let arr = [];
	while (arr.length < 9) {
		let randomNum = Math.floor(Math.random() * 27);
		if (!set.has(randomNum)) {
			set.add(randomNum);
			arr.push(randomNum);
		}
	}
	return arr.map(num => num.toString(3).padStart(3, '0'));
}

export function checkSingleGuess(guess, puzzle, combo) {
	if (guess.length !== 3 || isNaN(parseInt(guess))) {
		return false;
	}
	if (guess[0] === guess[1] || guess[1] === guess[2] || guess[0] === guess[2]) {
		return false;
	}
	const guessCombo = getCombo(guess);

	for (let i = 0; i < guessCombo.length; i++) {
		if (combo.includes(guessCombo[i])) {
			return false;
		}
	}
	const selectedShapes = guess
		.split('')
		.map(char => puzzle[parseInt(char) - 1]);
	for (let i = 0; i < 3; i++) {
		if (
			!checkDigit(
				selectedShapes[0][i],
				selectedShapes[1][i],
				selectedShapes[2][i],
			)
		) {
			return false;
		}
	}
	return true;
}

function getCombo(guess) {
	let input = guess.split('');
	let ans = [];
	dfs(input, [], ans, new Set());
	return ans;
}

function dfs(input, combo, ans, record) {
	if (combo.length === input.length) {
		ans.push(combo.join(','));
		return;
	}
	for (let i = 0; i < input.length; i++) {
		if (!record.has(input[i])) {
			record.add(input[i]);
			combo.push(input[i]);
			dfs(input, combo, ans, record);
			combo.pop();
			record.delete(input[i]);
		}
	}
}

function checkDigit(d1, d2, d3) {
	if (d1 === d2 && d2 === d3) {
		return true;
	}
	if (d1 !== d2 && d2 !== d3 && d1 !== d3) {
		return true;
	}
	return false;
}

export function checkFinish(puzzle, guessNum) {
	const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const combos = getEveryCombo(input);
	let correctAnsNum = 0;
	for (let i = 0; i < combos.length; i++) {
		if (checkSingleGuess(combos[i], puzzle, [])) {
			console.log(combos[i]);
			correctAnsNum += 1;
		}
	}
	return correctAnsNum === guessNum;
}

function getEveryCombo(input) {
	let ans = [];
	dfs2(input, 0, [], ans, new Set());
	return ans;
}

function dfs2(input, index, combo, ans, record) {
	if (combo.length === 3) {
		ans.push(combo.join(''));
		return;
	}
	for (let i = index; i < input.length; i++) {
		if (!record.has(input[i])) {
			record.add(input[i]);
			combo.push(input[i]);
			dfs2(input, i + 1, combo, ans, record);
			combo.pop();
			record.delete(input[i]);
		}
	}
}
