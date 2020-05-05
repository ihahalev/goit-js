import galleryItems from './gallery-items.js';

const gallaryHTML = galleryItems.reduce(
  (items, { preview, original, description }) => {
    const markup = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src=""
      data-lazy="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    return items + markup;
  },
  '',
);

export default gallaryHTML;
