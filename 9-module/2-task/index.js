import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carouselContainer = document.querySelector('[data-carousel-holder]');

    const carousel = await new Carousel(slides);

    carouselContainer.append(carousel.elem);

    const ribbonContainer = document.querySelector('[data-ribbon-holder]');

    const ribbonMenu = await new RibbonMenu(categories);

    ribbonContainer.append(ribbonMenu.elem);

    const sliderContainer = document.querySelector('[data-slider-holder]');

    const stepSlider = await new StepSlider({
      steps: 5,
      value: 3,
    });

    sliderContainer.append(stepSlider.elem);

    const cartIconContainer = document.querySelector('[data-cart-icon-holder]');

    const cartIcon = await new CartIcon();

    cartIconContainer.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    let serverResponse = await fetch('./products.json');

    let products = await serverResponse.json();

    const productsGridContainer = document.querySelector('[data-products-grid-holder]');

    productsGridContainer.innerHTML = '';

    const productsGrid = await new ProductsGrid(products);

    productsGridContainer.append(productsGrid.elem);

    const nutsCheckbox = document.getElementById('nuts-checkbox');
    const vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    productsGrid.updateFilter({
      noNuts: nutsCheckbox.checked,
      vegeterianOnly: vegeterianCheckbox.checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    const bodyElem = document.body;

    bodyElem.addEventListener('product-add', (evt) => {
      let productId = evt.detail;

      let currentProduct = products.find((item) => {
        return item.id = productId;
      });

      cart.addProduct(currentProduct);
    });

    bodyElem.addEventListener('slider-change', (evt) => {
      let value = evt.detail;

      productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    bodyElem.addEventListener('ribbon-select', (evt) => {
      let categoryId = evt.detail;

      productsGrid.updateFilter({
        category: categoryId
      });
    });

    nutsCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    vegeterianCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
