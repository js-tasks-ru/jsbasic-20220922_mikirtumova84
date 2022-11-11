import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.initialValue = value;
    this.elem = this.renderSlider();
    this.onSliderDragAndDrop();
  }

  getProgress(sliderWidth, clickPosition) {
    return clickPosition / sliderWidth;
  }

  renderSlider() {
    const sliderElem = document.createElement('div');
    sliderElem.classList.add('slider');

    this.sliderElem = sliderElem;

    const sliderThumb = createElement(`
      <div class="slider__thumb" style="left: ${this.initialValue * 100 / (this.steps - 1)}%;">
        <span class="slider__value">${this.initialValue}</span>
      </div>
    `);

    this.sliderThumb = sliderThumb;

    sliderElem.appendChild(sliderThumb);

    const sliderProgress = createElement(`
      <div class="slider__progress" style="width: ${this.initialValue * 100 / (this.steps - 1)}%;"></div>
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

  onSliderDragAndDrop() {
    const thumb = this.sliderElem.querySelector('.slider__thumb');
    const progress = this.sliderElem.querySelector('.slider__progress');
    const valueElem = this.sliderElem.querySelector('.slider__value');
    const stepElems = this.sliderElem.querySelectorAll('.slider__steps span');
    let value;

    thumb.addEventListener('pointerdown', (evt) => {
      evt.preventDefault();

      const onMouseMove = (evt) => {
        this.sliderElem.classList.add('slider_dragging');

        let left = evt.clientX - this.sliderElem.getBoundingClientRect().left;
        let leftRelative = left / this.sliderElem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = Math.round(leftRelative * 100);

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let segments = this.steps - 1;
        value = Math.round(leftRelative * segments);

        valueElem.textContent = value;

        stepElems.forEach((item, index) => {
          item.classList.remove('slider__step-active');

          if (index === value) {
            item.classList.add('slider__step-active');
          }
        });

      };

      document.addEventListener('pointermove', onMouseMove);

      document.onpointerup = () => {
        this.sliderElem.classList.remove('slider_dragging');

        let sliderChangeEvent = new CustomEvent('slider-change', {
          detail: value,
          bubbles: true,
        });

        this.sliderElem.dispatchEvent(sliderChangeEvent);

        document.removeEventListener('pointermove', onMouseMove);
        document.onmouseup = null;
      };
    });

    thumb.ondragstart = () => false;

  }
}
