import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  sorts = [
    {value: 'default', viewValue: 'по id'},
    {value: 'a-z', viewValue: 'по названию от А до Я'},
    {value: 'z-a', viewValue: 'по названию от Я до А'},
    {value: 'rating-', viewValue: 'Рейтинг на убывание'},
    {value: 'rating+', viewValue: 'Рейтинг на возрастание'},
    {value: 'price-', viewValue: 'Сначало дорогие'},
    {value: 'price+', viewValue: 'Сначало дешевые'},
  ];

  sortValue: string = '';

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const sortSawed = localStorage.getItem('sort');

    if (sortSawed) {
      this.sortValue = sortSawed;
      this.onChange();
    }
  }

  onChange() {
    switch (this.sortValue) {
      case 'default':
        this.productService.sortReset();
        break;
      case 'a-z':
        this.productService.sortProducts((a, b) => b.title < a.title ? 1 : -1);
        break;
      case 'z-a':
        this.productService.sortProducts((a, b) => a.title < b.title ? 1 : -1);
        break;
      case 'rating-':
        this.productService.sortProducts((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'rating+':
        this.productService.sortProducts((a, b) => a.rating.rate - b.rating.rate);
        break;
      case 'price-':
        this.productService.sortProducts((a, b) => b.price - a.price);
        break;
      case 'price+':
        this.productService.sortProducts((a, b) => a.price - b.price);
        break;
    }
    localStorage.setItem('sort', this.sortValue);
  }

  refresh() {
    this.sortValue = '';
    this.productService.sortReset();
  }
}
