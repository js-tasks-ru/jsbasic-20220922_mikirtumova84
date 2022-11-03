import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.renderList();
  }

  renderList() {
    const innerContainer = createElement(`<div class="products-grid__inner"></div>`);

    this.products.forEach(item => {
      const card = new ProductCard(item);
      innerContainer.append(card.elem);
    });

    const gridElem = createElement(`<div class="products-grid"></div>`);

    gridElem.append(innerContainer);

    return gridElem;
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters};
    console.log(this.filters);

    let results = this.products
      .filter((item) => {
        if (this.filters.category) {
          return this.filters.category === item.category;
        }
        return true;
      })
      .filter((item) => {
        if (this.filters.maxSpiciness) {
          return this.filters.maxSpiciness >= item.spiciness;
        }
        return true;
      })
      .filter((item) => {
        if (this.filters.vegeterianOnly) {
          return item.vegeterian === true;
        }
        return true;
      })
      .filter((item) => {
        if (this.filters.noNuts) {
          return item.nuts === false || !item.nuts;
        }
        return true;
      });

    const cardInner = document.querySelector('.products-grid__inner');

    cardInner.innerHTML = '';

    results.forEach(item => {
      const card = new ProductCard(item);
      cardInner.append(card.elem);
    });
  }
}
