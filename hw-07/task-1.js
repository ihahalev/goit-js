'use strict';

const categories = document.querySelectorAll('#categories .item');
console.dir(categories);
console.log(`В списке ${categories.length} категории.`);
categories.forEach((category) => {
  console.log(`Категория: ${category.firstElementChild.textContent}`);
  console.log(
    `Количество элементов: ${category.lastElementChild.childElementCount}`,
  );
});
