'use strict';

let input = prompt('Введите число');
const numbers = [];
let total = 0;

while (input !== null) {
  if (Number.isNaN(Number(input))) {
    input = prompt('Было введено не число, попробуйте еще раз');
  } else {
    numbers.push(Number.parseInt(input));
    input = prompt('Введите число');
  }
}

if (numbers.length) {
  for (let i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  alert(`Общая сумма чисел равна ${total}`);
}

console.log(numbers.length);
