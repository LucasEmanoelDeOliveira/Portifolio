document.addEventListener("DOMContentLoaded", () => {

    const color = ["#FFB2B2", "#FFC998", "#9DFFE8"];
    const colors = [
        { color0: '#FC2C19', color1: '#D22515', color2: '#B01F12', color3: '#8E190E', color4: '#050000', contrast_color: '#FC2819', hover_color: '#ff9c9c'},
        { color0: '#1928FC', color1: '#1522D2', color2: '#121CB0', color3: '#010B8F', color4: '#000005', contrast_color: '#1827F5', hover_color: '#9c9dff'},
        { color0: '#11FC00', color1: '#0ED200', color2: '#0CB000', color3: '#099400', color4: '#000500', contrast_color: '#10F500', hover_color: '#9cffa9'},
        { color0: '#E700FC', color1: '#C000D2', color2: '#A100B0', color3: '#880094', color4: '#040005', contrast_color: '#E000F5', hover_color: '#d99cff'},
    ];
    const defaultColors = { color0: '#474747', color1: '#2d2d2d', color2: '#191919', color3: '#151515', color4: '#0c0c0c', contrast_color: '#e3e3e3', hover_color: '#c8c8c8' };

    const getCurrentColor = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    const interpolateColor = (startColor, endColor, progress) => {
        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        };
        const rgbToHex = (r, g, b) => `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
        const startRgb = hexToRgb(startColor);
        const endRgb = hexToRgb(endColor);
        const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * progress);
        const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * progress);
        const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * progress);
        return rgbToHex(r, g, b);
    };

    const animateColorTransition = (fromColors, toColors, duration) => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            Object.keys(fromColors).forEach(key => {
                document.documentElement.style.setProperty(`--${key}`, interpolateColor(fromColors[key], toColors[key], progress));
            });
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    // Adiciona cores para os elementos de decoração de bolas
    document.getElementById('decoration-balls').querySelectorAll('.ball').forEach((ball, index) => {
        ball.style.backgroundColor = color[index % color.length];
        ball.style.animationDelay = `${index * 0.3}s`;
    });

    // Lógica de seleção e transição de cores
    const toggleBallSelection = (ball, index) => {
        const isSelected = ball.classList.contains('selected');
        const currentColors = isSelected ? defaultColors : {
            color0: getCurrentColor('--color0'),
            color1: getCurrentColor('--color1'),
            color2: getCurrentColor('--color2'),
            color3: getCurrentColor('--color3'),
            color4: getCurrentColor('--color4'),
            contrast_color: getCurrentColor('--contrast_color'),
            hover_color: getCurrentColor('--hover_color')
        };
        const targetColors = isSelected ? defaultColors : colors[index];

        animateColorTransition(currentColors, targetColors, 800);

        document.querySelectorAll('.ball').forEach(b => b.classList.remove('selected'));
        if (!isSelected) ball.classList.add('selected');
    };

    // Adiciona os eventos de clique de forma compacta
    document.getElementById('change-theme-container').querySelectorAll('.ball').forEach((ball, index) => {
        ball.addEventListener('click', () => toggleBallSelection(ball, index));
    });



    document.querySelectorAll('.tooltip-trigger').forEach(item => {
        let tooltip;

        item.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');

            tooltip = document.createElement('div');
            tooltip.classList.add('tooltip-container');
            tooltip.innerHTML = text;
            document.body.appendChild(tooltip);

            tooltip.style.top = `${e.pageY + 15}px`;
            tooltip.style.left = `${e.pageX + 15}px`;

            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'scale(1)';
            });
        });

        item.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.top = `${e.pageY + 15}px`;
                tooltip.style.left = `${e.pageX + 15}px`;
            }
        });

        item.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0.1)';

                setTimeout(() => {
                    if (tooltip) {
                        tooltip.remove();
                        tooltip = null;
                    }
                }, 300);
            }
        });
    });
    
});