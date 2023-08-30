import { nextTick } from 'process';

type CartItem = { name: string; price: number };

export class ShoppingCart {
  private readonly _items: CartItem[] = [];
  private _orderStatus: 'open' | 'closed' = 'open';

  public get orderStatus(): 'open' | 'closed' {
    return this._orderStatus;
  }

  public get items(): readonly CartItem[] {
    return this._items;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu Carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`seu pedido com total de ${this.total()} foi recebido`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('Mensagem Enviada', msg);
  }

  saveOrder(): void {
    console.log('Pedido Salvo com Sucesso');
  }

  clear(): void {
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItem({ name: 'Camiseta', price: 49.9231 });
shoppingCart.addItem({ name: 'Caderno', price: 9.93123 });
shoppingCart.addItem({ name: 'Estojo', price: 4.91231 });

//shoppingCart.clear();

console.log(shoppingCart.items);
console.log(shoppingCart.total());
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
