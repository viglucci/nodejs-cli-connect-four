const time = require("./time")

module.exports = class CliRenderer {
    constructor(game) {
        this.game = game;
        this.lastDraw = time.seconds();
        this.cusorPosition = [1, 1];
    }

    draw() {
        this.hideCursor();

        const rows = this.game.grid.rows;
        const rowCount = rows.length;

        this.setCursor(1, 1);
        this.clearCurrentLine();
        process.stdout.write(`\n`);

        this.setCursor(this.game.cusorPosition[0], (this.game.cusorPosition[1] * 3) - 1);
        process.stdout.write(this.game.activePlayer.char);

        process.stdout.write(`\n`);

        for (let i = 0; i < rowCount; i++) {
            const row = rows[i];
            const cellCount = row.length;
            this.clearCurrentLine();
            for (let j = 0; j < cellCount; j++) {
                const cell = row[j];
                if (cell) {
                    process.stdout.write(`[${cell}]`);
                } else {
                    process.stdout.write('[ ]');
                }
            }
            process.stdout.write(`\n`);
        }

        process.stdout.write(`\n`);

        this.lastDraw = time.seconds();
    }

    hideCursor() {
        process.stdout.write('\u001B[?25l');
    }

    clearCurrentLine() {
        process.stdout.write('\u001b[2K');
    }

    setCursor(row, column) {
        process.stdout.write(`\u001b[${row};${column}H`);
    }

    clearConsole() {
        process.stdout.write('\u001b[2J');
    }
}