document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
      fetch('products.xml').then(response => response.text()),
      fetch('slider.xsl').then(response => response.text())
  ])
  .then(([xmlText, xslText]) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'application/xml');
      const xsl = parser.parseFromString(xslText, 'application/xml');

      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl);
      const resultDocument = xsltProcessor.transformToFragment(xml, document);

      document.getElementById('sliderContainer').appendChild(resultDocument);

      // После успешного добавления слайдера - запускаем функциональность!
      initializeSlider();
  })
  .catch(error => {
      console.error('Ошибка при загрузке или трансформации XML:', error);
  });
});

// Функция, которая запускает слайдер **только после загрузки контента**
function initializeSlider() {
  const slidesContainer = document.querySelector('.block-slider .slides');
  const prevButton = document.querySelector('.block-slider .prev');
  const nextButton = document.querySelector('.block-slider .next');
  const items = document.querySelectorAll('.block-slider .item');

  if (!slidesContainer || items.length === 0) {
      console.error("Элементы слайдера отсутствуют. Возможно, XSLT ещё не загрузился?");
      return;
  }

  const totalItems = items.length;
  let visibleItems = 4;
  const gap = 15;
  let index = 0;

  function updateVisibleItems() {
      const width = window.innerWidth;
      if (width < 768) {
          visibleItems = 2;
      } else if (width < 1024) {
          visibleItems = 3;
      } else {
          visibleItems = 4;
      }
  }

  function updateSlider() {
      updateVisibleItems();
      const itemWidth = items[0].offsetWidth;
      const translateX = index * (itemWidth + gap);
      slidesContainer.style.transform = `translateX(-${translateX}px)`;
  }

  nextButton.addEventListener('click', () => {
      const maxIndex = Math.max(totalItems - visibleItems, 0);
      if (index < maxIndex) {
          index++;
          updateSlider();
      }
  });

  prevButton.addEventListener('click', () => {
      if (index > 0) {
          index--;
          updateSlider();
      }
  });

  window.addEventListener('resize', () => {
      updateVisibleItems();
      const maxIndex = Math.max(totalItems - visibleItems, 0);
      if (index > maxIndex) {
          index = maxIndex;
      }
      updateSlider();
  });

  updateSlider();
}
document.addEventListener('click', (event) => {
    const button = event.target.closest('.item-button');
    if (button) {
      button.classList.toggle('in-cart');
      button.textContent = button.classList.contains('in-cart') ? 'В корзине' : 'В корзину';
    }
  });
  
