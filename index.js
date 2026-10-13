
const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

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

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        );
    });
}

function handleClick(event) {
    const box = event.target;
    const index = Number(box.dataset.index);

    if (board[index] !== "" || gameOver) {
        return;
    }

    board[index] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        boxes.forEach(box => box.disabled = true);
        return;
    }

    if (board.every(square => square !== "")) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    boxes.forEach(box => {
        box.textContent = "";
        box.disabled = false;
    });

    statusText.textContent = "Player X's turn";
});
