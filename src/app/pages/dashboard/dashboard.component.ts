import { Component } from '@angular/core';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  totalCustomers: number = 0;
  activeCardIndex: number | null = null;
  

  constructor(private customersService: CustomersService, private productsService: ProductsService) {}

  ngOnInit() {
    this.getCustomersList();
    this.getProductsList();
  }

  getCustomersList() {
    this.customersService.getCustomersLists().subscribe((customers: CustomersResponse[]) => {
      this.customers = customers;
      this.customers.sort((a, b) => b.points - a.points);
      this.totalCustomers = customers.length; 
    });
  }
getProductsList(){
  this.productsService.getProductsLists().subscribe((products: ProductsResponse[]) => {
    this.products = products;
    this.products.sort((a, b) => b.quantity - a.quantity);

  });
}

  activateCard(index: number): void {
    this.activeCardIndex = index;
  }


  
}
