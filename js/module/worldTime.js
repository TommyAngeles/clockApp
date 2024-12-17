import {userTheme} from './settings.js';
import {timeFormat} from './settings.js';
import {userLanguage} from './settings.js';

// отображение основного времени
export function mainClockStart() {
    const display = document.querySelector('.world-time-page__time');
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if(hours < 10) {hours = '0' + hours}
    if(minutes < 10) {minutes = '0' + minutes;}
    if(seconds < 10) {seconds = '0' + seconds;} 
    if(timeFormat === 24) {
        display.textContent = `${hours}:${minutes}:${seconds}`
    } else {
        let timeDesignation = '';
        if(hours - 12 <= 0) {
            timeDesignation = 'AM';
        } else {
            hours = hours - 12;
            if(hours < 10) {hours = '0' + hours}
            timeDesignation = 'PM';
        }
        display.textContent = `${hours}:${minutes}:${seconds} ${timeDesignation}`;
    }
}

mainClockStart();
setInterval(mainClockStart, 1000);

// зоны
export const citiesUTC = { 
    "Абу-Даби": 240, // UTC+4
    "Амстердам": 60, // UTC+1
    "Анкара": 120,  // UTC+2
    "Афины": 120, // UTC+2
    "Барселона": 60, // UTC+1
    "Берлин": 60, // UTC+1
    "Будапешт": 120, // UTC+2
    "Вашингтон": -300,  // UTC-5
    "Дублин": 0, // UTC±0
    "Киев": 120, // UTC+2
    "Лиссабон": 0, // UTC±0
    "Лондон": 0,  // UTC±0
    "Лос-Анджелес": -480, // UTC-8   
    "Мадрид": 60, // UTC+1    
    "Мехико": -360, // UTC-6   
    "Москва": 180, // UTC+3    
    "Нью-Йорк": -300, // UTC-5    
    "Париж": 60, // UTC+1    
    "Рио-де-Жанейро": -180,  // UTC-3    
    "Сеул": 540, // UTC+9  
    "Сидней": 660, // UTC+11  
    "Стокгольм": 60, // UTC+1
    "Токио": 540, // UTC+9
    "Торонто": -300 // UTC-5
};

const citiesUTCInEN = {
    "Abu Dhabi": 240, // UTC+4
    "Amsterdam": 60, // UTC+1
    "Ankara": 120, // UTC+2
    "Athens": 120, // UTC+2
    "Barcelona": 60, // UTC+1
    "Berlin": 60, // UTC+1
    "Budapest": 120, // UTC+2
    "Washington": -300, // UTC-5
    "Dublin": 0, // UTC±0
    "Kiev": 120, // UTC+2
    "Lisbon": 0, // UTC±0
    "London": 0, // UTC±0
    "Los Angeles": -480, // UTC-8
    "Madrid": 60, // UTC+1
    "Mexico City": -360, // UTC-6
    "Moscow": 180, // UTC+3
    "New York": -300, // UTC-5
    "Paris": 60, // UTC+1
    "Rio de Janeiro": -180, // UTC-3
    "Seoul": 540, // UTC+9
    "Sydney": 660, // UTC+11
    "Stockholm": 60, // UTC+1
    "Tokyo": 540, // UTC+9
    "Toronto": -300 // UTC-5  
};

// отображение стандартного города
export function displaySystemCity() {
    const display = document.querySelector('.world-time-page__time-subtitle');
    const date = new Date();
    let userOffset = date.getTimezoneOffset();
    if(userOffset < 0) { userOffset = -userOffset } else {userOffset * - 1};
    let city = 'Город не определен';
    if(userLanguage === 'RU') {
        for(city in citiesUTC) {
            if(userOffset === citiesUTC[city]) {
                display.textContent = city + ', стандартное время';
            }
        }
    } else {
        for(city in citiesUTCInEN) {
            if(userOffset === citiesUTCInEN[city]) {
                display.textContent = city + ', standard time';
            }
        }
    }
}

displaySystemCity()

// добавление зон;
export const zonesSettingsButton = document.querySelector('.world-time-page__button1');
export const zonesSettingsConfirmButton = document.querySelector('.world-time-page__zones-settings-confirm-button');
export const zonesWindow = document.querySelector('.world-time-page__zones');
export const zonesSettingsWindow = document.querySelector('.world-time-page__zones-settings');
export const cities = Array.from(document.querySelectorAll('.world-time-page__zones-settings-city'));
export const citiesCheckboxes = Array.from(document.querySelectorAll('.world-time-page__zones-settings-checkbox'));

export function openZonesSettings() {
    zonesWindow.classList.add('hidden');
    zonesSettingsWindow.classList.remove('hidden');
};

zonesSettingsButton.onclick = openZonesSettings;

export function closeZoneSettings() {
    zonesSettingsWindow.classList.add('hidden');
    zonesWindow.classList.remove('hidden');
};

zonesSettingsConfirmButton.onclick = closeZoneSettings;

export let selectedCities = ['Москва', 'Лондон', 'Нью-Йорк'];
export let storedCities = localStorage.getItem('cities');

export function addSelectedCities() {
    if (storedCities) {
        selectedCities = JSON.parse(storedCities); 
    }
}

addSelectedCities()

export function createZone(city) {
    let zone = document.createElement('div');
    zone.classList.add('zone');
    userTheme === true ? zone.classList.add('dark-theme-block') : zone.classList.remove('dark-theme-block');
    zonesWindow.append(zone);
    
    let zoneInfo = document.createElement('div');
    zoneInfo.classList.add('zone__info')
    userTheme === true ? zoneInfo.classList.add('dark-theme-block') : zoneInfo.classList.remove('dark-theme-block');
    zone.append(zoneInfo)

    let zoneCity = document.createElement('div');
    zoneCity.classList.add('zone__city');
    zoneCity === true ? zoneCity.classList.add('dark-theme-text') : zoneCity.classList.remove('dark-theme-text');
    zoneCity.textContent = city;
    zoneInfo.append(zoneCity);
    
    let zoneTimeZone = document.createElement('div');
    zoneTimeZone.classList.add('zone__time-zone');
    zoneTimeZone === true ? zoneTimeZone.classList.add('dark-theme-text') : zoneTimeZone.classList.remove('dark-theme-text');
    const date = new Date();
    let cityOffset = citiesUTC[city] / 60;
    if(userLanguage === 'EN') {
        cityOffset = citiesUTCInEN[city] / 60;
    } else {
        cityOffset = citiesUTC[city] / 60;
    }
    let userOffset = date.getTimezoneOffset() / 60;
    if(userOffset < 0) { userOffset = -userOffset } else {userOffset * - 1};
    let offsetRelativeToUserCity = cityOffset - userOffset;
    let earlierLater = 'раньше/позже'
    if(userLanguage === 'EN') {
        offsetRelativeToUserCity > 0 ? earlierLater = 'later' : earlierLater = 'earlier';
        if (offsetRelativeToUserCity !== 0) {
            zoneTimeZone.textContent = `${Math.abs(offsetRelativeToUserCity)} hours ${earlierLater}`
        } else {
            zoneTimeZone.textContent = `Local time zone`
        }
    } else {
        offsetRelativeToUserCity > 0 ? earlierLater = 'позже' : earlierLater = 'раньше';
        if (offsetRelativeToUserCity !== 0) {
            zoneTimeZone.textContent = `На ${Math.abs(offsetRelativeToUserCity)} ч. ${earlierLater}`
        } else {
            zoneTimeZone.textContent = `Местный часовой пояс`
        }
    }
    zoneInfo.append(zoneTimeZone);

    let zoneTime = document.createElement('div');
    zoneTime.classList.add('zone__time');
    if(userTheme === true) {
        zoneTime.classList.add('dark-theme-text');
    }
    let hours = (date.getUTCHours() + cityOffset) % 24; 
    if (hours < 0) { hours += 24; } 
    let minutes = date.getUTCMinutes()
    if(hours < 10) {hours = '0' + hours}
    if(minutes < 10) {minutes = '0' + minutes;}
    if(timeFormat === 24) {
        zoneTime.textContent = `${hours}:${minutes}`;
    } else {
        let timeDesignation = '';
        if(hours - 12 <= 0) {
            timeDesignation = 'AM'
        } else {
            hours = hours - 12;
            if(hours < 10) {hours = '0' + hours}
            timeDesignation = 'PM'
        }
        zoneTime.textContent = `${hours}:${minutes} ${timeDesignation}`
    }
    zone.append(zoneTime)
}

// функция обновления времени

export function updateZoneTimes() {
    const zones = document.querySelectorAll('.zone__time');
    zones.forEach((zone, index) => {
        const city = selectedCities[index];
        const date = new Date();
        let cityOffset = citiesUTC[city] / 60;
        if(userLanguage === 'EN') {
            cityOffset = citiesUTCInEN[city] / 60;
        } else {
            cityOffset = citiesUTC[city] / 60;
        }
        let hours = (date.getUTCHours() + cityOffset) % 24;
        let minutes = date.getUTCMinutes();    
        if (hours < 0) { hours += 24; }
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if(timeFormat === 24) {
            zone.textContent = `${hours}:${minutes}`;
        } else {
            let timeDesignation = '';
            if(hours - 12 <= 0) {
                timeDesignation = 'AM'
            } else {
                hours = hours - 12;
                if(hours < 10) {hours = '0' + hours}
                timeDesignation = 'PM'
            }
            zone.textContent = `${hours}:${minutes} ${timeDesignation}`
        }
    });
}

setInterval(updateZoneTimes, 1000);

export function updateLanguage() {
    if(userLanguage === 'EN') {
        for(let i = 0; i < cities.length; i++) {
            cities[i].textContent = Object.keys(citiesUTCInEN)[i];
        }
        for(let i = 0; i < selectedCities.length; i++) {
            for(let c = 0; c < Object.keys(citiesUTC).length; c++) {
                if(selectedCities[i] === Object.keys(citiesUTC)[c]) {
                    selectedCities[i] = Object.keys(citiesUTCInEN)[c]
                }
            }
        }
    } else {
        for(let i = 0; i < cities.length; i++) {
            cities[i].textContent = Object.keys(citiesUTC)[i];
        }
        for(let i = 0; i < selectedCities.length; i++) {
            for(let c = 0; c < Object.keys(citiesUTC).length; c++) {
                if(selectedCities[i] === Object.keys(citiesUTCInEN)[c]) {
                    selectedCities[i] = Object.keys(citiesUTC)[c]
                }
            }
        }
    }
    // языковая обновочка
    refreshZones()
    storedCities = localStorage.getItem('cities');
    localStorage.setItem('cities', JSON.stringify(selectedCities));
}
updateLanguage()

export function zoneUpdate() {
    for (let i = 0; i < citiesCheckboxes.length; i++) {
        citiesCheckboxes[i].addEventListener('click', () => {
            const city = cities[i].textContent;
            const index = selectedCities.indexOf(city);
            if (index === -1) {
                selectedCities.push(city);
            } else {
                selectedCities.splice(index, 1);
            }
            if(selectedCities.length !== 0) {
                localStorage.setItem('cities', JSON.stringify(selectedCities));
            } else {
                localStorage.setItem('cities', JSON.stringify(selectedCities));
            };
            // обновление отображений зон
            refreshZones();
        });
        // установка состояний чекбоксов при загрузке
        if (selectedCities.includes(cities[i].textContent)) {
            citiesCheckboxes[i].checked = true;
        }
    }
}

export function refreshZones() {
    // очистка текущих отображений зон
    zonesWindow.innerHTML = '';
    // создание зоны для каждого выбранного города
    for (let city of selectedCities) {
        createZone(city);
    }
}
// начальное отображение зон на основе выбранных городов

refreshZones();
zoneUpdate();
