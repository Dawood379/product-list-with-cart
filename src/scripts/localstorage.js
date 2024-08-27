export default class LocalStorage {
  static saveProductData(cartData) {
    localStorage.setItem('productData', JSON.stringify(cartData));
  }
  static getProductData() {
    return JSON.parse(localStorage.getItem('productData')) || [];
  }

  static saveCartData(cartData) {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }
  static getCartData() {
    return JSON.parse(localStorage.getItem('cartData')) || [];
  }
}
