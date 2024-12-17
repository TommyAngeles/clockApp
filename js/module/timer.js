const timerOnDisplay = document.querySelector('.timer-page__timer');
const timerStartButton = document.querySelector('.timer-page__start-button');
const timerResetButton = document.querySelector('.timer-page__reset-button');
const addTimeButton1 = document.querySelector('#add-time-btn1');
const addTimeButton2 = document.querySelector('#add-time-btn2');
const addTimeButton3 = document.querySelector('#add-time-btn3');
let timerTime = 0;
let timerId; 
let isRunning = false;

function updateDisplay() {
    let minutes = Math.floor(timerTime / (1000 * 60));
    let seconds = Math.floor((timerTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((timerTime % 1000) / 10);
    minutes < 10 ? minutes = '0' + minutes: minutes;
    seconds < 10 ? seconds = '0' + seconds: seconds;
    milliseconds < 10 ? milliseconds = '0' + milliseconds: milliseconds;
    timerOnDisplay.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

addTimeButton1.addEventListener('click', () => {
    timerTime += 30000;
    updateDisplay()
});

addTimeButton2.addEventListener('click', () => {
    timerTime += 60000;
    updateDisplay()
});

addTimeButton3.addEventListener('click', () => {
    timerTime += 300000;
    updateDisplay()
});

timerStartButton.addEventListener('click', () => {
    if(timerTime !== 0) {
        if (isRunning) { 
            clearInterval(timerId);
            isRunning = false; 
            document.querySelector('.timer-page__svg-triangle').style.display = 'block';
            document.querySelector('.timer-page__svg-pause').style.display = 'none';
        } else { 
            isRunning = true;
            timerId = setInterval(timerUpdate, 10);
            document.querySelector('.timer-page__svg-triangle').style.display = 'none';
            document.querySelectorAll('.timer-page__svg-pause').forEach((elem) => {
                elem.style.display = 'block';
            });
        }
    }
});

timerResetButton.addEventListener('click', () => {
    if(timerTime !== 0) {
        timerTime = 0;
        isRunning = false;
        document.querySelector('.timer-page__svg-triangle').style.display = 'block';
        document.querySelector('.timer-page__svg-pause').style.display = 'none';
        timerOnDisplay.textContent = '00:00.00';
    }
});

function timerUpdate() {
    if (timerTime <= 0) {
        clearInterval(timerId);
        isRunning = false;
        document.querySelector('.timer-page__svg-triangle').style.display = 'block';
        document.querySelector('.timer-page__svg-pause').style.display = 'none';
        timerOnDisplay.textContent = '00:00.00';
        return;
    }
    timerTime -= 10;
    updateDisplay()
}