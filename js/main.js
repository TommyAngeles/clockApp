// ИМПОРТ
import * as worldTime from './module/worldTime.js';
import * as stopwatch from './module/stopwatch.js';
import * as timer from './module/timer.js';
import * as settings from './module/settings.js';

// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
export const pages = Array.from(document.getElementsByClassName('page'));
const navBtns = Array.from(document.getElementsByClassName('nav__button'));
export let openedPage = 0;
const storedPage = JSON.parse(localStorage.getItem('page'));

if(storedPage !== null && storedPage !== 0) {
    openedPage = JSON.parse(localStorage.getItem('page'));
    navBtns.forEach(btn => {
        btn.classList.remove('active-nav-btn');
    });
    navBtns[openedPage].classList.add('active-nav-btn');
    pages.forEach(pages => {
        pages.classList.add('hidden');
    });
    pages[openedPage].classList.remove('hidden');
}

for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', () => {
        openedPage = i;
        localStorage.setItem('page', JSON.stringify(openedPage));
        navBtns.forEach(btn => {
            btn.classList.remove('active-nav-btn');
        });
        navBtns[openedPage].classList.add('active-nav-btn');
        for(let p = 0; p < pages.length; p++) {
            if(pages[p] !== pages[openedPage]) {
                pages[p].classList.add('hidden');
            } else {
                pages[openedPage].classList.remove('hidden');
            }
        }
    });
}

export function changeNavLanguage() {
    if(settings.userLanguage === 'EN') {
        navBtns[0].textContent = 'World Time';
        navBtns[1].textContent = 'Stopwatch';
        navBtns[2].textContent = 'Timer';
    } else {
        navBtns[0].textContent = 'Мировое время';
        navBtns[1].textContent = 'Секундомер';
        navBtns[2].textContent = 'Таймер';
    }
}

changeNavLanguage()