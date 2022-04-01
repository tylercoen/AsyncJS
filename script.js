// Importing module
//Import named variables
//import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//addToCart('bread', 5);
//console.log(price, tq);
console.log('Importing module');

//import * as ShoppingCart from './shoppingCart.js'; //imports everything as an object
//ShoppingCart.addToCart('bread', 5);
//console.log(ShoppingCart.totalPrice);
//imports are not copies of the export they are a live connection
import add, { cart } from './shoppingCart.js'; //imports the default
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
//you can use top-level await in modules but it blocks execution of entire module.
//const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//const data = await res.json();
//console.log(data);
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
//const lastPost = getLastPost();
console.log(lastPost); //returns a promise
//Not very clean but works
//lastPost.then(last => console.log(last));

//This works better
const lastPost2 = await getLastPost();
console.log(lastPost2);

//iffie function runs automatically and only once
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2); //shows updated cart
console.log(ShoppingCart2.shippingCost); //returns undefined b/c shipping cost is private to the module
*/
//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false; //this will also change the StateClone
console.log(stateClone);

console.log(stateDeepClone); //will reflect the original state

if (module.hot) {
  module.hot.accept();
}
import 'core-js/stable';
