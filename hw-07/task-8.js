'use strict';

const renderBnt = document.querySelector('button[data-action="render"]');
const destroyBnt = document.querySelector('button[data-action="destroy"]');
const amount = document.querySelector('#controls input');
const boxes = document.getElementById('boxes');

renderBnt.addEventListener('click', render);
destroyBnt.addEventListener('click', destroyBoxes);

function render() {
  createBoxes(amount.value);
}

function createBoxes(amount) {
  let boxArrey = [];
  let size = 30;
  let box = {};
  let red;
  let green;
  let blue;
  for (let i = 0; i < Number(amount); i += 1) {
    box = document.createElement('div');
    red = Math.random() * 255;
    green = Math.random() * 255;
    blue = Math.random() * 255;
    box.style.backgroundColor = `rgb(${red},${green},${blue})`;
    box.style.height = `${size + 10 * i}px`;
    box.style.width = `${size + 10 * i}px`;
    boxArrey.push(box);
  }
  boxes.append(...boxArrey);
}

function destroyBoxes() {
  while (boxes.childElementCount) {
    boxes.removeChild(boxes.children[0]);
  }
}
