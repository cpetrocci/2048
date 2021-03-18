import Game from "./game.js";
import GameView from "./view.js";
import GameController from "./controller.js";
window.addEventListener('load', () => {
    let model = new Game(2);
    let view = new GameView(model);
    let controller = new GameController(model, view);
    let body = document.querySelector("body");
    body.append(view.div);
});