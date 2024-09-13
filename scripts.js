const GameBoard = function () {
    const rows = 3;
    const column = 3;
    const board = []

    //make the board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i][j] = 0;
            
        }
    }

    const createBoard = () => board;
    board[2][1] = "X"
    console.log(board)
    //get input
    return {createBoard}
}

GameBoard()

const PlayerControl = function () {
    
    const playerOne = "x";
    const playerTwo = "o";
    let currentPlayer = playerOne;

    //switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne 
    }

    const playRound = () => {

    }

    return {switchPlayer}

}