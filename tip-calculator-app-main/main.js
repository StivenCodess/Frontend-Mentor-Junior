const inputs = document.querySelectorAll("input");
const percentage_btns = document.querySelectorAll(".select__container__buttons button");
const number__people = document.querySelector(".number__people");
const reset_btn = document.getElementById("reset-button");
const total_span = document.getElementById("total");
const tip_amount_span = document.getElementById("tip-amount");
const values = {
	bill_value: 0,
	number_people: 0,
	percentage: 0,
};

const inputsValueHandle = (name, value) => {
	if (name === "percentage") disableButtons();
	if (!(value === "")) {
		values[name] = value;
		calculateTipAmount();
	}
};

const setListenerInputs = () => {
	inputs.forEach((input) => {
		input.addEventListener("keyup", (e) => {
			inputsValueHandle(e.target.name, e.target.value);
		});
	});
};
const disableButtons = (button = null) => {
	percentage_btns.forEach((btn) => {
		if (btn === button) {
			btn.disabled = true;
		} else {
			btn.disabled = false;
		}
	});
};
const percentageBtnsHandler = (button, percentage) => {
	disableButtons(button);
	values.percentage = percentage;
	calculateTipAmount();
};

const setListenerPerButtons = () => {
	percentage_btns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			percentageBtnsHandler(btn, e.target.textContent.replace("%", ""));
		});
	});
};

const renderAmount = (total, tipAmount) => {
	if (!isNaN(total, tipAmount) && isFinite(total, tipAmount)) {
		total_span.innerHTML = `$${total.toFixed(2)}`;
		tip_amount_span.textContent = `$${tipAmount.toFixed(2)}`;
	}
};

const caculateTotal = (amountPerson, tipAmount) => {
	let total = amountPerson + tipAmount;
	renderAmount(total, tipAmount);
};

const calculateTipAmount = () => {
	if (values.number_people === 0) number__people.classList.add("error");
	else number__people.classList.remove("error");

	const { bill_value, number_people, custom_percentage, percentage } = values;

	let amountPerson = bill_value / number_people;
	let tipAmount = (amountPerson * percentage) / 100;

	caculateTotal(amountPerson, tipAmount);
};

window.addEventListener("DOMContentLoaded", () => {
	setListenerInputs();
	setListenerPerButtons();
	reset_btn.addEventListener("click", () => {
		location.reload();
	});
});
