import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltersDataSend } from 'src/app/components/filter/filter.component';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  popular: boolean;
  count: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

type FnSort = (a: Product, b: Product)=> number;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  changeProducts!: Product[] | null;
  isLoad: boolean = true;
  fnSort: FnSort = (a, b) => a.id - b.id;
  dataFilter!: FiltersDataSend;;

  constructor(
    private http: HttpClient
  ) {
    http.get<Product[]>('https://fakestoreapi.com/products')
        .subscribe((p) => this.products = p.map(p => {
          p.count = this.randomInteger(0, 13);
          p.popular = this.randomInteger(0, 1) ? true : false;
          this.isLoad = false;
          return p;
        }));
   }

   private randomInteger(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  isLoading(): boolean {
    return this.isLoad;
  }

  getProducts(): Product[] {
    return this.changeProducts ? this.changeProducts : this.products;
  }

  filterProducts(data: FiltersDataSend, checkedFilterData = false) {
    if (checkedFilterData && !this.dataFilter) {
      this.changeProducts = this.products;
      return;
    };
    this.dataFilter = data;
    this.changeProducts = this.products.filter((p) => {
      if (data.category.length && !data.category.includes(p.category)) return false;
      if (data.popular && !p.popular) return false;
      if (p.price < data.price[0] || p.price > data.price[1]) return false;
      if (p.count < data.count[0] || p.count > data.count[1]) return false;
      return true;
    });
    this.sortProducts(this.fnSort);
  }

  sortProducts(fn: FnSort): void {
    this.fnSort = fn;
    this.changeProducts = [...this.changeProducts ? this.changeProducts : this.products].sort(fn);
  }

  sortReset() {
    this.changeProducts = null;
    this.fnSort = (a, b) => a.id - b.id;
  }

  search(value: string): Product[] {
    this.filterProducts(this.dataFilter, true);
    return this.changeProducts = [...this.getProducts().filter((p) => p.title.toLowerCase().includes(value.toLowerCase()) )];
  }
}
