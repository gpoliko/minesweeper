document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells: [],
};

var boardSize = prompt("Pick what board size you would like to play on? 3, 4, 5, or 6?")

// Board generation
function boardGen() {
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            board.cells.push({
                row: i,
                col: j,
                isMine: randMines(),
                hidden: true,
            });
        }
    }
}

boardGen();

function reload() {
    window.location.reload();
}

function startGame() {
    for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);

        document.addEventListener('click', checkForWin);
        document.addEventListener('contextmenu', checkForWin);
    }

    // Don't remove this function call: it makes the game work!
    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

    // Loop to iterate through all the cells of the board
    for (var i = 0; i < board.cells.length; i++) {
        // If cell is a mine and has not been flagged, break the loop
        if (board.cells[i].isMine === true && board.cells[i].isMarked === false)
            return;

        // If all mines are marked and hidden cells exist, break the loop
        if (board.cells[i].isMine === false && board.cells[i].hidden === true)
            return;
    }

    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    let mines = 0;

    for (var i = 0; i < surrounding.length; i++) {
        if (surrounding[i].isMine === true) {
            mines++;
        }
    }
    return mines;
}

function randMines() {
    var rand = Math.random();
    if (rand < 0.4) {
        return true;
    }
    return false;
}