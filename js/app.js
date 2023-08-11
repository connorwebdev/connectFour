let game = new Game();
let beginButton = document.querySelector('#begin-game'),
resetButton = document.querySelector('#reset-button'),
gameOver = document.querySelector('#game-over');
beginButton.addEventListener('click', newGame);
resetButton.addEventListener('click', newGame);

function newGame() {
	game.clearTokens();
	game = new Game();
	game.startGame();
	beginButton.style.display = 'none';
	resetButton.style.display = 'none';
	gameOver.style.display = 'none';
	document.getElementById('play-area').style.opacity = '1';
}

/** 
 * Listen for keyboard presses
 */
document.addEventListener('keydown', function(event){
	game.handleKeydown(event);
});