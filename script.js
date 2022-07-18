//Functions
const refreshPassword = () => {
	const options = getOptionsObject()
	setCookie(options);
	const password = generate(options)
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
		//Dark Mode
		dark: document.getElementById("checkDark").checked,
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

const setCookie = (options) => {
	const date = new Date()
		  date.setTime(2147483647 * 1000)
	const expiresString = `expires=${date.toUTCString()}`

	document.cookie = `numLength=${options.length}; ${expiresString};`

	document.cookie = `checkUpper=${options.upper};${expiresString};`
	document.cookie = `numUpper=${options.numUpper};${expiresString};`
	document.cookie = `inputUpper=${options.validUpper};${expiresString};`

	document.cookie = `checkLower=${options.lower};${expiresString};`
	document.cookie = `numLower=${options.numLower};${expiresString};`
	document.cookie = `inputLower=${options.validLower};${expiresString};`

	document.cookie = `checkNums=${options.nums};${expiresString};`
	document.cookie = `numNums=${options.numNums};${expiresString};`
	document.cookie = `inputNums=${options.validNums};${expiresString};`

	document.cookie = `checkSpecials=${options.special};${expiresString};`
	document.cookie = `numSpecials=${options.numSpecial};${expiresString};`
	document.cookie = `inputSpecials=${options.validSpecial};${expiresString};`

	document.cookie = `checkDark=${options.dark};${expiresString};`
}

const getCookie = () => {
	const cookieArr = document.cookie.split(";")
	if (cookieArr[0] === '') return;

	for (var i = cookieArr.length - 1; i >= 0; i--) {
		const cookie = cookieArr[i].split("=")
		const name = cookie[0].trim()
		const value = cookie[1].trim()
		if (name.startsWith("check")) {
			const bool = value === "true" ? true : false
			document.getElementById(name).checked = bool
		} else {
			document.getElementById(name).value = value
		}
	}
}

const updateTheme = () => {
	const dark = document.getElementById("checkDark").checked
	const elements = document.getElementsByTagName("*")

	if (dark) {
		for (var i = elements.length - 1; i >= 0; i--) {
			if (!elements[i].classList.contains("dark"))
				elements[i].classList.add("dark")
		}
	} else {
		for (var i = elements.length - 1; i >= 0; i--) {
			elements[i].classList.remove("dark")
		}
	}
}

//Listeners
document.getElementById("buttonRefresh").addEventListener("click", refreshPassword)
document.getElementById("checkDark").addEventListener("change", updateTheme)
window.addEventListener("load", getCookie)
window.addEventListener("load", refreshPassword)
window.addEventListener("load", updateTheme)