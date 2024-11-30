const faqData = [
    {
        title: "\"QUAIS SÃO SEUS PREÇOS?\"",
        subtitle: "valores",
        description: `
        <span class='highlight_2'>BOTS'S - </span> 10.00R$ mensais, esse dinheiro será redirecionado a Host e outras coisas para manter o Bot On-Line.<br>
        <span class='highlight_2'>SITE'S - </span> 50.00R$ como mão de Obra e 15.00R$ mensais para manter o Site On-line.<br><br>
        OBS: se você desejar além de 3 sistemas, o preço do Bot somará +5.00R$<br>
        FÓRMULA: P= 10 + 5 . (X − 3)`
    },
    {
        title: "\"COMO COMPRO?\"",
        subtitle: "como comprar",
        description: `
        Você pode comprar me mandando um Alo no meu Discord: <span class='highlight_2'>apenaslucio</span>.<br><br>
        ou você pode entrar em um dos servidores abaixo:<br>
        <span class='highlight_2'><a href='https://discord.gg/S6CV38SqG8' target='_blank'>Darlings of Commerce</a></span><br>
        <span class='highlight_2'><a href='https://discord.gg/VyVP6XuxPn' target='_blank'>Lunas's Trade</a></span><br>
        <span class='highlight_2'><a href='https://discord.gg/Xr6DxRRPXU' target='_blank'>Starry Shop</a></span><br>`
    },
    {
        title: "\"QUANTO TEMPO DEMORA?\"",
        subtitle: "tempo de entrega",
        description: `O tempo pode variar de acordo de como você quer seu bot, se você deseja varios sistemas, ou um bot muito bonitinho, cheio de decoração, etc.<br>
        mas o tempo normal, é aproximadamente <span class='highlight'>2 HORAS</span>, claro, se não ocorrer imprevistos.`
    },
    {
        title: "\"NÃO TEM O SISTEMA QUE EU QUERO, E AGORA?\"",
        subtitle: "produto não achado",
        description: `Claro, a imaginação humana é infinita, então as chances de não ter o sistema que deseja no seu bot, é extremamente alta, mas não se engane, caso não encontre o sistema que deseja, mande um Alô no Discord: <span class='highlight_2'>apenaslucio</span>.<br>Eu como desenvolvedor, irei ao máximo tentar fazer o sistema que você deseja, e irei inserir no tópico de sistemas, juntamente com uma "(⭐)".<br><br>
        ou você pode entrar em um dos servidores abaixo:<br>
        <span class='highlight_2'><a href='https://discord.gg/S6CV38SqG8' target='_blank'>Darlings of Commerce</a></span><br>
        <span class='highlight_2'><a href='https://discord.gg/VyVP6XuxPn' target='_blank'>Lunas's Trade</a></span><br>
        <span class='highlight_2'><a href='https://discord.gg/Xr6DxRRPXU' target='_blank'>Starry Shop</a></span><br>`
    },
];

const faqContainer = document.getElementById("footers-faqs");

faqData.forEach((faq) => {
    const faqContainers = document.createElement("div");
    faqContainers.classList.add("footer-faq");

    const h1 = document.createElement("h1");
    h1.textContent = faq.title;
    faqContainers.appendChild(h1);

    const h2 = document.createElement("h2");
    h2.textContent = faq.subtitle;
    faqContainers.appendChild(h2);

    const p = document.createElement("p");
    p.innerHTML = faq.description;
    faqContainers.appendChild(p);

    // Agora, adicione os containers de FAQ ao faqContainer corretamente
    faqContainer.appendChild(faqContainers);
});
