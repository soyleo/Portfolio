const setupPortfolioCarousels = () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const track = card.querySelector('.carousel-track');
        const images = card.querySelectorAll('.fade-in');
        const pagination = card.querySelector('.carousel-pagination');
        let currentIndex = 0;
        let interval;

        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            pagination.appendChild(dot);
        });

        const dots = card.querySelectorAll('.dot');

        const goToSlide = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        };

        const startAutoplay = () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                goToSlide(currentIndex);
            }, 4000);
        };


        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    clearInterval(interval);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(card);


        card.onmouseenter = () => clearInterval(interval);
        card.onmouseleave = () => startAutoplay();
    });
};
function filterSelection(category, element) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    const containers = document.querySelectorAll('#exp-profesional, #professional, #amateur');

    containers.forEach(container => {
        const dividers = container.querySelectorAll('.card-divider');
        dividers.forEach(hr => hr.classList.add('hidden'));

        const visibleCards = Array.from(container.querySelectorAll('.card:not(.hidden)'));

        visibleCards.forEach((card, index) => {
            if (index > 0) {
                let prev = card.previousElementSibling;
                while (prev) {
                    if (prev.classList.contains('card-divider')) {
                        prev.classList.remove('hidden');
                        break; 
                    }
                    if (prev.classList.contains('card')) break;
                    prev = prev.previousElementSibling;
                }
            }
        });
    });

    

    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', setupPortfolioCarousels);