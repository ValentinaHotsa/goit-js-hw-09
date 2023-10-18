import { Notify } from 'notiflix';
const containerForm = document.querySelector('.form');

let delay = Number(containerForm.elements.delay.value);
let step = Number(containerForm.elements.step.value);
let amount = Number(containerForm.elements.amount.value);

containerForm.addEventListener('submit', clbck);
function clbck(event) {
  event.preventDefault();
  for (let index = 0; index < amount; index++) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
