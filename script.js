const x = 'x';
const o = 'o';

// in console 
function gameOn() {
    const board = [];
    

    // let them be numbers
    let scoreXDom = document.querySelector('.score-x');
    let scoreODom = document.querySelector('.score-o');
    let scoreX = parseInt(scoreXDom.textContent, 10) || 0;
    let scoreO = parseInt(scoreODom.textContent, 10) || 0;

    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6] 
    ];

    for (let i = 0; i < 9; i++) {
        board.push(0);
    }

    return {
        insertSymbol(symbol, cellNum) {
            if (cellNum < 0 || cellNum > 8) {
                return "Invalid cell number";
            }
            if (board[cellNum] !== 0) {
                console.log('This cell is already taken');
                alert('This cell is already taken');
                return;
            } else {
                board[cellNum] = symbol;
            }

            
        },
        giveResult() {
            console.log(board);
        },
        checkWinner() {
            let winner = null;

            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];

                if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
                    winner = board[a];
                    break;
                }
            }

            

            if (winner) {
                
                if (winner === 'x') {
                    scoreX++;
                } else {
                    scoreO++;
                }
                console.log(winner)
                
                scoreXDom.textContent = scoreX;
                scoreODom.textContent = scoreO;
                board.fill(0);

                

                confetti(); 
                resetGame(); 
            } else if (!board.includes(0)) {
                console.log('The game is a draw');
                alert('The game is a draw');
                board.fill(0);
                resetGame();
            }
        }
    }
}


// graphic
const containerDiv = document.querySelectorAll('.container-div')
let symbolToInsert = 'x';

const game = gameOn();


containerDiv.forEach((div) => {
    div.addEventListener('click', () => {
        const symbol = document.createElement('img');
        
        const cellNum = div.getAttribute('data-index');
        

        if(div.querySelector('img')){
            return;
        } else {
            if(symbolToInsert === 'x'){
                symbol.src = 'img/cross.svg';
                
                symbolToInsert = 'o';
            } else if(symbolToInsert === 'o'){
                
                symbol.src = 'img/circle.svg';
                symbolToInsert = 'x';
            }
        }

        div.appendChild(symbol);
        game.insertSymbol(symbolToInsert, cellNum);
        game.checkWinner();
        
    })
})



// reset the game 
function resetGame(){
    const containerDiv = document.querySelectorAll('.container-div');
    containerDiv.forEach(div => {
        const img = div.querySelector('img');
        if(img){
            div.removeChild(img);
        }
    })
}




