'use strict';
//Import an Arrow function

import { Pig } from './main.js';
//console.log(Pig('Dice Game!'));

//selecting elements
const gameName = (document.getElementById('gamename').innerHTML =
  Pig('Dice Game!'));

const modal = document.querySelector('.modal');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
//const bttnCloseModal = document.querySelector('.close-modal');
const bttnOpenModal = document.querySelectorAll('.show-modal');
const header = document.querySelector('.header');
const playerActive0El = document.querySelector('.player--0');
const playerActive1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const hideDieEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;
//score0EL.textContent = 0;
//score1EL.textContent = 0;

//hideDieEl.classList.add('hidden');

//let scores = [0, 0];
//let currentScore = 0;
//let activePlayer = 0;
//let playing = true;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  hideDieEl.classList.add('hidden');
  playerActive0El.classList.remove('player--winner');
  playerActive1El.classList.remove('player--winner');
  playerActive0El.classList.add('player--active');
  playerActive1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerActive0El.classList.toggle('player--active');
  playerActive1El.classList.toggle('player--active'); // toggling both at the same time will ensure that it's only ever on one of the elements at once.
};

//Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. declare a variable with a function expression that will roll the die
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the die and add an expression that flips the images
    hideDieEl.classList.remove('hidden');
    hideDieEl.src = `dice-${dice}.png`;
    //3. Check if the player rolled a one
    if (dice !== 1) {
      //add dice to the currentScore
      currentScore = currentScore + dice;
      //current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      //setting the current score back to zero
      //activePlayer = activePlayer === 0 ? 1 : 0;
      //currentScore = 0;
      //playerActive0El.classList.toggle('player--active');
      //playerActive1El.classList.toggle('player--active'); //white background switches positions
    }
  }
});

//Hold button

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      hideDieEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
      //Switch to the next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      //setting the current score back to zero
      //activePlayer = activePlayer === 0 ? 1 : 0;
      //currentScore = 0;
      //playerActive0El.classList.toggle('player--active');
      //playerActive1El.classList.toggle('player--active'); //white background switches positions
    }
  }
});

//Resetting the game

btnNew.addEventListener('click', init);

//btnNew.addEventListener('click', function () {
// scores = [0, 0];
//currentScore = 0;
//activePlayer = 0;
//playing = true;

//score0EL.textContent = 0;
// score1EL.textContent = 0;
//current0El.textContent = 0;
//current1El.textContent = 0;

// hideDieEl.classList.add('hidden');
// playerActive0El.classList.remove('player--winner');
// playerActive1El.classList.remove('player--winner');
// playerActive0El.classList.add('player--active');
// playerActive1El.classList.remove('player--active');
//});

const hidemodal = document.createElement('button');
hidemodal.classList.add('close-modal');
modal.append(hidemodal);

const xClose = document.querySelector('.bttn--close-modal');
xClose.classList.add('hidden');

const gameModalWindow = document.createElement('h2');
gameModalWindow.textContent = 'Game Rules';
modal.appendChild(gameModalWindow);

const gameInstructions = document.createElement('p');
gameInstructions.textContent =
  'Gameplay. Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to "hold": If the player rolls a 1, they score nothing and it becomes the next players turn. If the player rolls any other number, it is added to their turn total and the players turn continues. The first player to get 20 points or more wins!🏆';
modal.appendChild(gameInstructions);

container.style.position = 'absolute';
container.style.padding = '2rem 2rem 2rem  2rem';
container.style.justifyContent = 'center';
container.style.lineHeight = '1.5';
container.style.height = '100vh';
container.style.display = 'flex';
container.style.alignItems = ' flex-start';
container.style.fontFamily = 'inherit';
container.style.cursor = 'pointer';
container.style.background = 'linear-gradient(to top left, #28b487, #7dd56f);';
//Exposing the modal window
for (
  let i = 0;
  i < bttnOpenModal.length;
  i++ //Iteration
)
  bttnOpenModal[i].addEventListener('click', function () {
    console.log('Button clicked');
    xClose.classList.remove('hidden'); //Close X
    modal.classList.remove('hidden'); //Modal window
    overlay.classList.remove('hidden'); //BlurryBackground
  });

//Closing the modal window using both the esc button on the modal and the blurry background

const closeModal = function () {
  xClose.classList.add('hidden'); // X
  modal.classList.add('hidden'); //Modal window
  overlay.classList.add('hidden'); //BlurryBackground
};

hidemodal.addEventListener('click', closeModal); //Here were executing the function
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (esc) {
  if (esc.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
