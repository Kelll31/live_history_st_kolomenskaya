// Управление архивом и новостями
import { DataManager } from './data.js';
import { ArchiveModal } from './archive-modal.js';

export class ArchiveManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.archiveGrid = document.querySelector('.archive-grid');
        this.newsGrid = document.querySelector('.news-grid');
        this.archiveModal = null;

        this.archiveFilterBtns = document.querySelectorAll('.archive-filters .filter-btn');
        this.newsFilterBtns = document.querySelectorAll('.news-filters .filter-btn');
        this.sortSelect = document.querySelector('.sort-select');
        this.paginationBtns = document.querySelectorAll('.archive-grid-section .pagination-number');
        this.newsPaginationBtns = document.querySelectorAll('.news-grid-section .pagination-number');

        this.currentArchiveCategory = 'Все материалы';
        this.currentNewsCategory = 'Все новости';
        this.currentSort = 'Сортировать по дате';

        this.archivePage = 1;
        this.newsPage = 1;
        this.itemsPerPage = 6;

        if (this.archiveGrid) {
            this.archiveModal = new ArchiveModal(dataManager);
            this.updateArchive();
            this.initArchiveFilters();
        }

        if (this.newsGrid) {
            this.updateNews();
            this.initNewsFilters();
        }
    }

    initArchiveFilters() {
        if (this.archiveFilterBtns) {
            this.archiveFilterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.archiveFilterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentArchiveCategory = e.target.textContent;
                    this.updateArchive();
                });
            });
        }

        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.updateArchive();
            });
        }

        if (this.paginationBtns) {
            this.paginationBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.paginationBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.archivePage = parseInt(e.target.textContent) || 1;
                    this.updateArchive();
                });
            });
        }
    }

    initNewsFilters() {
        if (this.newsFilterBtns) {
            this.newsFilterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.newsFilterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentNewsCategory = e.target.textContent;
                    this.newsPage = 1;
                    this.updateNews();
                });
            });
        }

        if (this.newsPaginationBtns) {
            this.newsPaginationBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.newsPaginationBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.newsPage = parseInt(e.target.textContent) || 1;
                    this.updateNews();
                });
            });
        }
    }

    updateArchive() {
        if (!this.archiveGrid) return;

        this.showSkeleton(this.archiveGrid, 6, 'archive');

        setTimeout(() => {
            let filtered = [...this.dataManager.archiveData];

            if (this.currentArchiveCategory !== 'Все материалы') {
                filtered = filtered.filter(item => item.category === this.currentArchiveCategory);
            }

            if (this.currentSort === 'Сортировать по алфавиту') {
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            }

            const startIdx = (this.archivePage - 1) * this.itemsPerPage;
            const endIdx = startIdx + this.itemsPerPage;
            const sliced = filtered.slice(startIdx, endIdx);

            this.renderArchive(sliced);
        }, 500);
    }

    updateNews() {
        if (!this.newsGrid) return;

        this.showSkeleton(this.newsGrid, 3, 'news');

        setTimeout(() => {
            let filtered = [...this.dataManager.newsData];

            if (this.currentNewsCategory !== 'Все новости') {
                filtered = filtered.filter(item => item.category === this.currentNewsCategory);
            }

            const startIdx = (this.newsPage - 1) * this.itemsPerPage;
            const endIdx = startIdx + this.itemsPerPage;
            const sliced = filtered.slice(startIdx, endIdx);

            this.renderNews(sliced);
        }, 500);
    }

    showSkeleton(container, count, type) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = type === 'archive' ? 'archive-card skeleton' : 'news-card skeleton';
            skeleton.innerHTML = `
                <div class="card-image skeleton-image"></div>
                <div class="card-text skeleton-content">
                    <div class="skeleton-line" style="width: 40%"></div>
                    <div class="skeleton-line" style="width: 80%"></div>
                    <div class="skeleton-line" style="width: 60%"></div>
                </div>
            `;
            container.appendChild(skeleton);
        }
    }

    renderArchive(data) {
        if (!this.archiveGrid) return;
        this.archiveGrid.innerHTML = '';
        if (data.length === 0) {
            this.archiveGrid.innerHTML = '<p>Нет материалов в данной категории.</p>';
            return;
        }
        data.forEach(item => {
            const card = document.createElement('a');
            card.href = '#';
            card.className = 'archive-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <span class="card-tag">${item.tag}</span>
                </div>
                <div class="card-text">
                    <div class="card-year">${item.year}</div>
                    <h3 class="card-title">${item.title}</h3>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.archiveModal) {
                    this.archiveModal.open(item, data);
                }
            });
            
            this.archiveGrid.appendChild(card);
        });
    }

    renderNews(data) {
        if (!this.newsGrid) return;
        this.newsGrid.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <span class="news-tag">${item.category}</span>
                    <time class="news-date">${item.date}</time>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <a href="#" class="read-more">Читать далее →</a>
                </div>
            `;
            this.newsGrid.appendChild(card);
        });
    }
}
