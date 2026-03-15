class A11yMode {
    constructor() {
        this.body = document.body;
        this.btn = document.querySelector('.accessibility-icon');
        this.isA11y = localStorage.getItem('a11yMode') === 'true';

        if (this.btn) {
            this.init();
        }
    }

    init() {
        if (this.isA11y) {
            this.body.classList.add('a11y-mode');
        }

        this.btn.addEventListener('click', () => this.toggleMode());
    }

    toggleMode() {
        this.isA11y = !this.isA11y;
        this.body.classList.toggle('a11y-mode', this.isA11y);
        localStorage.setItem('a11yMode', this.isA11y);
    }
}

class DataManager {
    constructor() {
        this.archiveData = [
            { id: 1, category: 'Фотографии 19 века', year: 'Начало XX века', title: 'Панорама города с высоты птичьего полета', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Фотография' },
            { id: 2, category: 'Документы', year: '1920-е годы', title: 'Архитектурные особенности старого Серпухова', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Документ' },
            { id: 3, category: 'Воспоминания', year: '1950-е годы', title: 'Рассказы старожилов о послевоенном Серпухове', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Воспоминания' },
            { id: 4, category: 'Фотографии 19 века', year: '1930-е годы', title: 'Городские праздники и народные гуляния', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Фотография' },
            { id: 5, category: 'Документы', year: '1940-е годы', title: 'Промышленное развитие в военные годы', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Документ' },
            { id: 6, category: 'Видео', year: '1960-е годы', title: 'Культурная жизнь в доме культуры', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Видео' },
            { id: 7, category: 'Фотографии 19 века', year: '1970-е годы', title: 'Школьные годы в Серпухове', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Фотография' },
            { id: 8, category: 'Документы', year: '1980-е годы', title: 'Развитие транспортной системы', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80', tag: 'Документ' }
        ];

        this.newsData = [
            { id: 1, category: 'Архивные находки', date: '15 марта 2024', title: 'Новая коллекция фотографий начала XX века', excerpt: 'В семейном архиве одной из серпуховских семей были обнаружены уникальные фотографии, запечатлевшие повседневную жизнь города в начале XX века. Коллекция из 47 снимков уже оцифрована и доступна в нашем архиве.', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' },
            { id: 2, category: 'Мероприятия', date: '10 марта 2024', title: 'Открытие выставки "История в деталях"', excerpt: 'В Серпуховском историко-художественном музее открылась выставка, подготовленная совместно с нашей командой. Экспозиция включает более 100 экспонатов из цифрового архива, многие из которых впервые представлены публике.', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' },
            { id: 3, category: 'Обновления', date: '5 марта 2024', title: 'Добавлен новый раздел "Военные годы"', excerpt: 'Мы рады сообщить о запуске нового раздела архива, посвященного периоду Великой Отечественной войны. Раздел включает документы, фотографии и воспоминания жителей Серпухова, внесших вклад в победу.', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' },
            { id: 4, category: 'Исследования', date: '1 марта 2024', title: 'Новое исследование: Архитектурные особенности', excerpt: 'Научный сотрудник нашего проекта завершил масштабное исследование архитектурных особенностей Серпухова второй половины XIX века. Результаты будут опубликованы в ближайшем номере научного журнала "История регионов".', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' },
            { id: 5, category: 'Мероприятия', date: '25 февраля 2024', title: 'Старт образовательной программы для школьников', excerpt: 'В рамках проекта стартовала образовательная программа "Юный краевед", направленная на знакомство школьников с история родного города. Учащиеся смогут принять участие в экскурсиях и мастер-классах.', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' },
            { id: 6, category: 'Обновления', date: '20 февраля 2024', title: 'Новый партнёр проекта - областная библиотека', excerpt: 'Мы рады объявить о начале сотрудничества с областной библиотекой. В рамках партнёрства планируется оцифровка редких книг и документов, относящихся к истории Серпухова.', image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80' }
        ];

        this.mapObjects = [
            { id: 'soberna-gora', coords: [54.915000, 37.410000], title: 'Соборная гора', type: 'arch', desc: 'Одно из самых известных мест в истории Серпухова', tag: 'Исторический памятник' },
            { id: 'spassky-sobor', coords: [54.916500, 37.412000], title: 'Спасо-Преображенский собор', type: 'church', desc: 'Главный храм города, построенный в XVII веке', tag: 'Церковь' },
            { id: 'muzei', coords: [54.912000, 37.420000], title: 'Серпуховский историко-художественный музей', type: 'museum', desc: 'Крупнейший музей города с богатой коллекцией', tag: 'Музей' },
            { id: 'park-kultury', coords: [54.920000, 37.415000], title: 'Парк культуры имени Олега Степанова', type: 'nature', desc: 'Зеленая зона для отдыха и прогулок', tag: 'Парк' },
            { id: 'istoricheskiy-arxiv', coords: [54.918000, 37.418000], title: 'Исторический архив', type: 'monum', desc: 'Место хранения важных городских документов', tag: 'Архив' },
        ];
    }
}

class ArchiveManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.archiveGrid = document.querySelector('.archive-grid');
        this.newsGrid = document.querySelector('.news-grid');

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
                    this.newsPage = 1; // reset page on filter
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

        // Show skeleton loading
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
        }, 500); // Simulate network delay
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

class MapController {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.mapContainer = document.getElementById('yandex-map');
        this.categoryBtns = document.querySelectorAll('.map-controls .category-btn');
        this.currentCategory = 'Все объекты';
        this.placemarks = [];

        if (this.mapContainer && typeof ymaps !== 'undefined') {
            ymaps.ready(this.initMap.bind(this));
        }
    }

    initMap() {
        this.map = new ymaps.Map("yandex-map", {
            center: [54.914285, 37.416298], // Serpukhov coordinates
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
        });

        this.clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedBrownClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        const colors = {
            'arch': '#FF6B6B',
            'monum': '#4ECDC4',
            'museum': '#45B7D1',
            'church': '#96CEB4',
            'nature': '#FFEAA7'
        };

        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.style.display = 'none';
        }

        this.dataManager.mapObjects.forEach(obj => {
            const placemark = new ymaps.Placemark(obj.coords, {
                hintContent: obj.title,
                category: this.mapCategoryToFilter(obj.type),
                objData: obj
            }, {
                preset: 'islands#circleIcon',
                iconColor: colors[obj.type] || '#B85D43',
                hasBalloon: false // disable default balloon
            });

            placemark.events.add('click', (e) => {
                const targetPlacemark = e.get('target');
                const data = targetPlacemark.properties.get('objData');
                this.showCustomPopup(data);
                this.map.panTo(data.coords, { delay: 0, duration: 300 });
            });

            this.placemarks.push(placemark);
        });

        this.clusterer.add(this.placemarks);
        this.map.geoObjects.add(this.clusterer);

        this.initControls();
    }

    showCustomPopup(data) {
        let popup = document.querySelector('.map-popup.dynamic-popup');

        if (!popup) {
            popup = document.createElement('div');
            popup.className = 'map-popup dynamic-popup';

            // Append it to map-container or parent for correct positioning
            const mapContainer = document.querySelector('.map-container');
            if (mapContainer) {
                mapContainer.appendChild(popup);
            }
        }

        popup.innerHTML = `
            <div class="popup-image" style="background-image: url('https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=300&q=80');"></div>
            <button class="popup-close">&times;</button>
            <div class="popup-content">
                <span class="popup-tag">${data.tag}</span>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <button class="btn btn--small">Изучить объект</button>
            </div>
        `;

        popup.style.display = 'block';

        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    mapCategoryToFilter(type) {
        switch (type) {
            case 'arch': return 'Архитектура';
            case 'monum': return 'Памятники';
            case 'museum': return 'Музеи';
            case 'church': return 'Церкви';
            case 'nature': return 'Природа';
            default: return 'Все объекты';
        }
    }

    initControls() {
        if (this.categoryBtns) {
            this.categoryBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.categoryBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentCategory = e.target.textContent;
                    this.filterMap();
                });
            });
        }

        const mapSearchInput = document.querySelector('.map-search .search-input');
        const mapSearchBtn = document.querySelector('.map-search .search-btn');

        if (mapSearchInput && mapSearchBtn) {
            const handleSearch = () => {
                const query = mapSearchInput.value.toLowerCase().trim();
                if (!query) return;

                const foundObj = this.dataManager.mapObjects.find(obj =>
                    obj.title.toLowerCase().includes(query) ||
                    obj.desc.toLowerCase().includes(query)
                );

                if (foundObj) {
                    this.map.panTo(foundObj.coords, { delay: 0, duration: 500 }).then(() => {
                        this.showCustomPopup(foundObj);
                    });
                } else {
                    alert('Объект не найден');
                }
            };

            mapSearchBtn.addEventListener('click', handleSearch);
            mapSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSearch();
            });
        }
    }

    filterMap() {
        this.clusterer.removeAll();
        const filteredPlacemarks = this.placemarks.filter(placemark => {
            return this.currentCategory === 'Все объекты' || placemark.properties.get('category') === this.currentCategory;
        });
        this.clusterer.add(filteredPlacemarks);
    }
}

class FormController {
    constructor() {
        this.initAllForms();
    }

    initAllForms() {
        const uploadAreas = document.querySelectorAll('.upload-area');
        const forms = document.querySelectorAll('.participation-form form');

        uploadAreas.forEach(area => this.initDragAndDrop(area));
        forms.forEach(form => this.initValidation(form));
    }

    initDragAndDrop(uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('highlight');
                uploadArea.style.borderColor = 'var(--accent-terracotta)';
                uploadArea.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('highlight');
                uploadArea.style.borderColor = '';
                uploadArea.style.backgroundColor = '';
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files, uploadArea);
        }, false);

        uploadArea.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = e => this.handleFiles(e.target.files, uploadArea);
            input.click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFiles(files, uploadArea) {
        if (files.length > 0) {
            uploadArea.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p style="color: var(--accent-emerald); font-weight: bold;">Выбрано файлов: ${files.length}</p>
                <p style="font-size: 12px;">${files[0].name}</p>
                <div style="width: 100%; height: 4px; background: #eee; border-radius: 2px; margin-top: 10px; overflow: hidden;">
                    <div style="width: 100%; height: 100%; background: var(--accent-emerald); animation: progress 1s ease-in-out;"></div>
                </div>
            `;

            // Add a temporary style for the progress bar animation
            if (!document.getElementById('progress-anim-style')) {
                const style = document.createElement('style');
                style.id = 'progress-anim-style';
                style.innerHTML = `@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`;
                document.head.appendChild(style);
            }
        }
    }

    initValidation(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.type === 'email') {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                        isValid = false;
                        input.style.borderBottomColor = 'red';
                    } else {
                        input.style.borderBottomColor = '';
                    }
                } else if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderBottomColor = 'red';
                } else {
                    input.style.borderBottomColor = '';
                }
            });

            if (isValid) {
                this.showToast('Спасибо! Ваши материалы отправлены на модерацию');
                form.reset();
                this.resetUploadArea(form.querySelector('.upload-area'));

                const shareModal = document.getElementById('share-modal');
                if (shareModal && shareModal.classList.contains('active')) {
                    setTimeout(() => shareModal.classList.remove('active'), 1500);
                }
            } else {
                this.showToast('Пожалуйста, заполните все поля корректно', true);
            }
        });
    }

    resetUploadArea(uploadArea) {
        if (!uploadArea) return;
        uploadArea.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Перетащите фото или документы сюда, или нажмите для выбора</p>
        `;
    }

    showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = isError ? '#FF6B6B' : 'var(--accent-emerald)';
        toast.style.color = 'white';
        toast.style.padding = '16px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '9999';
        toast.style.fontFamily = 'var(--font-sans)';
        toast.style.fontWeight = 'bold';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(toast);

        setTimeout(() => toast.style.opacity = '1', 10);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

class UIManager {
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

        // Hide all except first
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

                // Force reflow
                void nextItem.offsetWidth;

                nextItem.style.opacity = '1';
            }, 500); // Wait for fade out
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
                // Scroll Down
                header.classList.add('header--hidden');
            } else {
                // Scroll Up
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
            }, 100);
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

document.addEventListener('DOMContentLoaded', () => {
    const dataManager = new DataManager();
    const a11yMode = new A11yMode();
    const uiManager = new UIManager(dataManager);
    const archiveManager = new ArchiveManager(dataManager);
    const mapController = new MapController(dataManager);
    const formController = new FormController();
});