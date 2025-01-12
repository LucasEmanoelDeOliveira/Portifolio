const table = [
    { 
        title: "ANTES DE COMEÇAR ...",
        subtitle: "APRESENTAÇÃO",
        description: "Olá querido(a) usuário, quem fala é o Lucas, é um prazer te conheçer !!<br>Sou um jovem desenvolvedor de Bots para Lojas, Comunidades e Houses da plataforma <span class='contrast'>Discord</span>.<br>Começei a desenvolver Bots no inicio do ano de <span class='contrast'>2020</span>, após eu conheçer e ver como os Bots ajudam demais os Servidores da Plataforma! Automatizando tarefas cansativas e repetitivas para nós meros Humanos.  ",
        image: "images/Ilustrators/Rocket.svg" 
    },
    { 
        title: "HABILIDADES",
        subtitle: "TECNOLOGIAS",
        description: "Com a chegada de novos pedidos, devo buscar sempre aprender novas Linguagens de Programção, veja abaixo as linguagens que predomino.<br><br><span class='contrast'>Lua</span><br><span class='contrast'>C++</span><br><span class='contrast'>C#</span><br><span class='contrast'>JavaScript</span><br><span class='contrast'>Java</span><br><br>Algumas linguagens como \"JAVA\" não possuo total manuzeio, mas sei algumas coisas básicas.",
        image: "images/Ilustrators/Gears.png"
    },
    { 
        title: "PROJETOS",
        subtitle: "BOTS",
        description: `Mesmo sendo desenvolvedor a <span class='contrast'>5 anos</span>, jamais me esqueçerei dos primeiros clientes e das primeiras linhas de codigo que vendi, veja abaixo os bots iniciais que fiz.
        <div id='bot-container'></div>`,
        image: "images/Ilustrators/Project.png"
    },
    { 
        title: "SERVIÇOS",
        subtitle: "PERSONALIZAÇÃO",
        description: "Eu desenvolvo bots <span class='contrast'>100%</span> do seu jeito, escrevendo desde a primeira linha de \"Hello World\", até o ultimo ponto. Veja abaixo os sistemas que posso fazer no seu Bot.<br><p style='font-size: 0.5em'>Caso tenha duvida de algum sistema, passe o mouse/clique em cima do sistema desejado para ver mais intformações</p>",
        image: "images/Ilustrators/Personalize.png"
    },
    { 
        title: "TEMPLATES",
        subtitle: "BOTS",
        description: "Caso não saiba exatamente quais sistemas escolher, disponibilizamos \"Bots Templates\" que já possui sistemas imbutidos, veja abaixo.",
        image: "images/Ilustrators/Template.png"
    },
    {
        title: "AVALIAÇÕES",
        subtitle: "FEEDBACKS",
        description: `
            Claro, não posso esquecer dos amáveis feedbacks que recebo a cada nova venda. 
            Veja abaixo os Feedbacks.<br><br>
            <div id='feedback-container'>
                <div id='feedback-content'>
                    <img src='./images/Background/Aspas.png' class='feedback-image'>
                    <div class='feedback-text-container'></div>
                </div>
                <div class="indicator-container"></div>
            </div>`,
        image: "images/Ilustrators/Feedback.png"
    }    
];

const bots = [
    {
        name: "Myst's Bot",
        description: "Uma bot com alto desempenho, tendo sistemas de Anti-Raid, Reivindicação por ticket, e muito mais.",
        image: "https://cdn.discordapp.com/avatars/1322277517180141598/a46f711d83b3f268afb267026394052c.png?size=2048"
    },
    {
        name: "Darling's Bot",
        description: "Uma bot especializada em atendimentos de Tickets de alta demanda.",
        image: "https://cdn.discordapp.com/avatars/1295526255302545428/dc79a070c1534d50cb9615d0144bb3dd.png?size=2048"
    },
    {
        name: "Marine's Bot",
        description: "Uma bot desenvolvida com sistemas de Atendimento Automatico, Criação de Pix, etc.",
        image: "https://cdn.discordapp.com/avatars/1319625559432495184/68e655fac9a758773c4ef617e2d04fae.png?size=2048"
    }
];

const infosContainer = document.getElementById("infos-container");

import { TemplateHandle } from './scripts/TemplatesHandle.js';
import { ServiceHandle } from './scripts/ServicesHandle.js';
import { FeedbackHandle } from './scripts/FeedbackHandle.js';
import { FaqHandle } from './scripts/FaqHandle.js';

document.addEventListener("DOMContentLoaded", () => {
    table.forEach((item, index) => {
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        if (index % 2 !== 0) {
            infoContainer.classList.add("inverted");
        }

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = "INFO_IMAGE";
        infoContainer.appendChild(img);

        const textContent = document.createElement("div");
        textContent.id = "text-content";

        const h1 = document.createElement("h1");
        h1.textContent = item.title;

        const h2 = document.createElement("h2");
        h2.textContent = item.subtitle;

        const p = document.createElement("p");
        p.innerHTML = item.description;

        textContent.appendChild(h1);
        textContent.appendChild(h2);
        textContent.appendChild(p);
    
        infoContainer.appendChild(textContent);
        infosContainer.appendChild(infoContainer);
        
        if (item.title === "PROJETOS") {
            const botContainer = document.getElementById("bot-container");
            if (botContainer) {
                infoContainer.classList.add('scrollabe')
                botContainer.innerHTML = '';
        
                bots.forEach(bot => {
                    const botInfoContainer = document.createElement("div");
                    botInfoContainer.classList.add("bot-infos-container");
        
                    const botImg = document.createElement("img");
                    botImg.src = bot.image;
                    botImg.alt = bot.name;
        
                    const botText = document.createElement("div");
                    botText.id = "text-content";
                    botText.innerHTML = `
                        <h1>${bot.name}</h1>
                        <p>${bot.description}</p>
                    `;
        
                    botInfoContainer.appendChild(botImg);
                    botInfoContainer.appendChild(botText);
                    botContainer.appendChild(botInfoContainer);
                });
            }
        } else if (item.title === 'SERVIÇOS') {
            new ServiceHandle(p)
        } else if (item.title === 'TEMPLATES') {
            new TemplateHandle(p);
        }
    });

    new FeedbackHandle()
    new FaqHandle()
});
