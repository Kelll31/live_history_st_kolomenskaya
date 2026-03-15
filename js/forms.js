// Управление формами и загрузкой файлов
export class FormController {
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
