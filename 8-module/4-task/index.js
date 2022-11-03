import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = {
      product,
      count: 1,
    };

    if (this.cartItems.length === 0) {
      this.cartItems.push(cartItem);
    } else {
      let sameProduct = this.cartItems.find(item => {
        return item.product.id === product.id;
      });

      if (sameProduct) {
        sameProduct.count++;
      } else {
        this.cartItems.push(cartItem);
      }
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => {
      return item.product.id === productId;
    });

    if (!cartItem) {
      return;
    }

    if (amount === 1) {
      cartItem.count++;
    } else {
      cartItem.count--;
    }

    if (cartItem.count === 0) {
      this.cartItems.forEach((item, index) => {
        if (item.product.id === cartItem.product.id) {
          this.cartItems.splice(index, 1);
        }
      });
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    const totalCount = this.cartItems.reduce((summ, item) => {
      return summ + item.count;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    const totalPrice = this.cartItems.reduce((summ, item) => {
      return summ + item.product.price * item.count;
    }, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();

    this.modal = modal;

    modal.setTitle('Your order');

    const modalBody = document.createElement('div');

    this.cartItems.forEach(item => {
      const itemElem = this.renderProduct(item.product, item.count);
      modalBody.append(itemElem);
    });

    const modalForm = this.renderOrderForm();
    modalBody.append(modalForm);

    this.modalForm = modalForm;

    modal.setBody(modalBody);
    modal.open();

    const modalElem = document.querySelector('.modal__body');

    this.modalBody = modalElem;

    modalElem.addEventListener('click', (evt) => {
      const button = evt.target.closest('.cart-counter__button');
      if (!button) {
        return;
      }

      let productCartId = button.closest('.cart-product').dataset.productId;

      if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productCartId, 1);
      } else {
        this.updateProductCount(productCartId, -1);
      }
    });

    modalForm.addEventListener('submit', (evt) => {
      this.onSubmit(evt);
    });
  }

  onProductUpdate(cartItem) {
    const isModalOpen = document.querySelector('body').classList.contains('is-modal-open');

    this.cartIcon.update(this);

    if (!isModalOpen) {
      return;
    }

    let productId = cartItem.product.id;

    let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

    let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

    let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;

    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    if (!this.cartItems.length) {
      this.modal.close();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const buttonSubmit = this.modalBody.querySelector('button[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    let formOrderData = new FormData(this.modalForm)

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formOrderData,
    })
      .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartItems.splice(0, this.cartItems.length);
          this.modal.setBody(createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `));
          this.cartIcon.elem.classList.remove('cart-icon_visible');
        }
        return response.json();
      })
      .then(data => {
        let serverData = data;
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

