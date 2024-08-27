import generateUUID from './utils/generateUUID.js';
import LocalStorage from './localstorage.js';

export let products = LocalStorage.getProductData();

export class Product {
  constructor(productData) {
    this.id = generateUUID();
    this.name = productData.name;
    this.image = productData.image;
    this.category = productData.category;
    this.price = productData.price;
  }
}

export async function fetchProductsData(url = '../../data.json') {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
    const productsData = await response.json();
    products = productsData.map(productData => new Product(productData));
    LocalStorage.saveProductData(products);
  } catch (error) {
    console.error(`Error on fetching JSON: ${error}`);
  }
}

export function getProductDataById(productId) {
  return products.find(product => product.id === productId);
}
