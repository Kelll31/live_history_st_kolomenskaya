// Управление картой Яндекс
import { DataManager } from './data.js';

export class MapController {
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
            center: [54.914285, 37.416298],
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
                hasBalloon: false
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

            const mapContainer = document.querySelector('.map-container');
            if (mapContainer) {
                mapContainer.appendChild(popup);
            }
        }

        popup.innerHTML = `
            <div class="popup-image" style="background-image: url('images/image.png');"></div>
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
