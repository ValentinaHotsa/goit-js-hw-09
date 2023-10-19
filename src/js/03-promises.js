import { Notify } from 'notiflix';
const containerForm = document.querySelector('.form');

let delay = 0;
let step = 0;
let amount = 0;

containerForm.addEventListener('submit', clbck);

function clbck(event) {
  delay = Number(containerForm.elements.delay.value);
  step = Number(containerForm.elements.step.value);
  amount = Number(containerForm.elements.amount.value);
  event.preventDefault();
  for (let index = 1; index <= amount; index++) {
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
