import { Component } from '@angular/core';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { OrdersResponse, OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  constructor(private ordersService: OrdersService, private customersService: CustomersService,
    private productsService: ProductsService,) { }

  errors: any = [];
  orders: OrdersResponse []=[];
  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  mappedOrders: any[] = [];

  isLoading: boolean = false;

  ngOnInit() {

    this.getOrdersLists(); 
    this.getCustomersLists();
    this.getProductsLists();
  }

  getOrdersLists(){
    try {

      this.isLoading = true;
      this.ordersService.getOrdersLists().subscribe((res: any) =>{
        this.orders = res
        this.isLoading = false 
      });

    } catch (error) {
      this.errors = error
    }
    
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  getProductsLists() {
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) => {
        this.products = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(cust => cust.id === customerId);
    return customer ? customer.full_name : '';
  }

  getProductName(productId: number): string {
    const product = this.products.find(prod => prod.id === productId);
    return product ? product.name : '';
  }

  
  
}
