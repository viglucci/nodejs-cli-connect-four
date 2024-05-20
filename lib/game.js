const Grid = require("./grid")

module.exports.Player = class Player {
    constructor(char) {
        this.char = char
    }
}

module.exports.Game = class Game {
    constructor(players) {
        this.players = players;
        this.activePlayerIndex = 0;
        this.activePlayer = this.players[0];
        this.grid = new Grid(5, 5);
        this.cusorPosition = [1, 1];
        this.quit = false;
    }

    incrementPlayerTurn() {
        this.activePlayerIndex++;
        if (this.activePlayerIndex > this.players.length - 1) {
            this.activePlayerIndex = 0;
        }
        this.activePlayer = this.players[this.activePlayerIndex];
    }

    incrementCursorPosition() {
        const maxColumn = this.grid.rows[0].length;
        const newX = Math.min(maxColumn, this.cusorPosition[1] + 1);
        this.cusorPosition = [this.cusorPosition[0], newX];
    }

    decrementCursorPosition() {
        const newX = Math.max(1, this.cusorPosition[1] - 1);
        this.cusorPosition = [this.cusorPosition[0], newX];
    }

    insertPiece() {
        const gridCol = this.cusorPosition[1] - 1;
        return this.grid.insertPiece(gridCol, this.activePlayer.char);
    }
}