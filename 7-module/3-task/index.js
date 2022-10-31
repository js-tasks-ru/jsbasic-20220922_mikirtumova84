import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.initialValue = value;
    this.elem = this.renderSlider();
  }

  renderSlider() {
    const sliderElem = document.createElement('div');
    sliderElem.classList.add('slider');

    this.sliderElem = sliderElem;

    const sliderThumb = createElement(`
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.initialValue}</span>
      </div>
    `);

    this.sliderThumb = sliderThumb;

    sliderElem.appendChild(sliderThumb);

    const sliderProgress = createElement(`
      <div class="slider__progress" style="width: 0%;"></div>
    `);

    this.sliderProgress = sliderProgress;

    sliderElem.appendChild(sliderProgress);

    const sliderStepsElem = document.createElement('div');
    sliderStepsElem.classList.add('slider__steps');

    this.sliderStepsElem = sliderStepsElem;

    for (let i = 0; i < this.steps; i++) {
      const stepItem = createElement(`
        <span class="${i === this.initialValue ? 'slider__step-active' : ''}"></span>
      `);

      sliderStepsElem.appendChild(stepItem);
    }

    sliderElem.appendChild(sliderStepsElem);

    this.onSliderClick();

    return sliderElem;
  }

  getProgress(sliderWidth, clickPosition) {
    return clickPosition / sliderWidth;
  }

  onSliderClick() {
    this.sliderElem.addEventListener('click', (evt) => {
      const sliderWidth = this.sliderElem.getBoundingClientRect().width;
      const clickPosition = evt.clientX - this.sliderElem.getBoundingClientRect().left;
      const currentProgress = this.getProgress(sliderWidth, clickPosition);
      const segmentsCount = this.steps - 1;
      const value = Math.round(currentProgress * segmentsCount);

      this.sliderThumb.style.left = `${value / segmentsCount * 100}%`;
      this.sliderProgress.style.width = `${value / segmentsCount * 100}%`;

      this.sliderThumb.querySelector('.slider__value').textContent = value;

      const stepElems = this.sliderStepsElem.querySelectorAll('span');

      stepElems.forEach((item, index) => {
        item.classList.remove('slider__step-active');

        if (index === value) {
          item.classList.add('slider__step-active');
        }
      });

      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      });

      this.sliderElem.dispatchEvent(sliderChangeEvent);
    });
  }
}
