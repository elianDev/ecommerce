export default class ToggleCart {
  constructor(cartIcon, cartClose, cart) {
    this.cartButton = document.querySelector(cartIcon);
    this.close = document.querySelector(cartClose);
    this.cart = document.querySelector(cart);

    this.showCart = this.showCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
  }

  showCart() {
    this.cart.classList.add("active");
  }

  closeCart() {
    this.cart.classList.remove("active");
  }

  addEvents() {
    this.cartButton.addEventListener("click", this.showCart);
    this.close.addEventListener("click", this.closeCart);
  }

  init() {
    if (this.cartButton && this.close && this.cart) {
      this.addEvents();
    }
    return this;
  }
}
