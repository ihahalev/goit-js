'use strict';

const findBestEmployee = function (employees) {
  const entries = Object.entries(employees);
  let max = 0,
    best = '';
  for (const [name, value] of entries) {
    if (value > max) {
      max = value;
      best = name;
    }
  }
  return best;
};

console.log(
  findBestEmployee({
    ann: 29,
    david: 35,
    helen: 1,
    lorence: 99,
  }),
);

console.log(
  findBestEmployee({
    poly: 12,
    mango: 17,
    ajax: 4,
  }),
);

console.log(
  findBestEmployee({
    lux: 147,
    david: 21,
    kiwi: 19,
    chelsy: 38,
  }),
);
