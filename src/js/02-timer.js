import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Howl } from 'howler';
import '../css/02-timer.css';

const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnResetEl: document.querySelector('button[data-reset]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minsEl: document.querySelector('span[data-minutes]'),
  secsEl: document.querySelector('span[data-seconds]'),
  errorSoundEl: document.querySelector('audio'),
};

let selectedTime = null;
let intervalID = null;
let calendar = null;

function renderFlatpickrCalendar() {
  flatpickr.localize(Ukrainian);
  calendar = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() {
      handleCalendarOpenining();
    },
    onClose(selectedDate) {
      handleCalendarClosing(selectedDate);
    },
  });
}

function handleCalendarOpenining() {
  if (intervalID) calendar.close();
}

function handleCalendarClosing(seclectedDate) {
  if (seclectedDate.length === 0) return;
  const diff = seclectedDate[0].getTime() - Date.now();
  if (diff < 0) {
    handlePastDate();
    return;
  }
  refs.btnStartEl.disabled = false;
  selectedTime = seclectedDate[0].getTime();
  renderTimer(convertMs(getDiffTime()));
}

function handlePastDate() {
  calendar.clear();
  playErrorSound();
  showErrorMessage();
}

function showErrorMessage() {
  Report.failure(
    'Блииииин.... Не получается...',
    'Тут, в общем такая проблема... Нельзя выбрать дату из прошлого!!! Конечено, если заморочится, - то можно, но никто не заморочился :) поэтому нельзя',
    'Ладно, я все понял'
  );
}

function handleStartBtnClick() {
  if (intervalID) return;
  intervalID = setInterval(updateTimer, 1000);
  renderTimer(convertMs(getDiffTime()));
  refs.btnStartEl.disabled = true;
  refs.btnResetEl.disabled = false;
}

function getDiffTime() {
  return selectedTime - Date.now();
}

function handleResetBtnClick() {
  clearInterval(intervalID);
  intervalID = null;
  resetTimer();
  refs.btnResetEl.disabled = true;
}

function resetTimer() {
  renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

function updateTimer() {
  renderTimer(convertMs(getDiffTime()));
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minsEl.textContent = addLeadingZero(minutes);
  refs.secsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return ('' + value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function playErrorSound() {
  const sound = new Howl({
    src: [refs.errorSoundEl.src],
  });
  sound.play();
}

renderFlatpickrCalendar();
refs.btnStartEl.disabled = true;
refs.btnResetEl.disabled = true;
refs.btnStartEl.addEventListener('click', handleStartBtnClick);
refs.btnResetEl.addEventListener('click', handleResetBtnClick);
