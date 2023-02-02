import ToggleCart from "./togglecart.js";
import Cart from "./cart.js";

const toggleCart = new ToggleCart("#cart-icon", ".cart-close", ".cart");
toggleCart.init();

const cart = new Cart(".add-cart", ".btn-buy", ".cart-content");
cart.init();
