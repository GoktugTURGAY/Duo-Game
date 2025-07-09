'use strict';

// Selecting Elements from the DOM
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Initial State
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let finalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Functions
const gameOver = () => {
  // Reset Current Score
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  // Declare Winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');

  // Disable Game
  disableControls();

  // Hide The Dice
  diceEl.classList.add('hidden');
};

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).innerText = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const disableControls = (bool = true) => {
  btnRoll.disabled = bool;
  btnHold.disabled = bool;
};

const rollDice = () => {
  // Generate Random Number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display Dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check Dice Roll
  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).innerText =
      currentScore;
  }
};

const holdScore = () => {
  // Add current score to the final score
  finalScores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    finalScores[activePlayer];

  // Check if the holder is the winner
  if (finalScores[activePlayer] >= 50) gameOver();
  else switchPlayer();
};

const resetGame = () => location.reload();

// Functionality
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', resetGame);
