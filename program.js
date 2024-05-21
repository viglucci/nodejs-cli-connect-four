const { Player, Game } = require("./lib/game");
const StdInput = require('./lib/std-input')
const CliRenderer = require("./lib/cli-renderer");
const time = require("./lib/time");

function eventLoopQueue() {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve();
        });
    });
}

(async function () {
    const exitCalls = 0;

    const game = new Game([
        new Player('x'),
        new Player('y')
    ]);

    const input = new StdInput(game);
    input.listen();

    const renderer = new CliRenderer(game);
    renderer.clearConsole();

    process.on('SIGINT', () => {
        if (exitCalls < 1) {
            this.game.quit = true;
            setTimeout(() => process.exit(0), 1000);
        }

        exitCalls++;
    });

    // https://gafferongames.com/post/fix_your_timestep/
    await renderLoop(game, renderer);

    process.exit(0);
})();

async function renderLoop(game, renderer) {
    let t = 0.0;
    let currentTime = time.seconds();
    let accumulator = 0;

    while (game.quit == false) {
        let newTime = time.seconds();
        let deltaT = newTime - currentTime;
        currentTime = newTime;

        t += deltaT;

        accumulator += deltaT;

        await eventLoopQueue();

        if (accumulator >= 1 / 30.0) {
            accumulator = 0;
            renderer.draw();
        }
    }

    renderer.draw();
}
