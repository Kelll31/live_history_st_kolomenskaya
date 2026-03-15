// Загрузка хедера и футера
export async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('Не удалось загрузить хедер');
        const headerHtml = await response.text();

        const existingHeader = document.querySelector('.header');
        if (existingHeader) {
            existingHeader.remove();
        }

        const body = document.querySelector('body');
        if (body) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = headerHtml;
            const headerElement = tempDiv.querySelector('.header');
            if (headerElement) {
                body.insertBefore(headerElement, body.firstChild);
                updateHeaderActiveLink();
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки хедера:', error);
    }
}

// Загрузка футера
export async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Не удалось загрузить футер');
        const footerHtml = await response.text();

        const existingFooter = document.querySelector('.footer');
        if (existingFooter) {
            existingFooter.remove();
        }

        const body = document.querySelector('body');
        if (body) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = footerHtml;
            const footerElement = tempDiv.querySelector('.footer');
            if (footerElement) {
                body.appendChild(footerElement);
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки футера:', error);
    }
}

export function updateHeaderActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
