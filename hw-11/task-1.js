'use strict';

const colors = ['#FFFFFF', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const refs = {
  startBnt: document.querySelector('button[data-action="start"]'),
  stopBnt: document.querySelector('button[data-action="stop"]'),
  body: document.querySelector('body'),
};

const changeBG = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.idTimer = setInterval(() => {
      const currentColor = colors[randomIntegerFromInterval(0, colors.length - 1)];
      refs.body.setAttribute('style', `background-color: ${currentColor}`);
      console.log(currentColor);
    }, 1000);
  },
  stop() {
    this.isActive = false;
    clearInterval(this.idTimer);
    console.log('stop');
  },
};

refs.startBnt.addEventListener('click', changeBG.start.bind(changeBG));
refs.stopBnt.addEventListener('click', changeBG.stop.bind(changeBG));
