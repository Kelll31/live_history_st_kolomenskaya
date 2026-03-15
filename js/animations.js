// Анимации при скролле
export class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Настройка Intersection Observer
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Можно не отключать наблюдение, если хотим повторную анимацию
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Находим все элементы для анимации
        this.observeElements();
    }

    observeElements() {
        // Hero секции
        document.querySelectorAll('.hero__content').forEach(el => {
            el.classList.add('hero-animate');
            this.observer.observe(el);
        });

        // Изображения в hero
        document.querySelectorAll('.hero__image img').forEach(el => {
            el.classList.add('image-animate');
            this.observer.observe(el);
        });

        // Заголовки секций
        document.querySelectorAll('section h2').forEach(el => {
            el.classList.add('title-animate');
            this.observer.observe(el);
        });

        // Карточки архива и новостей
        document.querySelectorAll('.archive-card, .news-card, .value-card').forEach((el, index) => {
            el.classList.add('card-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Элементы about-grid
        document.querySelectorAll('.about-item').forEach((el, index) => {
            el.classList.add('fade-in', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Карточки ценностей
        document.querySelectorAll('.value-card').forEach((el, index) => {
            el.classList.add('value-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Элементы timeline
        document.querySelectorAll('.timeline-item').forEach((el, index) => {
            el.classList.add('timeline-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Статистика
        document.querySelectorAll('.stat__item').forEach((el, index) => {
            el.classList.add('stat-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Элементы filter-bar
        document.querySelectorAll('.filter-btn, .category-btn').forEach((el, index) => {
            el.classList.add('fade-in', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Квота
        document.querySelectorAll('.quote').forEach(el => {
            el.classList.add('slide-left');
            this.observer.observe(el);
        });

        // Формы
        document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
            el.classList.add('slide-up');
            this.observer.observe(el);
        });

        // Кнопки
        document.querySelectorAll('.btn').forEach(el => {
            el.classList.add('btn-animate');
        });

        // Навигационные ссылки
        document.querySelectorAll('.nav__link, .btn-link, .read-more').forEach(el => {
            el.classList.add('nav-link-animate');
        });

        // Иконки в value-card
        document.querySelectorAll('.value-icon').forEach(el => {
            el.classList.add('icon-animate');
        });

        // Изображения в карточках
        document.querySelectorAll('.card-image img').forEach(el => {
            el.classList.add('zoom-hover');
        });

        // Теги
        document.querySelectorAll('.card-tag, .news-tag, .popup-tag').forEach(el => {
            el.classList.add('badge-animate');
        });

        // Легенда карты
        document.querySelectorAll('.legend-item').forEach((el, index) => {
            el.classList.add('legend-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });

        // Статистика карты
        document.querySelectorAll('.map-stat-item').forEach((el, index) => {
            el.classList.add('map-stat-animate', `delay-${index % 6}`);
            this.observer.observe(el);
        });
    }

    // Метод для ручной анимации элемента
    animateElement(element, animationClass) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.add('visible');
        }, 50);
    }

    // Метод для отключения наблюдателя
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Анимация для чисел (счетчик)
export function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Форматирование числа
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString('ru-RU') + '+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Инициализация анимации счетчиков при появлении
export function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(element, number);
                    counterObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat__number').forEach(el => {
        counterObserver.observe(el);
    });
}
