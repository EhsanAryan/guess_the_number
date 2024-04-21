"use strict";

const againBtn = document.querySelector(".again-btn");
const submitBtn = document.querySelector(".submit-btn");
const numberInput = document.querySelector(".number-input");
const guidSpan = document.querySelector(".guid-span");
const scoreElement = document.querySelector(".score");
const hightElement = document.querySelector(".high");

let selectedNumber = (Math.round((Math.random() * 1024 * 2048)) % 20) + 1;

againBtn.addEventListener("click", () => {
    selectedNumber = (Math.round((Math.random() * 1024 * 2048)) % 20) + 1;
    document.body.style.backgroundColor = "#222";
    numberInput.value = "";
    numberInput.disabled = false;
    submitBtn.disabled = false;
    scoreElement.innerHTML = 20;
    guidSpan.innerHTML = "Start guessing...";
    numberInput.focus();
});

submitBtn.addEventListener("click", () => {
    if (!numberInput.value.length) {
        guidSpan.innerHTML = "Enter a number!";
        return numberInput.focus();
    }
    const userNumber = Number(numberInput.value);
    if (userNumber < 1 || userNumber > 20) {
        guidSpan.innerHTML = "Consider the range!";
        return numberInput.focus();
    }
    if (userNumber === selectedNumber) {
        document.body.style.backgroundColor = "#1c1";
        guidSpan.innerHTML = "Correct!";
        numberInput.disabled = true;
        submitBtn.disabled = true;
        if (Number(scoreElement.innerHTML) > Number(hightElement.innerHTML)) {
            hightElement.innerHTML = Number(scoreElement.innerHTML);
        }
    } else {
        scoreElement.innerHTML = Number(scoreElement.innerHTML) - 1;
        if (userNumber > selectedNumber) {
            if (userNumber - selectedNumber >= 5) {
                guidSpan.innerHTML = "Too high!";
            } else {
                guidSpan.innerHTML = "High!";
            }
        } else {
            if (selectedNumber - userNumber >= 5) {
                guidSpan.innerHTML = "Too low!";
            } else {
                guidSpan.innerHTML = "Low!";
            }
        }
    }
    numberInput.focus();
});

numberInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") submitBtn.click();
});

document.body.addEventListener("keydown", (ev) => {
    if (ev.key.toLocaleLowerCase() === "r") againBtn.click();
});