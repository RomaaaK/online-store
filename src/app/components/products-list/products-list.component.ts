import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  isLoad: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  ngDoCheck(): void {
    const pr = this.productService.getProducts();
    if (pr !== this.products) {
      this.products = pr;
      this.isLoad = this.productService.isLoading();
    }
  }

  addToCart(p: Product): void {
    if (this.cartService.getCountToCart() >= 20 && !this.cartService.hasInCart(p)) {
      this.snackBar.open('Извините, все слоты заполнены!', '', {
        duration: 1200,
      });
      return;
    }
    this.cartService.addToCart(p);
  }

  hasInCart(p: Product): boolean {
    return this.cartService.hasInCart(p);
  }

}
