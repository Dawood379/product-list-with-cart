import { products, fetchProductsData } from '../products.js';
import { cart, addToCart, increaseQuantity, decreaseQuantity } from '../cart.js';
import { renderCartItems } from './cartItems.js';

export async function renderProductsCard() {
  if (cart.length === 0) await fetchProductsData();

  let productsCardHTML = '';
  products.forEach(product => {
    productsCardHTML += createProductCardHTML(product);
  });

  const productsContainer = document.querySelector('.cards');
  productsContainer.innerHTML = productsCardHTML;
  
  eventsLogic();
  renderCartItems();
}

function createProductCardHTML(productData) {
  const cartItem = cart.find(item => item.id === productData.id);
  return `
  <article class="card ${cartItem ? 'card--added' : ''}" data-id="${productData.id}">
    <div class="card__header">
      <picture>
        <source media="(min-width: 768px)" srcset="../../${productData.image.desktop}">
        <source media="(min-width: 465px)" srcset="../../${productData.image.tablet}">
        <img src="../../${productData.image.mobile}" class="card__image">
      </picture>
      <button class="btn btn--primary-outline btn--add-to-cart ${cartItem ? 'display-none' : ''}">
        <img src="../../assets/images/icon-add-to-cart.svg" alt="add to cart"/>
        <span class="btn__text">Add to Cart</span>
      </button>
      <button class="btn btn--primary btn--quantity ${cartItem ? '' : 'display-none'}">
        <div class="icon-circular-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
        </div>
        <span class="btn__text card__quantity">${cartItem ? cartItem.quantity : 1}</span>
        <div class="icon-circular-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
        </div>
      </button>
    </div>
    <div class="card__body">
      <p class="card__category">${productData.category}</p>
      <h2 class="card__title">${productData.name}</h2>
      <p class="card__price">$<span>${productData.price.toFixed(2)}</span></p>
    </div>
  </article>`;
}

function eventsLogic() {
  const addToCartButtons = document.querySelectorAll('.card .btn--add-to-cart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.parentElement.parentElement;
      const productId = product.dataset.id;
      addToCart(productId);
      btn.classList.add('display-none');
      btn.nextElementSibling.classList.remove('display-none');
      product.classList.add('card--added');
      renderCartItems();
    });
  });

  const quantityButtons = document.querySelectorAll('.card .btn--quantity');
  quantityButtons.forEach(btn => {
    const quantity = btn.children[1];
    const quantityIncrement = btn.children[2];
    const quantityDecrement = btn.children[0];
    const product = btn.parentElement.parentElement;
    const productId = product.dataset.id;
    // quantity-increment functionality
    quantityIncrement.addEventListener('click', () => {
      const cartItem = cart.find(item => item.id === productId);
      increaseQuantity(productId);
      quantity.textContent = cartItem.quantity;
      renderCartItems();
    });
    // quantity-decrement functionality
    quantityDecrement.addEventListener('click', () => {
      const cartItem = cart.find(item => item.id === productId);
      decreaseQuantity(productId);
      if (cart.includes(cartItem)) quantity.textContent = cartItem.quantity;
      else {
        btn.classList.add('display-none');
        btn.previousElementSibling.classList.remove('display-none');
        product.classList.remove('card--added');
      }
      renderCartItems();
    });
  });
}
