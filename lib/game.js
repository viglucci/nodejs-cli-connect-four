const Grid = require("./grid")

module.exports.Player = class Player {
    constructor(char) {
        this.char = char
    }
}

class Graph {
    constructor(nodes, [numRows, numColumns]) {
        this.nodes = nodes || [];
        this.initMatrix(numRows, numColumns);
    }

    initMatrix(numRows, numColumns) {
        this.matrix = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push(null);
            }
            this.matrix.push(row);
        }
    }

    add(node) {
        this.nodes.push(node)
        this.matrix[node.position[0], node.position[1]] = node;
    }

    get(coords) {
        return this.matrix[coords[0], coords[1]];
    }
}

class GraphNode {
    constructor(value, positionVec2) {
        this.position = positionVec2
        this.neighbors = []
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
        this.graphsByPlayer = {
            x: new Graph([], [6, 7]),
            y: new Graph([], [6, 7])
        }
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
            this.updateGraph(coords);
            this.resetCursorPosition();
        }
        return result;
    }

    updateGraph([row, col]) {
        const graph = this.graphsByPlayer[this.activePlayer.char];
        const node = new GraphNode(this.activePlayer.char, [row, col]);
        graph.add(node);

        const northEast = [row - 1, col + 1];
        const east = [row, col + 1];
        const southEast = [row + 1, col + 1];
        const south = [row + 1, col];
        const southWest = [row + 1, col - 1];
        const west = [row, col - 1];
        const northWest = [row - 1, col - 1];

        this.updateGraphNode(graph, node, northEast);
        this.updateGraphNode(graph, node, east);
        this.updateGraphNode(graph, node, southEast);
        this.updateGraphNode(graph, node, south);
        this.updateGraphNode(graph, node, southWest);
        this.updateGraphNode(graph, node, west);
        this.updateGraphNode(graph, node, northWest);
    }

    updateGraphNode(graph, node, cardinal) {
        if (this.grid.isOnGrid(cardinal) && this.grid.get(cardinal) == this.activePlayer.char) {
            const neighbor = graph.get(cardinal);
            neighbor.neighbors.push(node);
            node.neighbors.push(neighbor);
        }
    }

    checkWinner() {
    }
}

/*
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
*/