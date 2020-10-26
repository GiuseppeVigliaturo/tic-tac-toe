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
    //trovo la cella con l'id dell'elemento cliccato e aggiungo il simbolo
    document.getElementById(squareId).innerText = player;
    //
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

/*funzione che controlla se abbiamo vinto o no 
*passo come parametri un array con le combinazioni e il simbolo
*/
function checkWin(board, player) {
    //a = accumulatore 
    /**
     * L'accumulatore accumula i valori di ritorno del callback. 
     * È il valore accumulato precedentemente 
     * restituito nell'ultima chiamata del callback o initialValue,
     *  se è stato fornito
     */
    //e = elemento corrente 
    //indice
	let plays = board.reduce((a, e, i) => 
        //se la cella contiene il simbolo dell'utente 
        //allora aggiungo anche l'indice di questa cella all'array a
        //altrimenti ritorna l'array precedente e non aggiunge nulla
        (e === player) ? a.concat(i) : a, []
        //in questo modo avrò tutti gli indici delle posizioni sulla griglia 
        //in cui il giocatore ha messo il proprio simbolo
        );
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
        //con win intendo la combinazione e index l'indice della combinazione
        /*controllo se le posizioni piene sullo schermo
        corrispondono a una combo vincente
        salvando l'indice e il simbolo cosi da sapere se 
        apartiene al giocatore o al PC
        */
		if (win.every(elem => plays.indexOf(elem) > -1)) {
            //con elem intendo gli elementi della singola combinazione
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}
/*il metodo concat unisce due o più array
         *  Questo metodo non modifica l'array esistente
         * ma ritorna un nuovo array.
         */
function gameOver(gameWon) {
    //gamewon è un oggetto con due proprietà
    //cerco tra la proprietà index
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
    }
    //dopo che è uscita una combo vincente non posso più cliccare su 
    //nessuna cella
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
}
