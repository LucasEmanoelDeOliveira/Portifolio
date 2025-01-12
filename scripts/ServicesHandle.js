const services = [
    {
        title: "COMUNIDADE",
        dropdowns: [
            {
                name: "AUTOMAÇÃO",
                subItems: [
                    { text: "Boas vindas/Despedida", tooltip: "Sistema de Boas Vindas e Despedida." },
                    { text: "Auto-Role", tooltip: "Distribuição automática de cargos." },
                    { text: "Re-Captcha", tooltip: "Verificação automatizada para evitar Contas Alts." },
                    { text: "Anti-Raid", tooltip: "Proteção contra ataques em massa." },
                    { text: "Auto-Mod", tooltip: "Moderação automatizada para manter a ordem." },
                    { text: "Mensagem no PV", tooltip: "Envio de mensagens privadas automatizadas." }
                ]
            },
            {
                name: "ADMINISTRAÇÃO",
                subItems: [
                    { text: "Ban/Mute/Kick", tooltip: "Ferramentas de moderação de membros." },
                    { text: "Criar Embed", tooltip: "Sistema de criar embeds Customizadas." },
                    { text: "Sorteio", tooltip: "Sistema de sorteios automáticos." },
                    { text: "Clear", tooltip: "Apaga X mensagens do canal." },
                    { text: "Lock", tooltip: "Trava o canal para impedir mensagens." },
                    { text: "Rename Channel", tooltip: "Renomeia o canal de texto ou voz." },
                    { text: "Slowmode", tooltip: "Define um tempo de espera entre mensagens enviadas." },
                    { text: "Unban", tooltip: "Remove banimentos de usuários." },
                    { text: "Unmute", tooltip: "Desativa o mudo de usuários." },
                    { text: "Unlock", tooltip: "Destrava o canal." },
                    { text: "Ticket", tooltip: "Sistema de suporte via tickets." },
                    { text: "Backup", tooltip: "Cria backups do servidor." }
                ]
            },
            {
                name: "ENGAJAMENTO",
                subItems: [
                    { text: "XP", tooltip: "Sistema de experiência por mensagem." },
                    { text: "Rank", tooltip: "Sistema de classificação por níveis." },
                    { text: "Missões Diárias", tooltip: "Desafios diários para a comunidade." },
                    { text: "Respostas Engraçadas", tooltip: "Mensagens automáticas divertidas." },
                    { text: "Mural de Metas", tooltip: "Painel de metas para a comunidade." },
                    { text: "Iniciar Conversa", tooltip: "Ferramenta que inicia conversas automáticas." },
                    { text: "Eventos Aleatórios", tooltip: "Criação de eventos inesperados." },
                    { text: "Troféus", tooltip: "Sistema de conquistas." },
                    { text: "Convites Premiados", tooltip: "Prêmios para quem convidar mais membros." }
                ]
            },
            {
                name: "ENTRETENIMENTO",
                subItems: [
                    { text: "2048", tooltip: "Jogo clássico de fusão de blocos." },
                    { text: "FastyType", tooltip: "Desafio de digitação rápida." },
                    { text: "Fishy", tooltip: "Jogo de pescaria interativo." },
                    { text: "Forca", tooltip: "Jogo da forca interativo." },
                    { text: "Pedra, Papel, Tesoura", tooltip: "Clássico jogo de sorte." },
                    { text: "Snake", tooltip: "Jogo da cobrinha retrô." },
                    { text: "TicTacToe", tooltip: "Jogo da velha para dois jogadores." }
                ]
            }
        ]
    },
    {
        title: "LOJA",
        dropdowns: [
            {
                name: "CATÁLOGO",
                subItems: [
                    { text: "Ticket", tooltip: "Abra solicitações de compra de forma rápida e organizada." },
                    { text: "Pesquisar Produto", tooltip: "Encontre produtos com facilidade usando nosso sistema de busca avançada." },
                    { text: "Detalhes do Produto", tooltip: "Explore descrições completas e imagens detalhadas do produto." },
                    { text: "Destaques", tooltip: "Veja produtos em promoção e os mais vendidos do momento." }
                ]
            },
            {
                name: "COMPRAS",
                subItems: [
                    { text: "Carrinho", tooltip: "Visualize e gerencie seus produtos antes de finalizar a compra." },
                    { text: "Verificar Pagamento", tooltip: "Confirme pagamentos automaticamente.<br><span class='contrast'>Disponível apenas via Mercado Pago.</span>" },
                    { text: "Cupoms", tooltip: "Aplique cupons de desconto e economize nas suas compras." },
                    { text: "Finalizar Compra", tooltip: "Conclua suas compras com um ticket personalizado." },
                    { text: "Rastrear Transação", tooltip: "Acompanhe o status dos seus pagamentos em tempo real." },
                    { text: "Ofertas", tooltip: "Receba promoções exclusivas e ofertas personalizadas." },
                    { text: "V2E", tooltip: "Adicione segurança extra antes de finalizar uma compra." }
                ]
            },
            {
                name: "RECOMPENSAS",
                subItems: [
                    { text: "Compras Repetitivas", tooltip: "Receba bônus por compras frequentes." },
                    { text: "Fidelidade", tooltip: "Acumule pontos para trocas por descontos e produtos." },
                ]
            },
            {
                name: "FEEDBACKS",
                subItems: [
                    { text: "Avaliar", tooltip: "Deixe uma avaliação sobre a loja e seus produtos." },
                    { text: "Comentar", tooltip: "Compartilhe sua experiência com outros clientes após a compra." },
                    { text: "Classificação", tooltip: "Veja as avaliações gerais dos produtos." },
                ]
            }
        ]
    }
];

export class ServiceHandle {
    constructor(targetElement) {
        this.serviceContainer = document.createElement("div");
        this.serviceContainer.classList.add("service-container");
        
        services.forEach(service => {
            const container = document.createElement("div");
            container.classList.add("service-section");
        
            const sectionTitle = document.createElement("h1");
            sectionTitle.textContent = service.title;
            container.appendChild(sectionTitle);
        
            const dropdownContainer = document.createElement("div");
            dropdownContainer.classList.add("dropdown-container");
        
            service.dropdowns.forEach(drop => {
                const dropdown = createDropdown(drop.name, drop.subItems);
                dropdownContainer.appendChild(dropdown);
            });
        
            container.appendChild(dropdownContainer);
            this.serviceContainer.appendChild(container);
        });
    
        targetElement.appendChild(this.serviceContainer);
    }
}

function createDropdown(title, subItems) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownHeader = document.createElement("div");
    dropdownHeader.classList.add("dropdown-header", "contrast");
    dropdownHeader.innerHTML = `<strong>${title}</strong>`;
    dropdownHeader.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");

    subItems.forEach(item => {
        const subItem = document.createElement("p");
        subItem.textContent = item.text;
        subItem.classList.add("tooltip-trigger");
        subItem.setAttribute("data-tooltip", item.tooltip);
        dropdownContent.appendChild(subItem);
    });

    dropdown.appendChild(dropdownHeader);
    dropdown.appendChild(dropdownContent);

    return dropdown;
}
