import LocalStorage from "./localstorage.js";

export let cart = LocalStorage.getCartData();

export function addToCart(cardId) {
  const isExisted = cart.find(item => item.id === cardId);
  if (isExisted) increaseQuantity(cardId);
  else {
    cart.push({ id: cardId, quantity: 1 });
    LocalStorage.saveCartData(cart);
  }
}

export function removeFromCart(cardId) {
  cart = cart.filter(item => item.id !== cardId);
  LocalStorage.saveCartData(cart);
}

export function increaseQuantity(cardId) {
  const cartItem = cart.find(item => item.id === cardId);
  cartItem.quantity++;
  LocalStorage.saveCartData(cart);
}

export function decreaseQuantity(cardId) {
  const cartItem = cart.find(item => item.id === cardId);
  if (cartItem.quantity === 1) removeFromCart(cardId);
  else cartItem.quantity--;
  LocalStorage.saveCartData(cart);
}

export function clearCart() {
  cart = [];
  LocalStorage.saveCartData(cart);
}
