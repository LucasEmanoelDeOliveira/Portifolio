const bots = [
    {
        img: "images/BOTS/Beatriz.jpg",
        title: "Beatriz",
        subtitle: "Assistente Virtual",
        description: "Beatriz é uma assistente virtual desenvolvida para ajudar e entreter usuários!<br>Beatriz possui vastos comandos Divertidos e Legais para passar o tempo, sendo carismatica e muito simpática com todos, tendo jogos como Forca, TicTacToe, Etc..."
    },
    {
        img: "images/BOTS/Darling.png",
        title: "DARLING's BOT",
        subtitle: "Gerenciadora de Servidores",
        description: "Darling\'s Bot é uma BOT oficial de um grande servidor no Discord chamado \"Darling\'s of Commerce\".<br>Com grande desempenho e capacidade, Darlings Bot é uma Bot que contem sistemas avançados de Ticket, Criação de Embeds, Etc..."
    },
    {
        img: "images/BOTS/Katolli.png",
        title: "KATOLLI'S BOT",
        subtitle: "Gerenciador de Servidores",
        description: "Katolli\'s Bot é o BOT oficial de um grande servidor chamado \"Katoll\'sStore\".<br>Com uma velocidade absurda e precisão, Katolli's Bot é capaz de fazer Atendimentos Automaticos, Abrir e fechar a loja em determinados horários, Etc..."
    },
    {
        img: "images/BOTS/Starry.png",
        title: "STARRY'S BOT",
        subtitle: "Suporter de Servidores",
        description: "Starry\'s Bot é uma BOT oficial de um grande servidor chamado \"Starry Shop\".<br>Com uma grande capacidade de responder quais queres perguntas frequentes, Starry's Bot é uma Bot especial que possui vastos comandos de Administração, como Anti-Raid, Etc..."
    }
];

const botsCardsContainer = document.getElementById("bots-cards");

function createBotCards() {
    bots.forEach(bot => {
        const card = document.createElement("div");
        card.classList.add("bot-card");

        const img = document.createElement("img");
        img.src = bot.img;
        img.alt = `${bot.title}-IMG`;
        card.appendChild(img);

        const h1 = document.createElement("h1");
        h1.textContent = bot.title;
        card.appendChild(h1);

        const h2 = document.createElement("h2");
        h2.innerHTML = bot.subtitle;
        card.appendChild(h2);

        const p = document.createElement("p");
        p.innerHTML = bot.description;
        card.appendChild(p);

        const delay = `${Math.random() * 5}s`;
        card.style.animation = `floating 3s ease-in-out infinite`;
        card.style.animationDelay = delay;

        botsCardsContainer.appendChild(card);
    });
}

createBotCards();
