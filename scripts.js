const GameBoard = function () {
    const rows = 3;
    const column = 3;
    const board = []

    //make the board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i][j] = " ";
        }
    }

    const getBoard = () => board;

    //check if cell is available then place the move
    const placeMove = (row, col, currentPlayer) => {
   
        if (board[row][col] === " ") { 
            board[row][col] = currentPlayer;
        }
        else return "Invalid";
    }

    const printBoard = () => {
        console.table(board);
    }

    return {getBoard, placeMove, printBoard}
}

const GameControl = function () {
    
    const board = GameBoard();
    let theBoard = board.getBoard();

    const playerOne = "X";
    const playerTwo = "O";
    let currentPlayer = playerOne;

    let gameOver = false;

    //switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne && !gameOver ? playerTwo : playerOne;
    }
    
    const getCurrentPlayer = () => currentPlayer;
    //print board after every round
    const PrintRound = () => {
        board.printBoard();
        if (!gameOver){
        console.log(`${currentPlayer} turn`);
        }
        else {console.log(`Player ${currentPlayer} has won`)}
    }
    //play 1 round
    const playRound = (row, col) => {

        
        //place the move
        let move = board.placeMove(row, col, currentPlayer);
        if (move === "Invalid") {
            console.log("invalid move");
            return;
        } 
        
        const victoryScreen = function () {
            gameOver = true;
        }
        //check win condition
        //check rows first
        theBoard.forEach((rows) => {

            //win condition for rows
            if (rows.every(i => i === rows[0]) && rows[0] != " "){
                console.log("win");
                victoryScreen();
                return;
            }
           
        });
         //check win condition for columns
        let verticalBoard = theBoard[0].map((cols, index) => theBoard.map((cols) => cols[index]));

        verticalBoard.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " "){
                console.log("win");
                victoryScreen();
                return;
            }
        });

        //check win condition for diagonal
        let diag = [];
        diag.push(theBoard.map((rows, index) => rows[index]), 
                          theBoard.slice().reverse().map((rows, index) => rows[index]));
        diag.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " "){
                console.log("win");
                victoryScreen();
                return;
            }
        });
        
        //switch the player
        switchPlayer();
        //print the board
        PrintRound();
    }
    return {playRound, getCurrentPlayer}
}
const game = GameControl();
game.playRound(1,2);
game.playRound(2,1);
game.playRound(0,2);
game.playRound(2,0);
game.playRound(2,2);
