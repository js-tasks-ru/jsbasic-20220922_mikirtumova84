import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const desktopView = window.matchMedia('(min-width: 768px)');

    const windowWidth = document.documentElement.clientWidth;
    const containerElem = document.querySelector('.container');
    const cartWidth = this.elem.getBoundingClientRect().width;
    const CART_SHIFT_RIGHT = 20;
    const MIN_RIGHT_CART_POSITION = 10;

    if (this.elem.offsetWidth && this.elem.getBoundingClientRect().top <= 0 && desktopView.matches) {

      let leftPosition;

      if (containerElem.getBoundingClientRect().right + CART_SHIFT_RIGHT + MIN_RIGHT_CART_POSITION + cartWidth <= windowWidth) {
        leftPosition = containerElem.getBoundingClientRect().right + CART_SHIFT_RIGHT;
      } else {
        leftPosition = windowWidth - cartWidth - MIN_RIGHT_CART_POSITION;
      }

      this.elem.style.position = 'fixed';
      this.elem.style.zIndex = '100';
      this.elem.style.top = '50px';
      this.elem.style.left = `${leftPosition}px`;
    }

    if (window.pageYOffset === 0) {
      this.elem.style.position = null;
      this.elem.style.zIndex = null;
      this.elem.style.top = null;
      this.elem.style.left = null;
    }

  }
}
