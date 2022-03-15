'use strict';

//variables declaring
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//functions
const swtchAtvPlyr = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0; //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.Change to clean code
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const startingState = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0Elmnt.textContent = 0;
  score1Elmnt.textContent = 0;
  diceElmnt.classList.add('hidden');

  current0Elmnt.textContent = currentScore;
  current1Elmnt.textContent = currentScore;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// Selecting elements by DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0Elmnt = document.querySelector('#current--0');
const current1Elmnt = document.querySelector('#current--1');
const score0Elmnt = document.querySelector('#score--0');
const score1Elmnt = document.querySelector('#score--1');
const diceElmnt = document.querySelector('.dice');
const btnNewElmnt = document.querySelector('.btn--new');
const btnRollElmnt = document.querySelector('.btn--roll');
const btnHoldElmnt = document.querySelector('.btn--hold');

//Starting Condition
startingState();

// Rolling dice functionality
btnRollElmnt.addEventListener('click', function () {
  if (playing) {
    //Generate a random dice number
    const dice = Number(Math.trunc(Math.random() * 6) + 1);

    //Show dice with generated random number
    diceElmnt.classList.remove('hidden');
    diceElmnt.src = `dice-${dice}.png`;

    //Check the number if it's 1 or not
    // if it's 1, add dice number to currentScore
    // if it's not, switch player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swtchAtvPlyr();
    }
  }
});

// Holding functionality
btnHoldElmnt.addEventListener('click', function () {
  if (playing) {
    // add current scores to active player score
    scores[activePlayer] += currentScore;

    //show scores of activePlayer with DOM
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if active player scores is more than 100 wins the game, otherwise switch playar
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElmnt.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swtchAtvPlyr();
    }
  }
});

//Reseting the game functionality
btnNewElmnt.addEventListener('click', startingState);
