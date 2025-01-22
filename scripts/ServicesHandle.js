const services = [
    {
        title: "COMUNIDADE",
        dropdowns: [
          {
            name: "AUTOMAÇÃO",
            subItems: [
              { label: "Auto-Demote", description: "Detecta membros da equipe que não estão desempenhandosuas funções e reduz automaticamente suas permissões ou cargos." },
              { label: "Auto-Mod", description: "Monitora o chat para identificar e bloquear linksmaliciosos ou palavras ofensivas." },
              { label: "Auto-Role", description: "Atribui cargos automaticamente aos membros com base emregras pré-definidas." },
              { label: "Boas vindas & Despedida", description: "Envia mensagens automáticas para saudarnovos membros e se despedir dos que saírem." },
              { label: "DM Mensage", description: "Permite o envio de mensagens privadas automatizadas paraos usuários do servidor." },
              { label: "Lembretes", description: "Sistema automatizado para criar lembretes personalizados enotificá-los no horário definido." },
              { label: "Membros Inátivos", description: "Identifica membros que estão inativos no servidorpara facilitar a gestão da comunidade." },
              { label: "Re-Captcha", description: "Adiciona uma verificação automatizada para impedir oacesso de contas falsas ou bots." },
              { label: "Respostas Automáticas", description: "Responde automaticamente a mensagensespecíficas com base em palavras-chave definidas." },
              { label: "Anti-Raid", description: "Oferece proteção contra ataques em massa, limitandoacessos suspeitos simultâneos." }
            ]
          },
          {
            name: "ADMINISTRAÇÃO",
            subItems: [
              { label: "Backup", description: "Cria e armazena cópias de segurança da configuração doservidor." },
              { label: "Ban, Mute & Kick", description: "Ferramentas para banir, silenciar ou expulsarmembros problemáticos, incluindo opções para reverter punições." },
              { label: "Clear", description: "Remove rapidamente um número definido de mensagens de um canal" },
              { label: "Contas Alts", description: "Detecta e restringe o acesso de contas alternativas ebots não autorizados." },
              { label: "Cooldown", description: "Define um intervalo mínimo de tempo entre mensagensenviadas pelos membros em um canal." },
              { label: "Criar Embed", description: "Facilita a criação de mensagens personalizadas comformatos avançados e estilizados." },
              { label: "Gerador Qr-Code", description: "Permite gerar códigos QR personalizados diretamenteno servidor." },
              { label: "Lock/Unlock", description: "Habilita ou desabilita o envio de mensagens em canaisespecíficos temporariamente." },
              { label: "Logs", description: "Mantém um histórico detalhado de eventos como exclusão, ediçãode mensagens, alterações em cargos, e entrada ou saída de membros." },
              { label: "Parcerias", description: "Gerencia parcerias entre servidores, incluindo a remoção automática caso o representante saia." },
              { label: "Renomear Canal", description: "Permite alterar rapidamente o nome de canais de textoou voz." },
              { label: "Sorteio", description: "Realiza sorteios automáticos com base em critériosdefinidos, como reações em mensagens." },
              { label: "Ticket", description: "Sistema de suporte onde os usuários podem abrir tickets pararesolver problemas ou tirar dúvidas." },
              { label: "Warn", description: "Permite emitir avisos para membros antes de aplicar puniçõesmais severas." }
            ]
          },
          {
            name: "ENGAJAMENTO",
            subItems: [
              { label: "Anchivements", description: "Permite que os usuários desbloqueiem conquistas eobjetivos dentro do servidor." },
              { label: "Convites Premiados", description: "Premia usuários que convidarem mais pessoas parao servidor." },
              { label: "Eventos Aleatórios", description: "Cria eventos inesperados e divertidos paraengajar a comunidade." },
              { label: "Iniciar Conversa", description: "Faz o bot iniciar conversas automaticamente parapromover interação no servidor." },
              { label: "Missões Mensais", description: "Oferece desafios mensais para manter a comunidadeativa." },
              { label: "Mural de Metas", description: "Exibe um painel com objetivos coletivos ouindividuais da comunidade." },
              { label: "Ranking", description: "Classifica os usuários com base em seus níveis departicipação no servidor." },
              { label: "Recompensa Diária", description: "Distribui recompensas diárias para os membros queinteragirem no servidor." },
              { label: "Respostas Engraçadas", description: "Responde automaticamente a mensagens comrespostas humorísticas para entreter os membros." },
              { label: "XP", description: "Sistema de acúmulo de experiência por mensagem para incentivar aparticipação." }
            ]
          },
          {
            name: "ENTRETENIMENTO",
            subItems: [
              { label: "2048", description: "Uma versão interativa do clássico jogo de fusão de blocos." },
              { label: "Criação de Personagem", description: "Permite aos usuários criar personagenspersonalizados com diversas opções." },
              { label: "Dado", description: "Simula um dado virtual para jogos e interações." },
              { label: "Enigmas", description: "Oferece desafios de quebra-cabeças para os usuáriosresolverem." },
              { label: "FastyType", description: "Testa a velocidade de digitação dos usuários com desafiosde palavras." },
              { label: "Fishy", description: "Um jogo interativo de pescaria onde os usuários podem competir" },
              { label: "Forca", description: "Permite aos usuários jogar o clássico jogo da forcadiretamente no servidor." },
              { label: "Palavras Cruzadas", description: "Um jogo interativo de palavras cruzadas." },
              { label: "Pedra, Papel, Tesoura", description: "Permite jogar o clássico jogo de sorte contrao bot ou outros usuários." },
              { label: "Snake", description: "Uma versão retrô e divertida do clássico jogo da cobrinha." },
              { label: "TicTacToe", description: "Permite jogar o jogo da velha contra outros membros ou obot." },
              { label: "Trivia", description: "Um jogo de perguntas e respostas para desafiar o conhecimentodos membros." }
            ]
          },
          {
            name: "SOCIAL",
            subItems: [
              { label: "Aniversário", description: "Notifica e celebra o aniversário dos membros do servidor" },
              { label: "Árvore Genealógica", description: "Exibe a árvore genealógica de convites, mostrando quem convidou quem." },
              { label: "Perfil", description: "Oferece perfis personalizados para os membros do servidor." },
              { label: "Voz com Temas", description: "Permite ao bot tocar músicas de fundo temáticas em canais de voz." }
            ]
          }
        ]
    },
    {
      title: "LOJA",
      dropdowns: [
          {
              name: "GERENCIAMENTO",
              subItems: [
                  { label: "Abrir/Fechar Loja", description: "Controle o status da loja, ativando ou desativando automaticamente." },
                  { label: "Estoque", description: "Gerencie a adição, remoção e edição do estoque de itens virtuais." },
                  { label: "Gerenciar Vendedores", description: "Adicione, remova e configure permissões para vendedores dentro da loja." },
                  { label: "Agendamento de Promoções", description: "Agende promoções para datas específicas e configure descontos automáticos." },
                  { label: "Gerenciar Cupons", description: "Crie, edite e exclua cupons de desconto para aumentar as vendas." },
                  { label: "Relatórios de Vendas", description: "Visualize relatórios detalhados sobre o desempenho de vendas da loja." },
                  { label: "Detalhes do Produto", description: "Explore descrições completas e imagens detalhadas do produto." }
              ]
          },
          {
              name: "PROCESSO DE COMPRA",
              subItems: [
                  { label: "Carrinho", description: "Visualize e gerencie seus produtos antes de finalizar a compra." },
                  { label: "Verificar Pagamento", description: "Confirme pagamentos automaticamente. Disponível apenas via Mercado Pago." },
                  { label: "Gerar Pix", description: "Sistema para gerar um Pix com valor Especifico." },
                  { label: "Finalizar Compra", description: "Conclua suas compras com uma embed personalizado." },
                  { label: "Ofertas", description: "Receba promoções exclusivas e ofertas personalizadas." },
              ]
          },
          {
              name: "SUPORTE",
              subItems: [
                  { label: "Atendimento", description: "Forneça suporte via ticket para clientes que precisem de ajuda." },
                  { label: "Rastrear Transação", description: "Acompanhe o status dos seus pagamentos em tempo real." },
                  { label: "FAQ Automático", description: "Implemente um sistema de perguntas frequentes automatizado para resolver dúvidas comuns." },
                  { label: "Status de Pedido", description: "Acompanhe o status dos pedidos dos clientes em tempo real." }
              ]
          },
          {
              name: "SEGURANÇA",
              subItems: [
                  { label: "Verificação 2FA", description: "Implemente a autenticação de dois fatores para aumentar a segurança nas transações." },
                  { label: "Rastreamento de Entregas", description: "Rastreie a entrega de itens para garantir que os clientes recebam corretamente." }
              ]
          },
          {
              name: "FEEDBACK",
              subItems: [
                  { label: "Avaliar", description: "Deixe uma avaliação sobre a loja e seus produtos." },
                  { label: "Comentar", description: "Compartilhe sua experiência com outros clientes após a compra." },
                  { label: "Classificação", description: "Veja as avaliações gerais dos produtos." },
                  { label: "Monitoramento de Feedback", description: "Veja se o cliente avaliou a loja." },
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
        subItem.textContent = item.label;
        subItem.classList.add("tooltip-trigger");
        subItem.setAttribute("data-tooltip", item.description);
        dropdownContent.appendChild(subItem);
    });

    dropdown.appendChild(dropdownHeader);
    dropdown.appendChild(dropdownContent);

    return dropdown;
}
