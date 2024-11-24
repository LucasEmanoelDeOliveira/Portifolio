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