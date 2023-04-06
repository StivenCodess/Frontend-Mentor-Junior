const API_URL = "https://api.adviceslip.com/advice";
const button = document.querySelector(".button");
const id_advice = document.querySelector(".id__advice");
const advice_text = document.querySelector(".advice");
const spanish = document.querySelector(".spanish");
const english = document.querySelector(".english");

let language = "en";

const fetchNewAdvice = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();
	return data;
};

const fetchTranslate = async (text) => {
	const response = await fetch(
		`https://api.mymemory.translated.net/get?q=${text}&langpair=en|es`
	);
	const data = await response.json();
	return data.responseData.translatedText;
};

const renderAdvice = async (adviceObject) => {
	let { id, advice } = adviceObject;
	if (language === "es") {
		advice = await fetchTranslate(advice);
	}
	id_advice.innerHTML = id;
	advice_text.innerHTML = advice;
};

const getNewAdvice = async () => {
	const data = await fetchNewAdvice();
	const adviceObject = data.slip;
	renderAdvice(adviceObject);
};

const changeLanguage = (e) => {
	language = e.target.textContent;
	setClassLanguage(language);
};

const setClassLanguage = (language) => {
	if (language == "es") {
		spanish.classList.add("active");
		english.classList.remove("active");
		return;
	}
	spanish.classList.remove("active");
	english.classList.add("active");
};

window.addEventListener("DOMContentLoaded", () => {
	button.addEventListener("click", getNewAdvice);
	spanish.addEventListener("click", (e) => {
		changeLanguage(e);
	});
	english.addEventListener("click", (e) => {
		changeLanguage(e);
	});
});
