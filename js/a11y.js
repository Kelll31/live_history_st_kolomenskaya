// Режим доступности для слабовидящих
export class A11yMode {
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
