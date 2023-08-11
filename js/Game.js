class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}

	/**
	 * Branches code, depending on what key player presses
	 * @param   {Object}    e - Keydown event object
	 */
	handleKeydown(e) {
		if(this.ready) {
			if(e.key === 'ArrowDown') {
				this.playToken();
			}
			if(e.key === 'ArrowLeft') {
				this.activePlayer.activeToken.moveLeft();
			}
			if(e.key === 'ArrowRight') {
				this.activePlayer.activeToken.moveRight(this.board.columns);
			}
		}
	}

	/** 
	* Creates two player objects
	* @return  {Array}    An array of two Player objects.
	*/
	createPlayers() {
		const players = [];
		players.push( new Player('Red Player', 1, '#e15256', true));
		players.push( new Player('Yellow Player', 2, '#e59a13',)); 
		return players;
	}

	/** 
	* Gets game ready to play
	*/
	startGame() {
	 	this.board.drawHTMLBoard();
	 	this.activePlayer.activeToken.drawHTMLToken();
	 	this.ready = true;
	}

	/** 
	* Finds who the active player is.
	* @return  {Object} - The player whos turn it is.
	*/
	get activePlayer() {
		for(let i = 0; i < this.players.length; i++) {
			if(this.players[i].active === true) {
				return this.players[i];
			}
		}
		
	}
	
	/**
	 * Finds Space object to drop Token into, drops Token
	 */
	playToken(){
	    let spaces = this.board.spaces;
	    let activeToken = this.activePlayer.activeToken;
	    let targetColumn = spaces[activeToken.columnLocation];
	    let targetSpace = null;

	    for (let space of targetColumn) {
	        if (space.token === null) {
	            targetSpace = space;
	        }
	    }

	    if (targetSpace !== null) {
	        const game = this;
	        game.ready = false;

	        activeToken.drop(targetSpace, function(){
	            game.updateGameState(activeToken, targetSpace);           
	        });  
	    }              
	}

	/** 
	 * Checks if there a winner on the board after each token drop.
	 * @param   {Object}    Targeted space for dropped token.
	 * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
	 */

	checkForWin(target){
	    const owner = target.token.owner;
	    let win = false;

	    // vertical
	    for (let x = 0; x < this.board.columns; x++ ){
	        for (let y = 0; y < this.board.rows - 3; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x][y+1].owner === owner && 
	                this.board.spaces[x][y+2].owner === owner && 
	                this.board.spaces[x][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // horizontal
	    for (let x = 0; x < this.board.columns - 3; x++ ){
	        for (let y = 0; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x+1][y].owner === owner && 
	                this.board.spaces[x+2][y].owner === owner && 
	                this.board.spaces[x+3][y].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 0; y < this.board.rows - 3; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y+1].owner === owner && 
	                this.board.spaces[x-2][y+2].owner === owner && 
	                this.board.spaces[x-3][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 3; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y-1].owner === owner && 
	                this.board.spaces[x-2][y-2].owner === owner && 
	                this.board.spaces[x-3][y-3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    return win;
	}

	/** 
 	* Switches active player. 
 	*/
	switchPlayers() {
		for(let i = 0; i < this.players.length; i++){
			this.players[i].active === true ? this.players[i].active = false : this.players[i].active = true;
		}
	}

	/** 
 	* Displays game over message.
 	* @param {string} message - Game over message.      
 	*/
	gameOver(message) {
		let gameOver = document.getElementById('game-over'),
		resetButton = document.getElementById('reset-button');
		gameOver.style.display = "block";
		gameOver.textContent = message;
		resetButton.style.display = "block";
		resetButton.textContent = 'Reset';
	}

	 /** 
	 * Updates game state after token is dropped. 
	 * @param   {Object}  token  -  The token that's being dropped.
	 * @param   {Object}  target -  Targeted space for dropped token.
	 */
	updateGameState(token, target) {
		target.mark(token);
		if( this.checkForWin(target) === true) {
			this.gameOver(`You've won, ${target.owner.name}! Congratulations!`);
		} else {
			this.switchPlayers();
			if( this.activePlayer.checkTokens() ){
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			} else {
				this.gameOver("You have no more tokens to play. Better luck next time.");
			}
		}
	}

	/** 
	* Clears tokens from previous game from the board.
	*/
	clearTokens() {
		let existingTokens = document.querySelectorAll('.token');
		for(let i = 0; i < existingTokens.length; i++){
			existingTokens[i].remove();
		}
	}
}