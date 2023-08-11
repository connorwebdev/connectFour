class Token {
	constructor(owner, index) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
		this.columnLocation = 0;
	}

	/** 
	 * Gets left offset of html element.
	 * @return  {number}   Left offset of token object's htmlToken.
	 */
	get offsetLeft() {
		return this.htmlToken.offsetLeft;
	}

	/** 
 	* Moves html token one column to left.
 	*/
	moveLeft() {
		if(this.offsetLeft > 0){
			this.htmlToken.style.left = (this.offsetLeft - 76) + 'px';
			this.columnLocation --;
		}
	}

	/** 
 	* Moves html token one column to right.
 	* @param   {number}    columns - number of columns in the game board
 	*/
	moveRight(columns) {
		if(this.offsetLeft < ((columns - 1) * 76)){
			this.htmlToken.style.left = (this.offsetLeft + 76) + 'px';
			this.columnLocation ++;
		}
	}

	/**
	* Creates a token HTML element and appends it to the DOM.
	*/
	drawHTMLToken() {
		let token = document.createElement('div');

		document.getElementById("game-board-underlay").appendChild(token); 

		token.setAttribute('id', this.id);
		token.setAttribute('class', 'token');
		token.style.backgroundColor = this.owner.color;
	}

	 /** 
     * Gets associated htmlToken.
     * @return  {element}   Html element associated with token object.
     */
	get htmlToken() {
		return document.getElementById(this.id);
	}

	/** 
 	* Drops html token into targeted board space.
 	* @param   {Object}   target - Targeted space for dropped token.
 	* @param   {function} reset  - The reset function to call after the drop animation has completed.
	*/
	drop(target, reset) {
		this.dropped = true;
		$(this.htmlToken).animate({
    		top: (target.y * target.diameter)
		}, 750, 'easeOutBounce', reset);
		}

}