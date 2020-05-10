'use strict';

import menu from './menu.json';
import menuItem from './templates/menu-item.hbs';
import cartItem from './templates/cart-item.hbs';

import './styles.css';
import './index.html';

//Theme
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const page = document.querySelector('body');
const inputTheme = document.querySelector('.js-switch-input');

const load = key => {
  try {
    const jsonSet = localStorage.getItem(key);

    if (!jsonSet || jsonSet === undefined) {
      page.classList.add(Theme.LIGHT);
      lightboxCart.classList.add(Theme.LIGHT);
      toolbar.classList.add(Theme.LIGHT);
      return {
        theme: Theme.LIGHT,
        dishes: [],
        count: [],
      };
    } else {
      const setts = JSON.parse(jsonSet);
      if (setts.theme.includes(Theme.LIGHT)) {
        inputTheme.checked = false;
      } else {
        inputTheme.checked = true;
      }
      page.classList.add(setts.theme);
      lightboxCart.classList.add(setts.theme);
      toolbar.classList.add(setts.theme);
      return setts;
    }
  } catch (err) {
    console.error('Get error: ', err);
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Set error: ', err);
  }
};

inputTheme.addEventListener('change', changeTheme);

function changeTheme(e) {
  page.classList.toggle(Theme.LIGHT);
  page.classList.toggle(Theme.DARK);
  lightboxCart.classList.toggle(Theme.LIGHT);
  lightboxCart.classList.toggle(Theme.DARK);
  toolbar.classList.toggle(Theme.LIGHT);
  toolbar.classList.toggle(Theme.DARK);
  inputTheme.checked
    ? (settings.theme = Theme.DARK)
    : (settings.theme = Theme.LIGHT);
  save('settings', settings);
}

//Menu
const menuList = document.querySelector('.js-menu');

const markup = menu.map(card => menuItem(card)).join('');
menuList.innerHTML = markup;
// menuList.insertAdjacentHTML('beforeend', markup);

//extra
let cartList = [];
const cart = document.querySelector('.cart');
const lightbox = document.querySelector('.js-lightbox');
const lightboxCart = document.querySelector('.lightbox__cart');
const lightboxClose = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const toolbar = document.querySelector('.toolbar');

let settings = {
  theme: Theme.LIGHT,
  dishes: [],
  count: [],
};

settings = load('settings');

cartList = settings.dishes.map((id, idx) => {
  const dish = menu.find(card => card.id === id);
  dish.count = settings.count[idx];
  return dish;
});

cartRecalc();

menuList.addEventListener('click', addToCart);
cart.addEventListener('click', openCart);

lightboxClose.addEventListener('click', handleClose);
lightbox.addEventListener('click', handleLightbox);

function addToCart(e) {
  e.preventDefault();

  const item = e.target.closest('li');
  const addBtn = item.querySelector('button');
  if (e.target !== addBtn) {
    return;
  }
  const id = item.getAttribute('id');
  const idx = settings.dishes.indexOf(id);
  if (idx < 0) {
    const cartDish = menu.find(dish => dish.id === id);
    if (!cartDish) {
      return;
    }
    settings.count.push(1);
    cartList.push({ ...cartDish });
    cartList[cartList.length - 1].count = 1;
    settings.dishes.push(id);
  } else {
    settings.count[idx] += 1;
    cartList[idx].count += 1;
  }
  cartRecalc();
  save('settings', settings);
}

function openCart(e) {
  e.preventDefault();

  lightbox.classList.add('is-open');
  const markup = cartList.map(card => cartItem(card)).join('');
  lightboxCart.innerHTML = markup;
  window.addEventListener('keydown', handleEscape);
  lightboxCart.addEventListener('click', buttons);
}

function handleClose() {
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', handleEscape);
  lightboxCart.removeEventListener('click', removeDish);
}

function handleLightbox(event) {
  if (!event.target.classList.contains('lightbox__content')) {
    return;
  }
  handleClose();
}

function handleEscape(event) {
  if (event.code !== 'Escape') {
    return;
  }
  handleClose();
}

function buttons(e) {
  e.preventDefault();

  const item = e.target.closest('li');
  const remBtn = item.querySelector('button[data-action="remove"]');
  const decBnt = item.querySelector('button[data-action="decrement"]');
  const incBnt = item.querySelector('button[data-action="increment"]');
  const value = item.querySelector('.value');
  const id = item.getAttribute('id');
  const cartDish = menu.find(dish => dish.id === id);
  if (!cartDish) {
    return;
  }
  const idx = settings.dishes.indexOf(id);
  switch (e.target) {
    case remBtn:
      removeDish(idx, item);
      return;
    case decBnt:
      decrement(idx, value);
      return;
    case incBnt:
      increment(idx, value);
      return;
    default:
      return;
  }
}

function removeDish(idx, dish) {
  cartList.splice(idx, 1);
  settings.count.splice(idx, 1);
  settings.dishes.splice(idx, 1);

  save('settings', settings);
  dish.remove();
  cartRecalc();
  if (!cartList.length) {
    handleClose();
  }
}

function decrement(idx, value) {
  if (cartList[idx].count <= 1) {
    return;
  }
  cartList[idx].count -= 1;
  value.textContent = cartList[idx].count;
  cartRecalc();
  return;
}

function increment(idx, value) {
  cartList[idx].count += 1;
  value.textContent = cartList[idx].count;
  cartRecalc();
  return;
}

function cartRecalc() {
  cart.querySelector('span').textContent = cartList.reduce(
    (acc, dish) => acc + dish.count,
    0,
  );
}
