// Abrir e Fechar Carrinho
const cartButton = document.querySelector("#cart-icon");
const close = document.querySelector(".cart-close");

const cart = document.querySelector(".cart");

const showCart = () => {
  cart.classList.add("active");
};

const closeCart = () => {
  cart.classList.remove("active");
};

cartButton.addEventListener("click", showCart);
close.addEventListener("click", closeCart);

//
const cartItens = [];
const addButton = document.querySelectorAll(".add-cart");
const buyButton = document.querySelector(".btn-buy");

const clearCart = () => {
  const cartContent = document.querySelector(".cart-content");
  while (cartContent.firstChild) {
    cartContent.removeChild(cartContent.lastChild);
  }
};

const updateCart = () => {
  clearCart();
  cartItens.forEach((item, index) =>
    createItem(item.src, item.title, item.price, index)
  );
};

const createItem = (src, title, price, index) => {
  const content = document.querySelector(".cart-content");
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
  content.appendChild(box);
  const removeButton = box.querySelector(".remove-icon");
  const input = box.querySelector(".cart-quantity");
  addEvents(removeButton, input);
};

const addEvents = (btn, input) => {
  btn.addEventListener("click", removeItem);
  input.addEventListener("change", updateQuantity);
};

const removeItem = (event) => {
  const img = event.target.parentElement.querySelector("img");
  const src = img.getAttribute("src");
  const index = event.target.parentElement.parentElement.dataset.index;
  cartItens.splice(index, 1);
  updateCart();
  updateTotal();
};

const addToCart = (event) => {
  const element = event.target.parentElement;
  const img = element.querySelector("img").getAttribute("src");
  const text = element.querySelector("h2").innerText;
  const preco = element.querySelector("span").innerText.replace("R$", "");
  if (cartItens.filter((e) => e.src === img).length > 0) {
    alert("Esse item já foi adicionado");
  } else {
    cartItens.push({ src: img, title: text, price: preco, quantity: 1 });
  }
  updateCart();
  updateTotal();
};

const updateQuantity = (event) => {
  const element = event.target;
  const index = element.parentElement.parentElement.dataset.index;
  cartItens[index].quantity = +element.value;
  updateTotal();
};

const updateTotal = () => {
  const totalPrice = document.querySelector(".cart-total-price");
  let total = 0;
  for (let i = 0; i <= cartItens.length - 1; i++) {
    if (cartItens[i].price.includes(",")) {
      cartItens[i].price = cartItens[i].price.replace(",", ".");
    }
    total += +cartItens[i].quantity * +cartItens[i].price;
  }
  totalPrice.innerText = `R$${total.toFixed(2)}`;
};

const buyEvent = () => {
  if (cartItens.length) {
    alert("Sua compra foi encaminhada");
    while (cartItens.length) {
      cartItens.pop();
    }
    updateCart();
    updateTotal();
  } else {
    alert("Adicione algum item ao seu carrinho");
  }
};

addButton.forEach((btn) => btn.addEventListener("click", addToCart));
buyButton.addEventListener("click", buyEvent);

updateCart();
