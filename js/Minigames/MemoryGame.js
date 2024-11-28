let stateMemoryGame;  // Variável global para armazenar o estado do jogo

// Função para iniciar o jogo
export function startMemoryGame() {
    const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍋", "🍊", "🍉", 
                    "🥥", "🌽", "🍔", "🍟", "🍕", "🌭", "🍩", "🍪", "🍫", "🍦"];

    const isMobile = window.innerWidth < 600;
    const columns = isMobile ? 4 : 6; // Colunas do grid
    const totalPairs = isMobile ? 8 : 18; // Número de pares de emojis
    const totalButtons = totalPairs * 2; // Total de botões

    // Seleciona e embaralha os emojis
    const selectedEmojis = emojis.slice(0, totalPairs);
    const emojisToShuffle = shuffleArray([...selectedEmojis, ...selectedEmojis]);

    // Gera o grid com os emojis embaralhados
    const grid = createGrid(emojisToShuffle.slice(0, totalButtons), columns);
    // Criando o estado do jogo
    stateMemoryGame = {
        memoryGameActive: true,
        shuffledEmojis: emojisToShuffle, // Emojis embaralhados
        revealed: [], // Para controlar os botões revelados
        matchesFound: 0, // Contador de pares encontrados
        checkMatch: function() {
            const [firstIndex, secondIndex] = this.revealed;
        
            if (this.shuffledEmojis[firstIndex] === this.shuffledEmojis[secondIndex]) {
                this.matchesFound += 1;
                document.querySelectorAll(".memory-button").forEach(button => {
                    const index = button.getAttribute("data-index");
                    if (this.revealed.includes(index)) {
                        button.style.border = 'none';
                        button.style.backgroundColor = '#228b22';
                        button.disabled = true;
                    }
                });
            } else {
                document.querySelectorAll(".memory-button").forEach(button => {
                    const index = button.getAttribute("data-index");
                    if (this.revealed.includes(index)) {
                        button.textContent = "❓"; // Volta para o símbolo "❓"
                        button.classList.add("shake"); // Adiciona a animação de tremor

                        // Remover a animação de tremor após ela terminar (0.5s)
                        setTimeout(() => {
                            button.classList.remove("shake");
                        }, 1000);
                    }
                });
            }
        
            this.revealed = [];
        
            if (this.matchesFound === this.shuffledEmojis.length / 2) {
                addMessage("🎉 Parabéns! Você encontrou todos os pares!", true);
                this.memoryGameActive = false; // Finaliza o jogo
            }
        }
    };

    setTimeout(() => {
        document.querySelectorAll(".memory-button").forEach((button, index) => {
            button.textContent = stateMemoryGame.shuffledEmojis[index];
        });

        setTimeout(() => {
            document.querySelectorAll(".memory-button").forEach((button) => {
                button.textContent = "❓"; // Esconde os emojis novamente
            });
        }, 3000);
    }, 1000);

    return {
        message: `🧠 Bem-vindo ao Jogo da Memória! Clique nos botões para revelar os pares. Boa sorte!<br>${grid}`,
        memoryGameActive: true,
        shuffledEmojis: emojisToShuffle, // Emojis embaralhados
        revealed: stateMemoryGame.revealed,
        matchesFound: stateMemoryGame.matchesFound,
        checkMatch: stateMemoryGame.checkMatch // Referência ao método do estado
    };
}


export function handleMemoryGame(userMessage, state) {
    const [action, index] = userMessage.split("-");

    if (action === "reveal") {
        if (state.revealed.length < 2) {
            state.revealed.push(index);
        }

        const buttons = document.querySelectorAll(".memory-button");
        buttons[index].textContent = state.shuffledEmojis[index];

        if (state.revealed.length === 2) {
            setTimeout(() => {
                state.checkMatch();
                state = { ...state };  // Atualiza o estado aqui
            }, 3000);
        }

        return {
            message: `👀 Revelando...`,
            memoryGameActive: true,
            state // Retorna o estado atualizado
        };
    }

    return {
        message: `Comando inválido. Clique nos botões para revelar os pares!`,
        memoryGameActive: true,
        state // Retorna o estado
    };
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGrid(emojis) {
    const columns = window.innerWidth < 600 ? 4 : 6; // Se a largura da tela for menor que 600px, o grid será 4x4

    // Cria a estrutura do grid com o número de colunas definido
    let gridHTML = `<div style='
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr); 
        gap: 10px;
        width: 80%;
    '>
    `;

    // Adiciona os emojis diretamente nos botões
    for (let i = 0; i < emojis.length; i++) {
        gridHTML += `
            <button class="memory-button" data-index="${i}" style="
                padding: 1px; 
                font-size: 1.5rem; 
                border: 1px solid #ccc; 
                border-radius: 10px;
                width: 100%;
                box-sizing: border-box;
            ">
                ${emojis[i]}  <!-- Exibe o emoji diretamente -->
            </button>
        `;
    }

    gridHTML += "</div>";
    return gridHTML;
}