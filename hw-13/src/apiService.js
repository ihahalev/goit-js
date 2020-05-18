const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  imgType: 'photo',
  orientation: 'horizontal',
  apiKey: '16573649-3de34e680630468dd865749b6',
  get searchQuery() {
    return this.query;
  },
  set searchQuery(str) {
    this.query = encodeURIComponent(str);
  },
  fetchQuery: async function () {
    const queryOptions = `?image_type=${this.imgType}&orientation=${this.orientation}`;
    const resource = `&q=${this.query}&page=${this.page}&per_page=12`;
    const authorization = `&key=${this.apiKey}`;
    try {
      const response = await fetch(
        baseUrl + queryOptions + resource + authorization,
      );
      const data = await response.json();
      // incrementPage();
      return data;
    } catch (err) {
      throw err;
    }
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
