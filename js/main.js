
/*----- constants -----*/
const lookup = {
    '1': 'purple',
    '-1': 'lime',
    'null': 'white'
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7]
    [2, 5, 8]
    [0, 5, 8]
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('td tr');
const message = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/

initialize();

function handleMove(evt) {
//'look at how pointer-events 'none' is being used in CSS to make div ignore clicks
//get i of a board square
const idx = parseInt(evt.target.id.replace('sq', ''));
//if square NOT avail, return
if(board[idx] || winner) return; //ask about this--return what?
// update state (board, turn, winner)
board[idx] = turn;
turn *= -1;
winner = getWinner(); 
render();
}

function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if(Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + 
            board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
}

function render() {
    board.forEach(function(sq, idx) {
        squares[idx].style.background = lookup[sq];
    });
    if (winner === 'T') {
        message.innerHTML = 'Rats, another tie!';
    } else if (winner) {
        message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
    } else {
        message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
    }
}
    
    function initialize() {
        board = new Array(9).fill(null);
        turn = 1;
        winner = null;
        render();
    }
