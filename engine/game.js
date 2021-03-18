export default class Game{
    constructor(size) {
        this.moveListeners = [];
        this.winListeners = [];
        this.loseListeners = [];
        if (size < 2) {
            this.size = 4;
        }
        this.size = size;
        this.boardSize = size*size;
        this.gameState = {
            board: [],
            score: 0,
            won: false,
            over: false
        }

       let value = [];
        for (let i = 0; i < this.boardSize - 2; i++) {
            value.push(0);
        }
        for (let i = 0; i < 2; i ++) {
            value.push(randomNum());
        }
        shuffle(value);
        this.gameState.board = value;
    }

    toString(){
        let string = "";
        for(let i = 0; i < this.boardSize; i++){
            if (i % this.size == 0){
                string += "\n";
            }
            string += this.gameState.board[i] + " ";
        }
        string += "\n" + "Score: " + this.gameState.score + "\n";
        string += "\n" + "Won: " + this.gameState.won + ", Over: " + this.gameState.over;
        return string;
    }

    getSize() {
        return this.size;
    }

    getTile(index) {
        return this.gameState.board[index];
    }

    setupNewGame() {
        let value = [];
            for (let i = 0; i < this.boardSize - 2; i++) {
                value.push(0);
            }
            for (let i = 0; i < 2; i ++) {
                value.push(randomNum());
            }
            shuffle(value);
        this.gameState.board = value;
        this.gameState.score = 0;
        this.gameState.win = false;
        this.gameState.over = false;
        this.moveListeners.forEach(l => l(this.gameState));
    }
    loadGame(gameState) {
        this.gameState = gameState;
    }
    getGameState() {
        return this.gameState;
    }
    move(direction) {
        let gameBoardCopy = [...this.gameState.board];
        if (this.gameState.over) {
            return;
        }
        if(direction == "up") {
            //shift, combine, shift

            //first shift
            for(let i = 0; i<this.boardSize; i++) {
                    let tileAbove = findAbove(this.gameState.board, i, this.size);
                    if (this.gameState.board[i] == 0) {
                        // Current Tile is 0 and does not need to be swapped
                    } else if (tileAbove==null || tileAbove!=0) {
                       // Current tile is at the top or has a tile above and does not need to be swapped
                    } else {
                        // Current tile can be swapped, checking how high it can be moved
                        let currentIndex = i - this.size;
                        let toSwap = currentIndex;
                        while(currentIndex >= 0) {
                            if (findAbove(this.gameState.board, currentIndex, this.size) != 0) {
                                toSwap = currentIndex;
                                currentIndex = -1;
                            } else {
                                currentIndex -= this.size;
                            }
                        }
                        // Swapping current tile with highest available tile
                        let temp = this.gameState.board[i];
                        this.gameState.board[i] = this.gameState.board[toSwap];
                        this.gameState.board[toSwap] = temp;
                    }
            }
            // Combing values
            for(let i = 0; i<this.boardSize; i++) {
                let currentTile = this.gameState.board[i];
                let tileBelow = findBelow(this.gameState.board, i, this.size);
                if(tileBelow == currentTile) {
                    this.gameState.board[i] += this.gameState.board[i];
                    this.gameState.board[i + this.size] = 0;
                    this.gameState.score += this.gameState.board[i];
                }
            }
            // Second Shift
            for(let i = 0; i<this.boardSize; i++) {
                let tileAbove = findAbove(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileAbove==null || tileAbove!=0) {
                   // Current tile is at the top or has a tile above and does not need to be swapped
                } else {
                    // Current tile can be swapped, checking how high it can be moved
                    let currentIndex = i - this.size;
                    let toSwap = currentIndex;
                    while(currentIndex >= 0) {
                        if (findAbove(this.gameState.board, currentIndex, this.size) != 0) {
                            toSwap = currentIndex;
                            currentIndex = -1;
                        } else {
                            currentIndex -= this.size;
                        }
                    }
                    // Swapping current tile with highest available tile
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
        }
        if(direction == "down") {
            // First downshift
            for(let i = this.boardSize - 1; i>=0; i--) {
                let tileBelow = findBelow(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileBelow==null || tileBelow!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i + this.size;
                    let toSwap = currentIndex;
                    while(currentIndex < this.boardSize) {
                        if (findBelow(this.gameState.board, currentIndex, this.size) !=0) {
                            toSwap = currentIndex;
                            currentIndex = this.boardSize;
                        } else {
                            currentIndex += this.size;
                        }
                    }
                    // Swapping current tile with lowest available tile
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
            // Combining values
            for(let i = this.boardSize - 1; i>=0; i--) {
                let currentTile = this.gameState.board[i];
                let tileAbove = findAbove(this.gameState.board, i, this.size);
                if(tileAbove == currentTile) {
                    this.gameState.board[i] += this.gameState.board[i];
                    this.gameState.board[i - this.size] = 0;
                    this.gameState.score += this.gameState.board[i];
                }
            }
            // Second downshift
            for(let i = this.boardSize - 1; i>=0; i--) {
                let tileBelow = findBelow(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileBelow==null || tileBelow!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i + this.size;
                    let toSwap = currentIndex;
                    while(currentIndex < this.boardSize) {
                        if (findBelow(this.gameState.board, currentIndex, this.size) !=0) {
                            toSwap = currentIndex;
                            currentIndex = this.boardSize;
                        } else {
                            currentIndex += this.size;
                        }
                    }
                    // Swapping current tile with lowest available tile
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
        }
        if(direction == "left") {
            // First leftshift
            for (let i = 0; i < this.boardSize; i++) {
                let tileLeft = findLeft(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileLeft==null || tileLeft!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i - 1;
                    let toSwap = currentIndex;
                    let looping = true;
                    while(looping) {
                        if ((currentIndex % this.size) == 0) {
                            looping = false;
                            if (this.gameState.board[currentIndex] == 0) {
                                toSwap = currentIndex;
                            }
                        } else if (findLeft(this.gameState.board, currentIndex, this.size) != 0) {
                            toSwap = currentIndex;
                            looping = false;
                        } else {
                            currentIndex--;
                        }
                    }
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
            // Combining Values
            for (let i = 0; i < this.boardSize; i++) {
                let currentTile = this.gameState.board[i];
                let tileRight = findRight(this.gameState.board, i, this.size);
                if(tileRight == currentTile) {
                    this.gameState.board[i] += this.gameState.board[i];
                    this.gameState.board[i + 1] = 0;
                    this.gameState.score += this.gameState.board[i];
                }
            }
            // Second leftshit
            for (let i = 0; i < this.boardSize; i++) {
                let tileLeft = findLeft(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileLeft==null || tileLeft!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i - 1;
                    let toSwap = currentIndex;
                    let looping = true;
                    while(looping) {
                        if ((currentIndex % this.size) == 0) {
                            looping = false;
                            if (this.gameState.board[currentIndex] == 0) {
                                toSwap = currentIndex;
                            }
                        } else if (findLeft(this.gameState.board, currentIndex, this.size) != 0) {
                            toSwap = currentIndex;
                            looping = false;
                        } else {
                            currentIndex--;
                        }
                    }
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
        }
        if (direction == "right") {
            // First rightshift
            for (let i = this.boardSize - 1; i >=0; i--) {
                let tileRight = findRight(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileRight=null || tileRight!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i + 1;
                    let toSwap = currentIndex;
                    let looping = true;
                    while(looping) {
                        if (((currentIndex + 1) % this.size) == 0) {
                            looping = false;
                            if (this.gameState.board[currentIndex] == 0) {
                                toSwap = currentIndex;
                            }
                        } else if (findRight(this.gameState.board, currentIndex, this.size) != 0) {
                            toSwap = currentIndex;
                            looping = false;
                        } else {
                            currentIndex++;
                        }
                    }
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
            // Combining values
            for (let i = this.boardSize - 1; i >=0; i--) {
                let currentTile = this.gameState.board[i];
                let tileLeft = findLeft(this.gameState.board, i, this.size);
                if(tileLeft == currentTile) {
                    this.gameState.board[i] += this.gameState.board[i];
                    this.gameState.board[i - 1] = 0;
                    this.gameState.score += this.gameState.board[i];
                }
            }
            // Second rightshift
            for (let i = this.boardSize - 1; i >=0; i--) {
                let tileRight = findRight(this.gameState.board, i, this.size);
                if (this.gameState.board[i] == 0) {
                    // Current Tile is 0 and does not need to be swapped
                } else if (tileRight=null || tileRight!=0) {
                   // Current tile is at the bottom or has a tile below and does not need to be swapped
                } else {
                    let currentIndex = i + 1;
                    let toSwap = currentIndex;
                    let looping = true;
                    while(looping) {
                        if (((currentIndex + 1) % this.size) == 0) {
                            looping = false;
                            if (this.gameState.board[currentIndex] == 0) {
                                toSwap = currentIndex;
                            }
                        } else if (findRight(this.gameState.board, currentIndex, this.size) != 0) {
                            toSwap = currentIndex;
                            looping = false;
                        } else {
                            currentIndex++;
                        }
                    }
                    let temp = this.gameState.board[i];
                    this.gameState.board[i] = this.gameState.board[toSwap];
                    this.gameState.board[toSwap] = temp;
                }
            }
        }
        // Checking to make sure the game state has changed
        let hasChanged = false;
        for (let i = 0; i < this.boardSize; i++) {
            if (gameBoardCopy[i] != this.gameState.board[i]) hasChanged = true;
        }
        if(!hasChanged) {
            return;
        }
        // Adding tile to board
        let indices = []
        for(let i = 0; i < this.boardSize; i++) {
            if (this.gameState.board[i] == 0) {
                indices.push(i);
            }
        }
        this.gameState.board[indices[Math.floor(Math.random() * indices.length)]] = randomNum();
        // A successful move has occurred so I update the moveListeners
        this.moveListeners.forEach(l => l(this.gameState));
        // Checking if the win state has been changed
        if(this.gameState.board.includes(2048)) {
            this.gameState.won = true;
            this.gameState.over = true;
            this.winListeners.forEach(l => l());
        }
        // Checking if the over state has been changed
        let full = true;
        if(this.gameState.board.includes(0)) {
            full = false;
        }
        let canMove = false;
        if (full) {
            for(let i = 0; i < this.boardSize; i++) {
                if(this.gameState.board[i] == findAbove(this.gameState.board, i, this.size) || 
                this.gameState.board[i] == findBelow(this.gameState.board, i, this.size) || 
                this.gameState.board[i] == findLeft(this.gameState.board, i, this.size) || 
                this.gameState.board[i] == findRight(this.gameState.board, i, this.size)) {
                    canMove = true;
                }
            }
        }
        if(!canMove && full) {
            this.gameState.over = true;
            this.loseListeners.forEach(l => l());
        }
        
    }
    onMove(callback) {
        this.moveListeners.push(callback);
    }
    onLose(callback) {
        this.loseListeners.push(callback);
    }
    onWin(callback) {
        this.winListeners.push(callback);
    }
}


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function randomNum() {
    let temp = Math.random();
            if (temp <= 0.9) {
                return 2;
            } else {
                return 4;
            }
}

function findBelow(board, index, size) {
    if (index > board.length - size) {
        return null;
    } else {
        return board[index + size];
    }
}

function findAbove(board, index, size) {
    if (index < size) {
        return null;
    } else {
        return board[index - size];
    }
}

function findLeft(board, index, size) {
    let tempIndex = 0;
    for(let i = 0; i < size; i++) {
        if (index == tempIndex) {
            return null;
        }
        tempIndex += size;
    }
    return board[index - 1];
}

function findRight(board, index, size) {
    let tempIndex = size - 1;
    for (let i = 0; i < size; i++) {
        if (index == tempIndex) {
            return null;
        }
        tempIndex += size;
    }
    return board[index + 1];
}
