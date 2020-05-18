// import './layout';
import './styles.css';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import apiService from './apiService';
import photoCard from './templates/photo-card.hbs';

PNotify.defaults.width = '400px';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBnt: document.querySelector('.more'),
};

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBnt.addEventListener('click', loadMoreBntHandler);

import Masonry from 'masonry-layout';
import imgLoaded from 'imagesloaded';

// const masonryInstance = new Masonry('.grid', {
//   columnWidth: '.grid-sizer',
//   itemSelector: '.grid-item',
//   percentPosition: true,
//   transitionDuration: '0.2s',
//   stagger: 50,
//   initLayout: true,
// });
// const imgLoadedInstance = imgLoaded(document.querySelector('.grid'));

function searchFormHandler(e) {
  e.preventDefault();

  clearListItems();
  apiService.resetPage();
  apiService.searchQuery = e.currentTarget.elements.query.value;
  searchQueryHandler(true);
  e.currentTarget.elements.query.value = '';
}

async function loadMoreBntHandler(e) {
  e.preventDefault();

  apiService.incrementPage();
  try {
    const inserted = await searchQueryHandler(false);
    if (inserted) {
      // await setTimeout(
      //   () =>
      // const imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
      // imgLoadedInstance.on('done', () => {
      //   masonryInstance.layout();
      //   window.scroll({
      //     top: window.visualViewport.pageTop + window.innerHeight,
      //     behavior: 'smooth',
      //   });
      // });
      //   1500,
      // );
      // console.log(window);
      // console.log(window.visualViewport.pageTop + window.innerHeight);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function searchQueryHandler(info = false) {
  const collection = await apiService.fetchQuery();
  try {
    if (info) {
      PNotify.info({
        text: `There are ${collection.total} results`,
      });
    }
    if (collection.total > 12) {
      refs.loadMoreBnt.style.visibility = 'visible';
    }
    const insertOk = insertListItems(collection.hits);
    const masonryInstance = new Masonry('.grid', {
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      percentPosition: true,
      transitionDuration: '0.2s',
      stagger: 50,
      initLayout: true,
    });
    const imgLoadedInstance = imgLoaded(document.querySelector('.grid'));
    imgLoadedInstance.on('progress', () => {
      masonryInstance.layout();
      // if (!info) {
      //   window.scroll({
      //     top: window.visualViewport.pageTop + window.innerHeight,
      //     behavior: 'smooth',
      //   });
      // }
    });
    imgLoadedInstance.on('done', () => {
      masonryInstance.layout();
      if (!info) {
        window.scroll({
          top: window.visualViewport.pageTop + window.innerHeight,
          behavior: 'smooth',
        });
      }
    });
    return insertOk;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
//   const collection = apiService.fetchQuery();
//   collection
//     .then(data => {
//       if (info) {
//         PNotify.info({
//           text: `There are ${data.total} results`,
//         });
//       }
//       const insertOk = insertListItems(data.hits);
//       return insertOk;
//     })
//     .catch(err => console.log(err));
// }

function insertListItems(items) {
  const markup = photoCard(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  if (markup) {
    return true;
  }
}

function clearListItems() {
  refs.gallery.innerHTML = '<li class="grid-sizer"></li>';
}
