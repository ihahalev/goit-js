const baseUrl = 'https://restcountries.eu/rest/v2';
const resource = '/name/';

export default {
  query: '',
  get searchQuery() {
    return this.query;
  },
  set searchQuery(str) {
    this.query = str;
  },
  fetchCountries() {
    return fetch(baseUrl + resource + this.query).then(response => {
      if (response.ok) {
        return response.json();
      }
    });
  },
};
