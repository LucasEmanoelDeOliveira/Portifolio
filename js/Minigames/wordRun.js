const words = [
    "abacaxi", "amizade", "arvore", "amor", "aventura",
    "bola", "bicicleta", "batata", "banheiro", "borboleta",
    "cachorro", "carro", "cavalo", "cebola", "casa",
    "dado", "doce", "dinheiro", "dedo", "dente",
    "elefante", "escada", "escola", "envelope", "estrela",
    "futebol", "foguete", "formiga", "farol", "flor",
    "gato", "guitarra", "gelo", "galinha", "golfinho",
    "historia", "hipopotamo", "horta", "horizonte", "hotel",
    "ilha", "iguana", "importante", "inverno", "internet",
    "janela", "jacare", "jornal", "joaninha", "jardim",
    "ketchup", "kiwi", "kilo", "karaoke", "kayak",
    "lago", "leao", "livro", "lua", "luz",
    "macaco", "montanha", "manga", "melancia", "mola",
    "navio", "nuvem", "noite", "nota", "ninho",
    "ovelha", "orvalho", "oceano", "oculos", "ouro",
    "pato", "palavra", "parque", "pote", "prancha",
    "queijo", "quadro", "quintal", "quebra-cabeca", "quimica",
    "rato", "relógio", "renda", "rio", "rosa",
    "sol", "sino", "sapato", "sorriso", "sabado",
    "tigre", "tartaruga", "tijolo", "telefone", "trem",
    "uva", "uniforme", "unicórnio", "urubu", "urgente",
    "vaca", "violino", "vaso", "vento", "vida",
    "wesley", "watt", "web", "whisky", "wifi",
    "xicara", "xaxim", "xarope", "xadrez", "xerife",
    "yoga", "yakisoba", "yeti", "yogurte", "yacht",
    "zebra", "zoológico", "zero", "zangão", "zarabatana"
];

let targetWord;
let shuffledWord;
let maxAttempts = 6;
let aiWord;
let aiResult;

export function startWordRun() {
    targetWord = words[
        window.crypto.getRandomValues(new Uint32Array(1))[0] % words.length
    ];

    shuffledWord = shuffleWord(targetWord);

    aiWord = shuffledWord;

    return `📚 Bem vindo(a) ao <span class='highlight'>"Word Run"</span>! Adivinhe qual é a palavra com base na formação das letras em posições aleatorias antes de mim! Boa sorte. A palavra embaralhada é: ${shuffledWord}`;
}

function shuffleWord(word) {
    let array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

let attemptedShuffledWords = []; // Array para armazenar as palavras embaralhadas

export function aiGuess() {
    let attempts = 0;

    while (attempts < 10) {
        aiWord = shuffleWord(shuffledWord);
        
        if (!attemptedShuffledWords.includes(aiWord)) {
            console.log(aiWord)
            attemptedShuffledWords.push(aiWord); // Adiciona a nova palavra ao array de tentativas

            if (words.includes(aiWord)) {
                aiResult = aiWord
                return aiResult;
            }
        }

        attempts++;
    }

    return null;
}


export function handleWordRun(userInput) {
    const input = userInput.trim().toLowerCase();

    if (input.length !== targetWord.length) {
        return {
            wordActive: false,
            message: `Por favor, insira uma palavra de <span class='highlight'>${targetWord.length}</span> letras.`
        };
    }

    aiWord = aiGuess();

    if (input === targetWord) {
        return {
            wordActive: false,
            message: `🎉 Parabéns! Você acertou a palavra: <span class='highlight'>${targetWord}</span>.`
        };
    } else {
        maxAttempts--;
        if (maxAttempts <= 0) {
            return {
                wordActive: false,
                message: `😢 Você não conseguiu adivinhar. A palavra era: <span class='highlight'>${targetWord}</span>.`
            };
        }

        // Verifica se a IA acertou a palavra
        if (aiResult === targetWord) {
            return {
                wordActive: false,
                message: `🤖 A IA acertou a palavra: <span class='highlight'>${aiWord}</span>. Você perdeu!`
            };
        }

        // Se a IA não acertou, continuar com a próxima tentativa
        return {
            wordActive: true,
            message: `Tente novamente! Você ainda tem ${maxAttempts} tentativas. A palavra embaralhada é: ${shuffledWord}`
        };
    }
}
