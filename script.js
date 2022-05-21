"use strict";

const playerFunds = document.querySelector(".player-funds");
const gameBalance = document.querySelector(".game-balance");
const highscoreBalance = document.querySelector(".highscore-balance");
const newHighscore = document.querySelector(".new-highscore");
const slotsTitle = document.querySelector(".slots-title");
const tokenTopUp = document.querySelector(".token-topup");
const winText = document.querySelector(".win");
const winAmount = document.querySelector(".win-amount");
const addCredit = document.querySelector(".add-credit");
const bonusGameText = document.querySelector(".bonusgame");
const insertCredits = document.querySelector(".start-title");
const playButton = document.querySelector(".play-button");
const resetHiscore = document.querySelector(".reset-hiscore");
const settingsButton = document.querySelector(".fa-gear");
const settingsModal = document.querySelector(".settings-modal");
const insertButton = document.querySelector(".insert-button");
const collectButton = document.querySelector(".collect-button");
const slot1 = document.querySelector(".slot-1");
const slot2 = document.querySelector(".slot-2");
const slot3 = document.querySelector(".slot-3");
const confirmButton = document.querySelector(".confirm-button");
const cancelButton = document.querySelector(".cancel-button");
const hiScoreResetModal = document.querySelector(".confirm-reset-hiscore");
const bonusWindow = document.querySelector(".bonus-window");
const bonusWindow2 = document.querySelector(".bonus-window2");
const bonusWinTitle = document.querySelector(".bonus-win-title");
const bonusWinSubTitle = document.querySelector(".bonus-win-subtitle");
const questionMark = document.querySelector(".question-mark");
const checkPrize = document.querySelector(".check-prize");
const bonusPrize = document.querySelector(".bonus-prize");
const rotate = document.querySelector(".rotate");
const opacityScaleDown = document.querySelector(".opacity-scale-down");
const jackpotWinValue = document.querySelector(".jackpot-win-value");
const takeWinnings = document.querySelector(".take-winnings");
const orGamble = document.querySelector(".or-gamble");
const round1 = document.querySelector(".round1");
const takeWin = document.querySelector(".take-win");
const letsGamble = document.querySelector(".lets-gamble");

//Logic
let jackpot = 0;
let funds = 100;
let bonusBalance = 0;
let inGameBalance = 0;
let winBalance = 0;
let highScore = 100;
let tempHighscore = highScore;

//Save Highscores
const saveToLocalStorage = () => {
  localStorage.setItem("highscore", tempHighscore);
};
let storedInput = localStorage.getItem("highscore");

window.addEventListener("load", () => {
  highscoreBalance.textContent = storedInput;
  tempHighscore = storedInput;
});

// Render Inputs
highscoreBalance.textContent = storedInput;
playerFunds.textContent = funds;
gameBalance.textContent = inGameBalance;
tokenTopUp.disabled = true;

//

// Action buttons
insertButton.addEventListener("click", () => {
  insertFunds();
  creditsAdded();
});

collectButton.addEventListener("click", () => {
  collectFunds();
  zeroFunds();
  updateHighscore();
  if (tempHighscore > +storedInput) {
    saveToLocalStorage();
  }
});

playButton.addEventListener("click", () => {
  playGame();
  zeroFunds();
  newFunds();
});

tokenTopUp.addEventListener("click", () => {
  tokenTopUp.classList.add("hidden");
  tokenTopUp.disabled = true;
  funds += 100;
  playerFunds.textContent = funds;
});

settingsButton.addEventListener("click", () => {
  settingsModal.classList.toggle("hidden");
  if ((hiScoreResetModal.style.display = "initial")) {
    hiScoreResetModal.style.display = "none";
  }
});

resetHiscore.addEventListener("click", () => {
  hiScoreResetModal.style.display = "initial";
});

cancelButton.addEventListener("click", () => {
  hiScoreResetModal.style.display = "none";
});

confirmButton.addEventListener("click", () => {
  tempHighscore = 0;
  highscoreBalance.textContent = "";
  hiScoreResetModal.style.display = "none";
  settingsModal.classList.add("hidden");
  window.localStorage.removeItem("highscore");
});

// Functions

const newFunds = () => {
  if (inGameBalance === 0 && funds === 0) {
    tokenTopUp.disabled = false;
    tokenTopUp.classList.remove("hidden");
  }
};

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

// Slot win decoration

const winLine1 = () => {
  slot1.classList.add("box-flashing");
};
const winLine2 = () => {
  slot2.classList.add("box-flashing");
};
const winLine3 = () => {
  slot3.classList.add("box-flashing");
};

(function () {
  setInterval(function () {
    const randomNum1 = Math.trunc(Math.random() * 255 + 1);
    const randomNum2 = Math.trunc(Math.random() * 255 + 1);
    const randomNum3 = Math.trunc(Math.random() * 255 + 1);
    questionMark.style.color = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;
  }, 1000);
})();

// Wins

const priceWin = () => {
  inGameBalance += winBalance;
  winAmount.textContent = winBalance;
  winText.classList.remove("hidden");
  winAmount.classList.remove("hidden");
  winAmount.classList.add("flashing");
  winText.classList.add("flashing");
  winBalance = 0;
  setTimeout(() => {
    winText.classList.add("hidden");
    winAmount.classList.add("hidden");
    playButton.disabled = false;
    slot1.classList.remove("box-flashing");
    slot2.classList.remove("box-flashing");
    slot3.classList.remove("box-flashing");
  }, 1500);
};

const bonusWin = () => {
  bonusGameText.classList.remove("hidden");
  bonusGameText.classList.add("bonus-flashing");
  playButton.disabled = true;
  insertButton.disabled = true;
  collectButton.disabled = true;
  setTimeout(() => {
    bonusWindow.classList.remove("hidden");
  }, 5000);
  setTimeout(() => {
    bonusWinTitle.classList.remove("hidden");
  }, 6500);
  setTimeout(() => {
    bonusWinSubTitle.classList.remove("hidden");
  }, 9000);
  setTimeout(() => {
    questionMark.classList.remove("hidden");
    checkPrize.classList.remove("hidden");
  }, 12500);
};

function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

questionMark.addEventListener("click", () => {
  questionMark.disabled = true;
  let randomInt = 0;
  const bonusOutcome = getRandomArbitrary(100, 350);
  randomInt = bonusOutcome;
  bonusPrize.insertAdjacentHTML("afterbegin", randomInt);
  jackpot = randomInt;
  jackpotWinValue.insertAdjacentHTML("afterbegin", jackpot);
  questionMark.classList.add("rotate");
  takeWin.value = `Take ${jackpot}`;
  setTimeout(() => {
    questionMark.style.opacity = "0.8";
  }, 300);
  setTimeout(() => {
    questionMark.style.opacity = "0.6";
  }, 600);
  setTimeout(() => {
    questionMark.style.opacity = "0.4";
  }, 900);
  setTimeout(() => {
    questionMark.style.opacity = "0.2";
  }, 1200);
  setTimeout(() => {
    questionMark.style.opacity = "0.01";
  }, 1500);
  setTimeout(() => {
    questionMark.classList.add("hidden");
  }, 1600);
  setTimeout(() => {
    bonusPrize.classList.remove("hidden");
  }, 2750);
  setTimeout(() => {
    bonusWindow.classList.add("hidden");
    bonusWindow2.classList.remove("hidden");
  }, 6000);
  setTimeout(() => {
    round1.classList.remove("hidden");
  }, 8000);
  setTimeout(() => {
    takeWinnings.classList.remove("hidden");
    orGamble.classList.remove("hidden");
  }, 12000);
  setTimeout(() => {
    takeWin.classList.remove("hidden");
    letsGamble.classList.remove("hidden");
  }, 15000);
});

//Hi-score

const updateHighscore = () => {
  collectButton.disabled = true;
  if (funds > highScore) {
    if (funds > tempHighscore) {
      tempHighscore = funds;
      highscoreBalance.textContent = funds;
      newHighscore.classList.remove("hidden");
      newHighscore.classList.add("highscore-animation");
      setTimeout(() => {
        newHighscore.classList.add("hidden");
        newHighscore.classList.remove("highscore-animation");
      }, 1500);
    }
  }
};

// Win Logic

const randomSpins = () => {
  // const int1 = 17;
  // const int2 = 17;
  // // const int3 = 17;
  const int1 = Math.trunc(Math.random() * 17 + 1);
  const int2 = Math.trunc(Math.random() * 17 + 1);
  const int3 = Math.trunc(Math.random() * 17 + 1);
  slot1.src = `icons/${int1}.png`;
  slot2.src = `icons/${int2}.png`;
  slot3.src = `icons/${int3}.png`;

  const winLine = () => {
    // if (inGameBalance >= 0) {
    //Win Combination 1
    if (int1 === 1 && int2 === 1 && int3 === 1) {
      playButton.disabled = true;
      winBalance += 20;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 1 && int2 === 1) {
      playButton.disabled = true;
      winBalance += 5;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 2
    if (int1 === 2 && int2 === 2 && int3 === 2) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 2 && int2 === 2) {
      playButton.disabled = true;
      winBalance += 8;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 3
    if (int1 === 3 && int2 === 3 && int3 === 3) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 3 && int2 === 3) {
      playButton.disabled = true;
      winBalance += 10;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 4
    if (int1 === 4 && int2 === 4 && int3 === 4) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 4 && int2 === 4) {
      playButton.disabled = true;
      winBalance += 8;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 5
    if (int1 === 5 && int2 === 5 && int3 === 5) {
      playButton.disabled = true;
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 5 && int2 === 5) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 6
    if (int1 === 6 && int2 === 6 && int3 === 6) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 6 && int2 === 6) {
      playButton.disabled = true;
      winBalance += 8;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 7
    if (int1 === 7 && int2 === 7 && int3 === 7) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 7 && int2 === 7) {
      playButton.disabled = true;
      winBalance += 8;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 8
    if (int1 === 8 && int2 === 8 && int3 === 8) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 8 && int2 === 8) {
      playButton.disabled = true;
      winBalance += 8;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 9
    if (int1 === 9 && int2 === 9 && int3 === 9) {
      playButton.disabled = true;
      winBalance += 20;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 9 && int2 === 9) {
      playButton.disabled = true;
      winBalance += 5;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 10
    if (int1 === 10 && int2 === 10 && int3 === 10) {
      playButton.disabled = true;
      winBalance += 33;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 10 && int2 === 10) {
      playButton.disabled = true;
      winBalance += 13;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 11
    if (int1 === 11 && int2 === 11 && int3 === 11) {
      playButton.disabled = true;
      winBalance += 55;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 11 && int2 === 11) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 12
    if (int1 === 12 && int2 === 12 && int3 === 12) {
      playButton.disabled = true;
      winBalance += 77;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 12 && int2 === 12) {
      playButton.disabled = true;
      winBalance += 17;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 13
    if (int1 === 13 && int2 === 13 && int3 === 13) {
      playButton.disabled = true;
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 13 && int2 === 13) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 14
    if (int1 === 14 && int2 === 14 && int3 === 14) {
      playButton.disabled = true;
      winBalance += 100;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 14 && int2 === 14) {
      playButton.disabled = true;
      winBalance += 25;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 15
    if (int1 === 15 && int2 === 15 && int3 === 15) {
      playButton.disabled = true;
      winBalance += 75;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 15 && int2 === 15) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 16
    if (int1 === 16 && int2 === 16 && int3 === 16) {
      playButton.disabled = true;
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 16 && int2 === 16) {
      playButton.disabled = true;
      winBalance += 10;
      priceWin();
      winLine1();
      winLine2();
    }
    //Win Combination 17 == JACKPOT ==
    if (int1 === 17 && int2 === 17 && int3 === 17) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
  };
  winLine();
};
