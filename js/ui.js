// UI компоненты: модальные окна, поиск, мобильное меню, лайтбокс
import { DataManager } from './data.js';

export class UIManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.initMobileMenu();
        this.initLightbox();
        this.initSmoothScroll();
        this.initSearchModal();
        this.initSmartHeader();
        this.initNewsTicker();
        this.initShareModal();
    }

    initShareModal() {
        const shareBtns = document.querySelectorAll('.header__actions .btn--outline');
        const shareModal = document.getElementById('share-modal');

        if (!shareModal) return;

        const closeBtns = shareModal.querySelectorAll('.share-modal__close');

        shareBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareModal.classList.add('active');
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                shareModal.classList.remove('active');
            });
        });

        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.classList.remove('active');
            }
        });
    }

    initNewsTicker() {
        const tickerItems = document.querySelectorAll('.ticker__item');
        if (!tickerItems || tickerItems.length === 0) return;

        let currentIndex = 0;

        tickerItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
            item.style.transition = 'opacity 0.5s ease';
        });

        setInterval(() => {
            const currentItem = tickerItems[currentIndex];
            currentItem.style.opacity = '0';

            setTimeout(() => {
                currentItem.style.display = 'none';

                currentIndex = (currentIndex + 1) % tickerItems.length;
                const nextItem = tickerItems[currentIndex];

                nextItem.style.display = 'flex';
                nextItem.style.opacity = '0';

                void nextItem.offsetWidth;

                nextItem.style.opacity = '1';
            }, 500);
        }, 5000);
    }

    initSmartHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollTop = 0;
        const delta = 5;
        const navbarHeight = header.offsetHeight;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (Math.abs(lastScrollTop - currentScroll) <= delta) {
                return;
            }

            if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
                header.classList.add('header--hidden');
            } else {
                if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
                    header.classList.remove('header--hidden');
                    if (currentScroll > 0) {
                        header.classList.add('header--scrolled');
                    } else {
                        header.classList.remove('header--scrolled');
                    }
                }
            }
            lastScrollTop = currentScroll;
        });
    }

    initSearchModal() {
        const searchIcon = document.querySelector('.search-icon');
        const searchModal = document.getElementById('search-modal');
        const closeBtn = document.querySelector('.search-modal__close');
        const searchInput = document.getElementById('global-search-input');
        const resultsContainer = document.getElementById('search-modal-results');

        if (!searchIcon || !searchModal) return;

        searchIcon.addEventListener('click', () => {
            searchModal.classList.add('active');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 10);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                searchModal.classList.remove('active');
            });
        }

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });

        if (searchInput && resultsContainer) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    return;
                }

                const archiveResults = this.dataManager.archiveData.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );

                const newsResults = this.dataManager.newsData.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.excerpt.toLowerCase().includes(query)
                );

                const mapResults = this.dataManager.mapObjects.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.desc.toLowerCase().includes(query)
                );

                this.renderSearchResults(resultsContainer, archiveResults, newsResults, mapResults);
            });
        }
    }

    renderSearchResults(container, archive, news, map) {
        container.innerHTML = '';

        let html = '';

        if (archive.length > 0) {
            html += '<div class="search-category"><h4>Архив</h4><ul>';
            archive.forEach(item => {
                html += `<li><a href="archive.html">${item.title}</a> <span class="tag-small">${item.tag}</span></li>`;
            });
            html += '</ul></div>';
        }

        if (news.length > 0) {
            html += '<div class="search-category"><h4>Новости</h4><ul>';
            news.forEach(item => {
                html += `<li><a href="news.html">${item.title}</a> <span class="tag-small">${item.category}</span></li>`;
            });
            html += '</ul></div>';
        }

        if (map.length > 0) {
            html += '<div class="search-category"><h4>Карта</h4><ul>';
            map.forEach(item => {
                html += `<li><a href="map.html">${item.title}</a> <span class="tag-small">${item.tag}</span></li>`;
            });
            html += '</ul></div>';
        }

        if (html === '') {
            html = '<p class="no-results">По вашему запросу ничего не найдено.</p>';
        }

        container.innerHTML = html;
    }

    initMobileMenu() {
        const headerActions = document.querySelector('.header__actions');
        const headerNav = document.querySelector('.header__nav');
        const header = document.querySelector('.header .container');

        if (!headerActions || !headerNav || !header) return;

        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;

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
    }

    initLightbox() {
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
                        <img src="${img.src}" alt="${img.alt || 'Изображение'}">
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
    }

    initSmoothScroll() {
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
    }
}
