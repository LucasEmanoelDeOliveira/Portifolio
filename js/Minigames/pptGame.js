export function startPPT() {
    return `🧶 Escolha qual mão você vai jogar abaixo:<br>
            <button class="ppt-button" data-choice="pedra" style="padding: 5px;border: none;border-radius: 10px;">🎲 Pedra</button>
            <button class="ppt-button" data-choice="papel" style="padding: 5px;border: none;border-radius: 10px;">📄 Papel</button>
            <button class="ppt-button" data-choice="tesoura" style="padding: 5px;border: none;border-radius: 10px;">✂️ Tesoura</button>`;
}

export function handlePPT(playerChoice) {
    const choices = ["pedra", "papel", "tesoura"];
    const aiChoice = choices[Math.floor(Math.random() * 3)]; // Escolha da IA

    if (playerChoice === aiChoice) {
        return `🤝 Empate! Nós escolhemos <span class='highlight'>${playerChoice}</span>.`;
    } else if (playerChoice !== aiChoice) {
        return `🎉 Você venceu! Você escolheu <span class='highlight'>${playerChoice}</span> e e eu escolhi escolheu <span class='highlight'>${aiChoice}</span>.`;
    } else {
        return `❌ Você perdeu! Você escolheu <span class='highlight'>${playerChoice}</span> e eu escolhi escolheu <span class='highlight'>${aiChoice}</span>.`;
    }
}
