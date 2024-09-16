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

    //switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    
    //print board after every round
    const PrintRound = () => {
        board.printBoard();
        console.log(`${currentPlayer} turn`)
    }
    //play 1 round
    const playRound = (row, col) => {
        //place the move
        let move = board.placeMove(row, col, currentPlayer);
    if (move === "Invalid")  {
        console.log("invalid move");
        return;
    } 

        //check win condition
        //check rows first
        theBoard.forEach((rows) => {

            //win condition for rows
            if (rows.every(i => i === rows[0]) && rows[0] != " "){
                console.log("win");
                return;
            }
           
        });
         //check win condition for columns
        let verticalBoard = theBoard[0].map((cols, index) => theBoard.map((cols) => cols[index]));

        verticalBoard.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " "){
                console.log("win");
                return;
            }
        });

        //check win condition for diagonal
        let diag = [];
        diag.push(theBoard.map((rows, index) => rows[index]), 
                          [...theBoard].reverse().map((rows, index) => rows[index]));
        console.log(diag)
        diag.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " "){
                console.log("win");
                return;
            }
        });
        

        
        //switch the player
        switchPlayer();
        //print the board
        PrintRound();
    }
    return {playRound}
}
const game = GameControl();
// game.playRound(1,2);
// game.playRound(2,1);
// game.playRound(0,2);
// game.playRound(2,0);
// game.playRound(2,2);

// const diag=a=>a.map((v,i)=>v[i]);
let arr =[ 
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

let newArr = arr[0].map((item, index) => {
   return arr.map((thing) => thing[index])
})



console.table(newArr);
console.table(arr);