export default class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        window.addEventListener('keydown', event => {
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.model.move("left");
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.model.move("up");
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.model.move("right");
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.model.move("down");
                    break; 
            }
        })
    }
}
