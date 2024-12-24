import {pages, openedPage, changeNavLanguage} from '../main.js'
import {displaySystemCity, updateLanguage} from './worldTime.js';
import { updateStopwatchLanguage } from './stopwatch.js';

const settingsPage = document.querySelector('.settings-page');
const settingsButton = document.querySelector('.world-time-page__button2');
const navBar = document.querySelector('.nav');
const backButton = document.querySelector('.settings-page__back-btn');

settingsButton.addEventListener('click', () => {
    pages.forEach((page) => {
        page.classList.add('hidden');
    });
    settingsPage.classList.remove('hidden');
    navBar.classList.add('hidden-nav');
});

backButton.addEventListener('click', () => {
    for(let i = 0; i < pages.length; i++) {
        if(pages[i] !== pages[openedPage]) {
            pages[i].classList.add('hidden');
        } else {
            pages[openedPage].classList.remove('hidden');
        }
    }
    navBar.classList.remove('hidden-nav');
});

// светлая/тёмная тема
const checkbox = document.querySelector('#theme-checkbox');
const mainBackground = document.querySelector('.main');
const pageElementsToChangeTheme = {
    textOneElem: [        
        document.querySelector('.world-time-page__time'),
        document.querySelector('.world-time-page__time-subtitle'),
        document.querySelector('.world-time-page__zones-settings-title'),
        document.querySelector('.stopwatch-page__time'),
        document.querySelector('.stopwatch-page__display-circle-time'),
        document.querySelector('.timer-page__timer'),
        document.querySelector('.settings-page__title'),
    ],

    textManyELem: [
        document.querySelectorAll('.zone__city'),
        document.querySelectorAll('.zone__time-zone'),
        document.querySelectorAll('.zone__time'),
        document.querySelectorAll('.world-time-page__zones-settings-city'),
        document.querySelectorAll('.intervals__circle'),
        document.querySelectorAll('.intervals__circle-time'),
        document.querySelectorAll('.intervals__total-time'),
        document.querySelectorAll('.setting__text'),
        document.querySelectorAll('.nav__button'),
    ],

    blockOneElem: [
        document.querySelector('.world-time-page__button1'),
        document.querySelector('.world-time-page__button2'),
        document.querySelector('.world-time-page__zones-settings'),
        document.querySelector('.timer-page__start-button'),
        document.querySelector('.settings-page__back-btn'),
        document.querySelector('.settings-page__settings'),
        document.querySelector('.timer-page__reset-button'),
        document.querySelector('.nav'),
    ],

    blockManyElem: [
        document.querySelectorAll('.zone'),
        document.querySelectorAll('.intervals__interval'),
        document.querySelectorAll('.stopwatch-page__button'),
        document.querySelectorAll('.timer-page__button'),
        document.querySelectorAll('.setting__selection'),
    ],

    svgElems: [
        document.querySelectorAll('.timer-page__svg-triangle'),
        document.querySelectorAll('.timer-page__svg-pause'),
        document.querySelectorAll('.timer-page__reset-svg'),
    ]
};

export let userTheme = false;

    if (JSON.parse(localStorage.getItem('theme')) === true) {
        checkbox.checked = true;
        userTheme = true;
        mainBackground.style.background = '#363636';
        pageElementsToChangeTheme.textOneElem.forEach((elem) => {
            elem.classList.add('dark-theme-text')
        });
        pageElementsToChangeTheme.textManyELem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
        });
        pageElementsToChangeTheme.blockOneElem.forEach((elem) => {
            elem.classList.add('dark-theme-block')
        });
        pageElementsToChangeTheme.blockManyElem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.add('dark-theme-block');
            });
        });
        pageElementsToChangeTheme.svgElems.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.setAttribute('fill', 'gray')
            });
        });
    } else {
        userTheme = false;
        mainBackground.style.background = 'rgb(224, 224, 224)';
        pageElementsToChangeTheme.textOneElem.forEach((elem) => {
            elem.classList.remove('dark-theme-text')
        });
        pageElementsToChangeTheme.textManyELem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
        });
        pageElementsToChangeTheme.blockOneElem.forEach((elem) => {
            elem.classList.remove('dark-theme-block')
        });
        pageElementsToChangeTheme.blockManyElem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.remove('dark-theme-block');
            });
        });
        pageElementsToChangeTheme.svgElems.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.setAttribute('fill', '#363636')
            });
        });
    }

checkbox.addEventListener('click', function () {
    if (checkbox.checked == true) {
        userTheme = true;
        mainBackground.style.background = '#363636';
        pageElementsToChangeTheme.textOneElem.forEach((elem) => {
            elem.classList.add('dark-theme-text')
        });
        pageElementsToChangeTheme.textManyELem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
        });
        pageElementsToChangeTheme.blockOneElem.forEach((elem) => {
            elem.classList.add('dark-theme-block')
        });
        pageElementsToChangeTheme.blockManyElem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.add('dark-theme-block');
            });
        });
        pageElementsToChangeTheme.svgElems.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.setAttribute('fill', 'gray')
            });
        });
        if (userTheme === true) {
            document.querySelectorAll('.intervals__interval').forEach((elem) => {
                elem.classList.add('dark-theme-block');
            });
            document.querySelectorAll('.intervals__circle').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
            document.querySelectorAll('.intervals__circle-time').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
            document.querySelectorAll('.intervals__total-time').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
        }

        if (userTheme === true) {
            document.querySelectorAll('.zone').forEach((elem) => {
                elem.classList.add('dark-theme-block');
            });
            document.querySelectorAll('.zone__info').forEach((elem) => {
                elem.classList.add('dark-theme-block');
            });
            document.querySelectorAll('.zone__city').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
            document.querySelectorAll('.zone__time-zone').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
            document.querySelectorAll('.zone__time').forEach((elem) => {
                elem.classList.add('dark-theme-text');
            });
        }
    } else if(checkbox.checked == false){
        userTheme = false;
        mainBackground.style.background = 'rgb(224, 224, 224)';
        pageElementsToChangeTheme.textOneElem.forEach((elem) => {
            elem.classList.remove('dark-theme-text')
        });
        pageElementsToChangeTheme.textManyELem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
        });
        pageElementsToChangeTheme.blockOneElem.forEach((elem) => {
            elem.classList.remove('dark-theme-block')
        });
        pageElementsToChangeTheme.blockManyElem.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.classList.remove('dark-theme-block');
            });
        });
        pageElementsToChangeTheme.svgElems.forEach((elemCollection) => {
            elemCollection.forEach((elem) => {
                elem.setAttribute('fill', '#363636')
            });
        });
        if (userTheme === false) {
            document.querySelectorAll('.intervals__interval').forEach((elem) => {
                elem.classList.remove('dark-theme-block');
            });
            document.querySelectorAll('.intervals__circle').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
            document.querySelectorAll('.intervals__circle-time').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
            document.querySelectorAll('.intervals__total-time').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
        }
        if (userTheme === false) {
            document.querySelectorAll('.zone').forEach((elem) => {
                elem.classList.remove('dark-theme-block');
            });
            document.querySelectorAll('.zone__info').forEach((elem) => {
                elem.classList.remove('dark-theme-block');
            });
            document.querySelectorAll('.zone__city').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
            document.querySelectorAll('.zone__time-zone').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
            document.querySelectorAll('.zone__time').forEach((elem) => {
                elem.classList.remove('dark-theme-text');
            });
        }
    }
    localStorage.setItem('theme', JSON.stringify(userTheme));
});

// формат времени 
export const timeFormatButton = document.querySelector('#time-format');
export let timeFormat = 24;
if (JSON.parse(localStorage.getItem('format')) === 24 || !JSON.parse(localStorage.getItem('format'))) {
    timeFormat = 24;
} else {
    timeFormat = 12;
}

// языки
export let userLanguage = 'RU';
if(JSON.parse(localStorage.getItem('lang')) === 'RU') {
    userLanguage = 'RU';
} else {
    userLanguage = 'EN';
}

const changeLanguageButton = document.querySelector('#language-button');
function changeSettingsLanguage() {
    const settingsText = document.querySelectorAll('.setting__text');
    const title = document.querySelector('.settings-page__title');
    if(userLanguage === 'EN') {
        for(let i = 0; i < settingsText.length; i++) {
            settingsText[0].textContent = 'Night mode';
            settingsText[1].textContent = 'Time format';
            settingsText[2].textContent = 'Language';
        }
        title.textContent = 'Settings';
        changeLanguageButton.textContent = 'English';
        if(timeFormat === 24) {
            timeFormatButton.textContent = '24 hour'
        } else {
            timeFormatButton.textContent = '12 hour'
        }
    } else {
        for(let i = 0; i < settingsText.length; i++) {
            settingsText[0].textContent = 'Ночной режим';
            settingsText[1].textContent = 'Формат времени';
            settingsText[2].textContent = 'Язык';
        }
        title.textContent = 'Настройки';
        changeLanguageButton.textContent = 'Русский';
        if(timeFormat === 24) {
            timeFormatButton.textContent = '24 часовой'
        } else {
            timeFormatButton.textContent = '12 часовой'
        }
    }
}

changeSettingsLanguage();


timeFormatButton.addEventListener('click', () => {
    if(userLanguage === 'EN') {
        if(timeFormat === 24) {
            timeFormat = 12;
            timeFormatButton.textContent = '12 hour';
        } else {
            timeFormat = 24;
            timeFormatButton.textContent = '24 hour';
        }
    } else {
        if(timeFormat === 24) {
            timeFormat = 12;
            timeFormatButton.textContent = '12 часовой';
        } else {
            timeFormat = 24;
            timeFormatButton.textContent = '24 часовой';
        }
    }
    localStorage.setItem('format', JSON.stringify(timeFormat));
});

changeLanguageButton.addEventListener('click', () => {
    if(userLanguage === 'RU') {
        userLanguage = 'EN';
    } else {
        userLanguage = 'RU';
    }
    localStorage.setItem('lang', JSON.stringify(userLanguage));
    displaySystemCity();
    updateLanguage();
    changeNavLanguage();
    updateStopwatchLanguage();
    changeSettingsLanguage();
});
