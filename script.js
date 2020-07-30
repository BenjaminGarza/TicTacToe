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
}

function Human(board){
  this.takeTurn = function(){
   console.log('human')
  }
}

function Computer(board){
	this.takeTurn = function() {
		console.log('computer')
	}
}
