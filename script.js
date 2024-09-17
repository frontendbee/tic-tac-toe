const x = 'x';
const o = 'o';

// in console 
function gameOn() {
    const board = [];

    const winningCombinations = [
        [0, 1, 2], // Prima riga
        [3, 4, 5], // Seconda riga
        [6, 7, 8], // Terza riga
        [0, 3, 6], // Prima colonna
        [1, 4, 7], // Seconda colonna
        [2, 5, 8], // Terza colonna
        [0, 4, 8], // Diagonale 1
        [2, 4, 6]  // Diagonale 2
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
            }
            else if (board[cellNum] === 0) {
                board[cellNum] = symbol;
            };

            // checkWinner();
        },
        giveResult(){
            console.log(board);
        },
        checkWinner() {
            let winner = null;

            for(let i = 0; i < winningCombinations.length; i++){
                const [a, b, c] = winningCombinations[i];

                if(board[a] !== 0 && board[a] === board[b] && board[a] === board[c]){
                    winner = board[a];
                    break;
                }
            }

            if(winner){
                console.log('We have a winner! The symbol ' + winner + ' won!');
                alert('We have a winner! The symbol ' + winner + ' won!');
            } else if (!board.includes(0)) {
                console.log('The game is a draw');
                alert('The game is a draw');
            }


        }
    }
}

// graphic
const containerDiv = document.querySelectorAll('.container-div')
let symbolToInsert = 'x';
// const game = gameOn(); // Inizializza il gioco


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

// containerDiv.forEach((div) => {
//     div.addEventListener('click', () => {
//         const cellNum = div.getAttribute('data-index');

//         game.insertSymbol(symbolToInsert, cellNum);
//         game.checkWinner();
//     })
// })