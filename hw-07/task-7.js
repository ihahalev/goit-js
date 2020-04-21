'use strict';

const fontSize = document.getElementById('font-size-control');
const text = document.getElementById('text');

fontSize.addEventListener('input', changeTextSize);

function changeTextSize(event) {
  return (text.style.fontSize = event.currentTarget.value + 'px');
}
