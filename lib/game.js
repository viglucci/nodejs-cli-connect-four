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
        this.grid = new Grid(6, 7);
        this.cusorPosition = [1, 1];
        this.quit = false;
        this.winner = null;
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

    resetCursorPosition() {
        this.cusorPosition = [0, 1];
    }

    insertPiece() {
        const gridCol = this.cusorPosition[1] - 1;
        const [result, coords] = this.grid.insertPiece(gridCol, this.activePlayer.char);
        if (result) {
            this.resetCursorPosition();
            if (this.checkWinner(coords)) {
                this.winner = this.activePlayer;
                this.quit = true;
            }
        }
        return result;
    }

    /**
     *  Win conditions:
     * 
        [ ][ ][ ][ ][ ]
        [x][ ][ ][ ][ ]
        [x][ ][ ][ ][ ]
        [x][ ][ ][ ][ ]
        [x][ ][ ][ ][ ]

        [ ][ ][ ][ ][ ]
        [ ][ ][ ][ ][ ]
        [ ][ ][ ][ ][ ]
        [ ][ ][ ][ ][ ]
        [x][x][x][x][ ]

        [ ][ ][ ][ ][ ]
        [ ][ ][ ][x][ ]
        [ ][ ][x][y][ ]
        [ ][x][x][y][ ]
        [x][y][y][y][ ]

        [ ][ ][ ][ ][ ]
        [y][ ][ ][ ][ ]
        [x][y][x][ ][ ]
        [x][x][y][y][ ]
        [x][x][y][y][ ]
     */
    /**
     * Checks if the insertion of a piece will satisfy a win condition.
     * 
     * @param {*} vec2 Coordinates of where the subject piece was inserted.
     * @param {*} winCount The number of consecutive pieces required to constitue a win.
     * @returns Whether or not a winning match has been met.
     */
    checkWinner([row, col], winCount = 4) {
        const grid = this.grid;
        let nMatched = 0;

        // check line northeast
        for (let i = 0; i < winCount; i++) {
            const northEast = [row + i, col + i];
            if (grid.isOnGrid(northEast) && grid.get(northEast) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line east
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const east = [row, col + i];
            if (grid.isOnGrid(east) && grid.get(east) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line southeast
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const southEast = [row - i, col + i];
            if (grid.isOnGrid(southEast) && grid.get(southEast) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line south
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const south = [row - i, col];
            if (grid.isOnGrid(south) && grid.get(south) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line southWest
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const southWest = [row - i, col - i];
            if (grid.isOnGrid(southWest) && grid.get(southWest) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line west
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const west = [row, col - i];
            if (grid.isOnGrid(west) && grid.get(west) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line northWest
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const northWest = [row + i, col - i];
            if (grid.isOnGrid(northWest) && grid.get(northWest) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        // check line north
        // note: this condition cannot actually be met when `checkWinner` is called directly after the insertion
        //       of a new piece, as there could not possibly be pieces above the last inserted piece.
        nMatched = 0;
        for (let i = 0; i < winCount; i++) {
            const north = [row + i, col];
            if (grid.isOnGrid(north) && grid.get(north) == this.activePlayer.char) {
                nMatched++;
            } else {
                break;
            }
            if (nMatched == winCount) {
                return true;
            }
        }

        return false;
    }
}
