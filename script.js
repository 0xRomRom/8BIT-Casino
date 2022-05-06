"use strict";

const playerBalance = document.querySelector(".player-funds");
const gameBalance = document.querySelector(".game-balance");
const slotsTitle = document.querySelector(".slots-title");
const insertCredits = document.querySelector(".insert-credits");
const playButton = document.querySelector(".play-button");
const insertButton = document.querySelector(".insert-button");
const collectButton = document.querySelector(".collect-button");
const slot1 = document.querySelector(".slot-1");
const slot2 = document.querySelector(".slot-2");
const slot3 = document.querySelector(".slot-3");

//Logic
let funds = 100;
let inGameBalance = 0;

//
playerBalance.textContent = funds;
insertButton.addEventListener("click", () => {
  insertFunds();
});

//
gameBalance.textContent = inGameBalance;
collectButton.addEventListener("click", () => {
  collectFunds();
});

playButton.addEventListener("click", () => {
  playGame();
});

const insertFunds = () => {
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
};

const collectFunds = () => {
  funds += inGameBalance;
  inGameBalance = 0;
  gameBalance.textContent = inGameBalance;
  playerBalance.textContent = funds;
};

const playGame = () => {
  if (inGameBalance >= 1) {
    inGameBalance -= 1;
    insertCredits.classList.add("hidden");
    randomSpins();
  }
  gameBalance.textContent = inGameBalance;
};

const randomSpins = () => {
  const randomInt1 = Math.trunc(Math.random() * 16 + 1);
  const randomInt2 = Math.trunc(Math.random() * 16 + 1);
  const randomInt3 = Math.trunc(Math.random() * 16 + 1);
  console.log(randomInt1);
  console.log(randomInt2);
  console.log(randomInt3);
  slot1.src = `icons/${randomInt1}.png`;
  slot2.src = `icons/${randomInt2}.png`;
  slot3.src = `icons/${randomInt3}.png`;
};
