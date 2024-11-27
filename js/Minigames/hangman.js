let hangmanState = {
    active: false,
    word: "",
    displayWord: "",
    attemptsLeft: 5,
    guessedLetters: [],
    dummyState: ["___________", "|", "|", "|", "|", "|"], // Estrutura inicial
};

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
  const dummyParts = [
    "|      \u{1F3A9}<br>", // 🎩 - chapéu
    "|      \u{1F641}<br>", // 🙁 - rosto triste
    "|      \u{1F455}<br>", // 👕 - camisa
    "|      \u{1F456}<br>", // 👖 - calça
    "|     \u{1F97E}\u{1F97E}<br>", // 🥾 - botas
];

export function startHangman() {
    const randomIndex = Math.floor(Math.random() * words.length);
    hangmanState.word = words[randomIndex];
    hangmanState.displayWord = "_".repeat(hangmanState.word.length);
    hangmanState.attemptsLeft = 6;
    hangmanState.guessedLetters = [];
    hangmanState.dummyState = ["______<br>", "|<br>", "|<br>", "|<br>", "|<br>"];
    hangmanState.active = true;

    return {
        hangmanActive: true,
        message: `🎯 Bem-vindo ao Jogo da Forca! A palavra tem ${hangmanState.word.length} letras. Você tem 6 tentativas. Boa sorte!<br><pre>${hangmanState.dummyState.join("\n")}\n${hangmanState.displayWord}</pre>`,
    };
}

export function handleHangman(input) {
    if (!hangmanState.active) {
        return { hangmanActive: false, message: "O jogo não está ativo. Envie 'hangman' para começar!" };
    }

    const guess = input.trim().toLowerCase();

    // Se o jogador tentar adivinhar a palavra inteira
    if (guess.length > 1) {
        if (guess === hangmanState.word) {
            hangmanState.active = false;
            hangmanState.displayWord = hangmanState.word; // Revela a palavra
            return {
                hangmanActive: false,
                message: `🎉 Parabéns! Você adivinhou a palavra: <strong>${hangmanState.word}</strong>`,
            };
        } else {
            hangmanState.attemptsLeft--;

            // Adiciona parte do boneco na posição correta
            const errorIndex = dummyParts.length - hangmanState.attemptsLeft - 1;
            if (dummyParts[errorIndex]) hangmanState.dummyState[errorIndex + 1] = dummyParts[errorIndex];

            if (hangmanState.attemptsLeft <= 0) {
                hangmanState.active = false;
                return {
                    hangmanActive: false,
                    message: `😢 Você perdeu! A palavra era: <span class='highlight'>${hangmanState.word}</span><br><pre>${hangmanState.dummyState.join(
                        "\n"
                    )}\n${hangmanState.displayWord}</pre>`,
                };
            }

            return {
                hangmanActive: true,
                message: `Palavra errada! Você ainda tem ${hangmanState.attemptsLeft} tentativas.<br><pre>${hangmanState.dummyState.join(
                    "\n"
                )}\n${hangmanState.displayWord}</pre>`,
            };
        }
    }

    // Validação de entrada para uma letra
    if (guess.length !== 1 || !/^[a-z]$/.test(guess)) {
        return { hangmanActive: true, message: "Por favor, envie apenas uma letra ou tente adivinhar a palavra inteira!" };
    }

    // Verifica se a letra já foi tentada
    if (hangmanState.guessedLetters.includes(guess)) {
        return { hangmanActive: true, message: `Você já tentou a letra "${guess}". Tente outra!` };
    }

    hangmanState.guessedLetters.push(guess);

    if (hangmanState.word.includes(guess)) {
        // Atualiza a palavra em progresso
        const updatedWord = hangmanState.word.split("").map((char, index) => {
            return hangmanState.displayWord[index] === "_" && char === guess
                ? guess
                : hangmanState.displayWord[index];
        });

        hangmanState.displayWord = updatedWord.join("");

        if (hangmanState.displayWord === hangmanState.word) {
            hangmanState.active = false;
            return { hangmanActive: false, message: `🎉 Parabéns! Você adivinhou a palavra: <strong>${hangmanState.word}</strong>` };
        }

        return {
            hangmanActive: true,
            message: `Boa! <pre>${hangmanState.dummyState.join("\n")}\n${hangmanState.displayWord}</pre>`,
        };
    } else {
        hangmanState.attemptsLeft--;

        // Adiciona parte do boneco na posição correta
        const errorIndex = dummyParts.length - hangmanState.attemptsLeft - 1;
        if (dummyParts[errorIndex]) hangmanState.dummyState[errorIndex + 1] = dummyParts[errorIndex];

        if (hangmanState.attemptsLeft <= 0) {
            hangmanState.active = false;
            return {
                hangmanActive: false,
                message: `😢 Você perdeu! A palavra era: <span class='highlight'>${hangmanState.word}</span><br><pre>${hangmanState.dummyState.join(
                    "\n"
                )}\n${hangmanState.displayWord}</pre>`,
            };
        }

        return {
            hangmanActive: true,
            message: `Errou! Você ainda tem ${hangmanState.attemptsLeft} tentativas.<br><pre>${hangmanState.dummyState.join(
                "\n"
            )}\n${hangmanState.displayWord}</pre>`,
        };
    }
}
