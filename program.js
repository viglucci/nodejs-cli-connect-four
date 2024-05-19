const { Player, Game } = require("./lib/game");
const StdInput = require('./lib/std-input')
const CliRenderer = require("./lib/cli-renderer");
const time = require("./lib/time");

(function () {
    const exit = false;

    const game = new Game([
        new Player('x'),
        new Player('y')
    ]);

    const input = new StdInput(game);
    input.listen();

    const renderer = new CliRenderer(game);

    renderer.clearConsole();

    // https://gafferongames.com/post/fix_your_timestep/
    renderLoop(renderer);
})();

function renderLoop(renderer) {
    let t = 0.0;
    let currentTime = time.seconds();
    let accumulator = 0;

    function tick() {

        let newTime = time.seconds();
        let deltaT = newTime - currentTime;
        currentTime = newTime;

        t += deltaT;

        accumulator += deltaT;

        if (accumulator >= 1 / 30.0) {
            accumulator = 0;
            renderer.draw();
        }

        scheduleTick(1);
    }

    function scheduleTick(time) {
        setTimeout(() => tick(), time);
    }

    scheduleTick(0);
}
