import { convertMs, addLeadingZero } from './utils/utils.js';
import { calendarOptions, errorMessage } from './utils/settings.js';

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
  sound: new Howl({
    src: [document.querySelector('audio').src],
  }),
};

let selectedTime = null;
let intervalID = null;
let calendar = null;

function renderFlatpickrCalendar() {
  flatpickr.localize(Ukrainian);
  calendar = flatpickr('#datetime-picker', {
    ...calendarOptions,
    onOpen() {
      if (intervalID) calendar.close();
    },
    onClose(selectedDate) {
      handleCalendarClosing(selectedDate);
    },
  });
}

function handleCalendarClosing(seclectedDate) {
  if (seclectedDate.length === 0) return;
  selectedTime = seclectedDate[0].getTime();
  if (getNewTimeDifference() < 0) {
    handlePastDate();
    return;
  }
  refs.btnStartEl.disabled = false;
  renderTimer(convertMs(getNewTimeDifference()));
}

function handlePastDate() {
  calendar.clear();
  refs.sound.play();
  Report.failure(...errorMessage);
}

function handleStartBtnClick() {
  if (intervalID) return;
  renderTimer(convertMs(getNewTimeDifference()));
  intervalID = setInterval(() => {
    renderTimer(convertMs(getNewTimeDifference()));
  }, 1000);
  refs.btnStartEl.disabled = true;
  refs.btnResetEl.disabled = false;
}

function handleResetBtnClick() {
  clearInterval(intervalID);
  intervalID = null;
  renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  refs.btnResetEl.disabled = true;
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minsEl.textContent = addLeadingZero(minutes);
  refs.secsEl.textContent = addLeadingZero(seconds);
}

function getNewTimeDifference() {
  return selectedTime - Date.now();
}

renderFlatpickrCalendar();
refs.btnStartEl.disabled = true;
refs.btnResetEl.disabled = true;
refs.btnStartEl.addEventListener('click', handleStartBtnClick);
refs.btnResetEl.addEventListener('click', handleResetBtnClick);
