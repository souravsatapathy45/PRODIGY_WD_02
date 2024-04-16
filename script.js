let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

function startPause() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.getElementById('startPause').textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(timer);
    document.getElementById('startPause').textContent = 'Start';
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  elapsedTime = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startPause').textContent = 'Start';
  isRunning = false;
  lapCounter = 1;
  document.getElementById('lapList').innerHTML = ''; 
}

function lap() {
  if (isRunning) {
    const lapTime = Date.now() - startTime;
    const formattedTime = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${formattedTime}`;
    document.getElementById('lapList').appendChild(lapItem);
    lapCounter++;
  }
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((milliseconds % 1000) / 10);
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(hundredths)}`;
}

function padTime(value) {
  return value < 10 ? `0${value}` : value;
}

document.getElementById('startPause').addEventListener('click', startPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);