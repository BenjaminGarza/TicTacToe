// Main functions we are going to use!!

// initializing and starting the game

const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();



// constractor functions to curry all the game's functionalities.
// later, we will find a way to refactor this to use factory fubctions.
function TicTacToeGame(){

	const board = new Board();
	const human = new Human(board);
	const computer = new Computer(board);
	let turn = 0;

	this.start = function(){
		const config = { childList: true};
		const observer = new MutationObserver(() => takeTurn());

		//observing/watching board positions at the start of the game.
		board.positions.forEach((el) => observer.observe(el, config));
		takeTurn();    
	}

	//function to controls turns between the players

	function takeTurn() {

		//stopping players to take another turn when the game is over.
		if (board.checkWinner()) {
			return;  
		}

		if (turn % 2 === 0) {
			human.takeTurn();
		} else {
			computer.takeTurn();
		}

	turn++;

	}
}

	




function Board(){
  	// tracking board positions
  this.positions = Array.from(document.querySelectorAll('.grid-item'));

  // checking for winner
  this.checkWinner = function() {

  	 let winner = false;

  	 const winningCombinations = [
							        [0,1,2],
							        [3,4,5],
							        [6,7,8],
							        [0,4,8],
							        [2,4,6],
							        [0,3,6],
							        [1,4,7],
							        [2,5,8]
    										];

      const positions = this.positions;

      // checking for winning combinations
	  winningCombinations.forEach((winningCombo) => {
	  const pos0InnerText = positions[winningCombo[0]].innerText;
	  const pos1InnerText = positions[winningCombo[1]].innerText;
	  const pos2InnerText = positions[winningCombo[2]].innerText;
	  const isWinningCombo = pos0InnerText !== '' &&
	    pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
	  if (isWinningCombo) {
	      winner = true;
	      winningCombo.forEach((index) => {
	        positions[index].className += ' win';
	      })
	  }
	});

    return winner;

  }
}

function Human(board){
  this.takeTurn = function(){
   board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));

  }

  function handleTurnTaken(event){
  	event.target.innerText = 'X';
  	board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}

function Computer(board){
	this.takeTurn = function() {

		// checking available positions after picking a spot
		const positionsAvailable = board.positions.filter((p) => p.innerText === '' );
		console.log(positionsAvailable)

		// computer move
		const move = Math.floor(Math.random() * positionsAvailable.length);
		positionsAvailable[move].innerText = '0';
	}
}
