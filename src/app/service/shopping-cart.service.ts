import {Injectable} from '@angular/core';
import {ProductDTO} from '../dto/product-dto';
import {ShoppingCartDTO} from '../dto/ShoppingCartDTO';
import {BehaviorSubject} from 'rxjs';

const KEY_SHOPPING_CART = 'shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor() {
  }

  addToCart(item: ShoppingCartDTO): void {
    let isExist = false;
    const items = this.getItems();
    items.forEach((element, index) => {
      if (element.productId === item.productId) {
        isExist = true;
        items[index] = {
          quantity: element.quantity + item.quantity,
          productId: element.productId,
          productDTO: element.productDTO
        };
      }
    });
    if (!isExist) {
      items.push(item);
    }
    window.sessionStorage.setItem(KEY_SHOPPING_CART, JSON.stringify(items));
  }

  getItems(): ShoppingCartDTO[] {
    const items = window.sessionStorage.getItem(KEY_SHOPPING_CART);
    if (items) {
      return JSON.parse(items);
    }
    return [];
  }

  clearCart(): void {
    window.sessionStorage.removeItem(KEY_SHOPPING_CART);
  }

  removeItem(productId: string): void {
    const items = this.getItems();
    items.forEach((value, index) => {
      if (value.productId === productId) {
        items.splice(index, 1);
      }
    });
    window.sessionStorage.setItem(KEY_SHOPPING_CART, JSON.stringify(items));
  }

  getTotal(): number {
    let total = 0;
    const items = this.getItems();
    items.forEach((value, index) => {
      total += value.quantity * (value.productDTO.sale > 0 ? value.productDTO.priceSell - (value.productDTO.priceSell * value.productDTO.sale) / 100 : value.productDTO.priceSell);
    });
    // @ts-ignore
    total = items.reduce((sum, item) => sum + ((item.productDTO.sale > 0 ? item.productDTO.priceSell - (item.productDTO.priceSell * item.productDTO.sale) / 100 : item.productDTO.priceSell) * item.quantity), 0);
    return total;
  }
}
