import './styles.css';

import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

PNotify.defaults.width = '400px';

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

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

const lightbox = basicLightbox.create(`<div class="lightbox__content"></div>`);

import domMarkup from './layout';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

import InfiniteScroll from 'infinite-scroll';

const infScrollInstance = new InfiniteScroll(refs.gallery, {
  responseType: 'text',
  history: false,
  append: false,
  status: '.page-load-status',
  scrollThreshold: 100,
  // outlayer: masonryInstance,
  path() {
    return (
      'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/' +
      `?image_type=photo&orientation=horizontal` +
      `&q=${this.searchQuery}&page=${this.pageIndex}&per_page=12` +
      `&key=16573649-3de34e680630468dd865749b6`
    );
  },
});
// infScrollInstance.imagesLoaded = imgLoaded;
infScrollInstance.searchQuery = '';

// console.log(infScrollInstance);
// infScrollInstance.on('load', response => {
//   const collection = JSON.parse(response);
//   const markups = domMarkup(collection.hits);
//   refs.gallery.append(...markups);
//   masonryInstance.appended(markups);
//   imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
//   imgLoadedInstance.on('progress', () => {
//     // infScrollInstance.appendItems(markups);

//     masonryInstance.layout();
//   });
// });
// infScrollInstance.loadNextPage();

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.gallery.addEventListener('click', openImage);

function searchFormHandler(e) {
  e.preventDefault();
  window.scrollTo(0, 0);
  clearListItems();
  infScrollInstance.pageIndex = 1;
  infScrollInstance.searchQuery = e.currentTarget.elements.query.value;
  searchQueryHandler();
}

async function searchQueryHandler() {
  infScrollInstance.on('load', response => {
    const collection = JSON.parse(response);
    try {
      if (infScrollInstance.pageIndex === 2) {
        PNotify.info({
          text: `There are ${collection.total} results`,
        });
      }
      insertListItems(collection.hits);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
  infScrollInstance.loadNextPage();
}

function insertListItems(items) {
  const markups = domMarkup(items);
  refs.gallery.append(...markups);
  masonryInstance.appended(markups);

  imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
  imgLoadedInstance.on('progress', () => {
    masonryInstance.layout();
  });
  infScrollInstance.appendItems(markups);
  console.log(infScrollInstance);
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
