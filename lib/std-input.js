
module.exports = class StdInput {
    constructor(game) {
        this.game = game;
        this.quitCalls = 0;
    }

    listen() {
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', (key) => {
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
                this.game.quit = true;
            }
        });
    }
}