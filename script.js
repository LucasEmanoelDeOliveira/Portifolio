document.addEventListener("DOMContentLoaded", () => {
    const habilityShower = document.getElementById("habilitys-shower");

    const progressBars = [
        { name: "JAVASCRIPT", percentage: 85 },
        { name: "HTML & CSS", percentage: 75 },
        { name: "LUA", percentage: 90 },
    ];

    progressBars.forEach(({ name, percentage }) => {
        const contenter = document.createElement("div");
        contenter.classList.add("hability-contenter");

        const progress = document.createElement("div");
        progress.classList.add("hability-progress");

        const label = document.createElement("span");
        label.innerText = `${name} - ${percentage}%`;
        label.style.position = "absolute";
        label.style.width = "100%";
        label.style.textAlign = "center";
        label.style.lineHeight = "30px";
        label.style.color = 'white';
        label.style.fontWeight = 'bold';
        label.style.fontFamily = 'Arial';
        label.style.zIndex = 5;

        contenter.appendChild(progress);
        contenter.appendChild(label);
        habilityShower.appendChild(contenter);

        setTimeout(() => {
            progress.style.width = `${percentage}%`;
        }, 100);
    });

    document.querySelectorAll('.category-title').forEach(category => {
        category.addEventListener('click', () => {
            const categoryId = category.dataset.category;
            const commands = document.getElementById(categoryId);
    
            if (!commands) {
                console.error(`Elemento com ID "${categoryId}" não encontrado.`);
                return;
            }
    
            console.log(`Categoria clicada: ${categoryId}`);
    
            // Esconder todos os comandos, exceto o atual
            document.querySelectorAll('.commands').forEach(cmd => {
                if (cmd !== commands) {
                    cmd.style.display = 'none';
                    console.log(`Escondendo: ${cmd.id}`);
                }
            });
    
            // Alternar o display da categoria clicada
            if (window.getComputedStyle(commands).display === 'none') {
                commands.style.display = 'block';
                console.log(`Exibindo: ${commands.id}`);
            } else {
                commands.style.display = 'none';
                console.log(`Escondendo: ${commands.id}`);
            }
        });
    });


    const miniContainer = document.createElement('div');
    miniContainer.classList.add('mini-container');
    document.body.appendChild(miniContainer);
    
    const aboutWords = document.querySelectorAll('.about');
    
    aboutWords.forEach(aboutWord => {
        aboutWord.addEventListener('mouseenter', (event) => {
            miniContainer.style.display = 'block';
    
            const info = event.target.getAttribute('data-info');
            miniContainer.innerHTML = info;
    
            const rect = event.target.getBoundingClientRect();
    
            // Define o mini-container abaixo do elemento
            miniContainer.style.left = `${rect.left + window.scrollX}px`;
            miniContainer.style.top = `${rect.bottom + window.scrollY + 5}px`; // Ajusta para aparecer logo abaixo
        });
    
        aboutWord.addEventListener('mouseleave', () => {
            miniContainer.style.display = 'none';
        });
    });
    
    miniContainer.addEventListener('mouseenter', () => {
        miniContainer.style.display = 'block';
    });
    
    miniContainer.addEventListener('mouseleave', () => {
        miniContainer.style.display = 'none';
    });
    
    
});



const toggleChatButton = document.getElementById('toggle-chat');
const chatContainer = document.getElementById('bot-card');

let isChatOpen = false;

toggleChatButton.addEventListener('click', () => {
    if (isChatOpen) {
        chatContainer.style.display = 'none'; // Esconde o chat
        toggleChatButton.textContent = '➤';
    } else {
        chatContainer.style.display = 'flex'; // Mostra o chat
        toggleChatButton.textContent = '✖';
    }
    isChatOpen = !isChatOpen;
});