'use strict';

const ingredients = [
  'Картошка',
  'Грибы',
  'Чеснок',
  'Помидоры',
  'Зелень',
  'Приправы',
];

const ingredientsItems = ingredients.map((ingredient) => {
  const ingredientsItem = document.createElement('li');
  ingredientsItem.textContent = ingredient;
  return ingredientsItem;
});

const ingredientsList = document.getElementById('ingredients');

ingredientsList.append(...ingredientsItems);
