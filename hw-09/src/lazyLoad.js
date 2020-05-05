const lazyLoad = (target) => {
  const options = {
    rootMargin: '50px 0px',
    threshold: 0.01,
  };
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.setAttribute('src', image.dataset.lazy);
        observer.disconnect();
      }
    });
  }, options);
  io.observe(target);
};

export default lazyLoad;
