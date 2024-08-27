import { cart, clearCart } from '../cart.js';
import { getProductDataById } from '../products.js';
import { renderProductsCard } from './products.js';

export function renderOrderItems() {
  handleModal();

  let orderItems = '';
  cart.forEach(cartItem => orderItems += createOrderItemHTML(cartItem));
  
  const orderContainer = document.querySelector('#order__items');
  orderContainer.innerHTML = orderItems;

  updateOrderTotalPrice();
}

function createOrderItemHTML(cartItem) {
  const cartItemData = getProductDataById(cartItem.id);
  return `
  <article class="order__item flex-group" data-id="${cartItemData.id}">
    <div class="order__details">
      <img
        src="../../${cartItemData.image.thumbnail}"
        alt="..."
        class="order__img"
      />
      <div class="grid-flow">
        <p class="order__item-title text-ellipsis">${cartItemData.name}</p>
        <div class="order__info">
          <p class="order__quantity"><span>${cartItem.quantity}</span>x</p>
          <p class="order__single-price">@ $<span>${cartItemData.price.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
    <div class="order__price">
      <p>$<span>${(cartItemData.price * cartItem.quantity).toFixed(2)}</span></p>
    </div>
  </article>`;
}

function handleModal() {
  const modal = document.querySelector('#modal');
  const confirmOrder = document.querySelector('#confirm-order');
  const confirmedOrder = document.querySelector('#confirmed-order');

  confirmOrder.addEventListener('click', () => {
    modal.showModal();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  confirmedOrder.addEventListener('click', () => {
    modal.close();
    clearCart();
    renderProductsCard();
  });
}

function updateOrderTotalPrice() {
  const orderTotalPrice = document.querySelector('.order__total-price span');
  const totalPrice = cart.reduce((totalPrice, cartItem) => {
    return totalPrice + getProductDataById(cartItem.id).price * cartItem.quantity;
  }, 0);
  orderTotalPrice.textContent = totalPrice.toFixed(2);
}
