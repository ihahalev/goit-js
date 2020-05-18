import photoCard from './templates/photo-card.hbs';

export default function domMarkup(items) {
  const markups = items.reduce((acc, item) => {
    const markup = photoCard(item);
    const li = document.createElement('li');
    li.classList.add('grid-item');
    li.classList.add('gallery__item');
    li.insertAdjacentHTML('beforeend', markup);
    acc.push(li);
    return acc;
  }, []);
  return markups;
}
