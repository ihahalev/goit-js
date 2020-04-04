'use strict';

const logItems = function(array) {
  let position = 0;
  for (let i = 0; i < array.length; i += 1) {
    position = i + 1;
    console.log(`${position} - ${array[i]}`);
  }
};

logItems(['Mango', 'Poly', 'Ajax', 'Lux', 'Jay', 'Kong']);

logItems([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
