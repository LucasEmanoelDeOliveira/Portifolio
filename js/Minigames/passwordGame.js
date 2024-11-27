let generatedPassword = ""; // Senha gerada pela IA
let attemptsLeft = 20; // Tentativas restantes

export function startPasswordGame() {
    // Gera uma senha aleatória de 4 dígitos
    generatedPassword = "";
    for (let i = 0; i < 4; i++) {
        generatedPassword += Math.floor(Math.random() * 10).toString();
    }

    attemptsLeft = 10; // Reseta o número de tentativas
    return "🔒 Uma senha de 4 dígitos foi gerada. Tente adivinhar! Você tem 10 tentativas.";
}

export function handlePasswordGame(userInput) {
    if (!/^\d{4}$/.test(userInput)) {
        return { 
            message: "Entrada inválida! Digite exatamente 4 números.", 
            gameActive: true 
        };
    }

    let correctPosition = 0; // Contador de dígitos na posição correta

    const passwordDigits = generatedPassword.split(""); // Divide a senha gerada em um array de dígitos
    const inputDigits = userInput.split(""); // Divide o input do jogador em um array de dígitos

    // Verifica os dígitos na posição correta
    for (let i = 0; i < 4; i++) {
        if (inputDigits[i] === passwordDigits[i]) {
            correctPosition++;
        }
    }

    attemptsLeft--; // Reduz as tentativas restantes

    // Se o jogador acertou a senha
    if (correctPosition === 4) {
        return { 
            message: `🎉 Parabéns! Você acertou a senha: <span class='highlight'>${generatedPassword}</span>!`, 
            gameActive: false 
        };
    }

    // Se acabaram as tentativas e o jogador não acertou
    if (attemptsLeft <= 0) {
        return { 
            message: `❌ Você perdeu! A senha era: <span class='highlight'>${generatedPassword}</span>.`, 
            gameActive: false 
        };
    }

    // Feedback para o jogador com as tentativas restantes
    return { 
        message: `Você tem <span class='highlight'>${correctPosition}</span> número(s) na posição correta.<br>
                  Restam <span class='highlight'>${attemptsLeft}</span> tentativas.`,
        gameActive: true 
    };
}
