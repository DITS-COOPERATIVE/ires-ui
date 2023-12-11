import { Injectable } from '@angular/core';
import { CustomersService } from '../services/customers/customers.service';
import { Subject, map } from 'rxjs';
import { ProductsService } from '../services/products/products.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private customersService: CustomersService, private productsService: ProductsService) {}
  private searchQuerySource = new Subject<string>();
  searchQuery$ = this.searchQuerySource.asObservable();

  sendSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }

  searchCustomers(input: string, sort: string) {
    return this.customersService.getCustomersLists().pipe(
      map(customers => {
        switch (sort) {
          case '1':
            return customers.filter(item => item.id === parseInt(input));
          case '2':
            return customers.filter(item => item.full_name.toLowerCase().includes(input.toLowerCase()));
          case '3':
            return customers.filter(item => item.barcode === parseInt(input));
          default:
            return customers;
        }
      })
    );
  }
  searchProducts(input: string, sort: string) {
    return this.productsService.getProductsLists().pipe(
      map(products => {
        switch (sort) {
          case '1':
            return products.filter(item => item.id === parseInt(input));
          case '2':
            return products.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
          case '3':
            return products.filter(item => item.barcode === parseInt(input));
          default:
            return products;
        }
      })
    );
  }
}
