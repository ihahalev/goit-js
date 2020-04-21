'use strict';

const credits = 23580;
const pricePerDroid = 3000;
const droidAmount = prompt('Сколько дроидов хотите купить?');
let message;
let totalPrice;

if (droidAmount === null) {
  message = 'Отменено пользователем!';
} else if (Number.isNaN(Number(droidAmount)) || !droidAmount) {
  message = 'Неверное количество!';
} else {
  totalPrice = pricePerDroid * Number.parseInt(droidAmount);
  message =
    totalPrice > credits
      ? 'Недостаточно средств на счету!'
      : `Вы купили ${droidAmount} дроидов, на счету осталось ${
          credits - totalPrice
        } кредитов.`;
}

console.log(message);
