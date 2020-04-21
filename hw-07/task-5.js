'use strict';

const valueInput = document.getElementById('name-input');
const valueOutput = document.getElementById('name-output');

valueInput.addEventListener('input', duplicateToOutput);

function duplicateToOutput(event) {
  if (!event.currentTarget.value) {
    return (valueOutput.textContent = 'незнакомец');
  }
  return (valueOutput.textContent = event.currentTarget.value);
}
