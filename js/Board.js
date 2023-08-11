class Board {
	constructor() {
		this.rows = 6;
		this.columns = 7;
		this.spaces = this.createSpaces();
	}

	/** 
	 * Generates 2D array of spaces. 
	 * @return  {Array}     An array of space objects
	 */
	createSpaces() {
		let spaces = [];
		for(let x = 0; x < this.columns; x++){
			const column = [];
			for(let y = 0; y < this.rows; y++){
				column.push(new Space(x, y));
			}
			spaces.push(column);
		}
		return spaces;
	}

	/** 
	 * Loops through our spaces array and creates an SVG for each space.
	 */
	drawHTMLBoard() {
		for (let column of this.spaces) {
			for (let space of column) {
				space.drawSVGSpace();
			}
		}
	}
}