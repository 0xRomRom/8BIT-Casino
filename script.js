"use strict";

const playerBalance = document.querySelector(".player-funds");
const gameBalance = document.querySelector(".game-balance");
const slotsTitle = document.querySelector(".slots-title");
const insertCredits = document.querySelector(".insert-credits");
const playButton = document.querySelector(".play-button");
const insertButton = document.querySelector(".insert-button");
const collectButton = document.querySelector(".collect-button");

//Logic
let funds = 100;
let inGameBalance = 0;

//
playerBalance.textContent = funds;
insertButton.addEventListener("click", () => {
  if (funds >= 10) {
    funds -= 10;
    inGameBalance += 10;
  }
  if (funds < 10 && funds > 0) {
    inGameBalance += funds;
    funds = 0;
    gameBalance.textContent = inGameBalance;
    playerBalance.textContent = funds;
  }
  playerBalance.textContent = funds;
  gameBalance.textContent = inGameBalance;
});

//
gameBalance.textContent = inGameBalance;
collectButton.addEventListener("click", () => {
  funds += inGameBalance;
  inGameBalance = 0;
  gameBalance.textContent = inGameBalance;
  playerBalance.textContent = funds;
});

playButton.addEventListener("click", () => {
  if (inGameBalance >= 1) {
    inGameBalance -= 1;
    insertCredits.classList.add("hidden");
  }

  gameBalance.textContent = inGameBalance;
});
