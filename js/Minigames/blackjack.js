let blackjackActive = false;
let playerHand = [];
let dealerHand = [];

function startBlackjack() {
    blackjackActive = true;
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    const playerScore = calculateHand(playerHand);
    return {
        message: `🃏 Suas cartas: ${renderHand(playerHand)} (Total: ${playerScore})<br>Digite <span class='highlight'>comprar</span> para pegar outra carta ou <span class='highlight'>parar</span> para encerrar sua vez.`,
        blackjackActive,
        playerHand,
        dealerHand
    };
}

function handleBlackjack(userInput) {
    if (userInput.includes("comprar")) {
        playerHand.push(drawCard());
        const playerScore = calculateHand(playerHand);

        if (playerScore > 21) {
            blackjackActive = false;
            return {
                message: `🃏 Suas cartas: ${renderHand(playerHand)} (Total: ${playerScore})<br><strong>Você perdeu! 😞</strong>`,
                blackjackActive
            };
        }

        return {
            message: `🃏 Suas cartas: ${renderHand(playerHand)} (Total: ${playerScore})<br>Digite <span class='highlight'>comprar</span> para pegar outra carta ou <span class='highlight'>parar</span> para encerrar sua vez.`,
            blackjackActive,
            playerHand
        };
    }

    if (userInput.includes("parar")) {
        blackjackActive = false;
        return dealerTurn();
    }

    return {
        message: "Digite <strong>comprar</strong> para pegar outra carta ou <strong>parar</strong> para encerrar sua vez.",
        blackjackActive
    };
}

function dealerTurn() {
    let dealerScore = calculateHand(dealerHand);

    while (dealerScore < 17) {
        dealerHand.push(drawCard());
        dealerScore = calculateHand(dealerHand);
    }

    const playerScore = calculateHand(playerHand);
    let result = `🃏 Suas cartas: ${renderHand(playerHand)} (Total: ${playerScore})<br>🃏 Minhas cartas: ${renderHand(dealerHand)} (Total: ${dealerScore})<br>`;

    if (dealerScore > 21 || playerScore > dealerScore) {
        result += "<strong>Você venceu! 🎉</strong>";
    } else if (playerScore < dealerScore) {
        result += "<strong>Eu venci! 🤖</strong>";
    } else {
        result += "<strong>Empate! 🤝</strong>";
    }

    return {
        message: result,
        blackjackActive
    };
}

function drawCard() {
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const value = values[Math.floor(Math.random() * values.length)];
    return value;
}

function calculateHand(hand) {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
        if (card === "J" || card === "Q" || card === "K") {
            total += 10;
        } else if (card === "A") {
            aces += 1;
            total += 11;
        } else {
            total += card;
        }
    });

    while (total > 21 && aces > 0) {
        total -= 10; // Ajusta o Ás para valer 1
        aces -= 1;
    }

    return total;
}

function renderHand(hand) {
    return hand.join(", ");
}

export { handleBlackjack, startBlackjack };