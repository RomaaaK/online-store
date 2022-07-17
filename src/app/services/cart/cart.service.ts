import { Injectable } from '@angular/core';
import { Product } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Set<Product>();

  constructor() { }

  getCountToCart(): number {
    return this.cart.size;
  }

  addToCart(p: Product): void {
    if (this.cart.has(p)) {
      this.deleteToCart(p);
      return;
    }
    this.cart.add(p);
  }

  deleteToCart(p: Product): void {
    this.cart.delete(p);
  }

  hasInCart(p: Product): boolean {
    return this.cart.has(p);
  }
}
