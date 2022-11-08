import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  notifyFailureMessageOpts,
  notifySuccesMessageOpts,
} from './utils/settings.js';

const form = document.querySelector('.form');

function handleFormSubmit(event) {
  event.preventDefault();
  const { elements } = event.currentTarget;
  const delay = +elements.delay.value;
  const step = +elements.step.value;
  const amount = +elements.amount.value;
  createShowPromisesProgram({ delay, step, amount });
}

function createShowPromisesProgram({ delay, step, amount }) {
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          notifySuccesMessageOpts
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Fulfilled promise ${position} in ${delay}ms`,
          notifyFailureMessageOpts
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

form.addEventListener('submit', handleFormSubmit);
