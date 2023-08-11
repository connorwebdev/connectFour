class Player {
	constructor(name, id, color, active = false) {
		this.name = name;
		this.id = id;
		this.color = color;
		this.active = active;
		this.tokens = this.createTokens(21);
	}

	/** 
	* Creates token objects for player
	* @param {integer} num - Number of token objects to be created
	* @return  {array} tokens - an array of new token objects
	*/
	createTokens(num) {
		let tokens = [];
		for(let i = 0; i < num; i++){
			let token = new Token(this, i);
			tokens.push(token);
		}
		return tokens;
	}

	/** 
	* Loops through the players tokens to see how many unused tokens they have.
	* @return  {array} tokens - an array of unused token objects
	*/
	get unusedTokens() {
		let unusedTokens = [];
		for(let i=0; i<this.tokens.length; i++) {
			if(this.tokens[i].dropped === false) {
				unusedTokens.push(this.tokens[i]);
			}
		}
		return unusedTokens;
	}

	/** 
	* Gets our list unused Tokens and returns the first one.
	* @return {Object} An unused token.
	*/
	get activeToken() {
		let unusedTokensArray = this.unusedTokens;
		return unusedTokensArray[0];
	}

	/**
 	* Check if a player has any undropped tokens left
 	* @return {Boolean} 
 	*/
	checkTokens() {
		if( this.tokens.length > 0) {
			return true;
		} else {
			return false;
		}
	}
}