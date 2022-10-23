import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
    this.indexCurrentSlide = 0;
  }

  renderCarousel() {
    const carouselElem = document.createElement('div');
    carouselElem.classList.add('carousel');

    this.carouselElem = carouselElem;

    const buttonRight = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `);

    const buttonLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);

    buttonLeft.style.display = 'none';

    carouselElem.appendChild(buttonRight);
    carouselElem.appendChild(buttonLeft);

    const carouselInnerElem = document.createElement('div');
    carouselInnerElem.classList.add('carousel__inner');

    this.carouselInner = carouselInnerElem;

    const carouselSlides = this.slides.map(slide => createElement(`
      <div class="carousel__slide" data-id=${slide.id}>
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `));

    carouselSlides.forEach((item, index) => {
      carouselInnerElem.appendChild(item);
      this.onButtonAddToCartClick(item, this.slides[index].id);
    });

    carouselElem.appendChild(carouselInnerElem);

    this.onCarouselClick();

    return carouselElem;
  }

  toggleSlide() {
    const carouselInnerWidth = document.querySelector('.carousel__inner').offsetWidth;
    this.carouselInner.style.transform = `translateX(${carouselInnerWidth * this.indexCurrentSlide * -1}px)`;
  }

  toggleButton() {
    const buttonLeft = document.querySelector('.carousel__arrow_left');
    const buttonRight = document.querySelector('.carousel__arrow_right');

    if (this.indexCurrentSlide === 0) {
      buttonLeft.style.display = 'none';
    }

    if (this.indexCurrentSlide === this.slides.length - 1) {
      buttonRight.style.display = 'none';
    }

    if (0 < this.indexCurrentSlide && this.indexCurrentSlide < this.slides.length - 1) {
      buttonLeft.style.display = '';
      buttonRight.style.display = '';
    }
  }

  onCarouselClick() {
    this.carouselElem.addEventListener('click', (evt) => {
      const clickTarget = evt.target;

      if (clickTarget.closest('.carousel__arrow_right')) {
        this.indexCurrentSlide++;
        this.toggleSlide();
      }

      if (clickTarget.closest('.carousel__arrow_left')) {
        this.indexCurrentSlide--;
        this.toggleSlide();
      }

      this.toggleButton();
    });
  }

  onButtonAddToCartClick(cardElem, cardElemID) {
    cardElem.addEventListener('click', (evt) => {
      let productAddEvent = new CustomEvent('product-add', {
        detail: cardElemID,
        bubbles: true
      });

      if (evt.target.closest('.carousel__button')) {
        cardElem.dispatchEvent(productAddEvent);
      }
    });
  }

  onProductAdd() {
    this.carouselElem.addEventListener('product-add', () => {
      console.log('product add to cart');
    });
  }

}
