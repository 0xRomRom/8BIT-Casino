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
const questionMark2 = document.querySelector(".question-mark2");
const questionMark3 = document.querySelector(".question-mark3");
const questionMark4 = document.querySelector(".question-mark4");
const checkPrize = document.querySelector(".check-prize");
const bonusPrize = document.querySelector(".bonus-prize");
const rotate = document.querySelector(".rotate");
const opacityScaleDown = document.querySelector(".opacity-scale-down");
const jackpotWinValue = document.querySelector(".jackpot-win-value");
const jackpotWinValue2 = document.querySelector(".jackpot-win-value2");
const takeWinnings = document.querySelector(".take-winnings");
const orGamble = document.querySelector(".or-gamble");
const round1 = document.querySelector(".round1");
const takeWin = document.querySelector(".take-win");
const letsGamble = document.querySelector(".lets-gamble");
const blackOut = document.querySelector(".blackout");
const loading = document.querySelector(".loading");
const gameRound1 = document.querySelector(".game-round1");
const chooseWisely = document.querySelector(".choose-wisely");
const redX1 = document.querySelector(".redX1");
const redX2 = document.querySelector(".redX2");
const redX3 = document.querySelector(".redX3");
const line1Win = document.querySelector(".line1Win");
const line2Win = document.querySelector(".line2Win");
const line3Win = document.querySelector(".line3Win");
const prizeLegend = document.querySelector(".prize-legend");
const prizeChart = document.querySelector(".prize-chart");

//Logic
let jackpot = 0;
let funds = 100;
let bonusBalance = 0;
let inGameBalance = 0;
let winBalance = 0;
let highScore = 100;
let tempHighscore = highScore;
let bonusAmount = 0;

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
let spinCount = 0;
playButton.addEventListener("click", () => {
  playGame();
  zeroFunds();
  newFunds();
  if (inGameBalance > 0) {
    spinCount++;
  }
  console.log(spinCount);
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

prizeLegend.addEventListener("click", () => {
  prizeChart.classList.toggle("hidden");
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
    const int1 = Math.trunc(Math.random() * 255 + 1);
    const int2 = Math.trunc(Math.random() * 255 + 1);
    const int3 = Math.trunc(Math.random() * 255 + 1);
    questionMark.style.color = `rgb(${int1}, ${int2}, ${int3})`;
  }, 1000);
})();

(function () {
  setInterval(function () {
    const int1 = Math.trunc(Math.random() * 255 + 1);
    const int2 = Math.trunc(Math.random() * 255 + 1);
    const int3 = Math.trunc(Math.random() * 255 + 1);
    questionMark2.style.color = `rgb(${int1}, ${int2}, ${int3})`;
  }, 1000);
})();

(function () {
  setInterval(function () {
    const int1 = Math.trunc(Math.random() * 255 + 1);
    const int2 = Math.trunc(Math.random() * 255 + 1);
    const int3 = Math.trunc(Math.random() * 255 + 1);
    questionMark3.style.color = `rgb(${int1}, ${int2}, ${int3})`;
  }, 1000);
})();

(function () {
  setInterval(function () {
    const int1 = Math.trunc(Math.random() * 255 + 1);
    const int2 = Math.trunc(Math.random() * 255 + 1);
    const int3 = Math.trunc(Math.random() * 255 + 1);
    questionMark4.style.color = `rgb(${int1}, ${int2}, ${int3})`;
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

function getBonusWin(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

questionMark.addEventListener("click", () => {
  questionMark.disabled = true;
  const bonusOutcome = getBonusWin(3, 300);
  bonusAmount = bonusOutcome;
  bonusPrize.insertAdjacentHTML("afterbegin", bonusOutcome);
  jackpotWinValue.insertAdjacentHTML("afterbegin", bonusOutcome);
  questionMark.classList.add("rotate");
  takeWin.value = `Take ${bonusOutcome}`;
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
    bonusPrize.textContent = "";
    bonusPrize.classList.add("hidden");
    questionMark.classList.remove("rotate");
  }, 12000);
  setTimeout(() => {
    takeWin.classList.remove("hidden");
    letsGamble.classList.remove("hidden");
  }, 15000);
});

takeWin.addEventListener("click", () => {
  blackOut.classList.remove("hidden");
  loading.classList.remove("hidden");
  bonusGameText.classList.add("hidden");
  bonusGameText.classList.remove("bonus-flashing");
  bonusWinTitle.classList.add("hidden");
  bonusWinSubTitle.classList.add("hidden");
  questionMark.classList.add("hidden");
  checkPrize.classList.add("hidden");
  round1.classList.add("hidden");
  takeWinnings.classList.add("hidden");
  orGamble.classList.add("hidden");
  takeWin.classList.add("hidden");
  letsGamble.classList.add("hidden");
  bonusPrize.classList.add("hidden");
  playButton.disabled = false;
  insertButton.disabled = false;
  collectButton.disabled = false;
  bonusWindow.classList.add("hidden");
  bonusWindow2.classList.add("hidden");
  inGameBalance += bonusAmount;
  gameBalance.textContent = inGameBalance;
  bonusAmount = 0;
  slot1.classList.remove("box-flashing");
  slot2.classList.remove("box-flashing");
  slot3.classList.remove("box-flashing");
  jackpotWinValue.textContent = "";
  bonusPrize.textContent = "";
  questionMark.classList.remove("rotate");
  questionMark.disabled = false;
  setTimeout(() => {
    blackOut.classList.add("hidden");
    loading.classList.add("hidden");
  }, 1000);
});

letsGamble.addEventListener("click", () => {
  takeWin.classList.add("hidden");
  letsGamble.classList.add("hidden");
  blackOut.classList.remove("hidden");
  loading.classList.remove("hidden");
  bonusWindow.classList.add("hidden");
  bonusWindow2.classList.add("hidden");
  setTimeout(() => {
    blackOut.classList.add("hidden");
    loading.classList.add("hidden");
    gameRound1.classList.remove("hidden");
    jackpotWinValue2.insertAdjacentHTML("afterbegin", bonusAmount);
  }, 1000);
  setTimeout(() => {
    chooseWisely.classList.remove("hidden");
  }, 2500);
  setTimeout(() => {
    questionMark2.classList.remove("hidden");
    questionMark3.classList.remove("hidden");
    questionMark4.classList.remove("hidden");
  }, 4000);
});

questionMark2.addEventListener("click", () => {
  questionMark2.disabled = true;
  questionMark3.disabled = true;
  questionMark4.disabled = true;
  const bonusOutcome = getBonusWin(0, 100);
  questionMark2.classList.add("rotate");
  questionMark3.classList.add("rotate");
  questionMark4.classList.add("rotate");
  setTimeout(() => {
    questionMark2.classList.add("hidden");
    questionMark3.classList.add("hidden");
    questionMark4.classList.add("hidden");
  }, 1600);
  setTimeout(() => {
    if (bonusOutcome >= 34 && bonusOutcome <= 66) {
      let prizeX2 = bonusAmount * 2;
      inGameBalance += prizeX2;
      gameBalance.textContent = inGameBalance;
      bonusAmount = 0;
      line2Win.insertAdjacentHTML("beforeend", prizeX2);
      line2Win.classList.add("flashing");
      line2Win.classList.remove("hidden");
      redX1.classList.remove("hidden");
      redX3.classList.remove("hidden");
    } else {
      redX2.classList.remove("hidden");
    }
  }, 3000);
  setTimeout(() => {
    jackpotWinValue.textContent = "";
    jackpotWinValue2.textContent = "";
    gameRound1.classList.add("hidden");
    line1Win.classList.add("hidden");
    line2Win.classList.add("hidden");
    line3Win.classList.add("hidden");
    redX1.classList.add("hidden");
    redX3.classList.add("hidden");
    redX2.classList.add("hidden");
    bonusGameText.classList.add("hidden");
    bonusGameText.classList.remove("bonus-flashing");
    slot1.classList.remove("box-flashing");
    slot2.classList.remove("box-flashing");
    slot3.classList.remove("box-flashing");
    playButton.disabled = false;
    collectButton.disabled = false;
    insertButton.disabled = false;
    bonusWinTitle.classList.add("hidden");
    bonusWinSubTitle.classList.add("hidden");
    bonusWindow.classList.add("hidden");
    bonusWindow2.classList.add("hidden");
    questionMark.classList.add("hidden");
    checkPrize.classList.add("hidden");
    round1.classList.add("hidden");
    takeWinnings.classList.add("hidden");
    orGamble.classList.add("hidden");
    questionMark2.classList.remove("rotate");
    questionMark3.classList.remove("rotate");
    questionMark4.classList.remove("rotate");
    questionMark.disabled = false;
    questionMark2.disabled = false;
    questionMark3.disabled = false;
    questionMark4.disabled = false;
  }, 8000);
});

questionMark3.addEventListener("click", () => {
  questionMark2.disabled = true;
  questionMark3.disabled = true;
  questionMark4.disabled = true;
  const bonusOutcome = getBonusWin(0, 100);
  questionMark2.classList.add("rotate");
  questionMark3.classList.add("rotate");
  questionMark4.classList.add("rotate");
  setTimeout(() => {
    questionMark2.classList.add("hidden");
    questionMark3.classList.add("hidden");
    questionMark4.classList.add("hidden");
  }, 1600);
  setTimeout(() => {
    if (bonusOutcome >= 0 && bonusOutcome <= 33) {
      let prizeX2 = bonusAmount * 2;
      inGameBalance += prizeX2;
      gameBalance.textContent = inGameBalance;
      bonusAmount = 0;
      line1Win.insertAdjacentHTML("beforeend", prizeX2);
      line1Win.classList.add("flashing");
      line1Win.classList.remove("hidden");
      redX2.classList.remove("hidden");
      redX3.classList.remove("hidden");
    } else {
      redX1.classList.remove("hidden");
    }
  }, 3000);
  setTimeout(() => {
    jackpotWinValue.textContent = "";
    jackpotWinValue2.textContent = "";
    gameRound1.classList.add("hidden");
    line1Win.classList.add("hidden");
    line2Win.classList.add("hidden");
    line3Win.classList.add("hidden");
    redX1.classList.add("hidden");
    redX3.classList.add("hidden");
    redX2.classList.add("hidden");
    bonusGameText.classList.add("hidden");
    bonusGameText.classList.remove("bonus-flashing");
    slot1.classList.remove("box-flashing");
    slot2.classList.remove("box-flashing");
    slot3.classList.remove("box-flashing");
    playButton.disabled = false;
    collectButton.disabled = false;
    insertButton.disabled = false;
    bonusWinTitle.classList.add("hidden");
    bonusWinSubTitle.classList.add("hidden");
    bonusWindow.classList.add("hidden");
    bonusWindow2.classList.add("hidden");
    questionMark.classList.add("hidden");
    checkPrize.classList.add("hidden");
    round1.classList.add("hidden");
    takeWinnings.classList.add("hidden");
    orGamble.classList.add("hidden");
    questionMark2.classList.remove("rotate");
    questionMark3.classList.remove("rotate");
    questionMark4.classList.remove("rotate");
    questionMark.disabled = false;
    questionMark2.disabled = false;
    questionMark3.disabled = false;
    questionMark4.disabled = false;
  }, 8000);
});

questionMark4.addEventListener("click", () => {
  questionMark2.disabled = true;
  questionMark3.disabled = true;
  questionMark4.disabled = true;
  const bonusOutcome = getBonusWin(0, 100);
  questionMark2.classList.add("rotate");
  questionMark3.classList.add("rotate");
  questionMark4.classList.add("rotate");
  setTimeout(() => {
    questionMark2.classList.add("hidden");
    questionMark3.classList.add("hidden");
    questionMark4.classList.add("hidden");
  }, 1600);
  setTimeout(() => {
    if (bonusOutcome >= 67 && bonusOutcome <= 100) {
      let prizeX2 = bonusAmount * 2;
      inGameBalance += prizeX2;
      gameBalance.textContent = inGameBalance;
      bonusAmount = 0;
      line3Win.insertAdjacentHTML("beforeend", prizeX2);
      line3Win.classList.add("flashing");
      line3Win.classList.remove("hidden");
      redX1.classList.remove("hidden");
      redX2.classList.remove("hidden");
    } else {
      redX3.classList.remove("hidden");
    }
  }, 3000);
  setTimeout(() => {
    jackpotWinValue.textContent = "";
    jackpotWinValue2.textContent = "";
    gameRound1.classList.add("hidden");
    line1Win.classList.add("hidden");
    line2Win.classList.add("hidden");
    line3Win.classList.add("hidden");
    redX1.classList.add("hidden");
    redX3.classList.add("hidden");
    redX2.classList.add("hidden");
    bonusGameText.classList.add("hidden");
    bonusGameText.classList.remove("bonus-flashing");
    slot1.classList.remove("box-flashing");
    slot2.classList.remove("box-flashing");
    slot3.classList.remove("box-flashing");
    playButton.disabled = false;
    collectButton.disabled = false;
    insertButton.disabled = false;
    bonusWinTitle.classList.add("hidden");
    bonusWinSubTitle.classList.add("hidden");
    bonusWindow.classList.add("hidden");
    bonusWindow2.classList.add("hidden");
    questionMark.classList.add("hidden");
    checkPrize.classList.add("hidden");
    round1.classList.add("hidden");
    takeWinnings.classList.add("hidden");
    orGamble.classList.add("hidden");
    questionMark2.classList.remove("rotate");
    questionMark3.classList.remove("rotate");
    questionMark4.classList.remove("rotate");
    questionMark.disabled = false;
    questionMark2.disabled = false;
    questionMark3.disabled = false;
    questionMark4.disabled = false;
  }, 8000);
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
  // const int1 = 15;
  // const int2 = 15;
  // const int3 = 15;
  const int1 = Math.trunc(Math.random() * 15 + 1);
  const int2 = Math.trunc(Math.random() * 15 + 1);
  const int3 = Math.trunc(Math.random() * 15 + 1);
  slot1.src = `icons/${int1}.png`;
  slot2.src = `icons/${int2}.png`;
  slot3.src = `icons/${int3}.png`;

  const winLine = () => {
    if (int1 === 1 && int2 === 1 && int3 === 1) {
      playButton.disabled = true;
      winBalance += 35;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    }
    //Win Combination 2
    if (int1 === 2 && int2 === 2 && int3 === 2) {
      playButton.disabled = true;
      winBalance += 40;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    }
    //Win Combination 3
    if (int1 === 3 && int2 === 3 && int3 === 3) {
      playButton.disabled = true;
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 3 && int2 === 3) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 4
    if (int1 === 4 && int2 === 4 && int3 === 4) {
      playButton.disabled = true;
      winBalance += 35;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    }

    //Win Combination 5
    if (int1 === 5 && int2 === 5 && int3 === 5) {
      playButton.disabled = true;
      winBalance += 40;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    }

    //Win Combination 6
    if (int1 === 6 && int2 === 6 && int3 === 6) {
      playButton.disabled = true;
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 6 && int2 === 6) {
      playButton.disabled = true;
      winBalance += 16;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 7
    if (int1 === 7 && int2 === 7 && int3 === 7) {
      playButton.disabled = true;
      winBalance += 40;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 7 && int2 === 7) {
      playButton.disabled = true;
      winBalance += 12;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 8
    if (int1 === 8 && int2 === 8 && int3 === 8) {
      playButton.disabled = true;
      winBalance += 45;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 8 && int2 === 8) {
      playButton.disabled = true;
      winBalance += 16;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 9
    if (int1 === 9 && int2 === 9 && int3 === 9) {
      playButton.disabled = true;
      winBalance += 55;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 9 && int2 === 9) {
      playButton.disabled = true;
      winBalance += 18;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 10
    if (int1 === 10 && int2 === 10 && int3 === 10) {
      playButton.disabled = true;
      winBalance += 65;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 10 && int2 === 10) {
      playButton.disabled = true;
      winBalance += 20;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 11
    if (int1 === 11 && int2 === 11 && int3 === 11) {
      playButton.disabled = true;
      winBalance += 50;
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
      winBalance += 75;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 12 && int2 === 12) {
      playButton.disabled = true;
      winBalance += 18;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 13
    if (int1 === 13 && int2 === 13 && int3 === 13) {
      playButton.disabled = true;
      winBalance += 55;
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
      winBalance += 50;
      priceWin();
      winLine1();
      winLine2();
      winLine3();
    } else if (int1 === 14 && int2 === 14) {
      playButton.disabled = true;
      winBalance += 15;
      priceWin();
      winLine1();
      winLine2();
    }

    //Win Combination 15 == JACKPOT ==
    if (int1 === 15 && int2 === 15 && int3 === 15) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
    if (int1 === 15 && int2 === 14 && int3 === 15) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
    if (int1 === 15 && int2 === 13 && int3 === 15) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
    if (int1 === 15 && int2 === 12 && int3 === 15) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
    if (int1 === 15 && int2 === 11 && int3 === 15) {
      winLine1();
      winLine2();
      winLine3();
      bonusWin();
    }
  };
  winLine();
};
