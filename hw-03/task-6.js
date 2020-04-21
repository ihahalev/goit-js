'use strict';

const products = [
  { name: 'Радар', price: 1300, quantity: 4 },
  { name: 'Сканер', price: 2700, quantity: 3 },
  { name: 'Дроид', price: 400, quantity: 7 },
  { name: 'Захват', price: 1200, quantity: 2 },
  { name: 'Гарбуз', price: -1, quantity: 2 },
  { name: 'Парафин', price: 5200, quantity: 0 },
];

const calculateTotalPrice = function (allProducts, productName) {
  let totalPrice = 0;
  for (const product of allProducts) {
    if (product.name === productName) {
      if (product.price <= 0) {
        return 'Цена не установленна';
      }
      if (product.quantity <= 0) {
        return 'Количество не указано';
      }
      totalPrice = product.price * product.quantity;
      return totalPrice;
    }
  }
  return 'Товар не найден';
};

console.log(calculateTotalPrice(products, 'Радар'));
console.log(calculateTotalPrice(products, 'Дроид'));
console.log(calculateTotalPrice(products, 'Duhast'));
console.log(calculateTotalPrice(products, 'Гарбуз'));
console.log(calculateTotalPrice(products, 'Парафин'));
