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
