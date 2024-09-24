const GameBoard = function () {
    const rows = 3;
    const column = 3;
    const board = [];

    //make the board
    const makeBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < column; j++) {
                board[i][j] = " ";
            }
        }
    }
    makeBoard();

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

    return {getBoard, placeMove, printBoard, makeBoard}
}

const GameControl = function () {
    
    const board = GameBoard();
    let gameBoard = board.getBoard();

    const playerOne = "X";
    const playerTwo = "O";
    let currentPlayer = playerOne;

    let gameOver = false;
    let gameDraw = false;
    
    if(gameOver){return}
    //switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    
    const getCurrentPlayer = () => currentPlayer;

    const getGameState = () => {return {gameOver, gameDraw}}

    //play 1 round
    const playRound = (row, col) => {

        if(!gameOver) {
            //place the move
            let move = board.placeMove(row, col, currentPlayer);
            if (move === "Invalid") {
                console.log("invalid move");
                return;
            } 
        }
        const victoryScreen = function (arr) {
            gameOver = true;
            //return the winning line
            console.log(arr.flat());
        }
        //check win condition
        //check rows first
        gameBoard.forEach((rows) => {

            //win condition for rows
            if (rows.every(i => i === rows[0]) && rows[0] != " " && !gameOver){
                victoryScreen(gameBoard);
                return;
            }
           
        });
         //check win condition for columns
        let verticalBoard = gameBoard[0].map((cols, index) => gameBoard.map((cols) => cols[index]));

        verticalBoard.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " " && !gameOver){
                victoryScreen(gameBoard);
                return;
            }
        });

        //check win condition for diagonal
        let diag = [];
        diag.push(gameBoard.map((rows, index) => rows[index]), 
                          gameBoard.slice().reverse().map((rows, index) => rows[index]));
        diag.forEach((cols) => {
            if(cols.every(i => i === cols[0]) && cols[0] != " " && !gameOver){
                victoryScreen(gameBoard);
                return;
            }
            
        });
        board.printBoard();

        //look for the winning row
        

        //draw condition
        
        
        if(gameBoard.findIndex(arr => arr.includes(" ")) === -1 && !gameOver){
            gameOver = true;
            gameDraw = true;
        }

        //switch the player
        if (!gameOver){
        switchPlayer();}
    }
    
    const resetBoard = () => {
        board.makeBoard();
        
        currentPlayer = playerOne;

        gameOver = false;
        gameDraw = false;
    }

    return {playRound, getCurrentPlayer, getBoard: board.getBoard, getGameState, resetBoard}
}

const ScreenControl = function () {

    const board = document.querySelector(".board");
    const msg = document.querySelector(".msg");

    const playerOneName = document.querySelector("#playerOne");
    const playerTwoName = document.querySelector("#playerTwo");
    
    const game = GameControl();
    
    const makeNameUppercase = (name) => {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name
    }

    const updateScreenText = () => {
        
        if(playerOneName.value === "" && playerTwoName.value === ""){
            msg.textContent = "Enter your name and play";
            return
        }

        msg.textContent = game.getCurrentPlayer() === "X" ? 
            `It is ${makeNameUppercase(playerOneName.value)}'s turn` : 
            `It is ${makeNameUppercase(playerTwoName.value)}'s turn`;
        

        if(game.getGameState().gameOver && !game.getGameState().gameDraw){
            msg.textContent = game.getCurrentPlayer() === "X" ? 
                `${makeNameUppercase(playerOneName.value)} won! Congratulation!!` : 
                `${makeNameUppercase(playerTwoName.value)} won! Congratulation!!`
        }
        else if(game.getGameState().gameOver && game.getGameState().gameDraw){
            msg.textContent = `The game is drawn!`
        }
    }

    const restartGame = () => {
        const restartBtn = document.querySelector(".restartBtn");
        restartBtn.addEventListener("click", () => {
            game.resetBoard();
            updateScreen();
        })
    }
   
    const updateScreen = () => {

        board.textContent = "";

        restartGame();
        updateScreenText();

        game.getBoard().forEach((row, rowIndex) => {
            
            row.forEach((col, colIndex) =>{
                
                const cell = document.createElement("div");
                board.appendChild(cell);
                cell.className = "cell";
                cell.setAttribute("row", rowIndex);
                cell.setAttribute("col", colIndex);
                cell.textContent = `${game.getBoard()[rowIndex][colIndex]}`
            })
        });

        const cell = document.querySelectorAll(".cell");
        cell.forEach((item) => {
            //play round after each click
            item.addEventListener("click", (e) => {
                let row = item.getAttribute("row");
                let col = item.getAttribute("col");
                game.playRound(row, col);
                updateScreen();
            });
        });
    }
        updateScreen();
}

const screen = ScreenControl();
