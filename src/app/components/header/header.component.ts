import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countInCart: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.countInCart !== this.cartService.getCountToCart()) {
      this.countInCart = this.cartService.getCountToCart();
    }
  }

}
