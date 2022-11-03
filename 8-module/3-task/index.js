export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let newProduct = {
      product,
      count: 1,
    };

    if (this.cartItems.length === 0) {
      this.cartItems.push(newProduct);
    } else {
      let sameProduct = this.cartItems.find(item => {
        return item.product.id === product.id;
      });

      if (sameProduct) {
        sameProduct.count++;
      } else {
        this.cartItems.push(newProduct);
      }
    }

    this.onProductUpdate(newProduct);
  }

  updateProductCount(productId, amount) {
    let currentProduct = this.cartItems.find(item => {
      return item.product.id === productId;
    });

    if (!currentProduct) {
      return;
    }

    if (amount === 1) {
      currentProduct.count++;
    } else {
      currentProduct.count--;
    }

    if (currentProduct.count === 0) {
      this.cartItems.forEach((item, index) => {
        if (item.product.id === currentProduct.product.id) {
          this.cartItems.splice(index, 1);
        }
      });
    }

    this.onProductUpdate(currentProduct);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

