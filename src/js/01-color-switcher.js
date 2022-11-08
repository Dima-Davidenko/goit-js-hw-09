import { getRandomHexColor } from './utils/utils.js';

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

function handleBtnStartClick() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleBtnsStatus();
}

function handleBtnStopClick() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
  toggleBtnsStatus();
}

function toggleBtnsStatus() {
  btnStartEl.disabled = !btnStartEl.disabled;
  btnStopEl.disabled = !btnStopEl.disabled;
}

btnStartEl.addEventListener('click', handleBtnStartClick);
btnStopEl.addEventListener('click', handleBtnStopClick);
btnStopEl.disabled = true;
