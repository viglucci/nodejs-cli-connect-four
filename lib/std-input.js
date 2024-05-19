
module.exports = class StdInput {
    constructor(game) {
        this.game = game;
    }

    listen() {
        const stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', (key) => {
            // o
            if (key == 'o') {
                if (this.game.insertPiece()) {
                    this.game.incrementPlayerTurn();
                }
            }

            // right
            if (key == '\u001B\u005B\u0043') {
                this.game.incrementCursorPosition();
            }

            // left
            if (key == '\u001B\u005B\u0044') {
                this.game.decrementCursorPosition();
            }

            // ctrl-c
            if (key == '\u0003') {
                process.exit();
            }
        });
    }
}