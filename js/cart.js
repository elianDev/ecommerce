export default class Cart {
  constructor(addButton, buyButton, cartContent) {
    this.cartItens = [];
    this.addButton = document.querySelectorAll(addButton);
    this.buyButton = document.querySelector(buyButton);
    this.cartContent = document.querySelector(cartContent);

    this.addToCart = this.addToCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.buyEvent = this.buyEvent.bind(this);
  }

  addEventButton() {
    this.addButton.forEach((btn) =>
      btn.addEventListener("click", this.addToCart)
    );
    this.buyButton.addEventListener("click", this.buyEvent);
  }

  addToCart(event) {
    const element = event.target.parentElement;
    const imgSrc = element.querySelector("img").getAttribute("src");
    const text = element.querySelector("h2").innerText;
    const preco = element.querySelector("span").innerText.replace("R$", "");
    if (this.cartItens.filter((e) => e.src === imgSrc).length > 0) {
      alert("Esse item já foi adicionado.");
    } else {
      this.cartItens.push({
        src: imgSrc,
        title: text,
        price: preco,
        quantity: 1,
      });
    }
    this.updateCart();
    this.updateTotal();
  }

  clearCart() {
    while (this.cartContent.firstChild) {
      this.cartContent.removeChild(this.cartContent.lastChild);
    }
  }

  createItem(src, title, price, index) {
    const box = document.createElement("div");
    box.classList.add("cart-box");
    box.dataset.index = index;
    box.innerHTML = `
        <img src="${src}" alt="" class="cart-img">
        <div class="detail-box">
          <h3 class="cart-product-title">${title}</h3>
          <span class="cart-product-price">R$${price}</span>
          <input type="number" value="1" class="cart-quantity" min="1" max="100">
        </div>
        <i class="fa-solid fa-trash remove-icon"></i>
    `;
    this.cartContent.appendChild(box);
    const removeButton = box.querySelector(".remove-icon");
    const input = box.querySelector(".cart-quantity");
    this.addEvents(removeButton, input);
  }

  addEvents(btn, input) {
    btn.addEventListener("click", this.removeItem);
    input.addEventListener("change", this.updateQuantity);
  }

  removeItem(event) {
    const element = event.target;
    this.cartItens.splice(element.parentElement.dataset.index, 1);
    this.updateCart();
    this.updateTotal();
  }

  updateQuantity(event) {
    const element = event.target;
    const index = element.parentElement.parentElement.dataset.index;
    this.cartItens[index].quantity = +element.value;
    this.updateTotal();
  }

  updateTotal() {
    const totalPrice = document.querySelector(".cart-total-price");
    let total = 0;
    for (let i = 0; i <= this.cartItens.length - 1; i++) {
      if (this.cartItens[i].price.includes(",")) {
        this.cartItens[i].price = this.cartItens[i].price.replace(",", ".");
      }
      total += +this.cartItens[i].quantity * +this.cartItens[i].price;
    }
    totalPrice.innerText = `R$${total.toFixed(2)}`;
  }

  updateCart() {
    this.clearCart();
    this.cartItens.forEach((item, index) => {
      this.createItem(item.src, item.title, item.price, index);
    });
  }

  buyEvent() {
    if (this.cartItens.length) {
      alert("Sua compra foi encaminhada.");
      while (this.cartItens.length) {
        this.cartItens.pop();
      }
      this.updateCart();
      this.updateTotal();
    } else {
      alert("Adicione algum item ao seu carrinho.");
    }
  }

  init() {
    if (this.addButton && this.buyButton) {
      this.addEventButton();
      this.updateCart();
    }
    return this;
  }
}
