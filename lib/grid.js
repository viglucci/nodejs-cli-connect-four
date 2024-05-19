

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
}