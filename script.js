const gameboard = (() => {
  const turnCounter = 0;
  const gameboardArray = [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ];
  return {
    gameboardArray,
    turnCounter,
  };
})();

const playerFactory = (name) => {
  const getName = () => name;
  return {
    getName,
  };
};

const winMessage = (tie) => {
  let player = '';
  let player1 = document.querySelector('#player1');
  let player2 = document.querySelector('#player2');
  if (player1.value === '') { player1 = 'PLAYER 1'; } else { player1 = player1.value; }
  if (player2.value === '') { player2 = 'Player 2'; } else { player2 = player2.value; }
  if (gameboard.turnCounter % 2 === 0) { player = player2; } else { player = player1; }
  if (tie) {
    document.querySelector('h3').textContent = 'YOU TIED';
  } else {
    document.querySelector('h3').textContent = `WINNER IS ${player.toUpperCase()}`;
  }
};

const renderGameboard = () => {
  const gameArray = gameboard.gameboardArray;
  const grid = document.querySelector('#grid-container').querySelectorAll('div');
  for (let i = 0; i < 9; i += 1) {
    if (gameArray[i] === 'X' || gameArray[i] === 'O' || gameArray[i] === ' ') {
      grid[i].textContent = gameArray[i];
    }
  }
};

const winCheck = () => {
  const gameArray = gameboard.gameboardArray;
  let won = false;
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < winCombo.length; i += 1) {
    const winner = gameArray[winCombo[i][0]] === gameArray[winCombo[i][1]];
    const winner2 = gameArray[winCombo[i][1]] === gameArray[winCombo[i][2]];
    const test = gameArray[winCombo[i][0]] !== ' '
          && gameArray[winCombo[i][1]] !== ' ';
    if (winner && winner2 && test) {
      const domArray = Array.from(document.querySelectorAll('.grid-item'));
      domArray[winCombo[i][0]].className += ' win';
      domArray[winCombo[i][1]].className += ' win';
      domArray[winCombo[i][2]].className += ' win';
      won = true;
    }
  }
  return won;
};
const boardEvents = (e) => {
  const gameArray = gameboard.gameboardArray;
  const { index } = e.target.dataset;
  if (e.target.innerHTML === '' || e.target.innerHTML === ' ') {
    if (gameboard.turnCounter % 2 === 0) { gameArray[index] = ('X'); } else { gameArray[index] = ('O'); }
    gameboard.turnCounter += 1;
    renderGameboard();
    const won = winCheck();
    if (gameboard.turnCounter === 9 && !won) {
      winMessage(true);
    } else if (won) {
      winMessage(false);
      const gridContainer = document.querySelector('#grid-container');
      gridContainer.removeEventListener('click', boardEvents);
    }
  }
};

const addBoardEvents = () => {
  const gridContainer = document.querySelector('#grid-container');
  gridContainer.addEventListener('click', boardEvents);
};

const startGame = () => {
  addBoardEvents();
  const player1Name = document.querySelector('#player1');
  const player1 = playerFactory(player1Name);
  const player2Name = document.querySelector('#player2');
  const player2 = playerFactory(player2Name);
  return {
    player1,
    player2,
  };
};

const resetDom = () => {
  document.querySelector('#btn-start').innerHTML = 'Restart';
  const domArray = Array.from(document.querySelectorAll('.grid-item'));
  for (let i = 0; i < gameboard.gameboardArray.length; i += 1) {
    domArray[i].classList.remove('win');
  }
  document.querySelector('h3').textContent = 'TIC-TAC-TOE';
  renderGameboard();
};

const resetLogic = () => {
  for (let i = 0; i < gameboard.gameboardArray.length; i += 1) {
    gameboard.gameboardArray[i] = ' ';
  }
  gameboard.turnCounter = 0;
};

const resetGame = () => {
  resetDom();
  resetLogic();
};

const initialize = () => {
  document.querySelector('#btn-start').addEventListener('click', () => {
    startGame();
    resetGame();
  });
};
initialize();
