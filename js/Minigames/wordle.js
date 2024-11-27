const words = [
    "abacaxi", "amizade", "arvore", "amor", "aventura",       // A
    "bola", "bicicleta", "batata", "banheiro", "borboleta",   // B
    "cachorro", "carro", "cavalo", "cebola", "casa",          // C
    "dado", "doce", "dinheiro", "dedo", "dente",              // D
    "elefante", "escada", "escola", "envelope", "estrela",    // E
    "futebol", "foguete", "formiga", "farol", "flor",         // F
    "gato", "guitarra", "gelo", "galinha", "golfinho",        // G
    "historia", "hipopotamo", "horta", "horizonte", "hotel",  // H
    "ilha", "iguana", "importante", "inverno", "internet",    // I
    "janela", "jacare", "jornal", "joaninha", "jardim",       // J
    "ketchup", "kiwi", "kilo", "karaoke", "kayak",            // K
    "lago", "leao", "livro", "lua", "luz",                    // L
    "macaco", "montanha", "manga", "melancia", "mola",        // M
    "navio", "nuvem", "noite", "nota", "ninho",               // N
    "ovelha", "orvalho", "oceano", "oculos", "ouro",          // O
    "pato", "palavra", "parque", "pote", "prancha",           // P
    "queijo", "quadro", "quintal", "quebra-cabeca", "quimica",// Q
    "rato", "relógio", "renda", "rio", "rosa",                // R
    "sol", "sino", "sapato", "sorriso", "sabado",             // S
    "tigre", "tartaruga", "tijolo", "telefone", "trem",       // T
    "uva", "uniforme", "unicórnio", "urubu", "urgente",       // U
    "vaca", "violino", "vaso", "vento", "vida",               // V
    "wesley", "watt", "web", "whisky", "wifi",                // W
    "xicara", "xaxim", "xarope", "xadrez", "xerife",          // X
    "yoga", "yakisoba", "yeti", "yogurte", "yacht",           // Y
    "zebra", "zoológico", "zero", "zangão", "zarabatana"      // Z
  ];

let targetWord;

let attempts = [];
let maxAttempts = 6; 

export function startWordle() {
    targetWord = words[
        window.crypto.getRandomValues(new Uint32Array(1))[0] % words.length
    ];
    
    return {
        wordleActive: true,
        message: `📗 Tente adivinhar a palavra de <span class='highlight'>${targetWord.length}</span> letras. Você tem <span class='highlight'>${maxAttempts}</span> tentativas.`
    };
}

export function handleWordle(userInput) {
    const cleanedInput = userInput.trim().toLowerCase();

    // Verificar se o input tem o mesmo número de letras que a palavra-alvo
    if (cleanedInput.length !== targetWord.length) {
        return {
            wordleActive: true,
            message: `Por favor, insira uma palavra de <span class='highlight'>${targetWord.length}</span> letras.`
        };
    }

    // Verificar se a palavra já foi tentada
    if (attempts.includes(cleanedInput)) {
        return {
            wordleActive: true,
            message: "Você já tentou essa palavra. Tente outra."
        };
    }

    attempts.push(cleanedInput);

    // Gerar feedback sobre a tentativa
    let feedback = [];
    let targetWordCopy = targetWord.split(""); // Cópia da palavra-alvo para manipulação
    let inputCopy = cleanedInput.split(""); // Cópia da entrada do jogador

    // Primeiro, verifica as letras corretas na posição correta (🟩)
    for (let i = 0; i < targetWord.length; i++) {
        if (inputCopy[i] === targetWordCopy[i]) {
            feedback[i] = "🟩"; // Letra correta na posição correta
            targetWordCopy[i] = null; // Marca a letra como usada na palavra
            inputCopy[i] = null; // Marca a letra como usada na tentativa
        }
    }

    // Agora verifica as letras corretas, mas na posição errada (🟨)
    for (let i = 0; i < targetWord.length; i++) {
        if (feedback[i] !== "🟩" && inputCopy[i] !== null) {
            const indexInTarget = targetWordCopy.indexOf(inputCopy[i]);
            if (indexInTarget !== -1) {
                feedback[i] = "🟨"; // Letra correta, mas na posição errada
                targetWordCopy[indexInTarget] = null; // Marca a letra como usada na palavra
            }
        }
    }

    // Para as letras restantes, que não estão na palavra, atribui 🟥
    for (let i = 0; i < targetWord.length; i++) {
        if (feedback[i] !== "🟩" && feedback[i] !== "🟨") {
            feedback[i] = "🟥"; // Letra incorreta
        }
    }

    // Construindo o feedback perfeitamente alinhado
    const formattedMessage = `
        <div style="display: flex; justify-content: center; gap: 5px;">
            ${cleanedInput
                .split("")
                .map(
                    (letter) =>
                        `<span style="display: inline-block; width: 20px; text-align: center;">${letter}</span>`
                )
                .join("")}
        </div>
        <div style="display: flex; justify-content: center; gap: 5px;">
            ${feedback
                .map(
                    (square) =>
                        `<span style="display: inline-block; width: 20px; text-align: center;">${square}</span>`
                )
                .join("")}
        </div>
    `;

    // Verificar se o jogador acertou ou esgotou as tentativas
    if (cleanedInput === targetWord) {
        attempts.splice(0, attempts.length); // Limpa o array, removendo todos os elementos
        return {
            wordleActive: false,
            message: `🎉 Parabéns! Você acertou a palavra: ${targetWord}.`
        };
    }

    if (attempts.length >= maxAttempts) {
        attempts.splice(0, attempts.length); // Limpa o array, removendo todos os elementos
        return {
            wordleActive: false,
            message: `Você não conseguiu adivinhar a palavra. A palavra era: ${targetWord}.`
        };
    }

    return {
        wordleActive: true,
        message: `${formattedMessage}<br>Você tem ${maxAttempts - attempts.length} tentativas restantes.`
    };
}
