//Functions
const refreshPassword = () => {
	const password = generate(getOptionsObject())
	document.getElementById("inputPassword").value = password
}

const getOptionsObject = () => {
	const options = {
		length: document.getElementById("numLength").value,
		//Uppercase
		upper: document.getElementById("checkUpper").checked,
		numUpper: numUpper = document.getElementById("numUpper").value,
		validUpper: document.getElementById("inputUpper").value,
		//Lowercase
		lower: document.getElementById("checkLower").checked,
		numLower: document.getElementById("numLower").value,
		validLower: document.getElementById("inputLower").value,
		//Numerics
		nums: document.getElementById("checkNums").checked,
		numNums: document.getElementById("numNums").value,
		validNums: document.getElementById("inputNums").value,
		//Special
		special: document.getElementById("checkSpecials").checked,
		numSpecial: document.getElementById("numSpecials").value,
		validSpecial: document.getElementById("inputSpecials").value,
	}
	
	return options;
}

const generate = (options) => {
	const {
		length = 12,
		upper = true,
		numUpper = 2,
		validUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		lower = true,
		numLower = 2,
		validLower = "abcdefghijklmnopqrstuvwxyz",
		nums = true,
		numNums = 2,
		validNums = "1234567890",
		special = true,
		numSpecial = 2,
		validSpecial = "~!@#$%^&*?",
	} = options;

	let validAll = ""
	if (upper) validAll = validAll.concat(validUpper);
	if (lower) validAll = validAll.concat(validLower);
	if (nums) validAll = validAll.concat(validNums);
	if (special) validAll = validAll.concat(validSpecial);

	let countUpper = numUpper;
	let countLower = numLower;
	let countNums = numNums;
	let countSpecial = numSpecial;

	const passwordArr = [];

	const rand = (validArr) => {
		return validArr.charAt(Math.floor(Math.random() * validArr.length));
	}

	for (var i = 0; i < length; i++) {
		if (upper && countUpper > 0) {
			const char = rand(validUpper)
			passwordArr.push(char)
			countUpper--
		} else if (lower && countLower > 0) {
			const char = rand(validLower)
			passwordArr.push(char)
			countLower--
		} else if (nums && countNums > 0) {
			const char = rand(validNums)
			passwordArr.push(char)
			countNums--
		} else if (special && countSpecial > 0) {
			const char = rand(validSpecial)
			passwordArr.push(char)
			countSpecial--
		} else {
			const char = rand(validAll)
			passwordArr.push(char)
		}
	}

	return passwordArr.sort(() => {return 0.5-Math.random()}).join("").toString();
	
}


//Listeners
document.getElementById("buttonRefresh").addEventListener("click", refreshPassword)