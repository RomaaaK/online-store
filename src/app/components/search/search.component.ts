import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  value: string = '';
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onChange(btn?: 'clear' ) {
    if (btn) {
      this.value = '';
      this.productService.search('');
      return;
    }
    this.productService.search(this.value);
  }

}
