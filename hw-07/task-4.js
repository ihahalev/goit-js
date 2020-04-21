'use strict';

let counterValue = 0;

const decrementBnt = document.querySelector('button[data-action="decrement"]');
const incrementBnt = document.querySelector('button[data-action="increment"]');
const valueOutput = document.getElementById('value');

decrementBnt.addEventListener('click', decrement);
incrementBnt.addEventListener('click', increment);

function decrement() {
  counterValue -= 1;
  valueOutput.textContent = counterValue;
  // document.location.reload(true);
  return;
}

function increment() {
  counterValue += 1;
  valueOutput.textContent = counterValue;
  return;
}
