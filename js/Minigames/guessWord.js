let attemptsLeft = 20;
let selectedWords = [];
let cluesUsed = []; 
let currentWord = '';
let currentClueIndex = 0;

const wordsWithClues = [
    { word: "cadeira", clues: ["sentar", "mesa", "móvel", "assento", "pernas"] },
    { word: "janela", clues: ["vidro", "abrir", "casa", "vista", "luz"] },
    { word: "relógio", clues: ["tempo", "hora", "minutos", "pulso", "parede"] },
    { word: "sofá", clues: ["sala", "conforto", "almofadas", "descanso", "móvel"] },
    { word: "chá", clues: ["bebida", "quente", "ervas", "xícara", "filtro"] },
    { word: "lâmpada", clues: ["luz", "energia", "elétrica", "quarto", "soquete"] },
    { word: "celular", clues: ["telefone", "tecnologia", "chamada", "aplicativos", "tela"] },
    { word: "livros", clues: ["leitura", "páginas", "histórias", "biblioteca", "capa"] },
    { word: "computador", clues: ["tecnologia", "tela", "teclado", "programa", "internet"] },
    { word: "sabão", clues: ["limpeza", "espuma", "banho", "lava", "perfume"] },
    { word: "escova", clues: ["cabelo", "dentes", "cerdas", "higiene", "limpeza"] },
    { word: "garrafa", clues: ["água", "líquido", "plástico", "vidro", "tampa"] },
    { word: "chave", clues: ["porta", "fechadura", "metal", "segurança", "carro"] },
    { word: "banco", clues: ["sentar", "praça", "madeira", "dinheiro", "instituição"] },
    { word: "mesa", clues: ["móvel", "refeição", "trabalho", "superfície", "escritório"] },
    { word: "óculos", clues: ["visão", "lente", "armação", "grau", "sol"] },
    { word: "chuveiro", clues: ["banho", "água", "quente", "frio", "casa"] },
    { word: "sapato", clues: ["calçado", "pés", "andar", "tênis", "couro"] },
    { word: "rádio", clues: ["música", "sintonizar", "notícias", "frequência", "AM/FM"] },
    { word: "caderno", clues: ["escrever", "anotações", "páginas", "escola", "espiral"] },
    { word: "livraria", clues: ["livros", "comprar", "leitura", "biblioteca", "papel"] },
    { word: "cozinha", clues: ["comida", "fogão", "panelas", "chef", "forno"] },
    { word: "piano", clues: ["instrumento", "teclas", "música", "mão", "harmonia"] },
    { word: "árvore", clues: ["folhas", "tronco", "madeira", "natureza", "raiz"] },
    { word: "cachorro", clues: ["animal", "cão", "pet", "latir", "amigo"] },
    { word: "gato", clues: ["animal", "felino", "miar", "bigodes", "patas"] },
    { word: "telefone", clues: ["ligação", "número", "comunicação", "celular", "fixo"] },
    { word: "carro", clues: ["veículo", "rodas", "transporte", "motor", "estrada"] },
    { word: "avião", clues: ["transporte", "avião", "céu", "passageiros", "pista"] },
    { word: "bicicleta", clues: ["pedalar", "roda", "correr", "transporte", "manivela"] },
    { word: "floresta", clues: ["árvores", "natureza", "animais", "verde", "mato"] },
    { word: "praia", clues: ["areia", "mar", "sol", "oceano", "banho"] },
    { word: "escola", clues: ["ensino", "professor", "alunos", "matérias", "aula"] },
    { word: "universidade", clues: ["ensino superior", "cursos", "diploma", "professores", "graduação"] },
    { word: "supermercado", clues: ["compras", "alimentos", "prateleiras", "caixa", "mercadoria"] },
    { word: "esporte", clues: ["atividade", "físico", "competição", "jogo", "saúde"] },
    { word: "música", clues: ["som", "instrumentos", "melodia", "canção", "notas"] },
    { word: "teatro", clues: ["palco", "ator", "espécie", "público", "peça"] }
]


export function startGuessWord() {
    selectedWords = [];
    while (selectedWords.length < 5) {
        const randomWord = wordsWithClues[Math.floor(Math.random() * wordsWithClues.length)];
        if (!selectedWords.some(word => word.word === randomWord.word)) {
            selectedWords.push(randomWord);
        }
    }

    currentWord = selectedWords[0].word;
    currentClueIndex = 0;
    attemptsLeft = 20;
    cluesUsed = []; // Reseta as dicas usadas

    return `🔎 A primeira dica é:<br><span class='highlight'>${selectedWords[0].clues[currentClueIndex]}</span>`;
}

export function handleGuessWord(userMessage) {
    // Verifica se o usuário acertou a palavra
    if (userMessage.trim().toLowerCase() === currentWord.toLowerCase()) {
        if (selectedWords.length > 1) {
            selectedWords.shift(); // Remove a palavra correta da lista
            currentWord = selectedWords[0].word; // Define a nova palavra
            currentClueIndex = 0; // Reseta o índice da dica
            cluesUsed = []; // Reseta as dicas usadas para a nova palavra

            return { 
                message: `🎉 Correto! A palavra era: <span class='highlight'>${userMessage.toLowerCase()}</span>!<br>🔎 A próxima dica é: <span class='highlight'>${selectedWords[0].clues[currentClueIndex]}</span>`, 
                gameActive: true 
            };
        } else {
            // Se não há mais palavras, o jogo acabou
            return { message: "🎉 Você adivinhou todas as palavras! Parabéns!", gameActive: false };
        }
    } else {
        // Se o usuário errou, diminui as tentativas
        attemptsLeft--;
        cluesUsed.push(selectedWords[0].clues[currentClueIndex]); // Adiciona a dica usada

        if (attemptsLeft <= 0) {
            return { 
                message: `Você não conseguiu adivinhar as palavras, as palavras eram: <span class='highlight'>${selectedWords.map(word => word.word).join(', ')}</span>.`, 
                gameActive: false 
            };
        } else {
            // Se ainda há tentativas, mostra a próxima dica
            currentClueIndex++;
            if (currentClueIndex < selectedWords[0].clues.length) {
                return { 
                    message: `Errado! Você tem <span class='highlight'>${attemptsLeft}</span> tentativas restantes.<br>
                    A próxima dica é: <span class='highlight'>${selectedWords[0].clues[currentClueIndex]}</span>`, 
                    gameActive: true 
                };
            } else {
                return { 
                    message: `Errado! Você tem <span class='highlight'>${attemptsLeft}</span> tentativas restantes. Não há mais dicas. Use as dicas que lhe passei:<br>${cluesUsed.join(', ')}`, 
                    gameActive: true 
                };
            }
        }
    }
}
