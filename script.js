"use strict";

const playerFunds = document.querySelector(".player-funds");
const gameBalance = document.querySelector(".game-balance");
const slotsTitle = document.querySelector(".slots-title");
const winText = document.querySelector(".win");
const winAmount = document.querySelector(".win-amount");
const addCredit = document.querySelector(".add-credit");
const insertCredits = document.querySelector(".start-title");
const playButton = document.querySelector(".play-button");
const insertButton = document.querySelector(".insert-button");
const collectButton = document.querySelector(".collect-button");
const slot1 = document.querySelector(".slot-1");
const slot2 = document.querySelector(".slot-2");
const slot3 = document.querySelector(".slot-3");

//Logic
let funds = 100;
let inGameBalance = 0;
let winBalance = 0;
//
playerFunds.textContent = funds;
insertButton.addEventListener("click", () => {
  insertFunds();
  creditsAdded();
});

//
gameBalance.textContent = inGameBalance;
collectButton.addEventListener("click", () => {
  collectFunds();
  zeroFunds();
});

playButton.addEventListener("click", () => {
  playGame();
  zeroFunds();
  winLine();
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
    playerFunds.textContent = funds;
  }
  playerFunds.textContent = funds;
  gameBalance.textContent = inGameBalance;
};

const collectFunds = () => {
  funds += inGameBalance;
  inGameBalance = 0;
  gameBalance.textContent = inGameBalance;
  playerFunds.textContent = funds;
};

const playGame = () => {
  if (inGameBalance >= 1) {
    inGameBalance -= 1;
    insertCredits.classList.add("hidden");
    randomSpins();
  }
  gameBalance.textContent = inGameBalance;
};

const zeroFunds = () => {
  if (inGameBalance === 0) {
    if (insertCredits.classList.contains("hidden")) {
      addCredit.classList.remove("hidden");
    }
  }
};

const creditsAdded = () => {
  if (inGameBalance > 0) {
    addCredit.classList.add("hidden");
  }
};

const randomSpins = () => {
  const int1 = Math.trunc(Math.random() * 16 + 1);
  const int2 = Math.trunc(Math.random() * 16 + 1);
  const int3 = Math.trunc(Math.random() * 16 + 1);
  slot1.src = `icons/${int1}.png`;
  slot2.src = `icons/${int2}.png`;
  slot3.src = `icons/${int3}.png`;

  const winLine = () => {
    if (inGameBalance >= 0) {
      if (int1 === 1 && int2 === 1) {
        winBalance += 555;
        inGameBalance += winBalance;
        winAmount.textContent = winBalance;
        winText.classList.remove("hidden");
        winAmount.classList.remove("hidden");
        // playButton.disabled = true;
      }
    }
  };
  winLine();
};

// const winLine = () => {
//   if (inGameBalance >= 0) {
//     const randomSpins = () => {
//       const int1 = Math.trunc(Math.random() * 16 + 1);
//       const int2 = Math.trunc(Math.random() * 16 + 1);
//       const int3 = Math.trunc(Math.random() * 16 + 1);
//       slot1.src = `icons/${int1}.png`;
//       slot2.src = `icons/${int2}.png`;
//       slot3.src = `icons/${int3}.png`;
//       if (int1 === 1 && int2 === 1) {
//         winBalance += 555;
//         inGameBalance += winBalance;
//         winAmount.textContent = winBalance;
//         winText.classList.remove("hidden");
//         winAmount.classList.remove("hidden");
//         // playButton.disabled = true;
//       }
//     };
//     randomSpins();
//   }
// };
