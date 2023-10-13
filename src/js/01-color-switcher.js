const bodyColor = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId = null;
buttonStop.disabled = true;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const clbckStart = () => {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
};

buttonStart.addEventListener('click', clbckStart);

const clbckStop = () => {
  clearInterval(timerId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
};
buttonStop.addEventListener('click', clbckStop);
