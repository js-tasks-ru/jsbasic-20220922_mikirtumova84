function initCarousel() {
  const carouselElem = document.querySelector('.carousel');
  const slides = carouselElem.querySelectorAll('.carousel__slide');
  const carouselInner = carouselElem.querySelector('.carousel__inner');
  const carouselInnerWidth = carouselInner.offsetWidth;
  const buttonLeft = carouselElem.querySelector('.carousel__arrow_left');
  const buttonRight = carouselElem.querySelector('.carousel__arrow_right');

  let indexCurrentSlide = 0;

  const toggleSlide = function() {
    carouselInner.style.transform = `translateX(${carouselInnerWidth * indexCurrentSlide * -1}px)`;
  };

  const toggleButton = function() {
    if (indexCurrentSlide === 0) {
      buttonLeft.style.display = 'none';
    }

    if (indexCurrentSlide === slides.length - 1) {
      buttonRight.style.display = 'none';
    }

    if (0 < indexCurrentSlide && indexCurrentSlide < slides.length - 1) {
      buttonLeft.style.display = '';
      buttonRight.style.display = '';
    }
  };

  toggleButton();

  carouselElem.addEventListener('click', (evt) => {
    const clickTarget = evt.target;

    if (clickTarget.closest('.carousel__arrow_right')) {
      indexCurrentSlide++;
      toggleSlide();
    }

    if (clickTarget.closest('.carousel__arrow_left')) {
      indexCurrentSlide--;
      toggleSlide();
    }

    toggleButton();
  });
}
