function createStars(numStars) {
    const starsContainer = document.getElementById('stars-container');
    const containerWidth = starsContainer.offsetWidth;
    const containerHeight = starsContainer.offsetHeight;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * containerHeight}px`;
        star.style.left = `${Math.random() * containerWidth}px`;
        star.style.animationDuration = `${Math.random() * (3, 2) + 2}s`

        starsContainer.appendChild(star);
    }
}

createStars(100);

const svg = document.querySelector("svg.trail");
const path = svg.querySelector("path");

let points = [];
let segments = 150;
let mouse = {
    x: 0,
    y: 0
};

const move = (event) => {
    const rect = svg.getBoundingClientRect(); 
    const x = ((event.clientX - rect.left) / rect.width) * svg.viewBox.baseVal.width;
    const y = ((event.clientY - rect.top) / rect.height) * svg.viewBox.baseVal.height;

    mouse.x = x;
    mouse.y = y;

    if (points.length === 0) {
        for (let i = 0; i < segments; i++) {
            points.push({
                x: x,
                y: y,
            });
        }
    }
};

const anim = () => {
    let px = mouse.x;
    let py = mouse.y;

    points.forEach((p, index) => {
        p.x = px;
        p.y = py;

        let n = points[index + 1];

        if (n) {
            px = px - (p.x - n.x) * 0.6;
            py = py - (p.y - n.y) * 0.6;
        }
    });

    path.setAttribute("d", `M ${points.map(p => `${p.x} ${p.y}`).join(` L `)}`);

    requestAnimationFrame(anim);
};

const resize = () => {
    const container = document.getElementById("header-left-container");
    const ww = container.offsetWidth;
    const wh = container.offsetHeight;

    svg.style.width = ww + "px";
    svg.style.height = wh + "px";
    svg.setAttribute("viewBox", `0 0 ${ww} ${wh}`);
};

const container = document.getElementById("header-left-container");

container.addEventListener('mouseenter', () => {
    document.addEventListener('mousemove', move);
});

container.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', move);
});

window.addEventListener("resize", resize);

anim();
resize();
