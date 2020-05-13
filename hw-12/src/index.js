import './styles.css';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import countryMarkup from './templates/details.hbs';

import countryService from './country-service';

PNotify.defaults.width = '400px';

const refs = {
  countryInput: document.getElementById('country'),
  countryList: document.querySelector('.country__list'),
  countryDetails: document.querySelector('.details'),
};

refs.countryInput.addEventListener(
  'input',
  debounce(searchCountryHandler, 500),
);

function searchCountryHandler(event) {
  if (!event.target.value) {
    return;
  }
  const searchCountry = event.target.value;
  countryService.searchQuery = searchCountry;
  countryService.fetchCountries().then(data => {
    if (data.length > 10) {
      refs.countryList.innerHTML = '';
      refs.countryList.removeEventListener('click', openCountryDetails);
      refs.countryDetails.innerHTML = '';
      return PNotify.error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
    }
    if (data.length > 1) {
      refs.countryDetails.innerHTML = '';
      insertListCountries(data);
      refs.countryList.addEventListener('click', openCountryDetails);
    } else {
      refs.countryList.innerHTML = '';
      insertCountryDetails(data[0]);
    }
    function openCountryDetails(e) {
      e.preventDefault();
      refs.countryDetails.innerHTML = '';
      const countryToOpen = e.target.dataset.code;
      searchCountryDetails(countryToOpen, data);
    }
  });
}

function insertListCountries(countries) {
  refs.countryList.insertAdjacentHTML(
    'beforeend',
    buildListCountriesMarkup(countries),
  );
}

function buildListCountriesMarkup(countries) {
  const markup = countries.reduce(
    (acc, country) =>
      acc + `<li data-code="${country.cioc}">${country.name}</li>`,
    '',
  );
  return markup;
}

function insertCountryDetails(country) {
  refs.countryDetails.insertAdjacentHTML(
    'beforeend',
    buildCountryDetailsMarkup(country),
  );
}

function buildCountryDetailsMarkup(country) {
  return countryMarkup(country);
}

function searchCountryDetails(cioc, countries) {
  const countryDetails = countries.find(country => country.cioc === cioc);
  insertCountryDetails(countryDetails);
}
