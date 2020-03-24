'use strict';

const credits = 23580;
const pricePerDroid = 3000;
const DroidAmount = prompt('Сколько дроидов хотите купить?');
let message;
let totalPrice;

if (DroidAmount === null) {
  message = 'Отменено пользователем!';
} else if (Number.isNaN(Number(DroidAmount))) {
  message = 'Неверное количество!';
} else {
  totalPrice = pricePerDroid * Number.parseInt(DroidAmount);
  message =
    totalPrice > credits
      ? 'Недостаточно средств на счету!'
      : `Вы купили ${DroidAmount} дроидов, на счету осталось ${credits -
          totalPrice} кредитов.`;
}

console.log(message);
