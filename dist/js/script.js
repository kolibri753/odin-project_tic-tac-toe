const cells = document.querySelectorAll(".board__cell");
const clearBtn = document.querySelector(".refresh-btn");
const modalWindow = document.querySelector(".modal-overlay");
const btnModalWindowClose = document.getElementById("modalClose");
const playerOne = 'x';
const playerTwo = 'o';
const winCombintaions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let playerTwoTurn;
let playerOneWin = 0;
let playerTwoWin = 0;
let tiesCount = 0;

startGame();

function openModalWindow() {
  modalWindow.classList.add("open-modal");
}

function closeModalWindow() {
  modalWindow.classList.remove("open-modal");
}

function startGame() {
  playerTwoTurn = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", playerClick, { once: true })
  });
}

btnModalWindowClose.addEventListener("click", closeModalWindow);
clearBtn.addEventListener('click', clear);

function playerClick(e) {
  const hTurn = document.querySelector(".turn__player");
  const cell = e.target;
  const currentPlayer = playerTwoTurn ? playerTwo : playerOne;
  const nextPlayer = playerTwoTurn ? playerOne : playerTwo;
  const playerName = playerTwoTurn ? "Player 2" : "Player 1"; 
  hTurn.textContent = nextPlayer;
  placeMark(cell, currentPlayer);
  if(checkWin(currentPlayer)) {
    currentPlayer == playerOne ? playerOneWin++ : playerTwoWin++;
    openModalWindow();
    const winnerText = document.querySelector(".modal__text");
    winnerText.textContent = `${playerName} who played with '${currentPlayer}' WINS!`;
    endGame();
  } else if (isDraw()) {
    tiesCount++;
    endGame();
  }
  swapTurns();
}

function placeMark(cell, currentPlayer) {
  cell.innerText = currentPlayer;
}

function swapTurns() {
  playerTwoTurn = !playerTwoTurn;
}

function checkWin(currentPlayer) {
  return winCombintaions.some(combination => {
    return combination.every(index => {
      return cells[index].textContent.includes(currentPlayer);
    })
  })
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent.includes(playerOne) || 
           cell.textContent.includes(playerTwo);
  })
}

function endGame() {
  const scorePlayerOne = document.querySelector(".info-block__score--user1");
  const scoreTies = document.querySelector(".info-block__score--tie");
  const scorePlayerTwo = document.querySelector(".info-block__score--user2");
  
  // if (draw) {
  //   scoreTies.innerHTML = tiesCount;
  // } else {
  //   if(playerTwoTurn) {
  //     sc
  //   }
  // }
  
  scoreTies.textContent = tiesCount;
  scorePlayerOne.textContent = playerOneWin;
  scorePlayerTwo.textContent = playerTwoWin;

  clear();
  startGame();
}

function clear() {
  cells.forEach(cell => {
    cell.innerText = '';
  });
  startGame();
}