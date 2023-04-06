const API_URL = "https://api.adviceslip.com/advice";
const button = document.querySelector(".button");
const id_advice = document.querySelector(".id__advice");
const advice_text = document.querySelector(".advice");

const fetchNewAdvice = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();
	return data;
};

const renderAdvice = (adviceObject) => {
	const { id, advice } = adviceObject;
	id_advice.innerHTML = id;
	advice_text.innerHTML = advice;
};

const getNewAdvice = async () => {
	const data = await fetchNewAdvice();
	const adviceObject = data.slip;
	renderAdvice(adviceObject);
};

window.addEventListener("DOMContentLoaded", () => {
	button.addEventListener("click", getNewAdvice);
});
