import { getProductDataById } from '../products.js';
import { cart, removeFromCart } from '../cart.js';
import { renderOrderItems } from './orderItems.js';

export function renderCartItems() {
  let cartItems = '';
  cart.forEach(cartItem => cartItems += createCartItemHTML(cartItem));
  
  const cartContainer = document.querySelector('.cart__items');
  cartContainer.innerHTML = cartItems;

  eventsLogic();
  toggleCartContainer();
  updateCartCounter();
  updateCartTotalPrice();
  
  renderOrderItems();
}

function createCartItemHTML(cartItem) {
  const cartItemData = getProductDataById(cartItem.id);
  return `
  <article class="cart__item flex-group" data-id="${cartItemData.id}">
    <div class="grid-flow">
      <p class="cart__item-title">${cartItemData.name}</p>
      <div class="cart__info">
        <p class="cart__quantity"><span>${cartItem.quantity}</span>x</p>
        <p class="cart__single-price">@ $<span>${cartItemData.price.toFixed(2)}</span></p>
        <p class="cart__price">$${(cartItemData.price * cartItem.quantity).toFixed(2)}</p>
      </div>
    </div>
    <div class="cart__icon">
      <div class="icon-circular-container cart__remove">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-remove-item" width="10" height="10" fill="none" viewBox="0 0 10 10">
          <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
        </svg>
      </div>
    </div>
  </article>`;
}

function toggleCartContainer() {
  const cartEmptyStructure = document.querySelector('.cart__empty');
  const cartStructure = document.querySelector('.cart__body');
  if (cart.length > 0) {
    cartEmptyStructure.classList.add('display-none');
    cartStructure.classList.remove('display-none');
  } else {
    cartEmptyStructure.classList.remove('display-none');
    cartStructure.classList.add('display-none');
  }
}

function updateCartCounter() {
  const cartCounter = document.querySelector('#cart-counter');
  cartCounter.textContent = cart.length;
}

function updateCartTotalPrice() {
  const cartTotalPrice = document.querySelector('.cart__total-price span');
  const totalPrice = cart.reduce((totalPrice, cartItem) => {
    return totalPrice + getProductDataById(cartItem.id).price * cartItem.quantity;
  }, 0);
  cartTotalPrice.textContent = totalPrice.toFixed(2);
}

function eventsLogic() {
  const removeCartItemButtons = document.querySelectorAll('.cart__icon');
  removeCartItemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cartItemId = btn.parentElement.dataset.id;
      const productButton = document.querySelector(`.card[data-id="${cartItemId}"] .btn--quantity`);
      productButton.children[1].textContent = 1;
      productButton.previousElementSibling.classList.remove('display-none');
      productButton.classList.add('display-none');
      productButton.parentElement.parentElement.classList.remove('card--added');
      removeFromCart(cartItemId);
      renderCartItems();
    });
  });
}
