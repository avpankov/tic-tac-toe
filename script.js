let startButton = document.querySelector('.button');
let playAgainButton = document.querySelector('.modal__winner .button')
let startModal = document.querySelector('.modal__start');
let winnerModal = document.querySelector('.modal__winner');
let winnerAnnouncement = document.querySelector('.modal__winner .modal__header');
let field = document.querySelector('.field');
let cells = document.getElementsByClassName('cell');
let counter = 0;
let winner = '';

// field borders
let verticalFirst = document.querySelector('.border-vertical-first');
let verticalSecond = document.querySelector('.border-vertical-second');
let horizontalFirst = document.querySelector('.border-horizontal-first');
let horizontalSecond = document.querySelector('.border-horizontal-second');

startButton.addEventListener('click', showField);

field.addEventListener('click', (e) => {
    if (e.target.classList != 'cell') return;
    else if (counter % 2 === 0) {
        e.target.innerText = 'X';
        counter++;
    } else {
        e.target.innerText = 'O';
        counter++;
    }
    defineWinner();
});

function defineWinner() {
    let winningСombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningСombinations.length; i++) {
        if (cells[winningСombinations[i][0]].innerText === 'X' && cells[winningСombinations[i][1]].innerText === 'X' && cells[winningСombinations[i][2]].innerText === 'X') {
            winner = 'Crosses';
            showResult(winner);
        } else if (cells[winningСombinations[i][0]].innerText === 'O' && cells[winningСombinations[i][1]].innerText === 'O' && cells[winningСombinations[i][2]].innerText === 'O') {
            winner = 'Noughts';
            showResult(winner);
        }
    }
}

function showResult(winner) {
    winnerModal.style.opacity = '1';
    winnerModal.style.top = 'calc(50vh - 175px)';
    winnerAnnouncement.innerText = `${winner} win!`;
    playAgainButton.addEventListener('click', () => {
        hideField();
        setTimeout(showField, 1000);
    })
    counter = 0;
}

function showField() {
    startModal.style.display = 'none';
    winnerModal.style.top = '-1000px';

    horizontalFirst.style.width = '900px';
    verticalFirst.style.height = '900px';
    
    setTimeout(() => {
        verticalSecond.style.height = '900px';
        horizontalSecond.style.width = '900px';
    }, 300);
}

function hideField() {
    horizontalFirst.style.width = '0';
    verticalFirst.style.height = '0';
    
    setTimeout(() => {
        verticalSecond.style.height = '0';
        horizontalSecond.style.width = '0';
    }, 300);

        console.log(cells);
    for (let cell of cells) {
        cell.innerText = '';
    }
}