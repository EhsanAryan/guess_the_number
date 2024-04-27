"use strict";

// variables
let userScore = 20;
let highScore = localStorage.getItem("guessGameHighScore") ? Number(localStorage.getItem("guessGameHighScore")) : 0;
let selectedNumber = (Math.round((Math.random() * 1024 * 2048)) % 20) + 1;

// elements
const againBtn = document.querySelector(".again-btn");
const submitBtn = document.querySelector(".submit-btn");
const numberInput = document.querySelector(".number-input");
const guidSpan = document.querySelector(".guid-span");
const scoreElement = document.querySelector(".score");
const highElement = document.querySelector(".high");

scoreElement.innerHTML = userScore;
highElement.innerHTML = highScore;


againBtn.addEventListener("click", () => {
    selectedNumber = (Math.round((Math.random() * 1024 * 2048)) % 20) + 1;
    document.body.style.backgroundColor = "#222";
    numberInput.value = "";
    numberInput.disabled = false;
    submitBtn.disabled = false;
    userScore = 20;
    scoreElement.innerHTML = 20;
    guidSpan.innerHTML = "Start guessing...";
    numberInput.focus();
});

submitBtn.addEventListener("click", () => {
    if (!numberInput.value) {
        guidSpan.innerHTML = "⛔ Enter a number!";
        return numberInput.focus();
    }
    const userNumber = Number(numberInput.value);
    if (userNumber < 1 || userNumber > 20) {
        guidSpan.innerHTML = "⛔ Consider the range!";
        return numberInput.focus();
    }
    if (userNumber === selectedNumber) {
        document.body.style.backgroundColor = "#1c1";
        guidSpan.innerHTML = "🎉 Correct!";
        numberInput.disabled = true;
        submitBtn.disabled = true;
        if (userScore > highScore) {
            highElement.innerHTML = userScore;
            highScore = userScore;
            localStorage.setItem("guessGameHighScore", highScore);
        }
    } else {
        scoreElement.innerHTML = --userScore;
        if (userScore === 0) {
            document.body.style.backgroundColor = "#c11";
            guidSpan.innerHTML = "🤯 You lost!";
            numberInput.disabled = true;
            submitBtn.disabled = true;
        } else {
            if (userNumber > selectedNumber) {
                if (userNumber - selectedNumber >= 5) {
                    guidSpan.innerHTML = "📈 Too high!";
                } else {
                    guidSpan.innerHTML = "📈 High!";
                }
            } else {
                if (selectedNumber - userNumber >= 5) {
                    guidSpan.innerHTML = "📉 Too low!";
                } else {
                    guidSpan.innerHTML = "📉 Low!";
                }
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