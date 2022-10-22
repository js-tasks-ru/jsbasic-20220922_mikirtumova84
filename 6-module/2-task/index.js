export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.renderCard();
  }

  createElem(tagElem, classElem) {
    const elem = document.createElement(tagElem);
    elem.classList.add(classElem);

    return elem;
  }

  renderCard() {
    const cardElem = this.createElem('div', 'card');

    const cardTopElem = this.createElem('div', 'card__top');

    cardTopElem.innerHTML = `
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    `;

    cardElem.appendChild(cardTopElem);

    const cardBodyElem = this.createElem('div', 'card__body');

    cardBodyElem.innerHTML = `
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    `;

    cardElem.appendChild(cardBodyElem);

    this.card = cardElem;

    this.onButtonClick();
    this.onProductAdd();

    return cardElem;
  }

  onButtonClick() {
    this.card.addEventListener('click', (evt) => {
      let productAddEvent = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      });

      if (evt.target.closest('.card__button')) {
        this.card.dispatchEvent(productAddEvent);
      }
    });
  }

  onProductAdd() {
    this.card.addEventListener('product-add', () => {
      console.log('product add to cart');
    });
  }
}
