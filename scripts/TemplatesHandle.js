const botTemplates = [
    {
        name: "BOT",
        subname: "BÁSICO",
        description: "Um Bot simples para sua comunidade, possuindo comandos simples mas que ajudam.",
        commands: [
            { text: "Ticket", tooltip: "Sistema de Ticket de Suporte." },
            { text: "Registro", tooltip: "Sistema para criar mensagem de Registro." },
            { text: "Sorteio", tooltip: "Sistema de Sorteios." },
            { text: "Ban/Kick", tooltip: "Comandos de ban e Kick." },
            { text: "Boas-Vindas & Despedidas", tooltip: "Sistema de Boas Vindas e Despedidas." },
            
        ]
    },
    {
        name: "BOT",
        subname: "ADMINISTRAÇÃO",
        description: "Um Bot com sistemas de Moderação, sistemas que pode manter a ordem no servidor.",
        commands: [
            { text: "Ban/Kick/Mute", tooltip: "Sistema de Ban, Kick e Mute." },
            { text: "Clear", tooltip: "Sistema para limpar X mensagens." },
            { text: "Lock/Unlock", tooltip: "Sistema para Abrir ou Fechar um Canal." },
            { text: "Rename Channel", tooltip: "Sistema para renomear um Canal de Texto ou Voz." },
            { text: "Auto-Mod", tooltip: "Sistema para evitar palavras Ofensivas, Spam, etc." },
        ]
    },
    {
        name: "BOT",
        subname: "ENGAJAMENTO",
        description: "Um Bot com Sistemas de Engajamento, Sistemas que podem ajudar o servidor ficar Ativo.",
        commands: [
            { text: "XP", tooltip: "Sistema de experiência por mensagem." },
            { text: "Missões Diárias", tooltip: "Desafios diários para a comunidade." },
            { text: "Respostas Engraçadas", tooltip: "Mensagens automáticas divertidas." },
            { text: "Iniciar Conversa", tooltip: "Ferramenta que inicia conversas automáticas." },
            { text: "Eventos Aleatórios", tooltip: "Criação de eventos inesperados." }
        ]
    },
    {
        name: "BOT",
        subname: "DIVERSÃO",
        description: "Um Bot com Sistemas de Diversão, Sistemas que podem manter o servidor alegre.",
        commands: [
            { text: "Adivinhar", tooltip: "Brincadeira para adivinhar qual é o Número." },
            { text: "Termo", tooltip: "Brincadeira para adivinhar a palavra." },
            { text: "Jogo Da Forca", tooltip: "Brincadeira para adivinhar a palavra." },
            { text: "Fake Nitro", tooltip: "Brincadeira para enviar um Link Nitro Falso a alguem." },
            { text: "Ache O Elfo", tooltip: "Brincadeira para achar o Elfo." }
        ]
    },
    {
        name: "BOT",
        subname: "SUPORTE",
        description: "Um Bot com Sistemas de Suporte, Sistemas para ajudar com as dúvidas dos membros.",
        commands: [
            { text: "Responder", tooltip: "Sistema para responder perguntas frequentes." },
            { text: "Ticket", tooltip: "Sistema de Tickets Avançado." },
            { text: "Transcrição", tooltip: "Sistema para Transcrever o canal." },
            { text: "Criar Embeds", tooltip: "Sistema para criar Embed Customizadas." },
            { text: "Logs", tooltip: "Sistema de Logs." }
        ]
    },
    {
        name: "BOT",
        subname: "ECONOMIA",
        description: "Um Bot com Sistemas de Economia, Sistemas que faz o servidor ter uma Economia Local.",
        commands: [
            { text: "Daily", tooltip: "Sistema de Recompensa Diária." },
            { text: "Atm", tooltip: "Sistema para visualizar a quantidade de moedas." },
            { text: "Inventário", tooltip: "Sistema de Inventário Virtal." },
            { text: "Trocas", tooltip: "Sistema de Trocas Virtuais." },
            { text: "Loja", tooltip: "Sistema de Lojas Virtuais." }
        ]
    }
];

export class TemplateHandle {
    constructor(targetElement) {
        this.sliderContainer = document.createElement("div");
        this.sliderContainer.classList.add("slider-container");

        const leftArrow = document.createElement("button");
        leftArrow.classList.add("arrowTemplates", "left");
        leftArrow.innerHTML = "&#9664;";

        const rightArrow = document.createElement("button");
        rightArrow.classList.add("arrowTemplates", "right");
        rightArrow.innerHTML = "&#9654;";

        targetElement.appendChild(leftArrow);

        botTemplates.forEach((template) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const cardTitle = document.createElement("h1");
            cardTitle.textContent = template.name;

            const cardSubtitle = document.createElement("h2");
            cardSubtitle.textContent = template.subname;

            const cardDescription = document.createElement("p");
            cardDescription.textContent = template.description;

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardSubtitle);
            cardContent.appendChild(cardDescription);

            const cardCommands = document.createElement("div");
            cardCommands.classList.add("card-commands");

            template.commands.forEach((command) => {
                const subItem = document.createElement("li");
                subItem.textContent = command.text;
                subItem.classList.add("tooltip-trigger");
                subItem.setAttribute("data-tooltip", command.tooltip);
                cardCommands.appendChild(subItem);
            });

            cardContent.appendChild(cardCommands);
            card.appendChild(cardContent);
            this.sliderContainer.appendChild(card);
        });

        targetElement.appendChild(this.sliderContainer);
        targetElement.appendChild(rightArrow);

        leftArrow.addEventListener("click", () => {
            this.sliderContainer.scrollBy({
                left: -this.getCardWidth(),
                behavior: "smooth"
            });
        });

        rightArrow.addEventListener("click", () => {
            this.sliderContainer.scrollBy({
                left: this.getCardWidth(),
                behavior: "smooth"
            });
        });
    }

    getCardWidth() {
        const card = this.sliderContainer.querySelector(".card");
        const gap = parseInt(getComputedStyle(this.sliderContainer).gap) || 0;
        return card.offsetWidth + gap;
    }
}