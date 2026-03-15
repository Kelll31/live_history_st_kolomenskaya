// Главный файл инициализации приложения
import { loadHeader, loadFooter } from './loader.js';
import { A11yMode } from './a11y.js';
import { DataManager } from './data.js';
import { ArchiveManager } from './archive.js';
import { MapController } from './map.js';
import { FormController } from './forms.js';
import { UIManager } from './ui.js';
import { AnimationController, initCounters } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    
    const dataManager = new DataManager();
    const a11yMode = new A11yMode();
    const uiManager = new UIManager(dataManager);
    const archiveManager = new ArchiveManager(dataManager);
    const mapController = new MapController(dataManager);
    const formController = new FormController();
    const animationController = new AnimationController();
    
    // Инициализация анимации счетчиков
    initCounters();
});
