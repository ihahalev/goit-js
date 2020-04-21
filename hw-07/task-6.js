'use strict';

const validInput = document.getElementById('validation-input');

validInput.addEventListener('blur', validation);
validInput.classList.remove('invalid');
validInput.classList.remove('valid');

function validation() {
  const currentLength = validInput.value.length;
  const minimalLength = validInput.dataset.length;
  if (currentLength != minimalLength) {
    validInput.classList.remove('valid');
    validInput.classList.add('invalid');
    return;
  }
  validInput.classList.remove('invalid');
  validInput.classList.add('valid');
}
