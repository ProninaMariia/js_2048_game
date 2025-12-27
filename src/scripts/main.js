'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const field = document.querySelector('.game-field');
const scoreEl = document.querySelector('.game-score');
const button = document.querySelector('.button');

const startMsg = document.querySelector('.message-start');
const winMsg = document.querySelector('.message-win');
const loseMsg = document.querySelector('.message-lose');

render();

button.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    button.classList.remove('start');
    button.classList.add('restart');
    button.textContent = 'Restart';
    startMsg.classList.add('hidden');
  } else {
    game.restart();
    button.classList.remove('restart');
    button.classList.add('start');
    button.textContent = 'Start';
    startMsg.classList.remove('hidden');
    winMsg.classList.add('hidden');
    loseMsg.classList.add('hidden');
  }

  render();
});

document.addEventListener('keydown', (e) => {
  const keyMap = {
    ArrowLeft: () => game.moveLeft(),
    ArrowRight: () => game.moveRight(),
    ArrowUp: () => game.moveUp(),
    ArrowDown: () => game.moveDown(),
  };

  if (keyMap[e.key]) {
    keyMap[e.key]();
    render();
  }
});

function render() {
  // renderField();?
  renderScore();
  renderStatus();
}

function renderField() {
  field.innerHTML = '';

  const state = game.getState();

  state.flat().forEach((value) => {
    const cell = document.createElement('div');

    cell.className = 'field-cell';

    if (value) {
      cell.textContent = value;
      cell.classList.add(`field-cell--${value}`);
    }

    field.appendChild(cell);
  });
}

function renderScore() {
  scoreEl.textContent = game.getScore();
}

function renderStatus() {
  winMsg.classList.add('hidden');
  loseMsg.classList.add('hidden');

  if (game.getStatus() === 'win') {
    winMsg.classList.remove('hidden');
  }

  if (game.getStatus() === 'lose') {
    loseMsg.classList.remove('hidden');
  }
}
