import { startBlackjack, handleBlackjack } from './Minigames/blackjack.js';
import { startTicTacToe, handleTicTacToe } from './Minigames/tictactoe.js';
import { startHangman, handleHangman } from './Minigames/hangman.js';
import { startWordle, handleWordle } from './Minigames/wordle.js';
import { startGuessWord, handleGuessWord } from './Minigames/guessWord.js';
import { startPasswordGame, handlePasswordGame } from './Minigames/passwordGame.js';
import { startPPT, handlePPT } from './Minigames/pptGame.js';
import { startMemoryGame, handleMemoryGame } from './Minigames/MemoryGame.js';
import { aiGuess, handleWordRun, startWordRun} from './Minigames/wordRun.js';

document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    const userImage = "./images/DEFAULT_PFP.png";
    const botImage = "./images/BOTS/Beatriz.jpg";

    let isBlackjackActive = false; // Variável para controlar o estado do Blackjack
    let isTicTacToeActive = false; // Variável para controlar o estado do Tictactoe
    let isHangmanActive = false; // Variável para controlar o estado do Hangman
    let isWordleActive = false; // Variável para controlar o estado do Wordle
    let isGuessWordActive = false; // Variável para controlar o estado do Guess
    let isPasswordGameActive = false; // Variável para controlar o estado do Password
    let isRPSGameActive = false; // Variável para controlar o estado do Stop
    let isMemoryGameActive = false // Variável para controlar o estado do MemoryGame
    let isWordRunGameActive = false // Variável para controlar o estado do MemoryGame

    let stateMemoryGame = null; // Estado inicial do jogo da memória

    const rules = [
        { 
            keywords: ["oi", "olá", "e aí", "opa", "alô"], 
            response: `Olá querido <strong>Usuário</strong>! Este é o <span class="highlight">Portifólio de Lucas</span>!<br>
            Muito prazer, sou a <span class='underline highlight'>Beatriz</span>, a IA do site. Eu irei te auxiliar com o Portifólio!<br><br>
            Para iniciar, envie um dos comandos abaixo:<br>
            <div style="display: flex; flex-wrap: wrap;">
                <span class="highlight" style="flex: 1 0 50%;">tictactoe</span>
                <span class="highlight" style="flex: 1 0 50%;">blackjack</span>
                <span class="highlight" style="flex: 1 0 50%;">hangman</span>
                <span class="highlight" style="flex: 1 0 50%;">wordle</span>
                <span class="highlight" style="flex: 1 0 50%;">guess</span>
                <span class="highlight" style="flex: 1 0 50%;">password</span>
                <span class="highlight" style="flex: 1 0 50%;">PPT</span>
                <span class="highlight" style="flex: 1 0 50%;">memory</span>
                <span class="highlight" style="flex: 1 0 50%;">wordrun</span>
            </div>`
        },
        { 
            keywords: ['blackjack'], 
            response: `🃏 Vamos jogar Blackjack! O objetivo é chegar o mais próximo possível de 21 sem ultrapassar. Digite <strong>comprar</strong> para pegar uma nova carta ou <strong>parar</strong> para encerrar sua vez. Boa sorte!`
        },
        { 
            keywords: ['tictactoe'], 
            response: `🎮 Vamos jogar "Tic-Tac-Toe"! Use os números de 1 a 9 para jogar!`
        },
        { 
            keywords: ['hangman', 'forca'], 
            response: `🎯 Vamos jogar "Forca"! Tente adivinhar a palavra, enviando uma letra por vez.`
        },
        { 
            keywords: ['wordle'], 
            response: `📗 Vamos jogar "Wordle"! Tente adivinhar a palavra com as minhas dicas!<br>🟩 - Está no lugar correto<br>🟨 - Está no local errado<br>🟥 - Não tem essa letra.`
        },
        { 
            keywords: ['guess'], 
            response: `🔍 Vamos jogar "Adivinhe a Palavra"! Vou te dar 5 dicas para adivinhar uma palavra. Você tem até 20 tentativas. Vamos começar!`
        },
        { 
            keywords: ['password'], 
            response: `🔒 Vamos jogar "Adivinhe a Senha"! Irei dizer onde está certo cada digito da senha, você tem 20 tentativas. Vamos lá!`
        },
        { 
            keywords: ['ppt', 'pedra papel tesoura'], 
            response: `💎 Vamos jogar "Pedra Papel e Tesoura"!`
        },
        { 
            keywords: ['memory'], 
            response: `🧠 Vamos jogar "Jogo da Memoria"! descubra a localização dos pares da tabela!`
        },
        { 
            keywords: ['wordrun'], 
            response: `📚 Vamos jogar "Corrida das Palavras"! Descubra qual a palavra com as letras ambaralhadas antes de mim!`
        }
        
        
        
    ];

    function addMessage(content, isBot = false) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add(isBot ? "bot-message-container" : "user-message-container");

        const img = document.createElement("img");
        img.src = isBot ? botImage : userImage;
        img.classList.add(isBot ? "bot-image" : "user-image");
        messageContainer.appendChild(img);

        const message = document.createElement("div");
        message.classList.add(isBot ? "bot-message" : "user-message");
        message.innerHTML = content;
        messageContainer.appendChild(message);

        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getBotResponse(userMessage) {
        for (let rule of rules) {
            if (rule.keywords.some((keyword) => userMessage.includes(keyword))) {
                if (rule.keywords.includes("blackjack")) {
                    const ruleMessage = rule.response; // Mensagem inicial do Blackjack
                    const blackjackResponse = startBlackjack(); // Iniciar o jogo
                    isBlackjackActive = blackjackResponse.blackjackActive;
                    addMessage(ruleMessage, true);
                    return blackjackResponse.message;
                } else if (rule.keywords.includes("tictactoe")) {
                    const ruleMessage = rule.response; // Mensagem inicial do Tic-Tac-Toe
                    const tictactoeResponse = startTicTacToe(); // Iniciar o jogo
                    isTicTacToeActive = tictactoeResponse.tictactoeActive;
                    addMessage(ruleMessage, true);
                    return tictactoeResponse.message;
                } else if (rule.keywords.includes("hangman")) {
                    const ruleMessage = rule.response; // Mensagem inicial do Hangman
                    const hangmanResponse = startHangman(); // Iniciar o jogo
                    isHangmanActive = hangmanResponse.hangmanActive;
                    addMessage(ruleMessage, true);
                    return hangmanResponse.message;
                } else if (rule.keywords.includes("wordle")) {
                    const ruleMessage = rule.response; // Mensagem inicial do Wordle
                    const wordleResponse = startWordle(); // Iniciar o jogo
                    isWordleActive = wordleResponse.wordleActive;
                    addMessage(ruleMessage, true);
                    return wordleResponse.message;
                } else if (rule.keywords.includes("guess")) {
                    isGuessWordActive = true;
                    const response = startGuessWord(); // Começa o jogo
                    addMessage(rule.response, true);
                    return response;
                } else if (rule.keywords.includes("password")) {
                    isPasswordGameActive = true
                    const response = startPasswordGame()
                    addMessage(rule.response, true)
                    return response
                } else if (rule.keywords.includes("ppt")) {
                    isRPSGameActive = true
                    const response = startPPT()
                    addMessage(rule.response, true)
                    return response
                } else if (rule.keywords.includes("memory")) {
                    isMemoryGameActive = true;
                    const memoryGameState = startMemoryGame(); // Inicia o jogo
                    stateMemoryGame = memoryGameState;
                    addMessage(rule.response, true); // Mostra a grade inicial no chat
                    return memoryGameState.message;
                }else if (rule.keywords.includes("wordrun")) {
                    isWordRunGameActive = true;
                    const wordRunGameState = startWordRun(); // Inicia o jogo
                    addMessage(rule.response, true); // Mostra a grade inicial no chat
                    return wordRunGameState;
                }

                return rule.response; 
            }
        }
    
        if (isBlackjackActive) {
            if (userMessage.includes("comprar") || userMessage.includes("parar")) {
                const blackjackResponse = handleBlackjack(userMessage);
                isBlackjackActive = blackjackResponse.blackjackActive; // Atualizar estado
                return blackjackResponse.message;
            }
        }
    
        if (isTicTacToeActive) {
            const move = userMessage.trim(); // Mantém a entrada como string
    
            // Verifica se a entrada é um número entre 1 e 9
            if (!isNaN(move) && move >= '1' && move <= '9') {
                // Certifique-se de que a entrada é válida no contexto do jogo
                const tictactoeResponse = handleTicTacToe(move); // Passa a jogada como string
                isTicTacToeActive = tictactoeResponse.tictactoeActive; // Atualiza o estado do jogo
                return tictactoeResponse.message;
            } else {
                return "Jogada inválida! Por favor, envie um número de 1 a 9.";
            }
        }

        if (isHangmanActive) {
            const hangmanResponse = handleHangman(userMessage);
            isHangmanActive = hangmanResponse.hangmanActive; // Atualiza o estado do jogo
            return hangmanResponse.message;
        }

        if (isWordleActive) {
            const wordleResponse = handleWordle(userMessage);
            isWordleActive = wordleResponse.wordleActive; // Atualiza o estado do jogo
            return wordleResponse.message;
        }

        if (isGuessWordActive) {
            const result = handleGuessWord(userMessage);
            isGuessWordActive = result.gameActive; // Atualiza o estado do jogo
            return result.message;
        }

        if (isPasswordGameActive) {
            const result = handlePasswordGame(userMessage)
            isPasswordGameActive = result.gameActive;
            return result.message;
        }

        if (isMemoryGameActive) {
            const result = handleMemoryGame(userMessage, stateMemoryGame);
            stateMemoryGame = result; // Atualiza a referência do estado
            return result.message;
        }
    
        if (isWordRunGameActive) {
            const result = handleWordRun(userMessage);
            isWordRunGameActive = result.wordActive; // Atualiza a referência do estado
            return result.message;
        }

        return "Desculpe, não entendi o que você quis dizer.";
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("ppt-button")) {
            if (isRPSGameActive) {
                const playerChoice = event.target.getAttribute("data-choice");
                const response = handlePPT(playerChoice); // Obtém a resposta do jogo
                addMessage(response, true); // Mostra a resposta do bot no chat
                isRPSGameActive = false; // Finaliza o jogo após uma rodada
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("memory-button")) {
            const button = event.target;
            const index = button.getAttribute("data-index");
            
            if (stateMemoryGame.revealed.length < 2 && !stateMemoryGame.revealed.includes(index)) {
                button.textContent = stateMemoryGame.shuffledEmojis[index];  // Exibe o emoji
        
                stateMemoryGame.revealed.push(index);
        
                // Checar se há dois revelados para comparar
                if (stateMemoryGame.revealed.length === 2) {
                    setTimeout(() => {
                        stateMemoryGame.checkMatch(); // Verifica o par
                    }, 500); // Delay de 1 segundo para processar a comparação visual
                }
            }
        }
    });

    sendBtn.addEventListener("click", () => {
        const userMessage = chatInput.value.trim().toLowerCase();
        if (userMessage === "") return;

        addMessage(userMessage);
        chatInput.value = "";

        setTimeout(() => {
            const response = getBotResponse(userMessage);
            addMessage(response, true);
        }, 500); 
    });

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });
});