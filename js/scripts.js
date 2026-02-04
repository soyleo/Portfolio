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
    // 1. Filtrado de Cards (Estado Real)
    // Definimos qué elementos existen para el motor de búsqueda
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // 2. Segmentación por contenedores (#professional, #amateur y #exp-profesional)
    // Aplicamos tu lógica de indexación local por cada bloque independiente
    const containers = document.querySelectorAll('#exp-profesional, #professional, #amateur');

    containers.forEach(container => {
        // A. Ocultar todos los divisores del contenedor antes de re-evaluar
        const dividers = container.querySelectorAll('.card-divider');
        dividers.forEach(hr => hr.classList.add('hidden'));

        // B. Indexar solo las cards que quedaron visibles en ESTE contenedor específico
        const visibleCards = Array.from(container.querySelectorAll('.card:not(.hidden)'));

        // C. Tu Regla: "Si es el primer elemento no requiere hr arriba, de lo contrario requiere uno"
        visibleCards.forEach((card, index) => {
            // Saltamos el índice 0 (la primera card visible del bloque nunca lleva HR arriba)
            if (index > 0) {
                // Buscamos el HR que está físicamente antes de esta card en el HTML
                let prev = card.previousElementSibling;
                while (prev) {
                    if (prev.classList.contains('card-divider')) {
                        prev.classList.remove('hidden');
                        break; 
                    }
                    // Si encontramos otra card antes que un HR, significa que no hay separador entre ellas
                    if (prev.classList.contains('card')) break;
                    prev = prev.previousElementSibling;
                }
            }
        });
    });

    

    // 4. Feedback Visual del Filtro
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', setupPortfolioCarousels);