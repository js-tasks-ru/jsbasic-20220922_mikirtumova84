import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbonMenu();
  }

  renderRibbonMenu() {
    const menuElem = document.createElement('div');
    menuElem.classList.add('ribbon');

    this.menuElem = menuElem;

    const buttonLeft = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    menuElem.appendChild(buttonLeft);

    const menuInnerElem = document.createElement('div');
    menuInnerElem.classList.add('ribbon__inner');

    this.menuInnerElem = menuInnerElem;

    const menuLinks = this.categories.map(link => createElement(`
      <a href="#" class="ribbon__item" data-id=${link.id}>${link.name}</a>
    `));

    menuLinks.forEach((item, index) => {
      menuInnerElem.appendChild(item);
    });

    menuElem.appendChild(menuInnerElem);

    const buttonRight = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    menuElem.appendChild(buttonRight);

    this.onRibbonMenuClick();
    this.onRibbonInnerClick();

    return menuElem;
  }

  getMenuScrollLeftPosition() {
    return Math.round(this.menuInnerElem.scrollLeft);
  }

  getMenuScrollRightPosition() {
    let scrollWidth = this.menuInnerElem.scrollWidth;
    let scrollLeft = this.menuInnerElem.scrollLeft;
    let clientWidth = this.menuInnerElem.clientWidth;

    return Math.round(scrollWidth - scrollLeft - clientWidth);
  }

  toggleButton() {
    const buttonLeft = document.querySelector('.ribbon__arrow_left');
    const buttonRight = document.querySelector('.ribbon__arrow_right');

    let isScrolling;

    this.menuInnerElem.addEventListener('scroll', () => {

      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {

        if (this.getMenuScrollLeftPosition() === 0) {
          buttonLeft.classList.remove('ribbon__arrow_visible');
        } else {
          buttonLeft.classList.add('ribbon__arrow_visible');
        }

        if (this.getMenuScrollRightPosition() < 1) {
          buttonRight.classList.remove('ribbon__arrow_visible');
        } else {
          buttonRight.classList.add('ribbon__arrow_visible');
        }

      }, 150);

    }, false);

  }

  onRibbonMenuClick() {
    this.menuElem.addEventListener('click', (evt) => {
      const clickTarget = evt.target;

      if (clickTarget.closest('.ribbon__arrow_right')) {
        this.menuInnerElem.scrollBy(350, 0);
      }

      if (clickTarget.closest('.ribbon__arrow_left')) {
        this.menuInnerElem.scrollBy(-350, 0);
      }

      this.toggleButton();
    });
  }

  onRibbonInnerClick() {
    let activeMenuLink;

    this.menuInnerElem.addEventListener('click', (evt) => {
      const menuLink = evt.target.closest('.ribbon__item');

      if (activeMenuLink) {
        activeMenuLink.classList.remove('ribbon__item_active');
      }

      if (menuLink) {
        evt.preventDefault();
        activeMenuLink = menuLink;
        menuLink.classList.add('ribbon__item_active');
        const menuLinkID = menuLink.dataset.id;

        let ribbonSelectEvent = new CustomEvent('ribbon-select', {
          detail: menuLinkID,
          bubbles: true,
        });

        this.menuElem.dispatchEvent(ribbonSelectEvent);
      }

    });
  }
}
