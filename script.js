// Main functions we are going to use!!

// initializing and starting the game

const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();



// constractor functions to curry all the game's functionalities.
// later, we will find a way to refactor this to use factory fubctions.
function TicTacToeGame(){

	const board = new Board();
	const human = new Human();
	const computer = new Computer();
	let turn = 0;

	this.start = function(){
		const config = { childList: true};
		const observer = new MutationObserver(() => takeTurn());

		//observing/watching board positions at the start of the game.
		board.positions.forEach((el) => observer.observe(el, config));      
	}

	function takeTurn() {
		
	}

}


function Board(){
  	// tracking board positions
  this.positions = Array.from(document.querySelectorAll('.grid-item'));
}

function Human(){
  //human functions here
}

function Computer(){
// comp functions here
}
