const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function handleBtnStartClick() {
  if (intervalId) return;

  intervalId = setInterval(setBodyColor, 1000);
  toggleBtnStartStatus();
}

function handleBtnStopClick() {
  clearInterval(intervalId);
  intervalId = null;
  toggleBtnStartStatus();
}

function toggleBtnStartStatus() {
  btnStartEl.disabled = !btnStartEl.disabled;
}

function setBodyColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

btnStartEl.addEventListener('click', handleBtnStartClick);
btnStopEl.addEventListener('click', handleBtnStopClick);
