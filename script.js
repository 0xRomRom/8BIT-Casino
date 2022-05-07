"use strict";

const playerFunds = document.querySelector(".player-funds");
const gameBalance = document.querySelector(".game-balance");
const highscoreBalance = document.querySelector(".highscore-balance");
const newHighscore = document.querySelector(".new-highscore");
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
let highScore = 100;
let tempHighscore = highScore;

const saveToLocalStorage = () => {
  localStorage.setItem("highscore", tempHighscore);
};
let storedInput = localStorage.getItem("highscore");
console.log(storedInput);

//
highscoreBalance.textContent = storedInput;
playerFunds.textContent = funds;
gameBalance.textContent = inGameBalance;
//

insertButton.addEventListener("click", () => {
  insertFunds();
  creditsAdded();
});

collectButton.addEventListener("click", () => {
  collectFunds();
  zeroFunds();
  updateHighscore();
  if (highScore > tempHighscore) {
    saveToLocalStorage();
  }
});

playButton.addEventListener("click", () => {
  playGame();
  zeroFunds();
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
  collectButton.disabled = false;
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
  collectButton.disabled = false;
  if (inGameBalance > 0) {
    addCredit.classList.add("hidden");
  }
};

const winLine1 = () => {
  slot1.classList.add("box-flashing");
};
const winLine2 = () => {
  slot2.classList.add("box-flashing");
};
const winLine3 = () => {
  slot3.classList.add("box-flashing");
};

const priceWin = () => {
  inGameBalance += winBalance;
  winAmount.textContent = winBalance;
  winText.classList.remove("hidden");
  winText.classList.add("flashing");
  winAmount.classList.remove("hidden");
  winAmount.classList.add("flashing");
  winBalance = 0;
  setTimeout(() => {
    winText.classList.add("hidden");
    winAmount.classList.add("hidden");
    playButton.disabled = false;
    slot1.classList.remove("box-flashing");
    slot2.classList.remove("box-flashing");
    slot3.classList.remove("box-flashing");
  }, 2000);
};

const updateHighscore = () => {
  collectButton.disabled = true;
  if (funds > tempHighscore) {
    if (tempHighscore > +storedInput) {
      tempHighscore = funds;
      highscoreBalance.textContent = funds;
      newHighscore.classList.remove("hidden");
      setTimeout(() => {
        newHighscore.classList.add("hidden");
      }, 1500);
    }
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
      //Win Combination 1
      if (int1 === 1 && int2 === 1) {
        playButton.disabled = true;
        winBalance += 5;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 1 && int2 === 1 && int3 === 1) {
        playButton.disabled = true;
        winBalance += 20;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 2
      if (int1 === 2 && int2 === 2) {
        playButton.disabled = true;
        winBalance += 8;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 2 && int2 === 2 && int3 === 2) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 3
      if (int1 === 3 && int2 === 3) {
        playButton.disabled = true;
        winBalance += 10;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 3 && int2 === 3 && int3 === 3) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 4
      if (int1 === 4 && int2 === 4) {
        playButton.disabled = true;
        winBalance += 8;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 4 && int2 === 4 && int3 === 4) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 5
      if (int1 === 5 && int2 === 5) {
        playButton.disabled = true;
        winBalance += 15;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 5 && int2 === 5 && int3 === 5) {
        playButton.disabled = true;
        winBalance += 50;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 6
      if (int1 === 6 && int2 === 6) {
        playButton.disabled = true;
        winBalance += 8;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 6 && int2 === 6 && int3 === 6) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 7
      if (int1 === 7 && int2 === 7) {
        playButton.disabled = true;
        winBalance += 8;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 7 && int2 === 7 && int3 === 7) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 8
      if (int1 === 8 && int2 === 8) {
        playButton.disabled = true;
        winBalance += 8;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 8 && int2 === 8 && int3 === 8) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 9
      if (int1 === 9 && int2 === 9) {
        playButton.disabled = true;
        winBalance += 5;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 9 && int2 === 9 && int3 === 9) {
        playButton.disabled = true;
        winBalance += 20;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 10
      if (int1 === 10 && int2 === 10) {
        playButton.disabled = true;
        winBalance += 13;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 10 && int2 === 10 && int3 === 10) {
        playButton.disabled = true;
        winBalance += 33;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 11
      if (int1 === 11 && int2 === 11) {
        playButton.disabled = true;
        winBalance += 15;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 11 && int2 === 11 && int3 === 11) {
        playButton.disabled = true;
        winBalance += 55;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 12
      if (int1 === 12 && int2 === 12) {
        playButton.disabled = true;
        winBalance += 17;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 12 && int2 === 12 && int3 === 12) {
        playButton.disabled = true;
        winBalance += 77;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 13
      if (int1 === 13 && int2 === 13) {
        playButton.disabled = true;
        winBalance += 15;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 13 && int2 === 13 && int3 === 13) {
        playButton.disabled = true;
        winBalance += 50;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 14
      if (int1 === 14 && int2 === 14) {
        playButton.disabled = true;
        winBalance += 25;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 14 && int2 === 14 && int3 === 14) {
        playButton.disabled = true;
        winBalance += 100;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 15
      if (int1 === 15 && int2 === 15) {
        playButton.disabled = true;
        winBalance += 15;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 15 && int2 === 15 && int3 === 15) {
        playButton.disabled = true;
        winBalance += 75;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
      //Win Combination 16
      if (int1 === 16 && int2 === 16) {
        playButton.disabled = true;
        winBalance += 10;
        priceWin();
        winLine1();
        winLine2();
      }
      if (int1 === 16 && int2 === 16 && int3 === 16) {
        playButton.disabled = true;
        winBalance += 50;
        priceWin();
        winLine1();
        winLine2();
        winLine3();
      }
    }
  };

  winLine();
};
