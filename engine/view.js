export default class GameView {
    constructor(model) {
        this.model = model;
        this.div = document.createElement('div');

        let temp = this.createColumnDiv();
        let intro_div = document.createElement('p');
        intro_div.innerHTML = 'Combine the tiles to get 2048 and win!'
        intro_div.id = `intro`;
        intro_div.classList.add('box');
        intro_div.style.color = 'black';
        temp.append(intro_div);
        this.div.append(temp);

        // Create a game table for the board to be on
        let game_table = document.createElement('table');
        game_table.classList.add('center');
        // Loop through the board and add the values to the each tile on the board
        for (let r=0; r<this.model.getSize(); r++) {
            let trow = document.createElement('tr');
            for (let c=0; c<this.model.getSize(); c++) {
                let value = this.model.getGameState().board[c + (r*this.model.getSize())];
                let tile = document.createElement('td');
                let tile_view = document.createElement('div');
                tile_view.classList.add('tile');
                tile_view.classList.add('is-size-3');
                tile_view.id = `Tile-${c + (r*this.model.getSize())}`;
                // add tile value to innerHTML and change background color based on tile value
                if (value == 0) {
                    tile_view.innerHTML = '';
                    tile_view.style.backgroundColor = 'rgba(238,228,218,0.35';
                } else {
                    tile_view.innerHTML = '' + value;
                    switch(value) {
                        case 2:
                            tile_view.style.backgroundColor = 'rgb(238,228,218)';
                            break;
                        case 4:
                            tile_view.style.backgroundColor = 'rgb(237,224,200)';
                            break;
                        case 8:
                            tile_view.style.backgroundColor = 'rgb(242,177,121)';
                            break;
                        case 16:
                            tile_view.style.backgroundColor = 'rgb(245,149,99)';
                            break;
                        case 32:
                            tile_view.style.backgroundColor = 'rgb(246,124,95)';
                            break;
                        case 64:
                            tile_view.style.backgroundColor = 'rgb(246,94,59)';
                            break;
                        case 128:
                            tile_view.style.backgroundColor = 'rgb(237,207,114)';
                            break;
                        case 256:
                            tile_view.style.backgroundColor = 'rgb(237,204,97)';
                            break;
                        case 512:
                            tile_view.style.backgroundColor = 'rgb(237,200,80)';
                            break;
                        case 1024:
                            tile_view.style.backgroundColor = 'rgb(237,197,63)';
                            break;
                        case 2048:
                            tile_view.style.backgroundColor = 'rgb(237,194,46)';
                            break;
                    }
                }
                // Append tile to the row
                tile.append(tile_view);
                trow.append(tile);
            }
            // Append the current row to the game table
            game_table.append(trow);
        }
        // Append the table to the div
        this.div.append(game_table);

        // Create a restart button that will restart the game when clicked
        let restart_div = document.createElement('div');
        let button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('is-info')
        button.classList.add('is-medium')
        button.innerHTML = 'Restart Game';
        button.style.margin = '0 auto';
        button.style.display = 'block'
        button.addEventListener ('click', () => {
            model.setupNewGame()
            $(`#intro`).html('Combine the tiles to get 2048 and win!');
            $(`#intro`).css('background-color', 'white');
            $(`#intro`).css('color', 'black');
        });
        restart_div.appendChild(button);
        this.div.append(restart_div);

        // Creates a score div that shows the current score of the game
        let column_div = this.createColumnDiv();
        let score_div = document.createElement('div');
        score_div.innerHTML = 'Score: ' + this.model.getGameState().score;
        score_div.classList.add('box');
        score_div.classList.add('score');
        score_div.id = 'score';
        score_div.style.color = 'black'
        column_div.append(score_div);
        this.div.append(column_div);


        // Adds a function to the move listeners in the model that re-renders the tiles with the correct value,
        // background color, and score
        this.model.onMove(() => {
            $('#score').html('Score: ' + this.model.getGameState().score);
            for (let r=0; r<this.model.getSize(); r++) {
                for (let c=0; c<this.model.getSize(); c++) {
                    let index = (c + (r*this.model.getSize()));
                    let value = this.model.getGameState().board[c + (r*this.model.getSize())];
                    if (value == 0) {
                        $(`#Tile-${index}`).html('');
                        $(`#Tile-${index}`).css('background-color', 'rgba(238,228,218,0.35');
                    } else {
                        $(`#Tile-${index}`).html('' + value);
                        switch(value) {
                            case 2:
                                $(`#Tile-${index}`).css('background-color', 'rgb(238,228,218)');
                                break;
                            case 4:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,224,200)');
                                break;
                            case 8:
                                $(`#Tile-${index}`).css('background-color', 'rgb(242,177,121)');
                                break;
                            case 16:
                                $(`#Tile-${index}`).css('background-color', 'rgb(245,149,99)');
                                break;
                            case 32:
                                $(`#Tile-${index}`).css('background-color', 'rgb(246,124,95)');
                                break;
                            case 64:
                                $(`#Tile-${index}`).css('background-color', 'rgb(246,94,59)');
                                break;
                            case 128:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,207,114)');
                                break;
                            case 256:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,204,97)');
                                break;
                            case 512:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,200,80)');
                                break;
                            case 1024:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,197,63)');
                                break;
                            case 2048:
                                $(`#Tile-${index}`).css('background-color', 'rgb(237,194,46)');
                                break;
                        }
                    }
                }
            }
        })

        // If the player wins the game, creates a won_div displaying a win message and appends it to the div
        this.model.onWin(() => {
            $(`#intro`).html('You won! Press the restart button to play again.');
            $(`#intro`).css('background-color', 'green');
            $(`#intro`).css('color', 'white');
        })

        // If the player loses the game, creates a lost_div displaying a lost message and appends it to the div
        this.model.onLose(() => {
            $(`#intro`).html('You lost. Press the restart button to play again!');
            $(`#intro`).css('background-color', 'red');
            $(`#intro`).css('color', 'white');
        })
    }

    // Simply creates a new column div when requested
    createColumnDiv() {
        let column_div = document.createElement('div');
        column_div.classList.add('column');
        column_div.classList.add('is-one-third');
        column_div.classList.add('center');
    
        return column_div;
    }
}

