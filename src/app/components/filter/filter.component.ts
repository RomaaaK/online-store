import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ProductService } from 'src/app/services/product/product.service';

interface FiltersData {
  category: Category[];
  popular: boolean;
  price: [number, number];
  count: [number, number];
}

interface Category {
  name: string,
  completed: boolean 
}


export interface FiltersDataSend extends Omit<FiltersData, 'category'> {
  category: string[]
}


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  filtersData!: FiltersData;
  resetData!: FiltersData;
  categories: string[] = [];

  optionsPrice!: Options;
  optionsCount!: Options;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const products = this.productService.getProducts();
    const prices = products.map((p) => p.price);
    const counts = products.map((p) => p.count)
    this.categories = [... new Set(this.productService.getProducts().map((p) => p.category))];
    this.filtersData = {
      category: this.categories.reduce<Category[]>((acc, cat) => {
        acc.push({name: cat, completed: false});
        return acc;
      },[]),
      popular: false,
      price: [Math.min(...prices), Math.max(...prices)],
      count: [Math.min(...counts), Math.max(...counts)]
    }

    this.optionsPrice = {
      floor: this.filtersData.price[0],
      ceil: this.filtersData.price[1],
      translate: (v: number): string => {
        return `$${v}`
      }
    };

    this.optionsCount = {
      floor: this.filtersData.count[0],
      ceil: this.filtersData.count[1],
    };

    this.resetData = JSON.parse(JSON.stringify(this.filtersData));

    const filterSaved = localStorage.getItem('filter');

    if (filterSaved) {
      this.filtersData = JSON.parse(filterSaved);
      this.onChange();
    }
  }

  onChange() {
    this.productService.filterProducts({
      category: this.filtersData.category.filter((c) => c.completed).map((c) => c.name),
      price: this.filtersData.price,
      count: this.filtersData.count,
      popular: this.filtersData.popular
    })
    localStorage.setItem('filter', JSON.stringify(this.filtersData))
  }

  reset() {
    this.filtersData = JSON.parse(JSON.stringify(this.resetData));
    this.onChange();
  }
}
