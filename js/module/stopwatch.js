import { userLanguage, userTheme } from "./settings.js";
const buttons = document.querySelectorAll('.stopwatch-page__button');
const stopwatchTimeOnDisplay = document.querySelector('.stopwatch-page__time');
const stopwatchStartButton = document.querySelector('#stopwatch-page-button1');
const stopwatchIntervalButton = document.querySelector('#stopwatch-page-button2');
const stopwatchResetButton = document.querySelector('#stopwatch-page-button3');
const intervals = document.querySelector('.intervals');

let stopwatchTimer = null;
let stopwatchStartTime = 0;
let stopwatchElapsedTime = 0;
let stopwatchIsRunning = false;

const stopwatchCircleTimeOnDisplay = document.querySelector('.stopwatch-page__display-circle-time');
let stopwatchCircleTimer = null;
let stopwatchCircleStartTime = 0;
let stopwatchCircleElapsedTime = 0;

stopwatchStartButton.addEventListener('click', () => {
    if(!stopwatchIsRunning) {
        if(userLanguage === 'RU') {
            stopwatchStartButton.textContent = 'Стоп'
        } else {
            stopwatchStartButton.textContent = 'Pause'
        }
        stopwatchStartTime = Date.now() - stopwatchElapsedTime;
        stopwatchTimer = setInterval(update, 10);
        stopwatchIsRunning = true;

        stopwatchCircleStartTime = Date.now() - stopwatchCircleElapsedTime;
        stopwatchCircleTimer = setInterval(update, 10);
    } else if(stopwatchIsRunning) {
        if(userLanguage === 'RU') {
            stopwatchStartButton.textContent = 'Начать'
        } else {
            stopwatchStartButton.textContent = 'Start'
        }
        clearInterval(stopwatchTimer);
        stopwatchElapsedTime = Date.now() - stopwatchStartTime;
        stopwatchIsRunning = false;

        clearInterval(stopwatchCircleTimer);
        stopwatchCircleElapsedTime = Date.now() - stopwatchCircleStartTime;
    }
});

stopwatchIntervalButton.addEventListener('click', () => {
    if(stopwatchIsRunning) {
        stopwatchCircleTimeOnDisplay.style.opacity = 1;
        clearInterval(stopwatchCircleTimer);
        stopwatchCircleStartTime = Date.now();

        intervals.classList.add('visible')
        let interval = document.createElement('div');
        interval.classList.add('intervals__interval');
        intervals.prepend(interval);
        requestAnimationFrame(() => {
            interval.classList.add("interval-visible"); 
        });

        let intervalsArr = Array.from(intervals.childNodes)
        for(let i = 0; i < intervalsArr.length; i++) {
            let circle = document.createElement('div');
            if(userLanguage === 'RU') {
                if((intervalsArr.length + 1) - 1 < 10) {
                    circle.textContent = `Круг: 0${(intervalsArr.length + 1) - 1}`;
                } else {
                    circle.textContent = `Круг: ${(intervalsArr.length + 1) - 1}`;
                }
            } else {
                if((intervalsArr.length + 1) - 1 < 10) {
                    circle.textContent = `Circle: 0${(intervalsArr.length + 1) - 1}`;
                } else {
                    circle.textContent = `Circle: ${(intervalsArr.length + 1) - 1}`;
                }
            }
            circle.classList.add('intervals__circle');
            if (intervalsArr[i].hasChildNodes() === false) {
                intervalsArr[i].append(circle)
            }

            let circleTime = document.createElement('div');
            circleTime.classList.add('intervals__circle-time');
            if(userLanguage === 'RU') {
                circleTime.textContent = `Время круга: ${stopwatchCircleTimeOnDisplay.textContent}`;
            } else {
                circleTime.textContent = `Lap time: ${stopwatchCircleTimeOnDisplay.textContent}`;
            }
            if (!intervalsArr[i].querySelector('.intervals__circle-time')) {
                intervalsArr[i].append(circleTime);
            }

            let totalTime = document.createElement('div');
            totalTime.classList.add('intervals__total-time');
            if(userLanguage === 'RU') {
                totalTime.textContent = `Общее время: ${stopwatchTimeOnDisplay.textContent}`;
            } else {
                totalTime.textContent = `Total time: ${stopwatchTimeOnDisplay.textContent}`;
            }
            if (!intervalsArr[i].querySelector('.intervals__total-time')) {
                intervalsArr[i].append(totalTime);
            }
        }

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
        } else {
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
    }
});

stopwatchResetButton.addEventListener('click', () => {
    clearInterval(stopwatchTimer);
    stopwatchStartTime = 0;
    stopwatchElapsedTime = 0;
    stopwatchIsRunning = false;
    stopwatchTimeOnDisplay.textContent = '00:00:00.00';
    intervals.innerHTML = '';
    intervals.classList.remove('visible');
    if(userLanguage === 'RU') {
        stopwatchStartButton.textContent = 'Начать'
    } else {
        stopwatchStartButton.textContent = 'Start'
    }


    stopwatchCircleTimeOnDisplay.style.opacity = 0;
    clearInterval(stopwatchCircleTimer);
    stopwatchCircleStartTime = 0;
    stopwatchCircleElapsedTime = 0;
    stopwatchIsRunning = false;
    stopwatchCircleTimeOnDisplay.textContent = '00:00:00.00';
});

function update() {
    const currentTime = Date.now();
    stopwatchElapsedTime = currentTime - stopwatchStartTime;

    let hours = Math.floor(stopwatchElapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(stopwatchElapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(stopwatchElapsedTime / 1000 % 60);
    let milliseconds = Math.floor(stopwatchElapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    stopwatchTimeOnDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`


    const currentCircleTime = Date.now();
    stopwatchCircleElapsedTime = currentCircleTime - stopwatchCircleStartTime;

    let circleHours = Math.floor(stopwatchCircleElapsedTime / (1000 * 60 * 60));
    let circleMinutes = Math.floor(stopwatchCircleElapsedTime / (1000 * 60) % 60);
    let circleSeconds = Math.floor(stopwatchCircleElapsedTime / 1000 % 60);
    let circleMilliseconds = Math.floor(stopwatchCircleElapsedTime % 1000 / 10);

    circleHours = String(circleHours).padStart(2, "0");
    circleMinutes = String(circleMinutes).padStart(2, "0");
    circleSeconds = String(circleSeconds).padStart(2, "0");
    circleMilliseconds = String(circleMilliseconds).padStart(2, "0");

    stopwatchCircleTimeOnDisplay.textContent = `${circleHours}:${circleMinutes}:${circleSeconds}.${circleMilliseconds}`
}

export function updateStopwatchLanguage() {
    if(JSON.parse(localStorage.getItem('lang')) === 'RU') {
        buttons[0].textContent = 'Начать';
        buttons[1].textContent = 'Интервал';
        buttons[2].textContent = 'Перезагрузить';
    } else {
        buttons[0].textContent = 'Start';
        buttons[1].textContent = 'Lap';
        buttons[2].textContent = 'Reset';
    }

    if (intervals.hasChildNodes()) {
        let intervalsArr = Array.from(intervals.childNodes);
        let circles = Array.from(document.querySelectorAll('.intervals__circle'));
        for (let i = 0; i < intervalsArr.length; i++) {
            let circleNumber = intervalsArr.length - i; 
            if (userLanguage === 'RU') {
                circles[i].textContent = `Круг: ${circleNumber < 10 ? '0' + circleNumber : circleNumber}`;
            } else {
                circles[i].textContent = `Circle: ${circleNumber < 10 ? '0' + circleNumber : circleNumber}`;
            }
        }

        let circleTime = document.querySelectorAll('.intervals__circle-time');
        for (let i = 0; i < intervalsArr.length; i++) {
            if(userLanguage === 'RU') {
                circleTime[i].textContent = `Время круга: ${stopwatchCircleTimeOnDisplay.textContent}`;
            } else {
                circleTime[i].textContent = `Lap time: ${stopwatchCircleTimeOnDisplay.textContent}`;
            }
        }

        let totalTime = document.querySelectorAll('.intervals__total-time');
        for (let i = 0; i < intervalsArr.length; i++) {
            if(userLanguage === 'RU') {
                totalTime[i].textContent = `Общее время: ${stopwatchTimeOnDisplay.textContent}`;
            } else {
                totalTime[i].textContent = `Total time: ${stopwatchTimeOnDisplay.textContent}`;
            }
        }
    }
}

updateStopwatchLanguage()
