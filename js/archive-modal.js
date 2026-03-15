// Модальное окно для просмотра материалов архива
export class ArchiveModal {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.modal = null;
        this.currentIndex = 0;
        this.currentItems = [];
        
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'archive-modal';
        this.modal.innerHTML = `
            <div class="archive-modal__overlay"></div>
            <div class="archive-modal__content">
                <button class="archive-modal__close" aria-label="Закрыть">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <button class="archive-modal__nav archive-modal__nav--prev" aria-label="Предыдущий">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <button class="archive-modal__nav archive-modal__nav--next" aria-label="Следующий">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                
                <div class="archive-modal__body">
                    <div class="archive-modal__image-container">
                        <img src="" alt="" class="archive-modal__image">
                    </div>
                    <div class="archive-modal__info">
                        <span class="archive-modal__tag"></span>
                        <h3 class="archive-modal__title"></h3>
                        <div class="archive-modal__year"></div>
                        <div class="archive-modal__description"></div>
                        <div class="archive-modal__actions">
                            <button class="archive-modal__btn btn btn--primary">Скачать</button>
                            <button class="archive-modal__btn btn btn--outline">Поделиться</button>
                        </div>
                    </div>
                </div>
                
                <div class="archive-modal__counter"></div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    bindEvents() {
        const closeBtn = this.modal.querySelector('.archive-modal__close');
        const overlay = this.modal.querySelector('.archive-modal__overlay');
        const prevBtn = this.modal.querySelector('.archive-modal__nav--prev');
        const nextBtn = this.modal.querySelector('.archive-modal__nav--next');

        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));

        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
    }

    open(item, items) {
        this.currentItems = items;
        this.currentIndex = items.findIndex(i => i.id === item.id);
        this.updateContent();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigate(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.currentItems.length - 1;
        if (this.currentIndex >= this.currentItems.length) this.currentIndex = 0;
        this.updateContent();
    }

    updateContent() {
        const item = this.currentItems[this.currentIndex];
        if (!item) return;

        const modalImage = this.modal.querySelector('.archive-modal__image');
        const modalTag = this.modal.querySelector('.archive-modal__tag');
        const modalTitle = this.modal.querySelector('.archive-modal__title');
        const modalYear = this.modal.querySelector('.archive-modal__year');
        const modalDescription = this.modal.querySelector('.archive-modal__description');
        const modalCounter = this.modal.querySelector('.archive-modal__counter');

        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalTag.textContent = item.tag;
        modalTitle.textContent = item.title;
        modalYear.textContent = item.year;
        modalDescription.textContent = this.getDescription(item);
        modalCounter.textContent = `${this.currentIndex + 1} из ${this.currentItems.length}`;

        // Обновляем состояние кнопок навигации
        const prevBtn = this.modal.querySelector('.archive-modal__nav--prev');
        const nextBtn = this.modal.querySelector('.archive-modal__nav--next');
        prevBtn.style.opacity = this.currentItems.length <= 1 ? '0.3' : '1';
        nextBtn.style.opacity = this.currentItems.length <= 1 ? '0.3' : '1';
    }

    getDescription(item) {
        const descriptions = {
            'Фотография': 'Историческая фотография из архива проекта. Оцифрована и восстановлена с сохранением всех деталей оригинала.',
            'Документ': 'Архивный документ, относящийся к истории Серпухова. Содержит ценную информацию о прошлом города.',
            'Воспоминания': 'Личные воспоминания жителей Серпухова, передающие атмосферу ушедшей эпохи.',
            'Видео': 'Видеоматериалы из архива проекта, запечатлевшие важные события и повседневную жизнь города.'
        };
        return descriptions[item.tag] || 'Материал из цифрового архива проекта "Наследие Серпухова".';
    }
}
