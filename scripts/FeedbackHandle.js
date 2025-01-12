const feedbacks = [
    { text:"Além do atendimento Rápido, o Bot faz exatamente oque pedi, e com velocidade, simplismente Perfeito! 1000/10", author:"gui1herm3" },
    { text:"10/10 Amooo", author:"rr.gio" },
    { text:"10000000000/10 amei o bot e super eficiente !!", author:".vickyxzs" },
    { text:"O bot é 10000/10, maravilhoso demais &#128076;", author:"javaboo"}
]

export class FeedbackHandle {
    constructor(targetElement) {
        const feedbackContainer = document.querySelector('.feedback-text-container');
        const indicatorContainer = document.querySelector('.indicator-container');
        let currentFeedbackIndex = 0;

        function renderFeedbacks() {
            feedbacks.forEach((feedback, index) => {
                const feedbackCard = document.createElement('div');
                feedbackCard.classList.add('feedback-card');
                if (index === 0) feedbackCard.classList.add('active');
            
                const feedbackText = document.createElement('p');
                feedbackText.innerHTML = `"${feedback.text}"`;
            
                const feedbackAuthor = document.createElement('span');
                feedbackAuthor.textContent = `━━ ${feedback.author}`;
            
                feedbackCard.appendChild(feedbackText);
                feedbackCard.appendChild(feedbackAuthor);
                feedbackContainer.appendChild(feedbackCard);
            
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.dataset.index = index;
                indicatorContainer.appendChild(indicator);
            
                indicator.addEventListener('click', () => {
                    switchFeedback(index);
                });
            });
        
            createArrows();
        }

        function switchFeedback(newIndex) {
            const feedbackCards = document.querySelectorAll('.feedback-card');
            const indicators = document.querySelectorAll('.indicator');
        
            if (newIndex !== currentFeedbackIndex) {
                feedbackCards[currentFeedbackIndex].style.opacity = '0';
                feedbackCards[currentFeedbackIndex].style.transform = 'scale(0)';
            
                feedbackCards[currentFeedbackIndex].classList.remove('active');
                indicators[currentFeedbackIndex].classList.remove('active');
            
                indicators[newIndex].classList.add('active');
                currentFeedbackIndex = newIndex;
            
                setTimeout(() => {
                    feedbackCards[newIndex].classList.add('active');
                    feedbackCards[newIndex].style.opacity = '0';
                    feedbackCards[newIndex].style.transform = 'scale(0.2)';
                
                    setTimeout(() => {
                        feedbackCards[newIndex].style.opacity = '1';
                        feedbackCards[newIndex].style.transform = 'scale(1)';
                    }, 100);
                }, 100);
            }
        }

        function createArrows() {
            const leftArrow = document.createElement('button');
            leftArrow.classList.add('arrow', 'left-arrow');
            leftArrow.innerHTML = '&#9664;';
            leftArrow.addEventListener('click', () => {
                const newIndex = (currentFeedbackIndex - 1 + feedbacks.length) % feedbacks.     length;
                switchFeedback(newIndex);
            });
        
            const rightArrow = document.createElement('button');
            rightArrow.classList.add('arrow', 'right-arrow');
            rightArrow.innerHTML = '&#9654;'; 
            rightArrow.addEventListener('click', () => {
                const newIndex = (currentFeedbackIndex + 1) % feedbacks.length;
                switchFeedback(newIndex);
            });
        
            indicatorContainer.prepend(leftArrow);
            indicatorContainer.append(rightArrow);
        }

        renderFeedbacks();
    }
}