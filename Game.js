
let turn = "X";
let gameEnded = false;
let cells = document.querySelectorAll(".cell");

document.addEventListener("keydown", handleKeyPress);
document.getElementById("reset").addEventListener("click", resetGame);

function handleKeyPress(event) {
    if (!gameEnded) {
        const key = event.key;
        if (key >= "1" && key <= "9") {
            const cellIndex = parseInt(key) - 1;
            const cell = cells[cellIndex];
            if (cell.innerText === "") {
                cell.innerText = turn;
                cell.classList.add("cell-selected");
                updateGameState();
            }
        }
    }
}
function updateGameState() {
    if (checkWin()) {
        gameEnded = true;
        document.querySelector("#turn").textContent = `Player ${turn} wins!`;
    } else if (checkDraw()) {
        gameEnded = true;
        document.querySelector("#turn").textContent = "Draw!";
    } else {
        turn = turn === "X" ? "O" : "X";
        document.querySelector("#turn span").innerText = turn;
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
});

document.getElementById("reset").addEventListener("click", resetGame);

function cellClicked(event) {
    let cell = event.target;

    if (cell.innerText === "" && !gameEnded) {
cell.innerText = turn;
cell.classList.add("cell-selected");

if (checkWin()) {
    gameEnded = true;
    document.querySelector("#turn").textContent = `Player ${turn} wins!`;
} else if (checkDraw()) {
    gameEnded = true;
    document.querySelector("#turn").textContent = "Draw!";
} else {
    turn = turn === "X" ? "O" : "X";
    document.querySelector("#turn span").innerText = turn;
}
    }
}

function checkWin() {    
    if (
        (cells[0].innerText && cells[0].innerText === cells[1].innerText && cells[1].innerText === cells[2].innerText) ||
        (cells[3].innerText && cells[3].innerText === cells[4].innerText && cells[4].innerText === cells[5].innerText) ||
        (cells[6].innerText && cells[6].innerText === cells[7].innerText && cells[7].innerText === cells[8].innerText) ||
        (cells[0].innerText && cells[0].innerText === cells[3].innerText && cells[3].innerText === cells[6].innerText) ||
        (cells[1].innerText && cells[1].innerText === cells[4].innerText && cells[4].innerText === cells[7].innerText) ||
        (cells[2].innerText && cells[2].innerText === cells[5].innerText && cells[5].innerText === cells[8].innerText) ||
        (cells[0].innerText && cells[0].innerText === cells[4].innerText && cells[4].innerText === cells[8].innerText) ||
        (cells[2].innerText && cells[2].innerText === cells[4].innerText && cells[4].innerText === cells[6].innerText)
       ) {
    return true;
    }
    return false;
}

function checkDraw() {
    for (let cell of cells) {
if (cell.innerText === "") {
    return false;
}
    }
    return true;
}

function resetGame() {
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("cell-selected");
    });

    turn = "X";
    gameEnded = false;
    document.querySelector("#turn").innerText = `Now it's ${turn}'s turn`;
}