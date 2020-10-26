var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
//indico tutte le combinazioni vincenti possibili
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    /*The Array.from() è un metodo statico che crea una copia di 
    un'istannza di un array, da un tipo array o un oggetto iterabile 
    restituendo un nuovo array*/
    
    //Array(9) crea un array di 9 elementi 
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	turn(square.target.id, huPlayer)
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
}