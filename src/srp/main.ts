import { ShoppingCart } from '../legacy/shopping-cart';
import { Messaging } from '../services/messaging';
import { Order } from '../entity/order';
import { Persistency } from './persistency';
import { Product } from '../entity/product';

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('camiseta', 49.9));
shoppingCart.addItem(new Product('estojo', 9.9));
shoppingCart.addItem(new Product('caneta', 1.9));

//shoppingCart.clear();

console.log(shoppingCart.items);
console.log(shoppingCart.total());
order.checkout();
console.log(order.orderStatus);
