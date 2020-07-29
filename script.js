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

	}

}



function Board(){
  // positions and game hanlders here
}

function Human(){
  //human functions here
}

function Computer(){
// comp functions here
}
