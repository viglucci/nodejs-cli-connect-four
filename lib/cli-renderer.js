const time = require("./time")

module.exports = class CliRenderer {
    constructor(game) {
        this.game = game;
        this.lastDraw = time.seconds();
        this.cusorPosition = [1, 1];
    }

    draw() {
        this.hideCursor();

        let drawHeight = 1;

        const rows = this.game.grid.rows;
        const rowCount = rows.length;

        this.setCursor(0, 1);

        drawHeight = this.drawInstructions(drawHeight);

        this.drawPlayerCursor(drawHeight);

        drawHeight = this.drawNewline(drawHeight);

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
            drawHeight = this.drawNewline(drawHeight);
        }

        drawHeight = this.drawNewline(drawHeight);
        drawHeight = this.drawPlayerTurnText(drawHeight);

        this.lastDraw = time.seconds();
    }

    drawPlayerTurnText(drawHeight) {
        process.stdout.write(`Player turn: ${this.game.activePlayer.char}`);
        drawHeight = this.drawNewline(drawHeight);
        return drawHeight;
    }

    drawNewline(drawHeight) {
        process.stdout.write(`\n`);
        drawHeight++;
        return drawHeight;
    }

    drawPlayerCursor(drawHeight) {
        this.setCursor(drawHeight, 1);;
        this.clearCurrentLine();
        this.setCursor(drawHeight, (this.game.cusorPosition[1] * 3) - 1);
        process.stdout.write(this.game.activePlayer.char);
    }

    drawInstructions(drawHeight) {
        process.stdout.write(`Controls:\n`);
        drawHeight++;
        process.stdout.write(`  Move cursor: <- & ->\n`);
        drawHeight++;
        process.stdout.write(`  Insert piece: o\n`);
        drawHeight++;
        process.stdout.write(`\n`);
        drawHeight++;
        return drawHeight;
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