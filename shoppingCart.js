// Exporting module
console.log('Exporting module');

//blocking code (importing module is blocked until this comes back)
//console.log('Start fetching users');
//await fetch('https://jsonplaceholder.typicode.com/users');
//console.log('Finish fetching');

//These are private within the module. You have to export them.
const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
