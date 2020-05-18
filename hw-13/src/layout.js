import photoCard from './templates/photo-card.hbs';

export default function domMarkup(items) {
  const markups = items.map(item => {
    const markup = photoCard(item);
    const li = document.createElement('li');
    li.classList.add('grid-item');
    li.classList.add('gallery__item');
    li.insertAdjacentHTML('beforeend', markup);
    return li;
  });
  return markups;

  // WTF не осуществляеться вставка
  // const markups = photoCard(items);
  // const ul = document.createElement('ul');
  // // ul.classList.add('blank');
  // ul.insertAdjacentHTML('beforeend', markups);
  // const list = ul.querySelector('.grid-item');
  // console.log(ul);
  // console.log(ul.children);
  // console.log(list);
  // return ul.children;
}
