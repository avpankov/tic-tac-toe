let startButton = document.querySelector('.button');
let playAgainButton = document.querySelector('.modal__winner .button');
let openResultsButton = document.querySelector('.results');
let startModal = document.querySelector('.modal__start');
let winnerModal = document.querySelector('.modal__winner');
let resultsModal = document.querySelector('.modal__results');
let ol = document.querySelector('.modal__results ol');
let closeResultsButton = document.querySelector('.results__close');
let winnerAnnouncement = document.querySelector('.modal__winner .modal__header');
let field = document.querySelector('.field');
let cells = document.getElementsByClassName('cell');
let counter = 0;
let winner = '';
let start;

// field borders
let verticalFirst = document.querySelector('.border-vertical-first');
let verticalSecond = document.querySelector('.border-vertical-second');
let horizontalFirst = document.querySelector('.border-horizontal-first');
let horizontalSecond = document.querySelector('.border-horizontal-second');

startButton.addEventListener('click', () => {
    start = new Date();
    showField();
});

openResultsButton.addEventListener('click', () => {
    resultsModal.style.display = 'flex';

    for (let i = 0; i < localStorage.length; i++) {
        let li = document.createElement('li');
        li.innerText = `${localStorage.key(i)} ${localStorage[localStorage.key(i)]}`;
        ol.prepend(li);
    }
    resultsModal.prepend(ol);
})

closeResultsButton.addEventListener('click', () => {
    resultsModal.style.display = 'none';
})

function playGame(e) {
    if (e.target.classList != 'cell') return;
    else if (counter % 2 === 0) {
        e.target.innerText = 'X';
        counter++;
    } else {
        e.target.innerText = 'O';
        counter++;
    }
    defineWinner();
}

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
        } else if (counter === 9) {
            winner = 'Draw!'
            showResult(winner);
        }
    }
}

function showResult(winner) {
    field.removeEventListener('click', playGame);
    winnerModal.style.opacity = '1';
    winnerModal.style.top = 'calc(50vh - 175px)';
    winnerAnnouncement.innerText = winner != 'Draw!' ? `${winner} win!` : 'Draw!';
    updateLocalStorage(winner);
    playAgainButton.addEventListener('click', () => {
        hideField();
        setTimeout(() => {
            showField();
            start = new Date();
        }, 1000);
    })
    counter = 0;
}

function showField() {
    startModal.style.display = 'none';
    winnerModal.style.top = '-1000px';

    horizontalFirst.style.width = '600px';
    verticalFirst.style.height = '600px';

    setTimeout(() => {
        verticalSecond.style.height = '600px';
        horizontalSecond.style.width = '600px';
    }, 300);

    field.addEventListener('click', playGame);
}

function hideField() {
    horizontalFirst.style.width = '0';
    verticalFirst.style.height = '0';

    setTimeout(() => {
        verticalSecond.style.height = '0';
        horizontalSecond.style.width = '0';
    }, 300);

    for (let cell of cells) {
        cell.innerText = '';
    }
}

function updateLocalStorage(winner) {
    let date = new Date();
    let datestring = date.getDate()  + "." + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "." + date.getFullYear() + " " +
        date.getHours() + ":" + date.getMinutes();
    let time = Math.round(((Date.now() - start) / 1000));
    localStorage.setItem(datestring, winner != 'Draw!' ? `${winner.toLowerCase()} won in ${time}s` : `draw in ${time}s`);
    if (localStorage.length > 10) {
        localStorage.removeItem(localStorage.key(0));
    }
}