import { ShoppingCart } from '../legacy/shopping-cart';
import { orderStatus } from './interface/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../srp/persistency';

export class Order {
  private _orderStatus: orderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly msg: Messaging,
    private readonly persistency: Persistency,
  ) {}

  public get orderStatus(): orderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu Carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.msg.sendMessage(
      `seu pedido com total de ${this.cart.total()} foi recebido`,
    );
    this.persistency.saveOrder();
  }
}
