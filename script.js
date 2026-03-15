document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const headerActions = document.querySelector('.header__actions');
    const headerNav = document.querySelector('.header__nav');
    const header = document.querySelector('.header .container');

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;

    // Insert hamburger menu
    if (window.innerWidth <= 768) {
        header.insertBefore(mobileMenuBtn, headerActions);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            header.insertBefore(mobileMenuBtn, headerActions);
        } else if (window.innerWidth > 768 && document.querySelector('.mobile-menu-btn')) {
            mobileMenuBtn.remove();
            headerNav.classList.remove('active');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        headerNav.classList.toggle('active');
        if (headerNav.classList.contains('active')) {
            mobileMenuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
             mobileMenuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });

    // 2. Filter Buttons Interactive Logic
    const filterBtns = document.querySelectorAll('.filter-btn, .category-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Find siblings in the same container
                const parent = this.parentElement;
                parent.querySelectorAll('.filter-btn, .category-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Here we would typically filter items based on data attributes
                // For demonstration, we'll add a simple fade effect to cards
                const cards = document.querySelectorAll('.archive-card, .news-card');
                if (cards.length > 0) {
                    cards.forEach(card => {
                        card.style.opacity = '0.5';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 300);
                    });
                }
            });
        });
    }

    // 3. Simple Image Modal (Lightbox)
    const images = document.querySelectorAll('.card-image img, .hero__image img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="modal-close">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);

            setTimeout(() => modal.classList.add('active'), 10);

            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');

            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            };

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
        });
    });

    // 4. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } catch (err) {
                    console.warn("Invalid selector:", href);
                }
            }
        });
    });

    // 5. Yandex Maps Integration (if map element exists)
    const mapContainer = document.getElementById('yandex-map');
    if (mapContainer && typeof ymaps !== 'undefined') {
        ymaps.ready(initMap);
    }

    function initMap() {
        const myMap = new ymaps.Map("yandex-map", {
            center: [54.914285, 37.416298], // Serpukhov coordinates
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Sample data for objects
        const objects = [
            { id: 'soberna-gora', coords: [54.915000, 37.410000], title: 'Соборная гора', type: 'arch' },
            { id: 'spassky-sobor', coords: [54.916500, 37.412000], title: 'Спасо-Преображенский собор', type: 'church' },
            { id: 'muzei', coords: [54.912000, 37.420000], title: 'Серпуховский историко-художественный музей', type: 'museum' },
            { id: 'park-kultury', coords: [54.920000, 37.415000], title: 'Парк культуры имени Олега Степанова', type: 'nature' },
        ];

        // Define colors based on legend
        const colors = {
            'arch': '#FF6B6B',
            'monum': '#4ECDC4',
            'museum': '#45B7D1',
            'church': '#96CEB4',
            'nature': '#FFEAA7'
        };

        objects.forEach(obj => {
            const placemark = new ymaps.Placemark(obj.coords, {
                balloonContentHeader: obj.title,
                balloonContentBody: `<p>Исторический объект в Серпухове.</p><button class="btn btn--small" style="margin-top:10px;" onclick="alert('Переход к объекту: ${obj.title}')">Изучить объект</button>`,
                hintContent: obj.title
            }, {
                preset: 'islands#circleIcon',
                iconColor: colors[obj.type] || '#B85D43'
            });

            myMap.geoObjects.add(placemark);
        });

        // Hide standard CSS placeholders if map loads successfully
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if(mapPlaceholder) {
            mapPlaceholder.style.display = 'none';
        }
    }
});
