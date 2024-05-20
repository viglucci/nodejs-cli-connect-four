

module.exports = class Grid {
    constructor(width, height) {
        this.initGrid(width, height)
    }

    initGrid(width, height) {
        const rows = []
        for (let i = 0; i < height; i++) {
            const row = []
            for (let j = 0; j < width; j++) {
                row.push(null)
            }
            rows.push(row)
        }
        this.rows = rows
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
            return true;
        }
        return false;
    }
}