document.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.backgroundColor = 'black';
    div.style.color = 'white';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '16px';
    div.style.zIndex = 1000;
    div.style.padding = '10px';
    div.style.boxSizing = 'border-box';
    div.style.overflow = 'hidden';

    div.style.transition = 'opacity 1s';
    div.style.opacity = 1;

    document.body.appendChild(div);

    const Users = [
        'zezãoBolão',
        'guiba',
        'Krebreriano',
        'FrelipreFeto',
        'LucccasPerto',
        'Hinato',
        'Kafuio',
        'Zequiel',
        'GustaLou',
        'H. Romeu Pinto',
        'Jacinto Leite',
        'Jalambipal',
        'Deyde Costa',
        'Cucabeludo',
        'Sheila meusako',
        'Seuku miadora',
        'Ava gina berta',
        'Beijamin Arrola',
        'Paula Tejano',
        'Oscar Bêlo do Pinto'

    ]
    const UsersDesktop = Users[Math.floor(Math.random() * Users.length)]

    const commands = [
        `C:/User/${UsersDesktop}/Desktop/> Abrindo Portifólio...`,
        `C:/User/${UsersDesktop}/Desktop/> Carregando Dados...`,
        `C:/User/${UsersDesktop}/Desktop/> Atribuindo Valores...`,
        `C:/User/${UsersDesktop}/Desktop/> Carregamento Completo.`,
    ];

    let commandIndex = 0;
    let charIndex = 0;
    const typingSpeed = 10;

    function typeCommand() {
        const commandElement = document.createElement('p');
        div.appendChild(commandElement);

        let currentText = '';
        function typeCharacter() {
            if (charIndex < commands[commandIndex].length) {
                currentText += commands[commandIndex][charIndex];
                commandElement.textContent = currentText;
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                commandIndex++;
                charIndex = 0;
                if (commandIndex < commands.length) {
                    setTimeout(typeCommand, 500);
                } else {
                    setTimeout(removeCommands, 1000);
                }
            }
        }

        typeCharacter();
    }

    function removeCommands() {
        const paragraphs = div.querySelectorAll('p');
        paragraphs.forEach(p => p.remove());

        setTimeout(showLogo, 100);
    }

    function showLogo() {
        const logo = document.createElement('img');
        logo.src = './images/Favicons/Logo.png';
        logo.style.position = 'absolute';
        logo.style.top = '50%';
        logo.style.left = '50%';
        logo.style.transform = 'translate(-50%, -50%)';
        logo.style.opacity = 0;
        logo.style.zIndex = 2000;
        logo.style.animation = 'fadeInOut 4s ease-in-out';
        
        logo.style.maxWidth = '90vw';
        logo.style.maxHeight = '90vh';
        logo.style.width = 'auto';
        logo.style.height = 'auto';

        document.body.appendChild(logo);

        logo.addEventListener('animationend', () => {
            logo.remove();
            div.style.opacity = 0;
            div.addEventListener('transitionend', () => {
                div.remove();
            });
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInOut {
            0% {
                opacity: 0;
            }
            25% {
                opacity: 1;
            }
            75% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    typeCommand();
});
