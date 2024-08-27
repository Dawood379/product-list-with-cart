const productsContainer = document.querySelector('.cards');
const cartContainer = document.querySelector('.cart__items');
const cartTotalPrice = document.querySelector('.cart__total-price span');
const cartCounter = document.querySelector('#cart-counter');
const cartEmptyStructure = document.querySelector('.cart__empty');
const cartStructure = document.querySelector('.cart__body');
const orderContainer = document.querySelector('#order__items');
const orderTotalPrice = document.querySelector('.order__total-price span');

let cart = [];

class Products {
  #index = 0;

  constructor(products) {
    this.products = products;
  }

  #setProductsId() {
    this.products.forEach(product => {
      product.id = this.#index;
      this.#index++;
    });
  }

  #initialBtnState() {
    this.products.forEach(product => product.addedToCart = false);
  }

  getProducts() {
    this.#setProductsId();
    this.#initialBtnState();
    return this.products;
  }
}

class App {
  constructor(productsData) {
    this.productsData = productsData;
  }
  
  setup() {
    this.populateProducts(this.productsData);
    this.populateCart();
    this.btnsEventLogics();
  }
  
  populateProducts(productsData) {
    productsContainer.innerHTML = '';
    productsData.forEach((productData) => this.renderProductCard(productData));
  }

  populateCart() {
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      cartStructure.classList.add('display-none');
      cartEmptyStructure.classList.remove('display-none');
    } else {
      cartStructure.classList.remove('display-none');
      cartEmptyStructure.classList.add('display-none');
      cart.forEach(item => this.renderCartItem(item));
    }
    this.removeCartItem();
    this.populateOdrers();
    this.updateOrderTotalPrice();
  }

  populateOdrers() {
    orderContainer.innerHTML = '';
    cart.forEach(item => this.renderOrderItem(item));
  }
  
  renderProductCard(productData) {
    const normalBtn = `
    <button class="btn btn--primary-outline btn--add-to-cart">
      <img src="../../assets/images/icon-add-to-cart.svg" alt="add to cart" />
      <span class="btn__text">Add to Cart</span>
    </button>`;
    const quantityBtn = `
    <button class="btn btn--primary btn--quantity">
      <div class="icon-circular-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      </div>
      <span class="btn__text">${productData.quantity}</span>
      <div class="icon-circular-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
      </div>
    </button>`;

    const result = `
    <article class="card ${(productData.addedToCart) ? 'card--added' : ''}" data-id="${productData.id}">
      <div class="card__header">
        <picture>
          <source media="(min-width: 768px)" srcset="../${productData.image.desktop}">
          <source media="(min-width: 465px)" srcset="../${productData.image.tablet}">
          <img src="../${productData.image.mobile}" class="card__image">
        </picture>
        ${(productData.addedToCart) ? quantityBtn : normalBtn}
      </div>
      <div class="card__body">
        <p class="card__category">${productData.category}</p>
        <h2 class="card__title">${productData.name}</h2>
        <p class="card__price">$<span>${productData.price.toFixed(2)}</span></p>
      </div>
    </article>`;
    productsContainer.innerHTML += result;
  }

  renderCartItem(productData) {
    const cartItemContainer = document.createElement('article');
    cartItemContainer.classList.add('cart__item', 'flex-group');
    cartItemContainer.dataset.id = productData.id;
    cartItemContainer.innerHTML = `<div class="grid-flow">
        <p class="cart__item-title">${productData.name}</p>
        <div class="cart__info">
          <p class="cart__quantity"><span>${productData.quantity}</span>x</p>
          <p class="cart__single-price">@ $<span>${productData.price.toFixed(2)}</span></p>
          <p class="cart__price">$${(productData.price * productData.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div class="cart__icon">
        <div class="icon-circular-container cart__remove">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-remove-item" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
          </svg>
        </div>
      </div>`;
    cartContainer.appendChild(cartItemContainer);
  }

  renderOrderItem(productData) {
    const orderItemContainer = document.createElement('article');
    orderItemContainer.classList.add('order__item', 'flex-group');
    orderItemContainer.dataset.id = productData.id;
    orderItemContainer.innerHTML = `
    <div class="order__details">
      <img
        src="../${productData.image.thumbnail}"
        alt="..."
        class="order_img"
      />
      <div class="grid-flow">
        <p class="order__item-title text-ellipsis">${productData.name}</p>
        <div class="order__info">
          <p class="order__quantity"><span>${productData.quantity}</span>x</p>
          <p class="order__single-price">@ $<span>${productData.price.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
    <div class="order__price">
      <p>$<span>${(productData.price * productData.quantity).toFixed(2)}</span></p>
    </div>`;
    orderContainer.appendChild(orderItemContainer);
  }

  toggleProductBtn(productData) {
    productData.addedToCart = !productData.addedToCart;
  }

  updateCartTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = totalPrice.toFixed(2);
  }

  updateOrderTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    orderTotalPrice.textContent = totalPrice.toFixed(2);
  }

  updateCartCounter() {
    cartCounter.textContent = cart.length;
  }

  removeCartItem() {
    const removeCartItemBtns = document.querySelectorAll('.cart__icon');
    removeCartItemBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cartId = btn.parentElement.dataset.id;
        this.toggleProductBtn(cart.find(item => item.id === parseInt(cartId)));
        cart = cart.filter(item => item.id !== parseInt(cartId));
        this.setup();
        this.updateCartTotalPrice();
        this.updateCartCounter();
      });
    });
  }

  btnsEventLogics() {
    const cardBtns = document.querySelectorAll('.card .btn--add-to-cart');
    cardBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.parentElement.parentElement.dataset.id;
        const product = this.productsData.find(product => product.id === parseInt(productId));
        this.toggleProductBtn(product);
        product.quantity = 1;
        cart.push(product);
        this.updateCartTotalPrice();
        this.updateCartCounter();
        this.setup();
      });
    });
    
    const quantityBtns = document.querySelectorAll('.card .btn--quantity');
    quantityBtns.forEach(btn => {
      const quantity = btn.children[1];
      const quantityIncrement = btn.children[0];
      const quantityDecrement = btn.children[2];
      // quantity-increment functionality
      quantityIncrement.addEventListener('click', () => {
        const productId = btn.parentElement.parentElement.dataset.id;
        const cartItem = cart.find(item => item.id === parseInt(productId));
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
          quantity.textContent = cartItem.quantity;
        } else {
          cartItem.quantity = 0;
          cart = cart.filter(item => item.quantity !== 0);
          this.toggleProductBtn(cartItem);
          this.setup();
        }
        this.populateCart();
        this.updateCartTotalPrice();
        this.updateCartCounter();
      });
      // quantity-decrement functionality
      quantityDecrement.addEventListener('click', () => {
        const productId = btn.parentElement.parentElement.dataset.id;
        const cartItem = cart.find(item => item.id === parseInt(productId));
        cartItem.quantity++;
        quantity.textContent = cartItem.quantity;
        this.populateCart();
        this.updateCartTotalPrice();
        this.updateCartCounter();
      });
    });
  }
}

async function fetchData() {
  try {
    const response = await fetch('../../data.json');
    if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
    const productsData = await response.json();
    return [...productsData];
  } catch (error) {
    console.error(`Error on fetching JSON: ${error}`);
  }
}

(async function () {
  const data = await fetchData();
  const products = new Products(data);
  const productsData = products.getProducts();

  const app = new App(productsData);
  app.setup();
})();
