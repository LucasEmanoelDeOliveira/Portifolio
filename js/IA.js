import { startBlackjack, handleBlackjack } from './Minigames/blackjack.js';
import { startTicTacToe, handleTicTacToe } from './Minigames/tictactoe.js';
import { startHangman, handleHangman } from './Minigames/hangman.js';

document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    const userImage = "./images/DEFAULT_PFP.png";
    const botImage = "./images/BOTS/Beatriz.jpg";

    let isBlackjackActive = false; // Variável para controlar o estado do jogo
    let isTicTacToeActive = false; // Variável para controlar o estado do jogo
    let isHangmanActive = false; // Variável para controlar o estado do Hangman

    const rules = [
        { 
            keywords: ["oi", "olá", "e aí", "opa", "alô"], 
            response: `Olá querido <strong>Usuário</strong>! Este é o <span class="highlight">Portifólio de Lucas</span>!<br>
            Muito prazer, sou a <span class='underline highlight'>Beatriz</span>, a IA do site. Eu irei te auxiliar com o Portifólio!<br><br>
            Para iniciar, envie um dos comandos abaixo:<br>
                    <span class='highlight'>tictactoe</span><br>
                    <span class='highlight'>blackjack</span><br>
                    <span class='highlight'>hangman</span>`
        },
        { 
            keywords: ['blackjack'], 
            response: `🃏 Vamos jogar Blackjack! O objetivo é chegar o mais próximo possível de 21 sem ultrapassar. Digite <strong>comprar</strong> para pegar uma nova carta ou <strong>parar</strong> para encerrar sua vez. Boa sorte!`
        },
        { 
            keywords: ['tictactoe'], 
            response: `🎮 Vamos jogar Tic-Tac-Toe! Use os números de 1 a 9 para jogar!`
        },
        { 
            keywords: ['hangman'], 
            response: `🎯 Vamos jogar Forca! Tente adivinhar a palavra, enviando uma letra por vez.`
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
                }
                return rule.response; 
            }
        }
    
        // Verifica se o jogo de Blackjack está ativo
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
    
        // Resposta padrão caso nenhuma regra seja acionada
        return "Desculpe, não entendi o que você quis dizer.";
    }
    
    
    
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