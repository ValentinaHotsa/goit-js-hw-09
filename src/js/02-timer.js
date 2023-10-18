import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const buttonStart = document.querySelector('[data-start]');
const containerTimer = document.querySelector('.timer');
const containerField = document.querySelectorAll('.field');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');
const pickerInput = document.querySelector('#datetime-picker');

let timerId = null;
let timeNow = new Date().getTime();
let newDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  fieldDays.innerHTML = days;
  fieldHours.innerHTML = hours;
  fieldMinutes.innerHTML = minutes;
  fieldSeconds.innerHTML = seconds;
  return { days, hours, minutes, seconds };
}
flatpickr(pickerInput, options);

const clbckStart = () => {
  timerId = setInterval(() => {
    timeNow = new Date();
    let different = newDate - timeNow;

    if (different <= 0) {
      clearInterval(timerId);
    } else {
      convertMs(different);
    }
  }, 1000);
};
buttonStart.addEventListener('click', clbckStart);

buttonStart.disabled = true;
const clbckInput = () => {
  newDate = new Date(pickerInput.value).getTime();
  if (newDate <= timeNow) {
    buttonStart.disabled = true;
    window.alert('Please choose a date in the future');
  } else {
    buttonStart.disabled = false;
  }
};
pickerInput.addEventListener('input', clbckInput);

containerTimer.style.display = 'flex';
containerTimer.style.gap = '20px';
