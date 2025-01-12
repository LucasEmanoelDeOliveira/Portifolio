const faqs = [
    {
        title: "Como Comprar?",
        content: "Caso tenha interesse em adquirir um Bot, basta entrar no nosso Servidor do Discord, e ir no nosso canal <span class='channel'>⁠﹒ticket</span><br>E responda as perguntas do Bot corretamente, o seu atendimento será automatizado por nosso Bot de alta performance.",
        button: [
            { label: "Discord", url: "https://discord.gg/f43NtsN8Gp" }
        ]
    },
    {
        title: "Quais os Valores",
        content: `Os nossos valores de um Bot Customizado é baseado em uma <span class='contrast tooltip-trigger' data-tooltip='P para Valor final<br>C para quantidade de comandos<br><br>P = 10 + ((C-3) / 3) * 2'>Fórmula Matemática</span> para definir o Valor Total dos Bots. E os nossos Bots Templates, todos são <span class='contrast'>12.00R$</span>.
        <br><br>
        Muitas coisas podem váriar, como a quantidade de comandos, como deseja os comandos, mas isso é decidido em nosso Servidor.`
    },
    {
        title: "Tempo de Entrega",
        content: `O Nosso tempo de entrega pode <span class='contrast'>váriar</span> de acordo como deseja os sistemas, quais sistemas, e tambem caso não ocorra nenhum imprevisto com o Developer.
        <br><br>
        Mas o tempo estimado <span class='contrast'>minimo</span> é de entorno de <span class='contrast'>2 Horas</span>, como disse, pode variar, mas garanto que a espera valerá a pena.`
    }
];

const faqContainer = document.getElementById("faq-container");

export class FaqHandle {
    constructor() {
        function createFaqCard(title, content, button) {
            const faqCard = document.createElement("div");
            faqCard.classList.add("faq-card");

            const textContent = document.createElement("div");
            textContent.classList.add("text-content");

            const titleElement = document.createElement("h1");
            titleElement.textContent = title;

            const paragraphElement = document.createElement("p");
            paragraphElement.innerHTML = content;

            textContent.appendChild(titleElement);
            textContent.appendChild(paragraphElement);
            faqCard.appendChild(textContent);

            if (button && button.length > 0) {
                button.forEach(btn => {
                    const buttonElement = document.createElement("button");
                    buttonElement.textContent = btn.label;
                    buttonElement.onclick = () => window.open(btn.url, "_blank");
                    faqCard.appendChild(buttonElement);
                });
            }

            faqContainer.appendChild(faqCard);
        }

        faqs.forEach(faq => {
            createFaqCard(faq.title, faq.content, faq.button);
        });
    }
}
