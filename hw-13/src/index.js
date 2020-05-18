import './styles.css';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import apiService from './apiService';
import domMarkup from './layout';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

const lightbox = basicLightbox.create(`<div class="lightbox__content"></div>`);

PNotify.defaults.width = '400px';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBnt: document.querySelector('.more'),
};

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBnt.addEventListener('click', loadMoreBntHandler);
refs.gallery.addEventListener('click', openImage);

import Masonry from 'masonry-layout';
import imgLoaded from 'imagesloaded';

const masonryInstance = new Masonry('.grid', {
  columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
  percentPosition: true,
  transitionDuration: '0.2s',
  stagger: 50,
  initLayout: true,
});
let imgLoadedInstance = imgLoaded(document.querySelector('.grid'));

function searchFormHandler(e) {
  e.preventDefault();
  window.scrollTo(0, 0);
  clearListItems();
  apiService.resetPage();
  apiService.searchQuery = e.currentTarget.elements.query.value;
  searchQueryHandler(true);
  // e.currentTarget.elements.query.value = '';
}

async function loadMoreBntHandler(e) {
  e.preventDefault();

  apiService.incrementPage();
  try {
    await searchQueryHandler(false);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function searchQueryHandler(firstLoad = false) {
  const collection = await apiService.fetchQuery();
  try {
    if (firstLoad) {
      PNotify.info({
        text: `There are ${collection.total} results`,
      });
    }
    if (collection.total > 12) {
      refs.loadMoreBnt.style.visibility = 'visible';
    }
    insertListItems(collection.hits);
    if (!firstLoad) {
      // imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
      imgLoadedInstance.on('done', () => {
        window.scrollTo({
          top: window.visualViewport.pageTop + window.innerHeight,
          behavior: 'smooth',
        });
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function insertListItems(items) {
  const markups = domMarkup(items);
  refs.gallery.append(...markups);
  masonryInstance.appended(markups);
  imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
  imgLoadedInstance.on('progress', () => {
    masonryInstance.layout();
  });
}

function clearListItems() {
  refs.gallery.innerHTML = '<li class="grid-sizer"></li>';
}

function openImage(event) {
  event.preventDefault();

  const imageUrl = event.target.dataset.source;
  const imageAlt = event.target.getAttribute('alt');
  lightbox.element().innerHTML = `<img src="${imageUrl}" alt="${imageAlt}"/>`;
  lightbox.show();
}
