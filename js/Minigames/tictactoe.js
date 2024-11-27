let tictactoeActive = false; // Indica se o jogo está ativo
let board = Array(9).fill(null); // Tabuleiro 3x3 como array linear
let userSymbol = "𝐗"; // Símbolo do jogador
let botSymbol = "𝐎"; // Símbolo da IA

function startTicTacToe() {
    tictactoeActive = true;
    board.fill(null); // Reseta o tabuleiro
    return {
        message: `<pre>1 | 2 | 3<br>4 | 5 | 6<br>7 | 8 | 9</pre>`,
        tictactoeActive: true
    }
}

function handleTicTacToe(userInput) {
    const move = parseInt(userInput.trim()) - 1; // Ajusta a jogada para o índice correto do array

    if (isNaN(move) || move < 0 || move >= 9 || board[move]) {
        return { message: "Jogada inválida! Escolha um número de 1 a 9 que ainda esteja vazio.", tictactoeActive: true };
    }

    // Jogador faz sua jogada
    board[move] = userSymbol;

    // Verifica se o jogador venceu
    if (checkWinner(userSymbol)) {
        tictactoeActive = false;
        return {
            message: renderBoard() + "<br><strong>Você venceu! 🎉</strong>"
        };
    }

    // Verifica se há empate
    if (board.every(cell => cell)) {
        tictactoeActive = false;
        return {
            message: renderBoard() + "<br><strong>Empate! 🤝</strong>"
        };
    }

    // IA faz sua jogada
    botMove();

    // Verifica se a IA venceu
    if (checkWinner(botSymbol)) {
        tictactoeActive = false;
        return {
            message: renderBoard() + "<br><strong>Eu venci! 🤖</strong>"
        };
    }

    // Verifica novamente por empate após a jogada da IA
    if (board.every(cell => cell)) {
        tictactoeActive = false;
        return {
            message: renderBoard() + "<br><strong>Empate! 🤝</strong>"
        };
    }

    // Retorna o estado atual do tabuleiro
    return { message: renderBoard(), tictactoeActive: true };
}


function botMove() {
    // Verificar se o jogador pode vencer e bloquear
    const blockMove = findWinningMove(userSymbol);
    if (blockMove !== null) {
        board[blockMove] = botSymbol; // Bloquear a vitória do jogador
        return;
    }

    // Verificar se a IA pode vencer e fazer a jogada vencedora
    const winMove = findWinningMove(botSymbol);
    if (winMove !== null) {
        board[winMove] = botSymbol; // Fazer a jogada vencedora
        return;
    }

    // Se não houverem vitórias ou bloqueios, fazer uma jogada estratégica
    // Primeiro, tentar jogar no centro
    if (board[4] === null) {
        board[4] = botSymbol; // Centro
        return;
    }

    // Caso o centro já esteja ocupado, escolher uma jogada aleatória
    const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = botSymbol;
}

function findWinningMove(symbol) {
    // Verifica se há uma jogada que pode resultar na vitória para o jogador ou IA
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const cells = [board[a], board[b], board[c]];

        // Verifica se o jogador ou a IA pode completar a linha
        if (cells.filter(cell => cell === symbol).length === 2 && cells.includes(null)) {
            // Retorna o índice da célula vazia na combinação vencedora
            return combination[cells.indexOf(null)];
        }
    }

    // Se não encontrar jogada vencedora, retorna null
    return null;
}

function checkWinner(symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === symbol)
    );
}

function renderBoard() {
    return `<pre>
${board[0] || 1} | ${board[1] || 2} | ${board[2] || 3}<br>
---------<br>
${board[3] || 4} | ${board[4] || 5} | ${board[5] || 6}<br>
---------<br>
${board[6] || 7} | ${board[7] || 8} | ${board[8] || 9}<br>
</pre>`;
}


export { startTicTacToe, handleTicTacToe }