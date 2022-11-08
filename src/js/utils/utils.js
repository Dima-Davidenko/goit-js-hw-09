export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export function convertMs(ms) {
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

export function addLeadingZero(value) {
  return ('' + value).padStart(2, '0');
}
