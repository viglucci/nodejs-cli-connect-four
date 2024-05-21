

module.exports = class Grid {
    constructor(rows, columns) {
        this.initGrid(rows, columns)
    }

    initGrid(numRows, numColumns) {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push(null);
            }
            rows.push(row);
        }
        this.rows = rows
    }

    get([row, col]) {
        return this.rows[row][col];
    }

    isOnGrid([row, col]) {
        if (row < 0 || col < 0) {
            return false;
        }
        if (row > this.rows.length - 1) {
            return false;
        }
        if (col > this.rows[0].length - 1) {
            return false;
        }
        return true;
    }

    insertPiece(column, char) {
        // find the shallowest empty column
        let deepestAvailable = null;
        for (let i = this.rows.length - 1; i > -1; i--) {
            if (this.rows[i][column] == null) {
                deepestAvailable = [i, column];
                break;
            }
        }
        if (deepestAvailable) {
            this.rows[deepestAvailable[0]][deepestAvailable[1]] = char;
            return [
                true,
                [
                    deepestAvailable[0],
                    deepestAvailable[1]
                ]
            ];
        }
        return [false];
    }
}
