'use strict';

import gallaryHTML from './gallery-html.js';
import lazyLoad from './lazyLoad.js';
import './css/styles.css';
import './index.html';

const galleryList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxClose = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const prevImageBtn = document.querySelector(
  'button[data-action="prev-lightbox"]',
);
const nextImageBtn = document.querySelector(
  'button[data-action="next-lightbox"]',
);
let currentOpenLi;

galleryList.insertAdjacentHTML('afterbegin', gallaryHTML);

//extra

const images = document.querySelectorAll('.gallery__image');
images.forEach((image) => {
  lazyLoad(image);
});

galleryList.addEventListener('click', openImage);
lightboxClose.addEventListener('click', handleClose);
lightbox.addEventListener('click', handleLightbox);

//2
function openImage(event) {
  event.preventDefault();

  //3
  lightbox.classList.add('is-open');

  //4
  currentOpenLi = event.target.closest('li');
  const imageUrl = event.target.dataset.source;
  const imageAlt = event.target.getAttribute('alt');
  lightboxImage.setAttribute('src', imageUrl);
  lightboxImage.setAttribute('alt', imageAlt);
  //aditional
  edgeElementButtons();
  window.addEventListener('keydown', handleEscape);
  prevImageBtn.addEventListener('click', handlePrev);
  nextImageBtn.addEventListener('click', handleNext);
}

//5
function handleClose() {
  lightbox.classList.remove('is-open');
  //6
  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
  //aditional
  window.removeEventListener('keydown', handleEscape);
  prevImageBtn.removeEventListener('click', handlePrev);
  nextImageBtn.removeEventListener('click', handleNext);
  prevImageBtn.classList.remove('lightbox__button--inactive');
  nextImageBtn.classList.remove('lightbox__button--inactive');
}

function handleLightbox(event) {
  if (!event.target.classList.contains('lightbox__content')) {
    return;
  }
  handleClose();
}

//additional
function handleEscape(event) {
  if (event.code !== 'Escape') {
    return;
  }
  handleClose();
}

function edgeElementButtons() {
  if (!currentOpenLi.previousElementSibling) {
    prevImageBtn.classList.add('lightbox__button--inactive');
  } else {
    prevImageBtn.classList.remove('lightbox__button--inactive');
  }
  if (!currentOpenLi.nextElementSibling) {
    nextImageBtn.classList.add('lightbox__button--inactive');
  } else {
    nextImageBtn.classList.remove('lightbox__button--inactive');
  }
}

function handlePrev() {
  if (prevImageBtn.classList.contains('lightbox__button--inactive')) {
    return;
  }
  const newImage = currentOpenLi.previousElementSibling.querySelector('img');
  lightboxImage.setAttribute('src', newImage.dataset.source);
  lightboxImage.setAttribute('alt', newImage.getAttribute('alt'));
  currentOpenLi = newImage.closest('li');
  edgeElementButtons();
}

function handleNext() {
  if (nextImageBtn.classList.contains('lightbox__button--inactive')) {
    return;
  }
  const newImage = currentOpenLi.nextElementSibling.querySelector('img');
  lightboxImage.setAttribute('src', newImage.dataset.source);
  lightboxImage.setAttribute('alt', newImage.getAttribute('alt'));
  currentOpenLi = newImage.closest('li');
  edgeElementButtons();
}
