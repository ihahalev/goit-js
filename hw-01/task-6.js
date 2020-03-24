'use strict';

let input = prompt('Введите число');
let total = 0;

while (input !== null) {
  if (Number.isNaN(Number(input))) {
    input = prompt('Было введено не число, попробуйте еще раз');
  } else {
    total += Number.parseInt(input);
    input = prompt('Введите число');
  }
}
alert(total);
