import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

function handleFormSubmit(event) {
  const { elements } = this;
  event.preventDefault();
  const delay = +elements.delay.value;
  const step = +elements.step.value;
  const amount = +elements.amount.value;
  createShowPromisesProgram({ delay, step, amount });
}

function createShowPromisesProgram({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        showSuccessNotification(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        showFailuresNotification(
          `❌ Fulfilled promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function showSuccessNotification(message) {
  Notify.success(message, {
    cssAnimationStyle: 'zoom',
    position: 'right-bottom',
  });
}
function showFailuresNotification(message) {
  Notify.failure(message, {
    cssAnimationStyle: 'from-right',
    position: 'right-bottom',
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.5;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

refs.form.addEventListener('submit', handleFormSubmit);
