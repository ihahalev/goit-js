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
    console.log(jsonSet);
    if (!jsonSet || jsonSet === undefined) {
      page.classList.add(Theme.LIGHT);
      lightboxCart.classList.add(Theme.LIGHT);
      return {
        theme: Theme.LIGHT,
        dishes: [],
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

let settings = {
  theme: Theme.LIGHT,
  dishes: [],
};

settings = load('settings');
console.log(settings);
cartList = settings.dishes.map(id => menu.find(card => card.id === id));
console.log(cartList);
cart.querySelector('span').textContent = cartList.length;

menuList.addEventListener('click', addToCart);
cart.addEventListener('click', openCart);

lightboxClose.addEventListener('click', handleClose);
lightbox.addEventListener('click', handleLightbox);

function addToCart(e) {
  e.preventDefault();

  const item = e.target.closest('li');
  const id = item.getAttribute('id');
  const cartDish = menu.find(dish => dish.id === id);
  if (!cartDish) {
    return;
  }
  // if (cartList.includes(cartDish)) {
  //   // cartList.find(dish => dish.id === id).count +=1;
  //   return;
  // }
  cartList.push(cartDish);
  cart.querySelector('span').textContent = cartList.length;

  settings.dishes.push(cartDish.id);

  save('settings', settings);
}

function openCart(e) {
  e.preventDefault();

  lightbox.classList.add('is-open');
  const markup = cartList.map(card => cartItem(card)).join('');
  lightboxCart.innerHTML = markup;
  window.addEventListener('keydown', handleEscape);
}

function handleClose() {
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', handleEscape);
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
