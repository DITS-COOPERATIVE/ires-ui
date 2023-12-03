import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { OrdersResponse, OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent {
  constructor(private ordersService: OrdersService, private customersService: CustomersService,
    private productsService: ProductsService,  private route: ActivatedRoute,) { }


  errors: any = [];
  orders: OrdersResponse []=[];
  customers: any[] = [];
  products: any[] = [];
  customer: any = {};
  orderDetails: any ={};
  isLoading: boolean = false;

  ngOnInit() {
    this.getOrder();
    this.getCustomersLists();
    this.getProductsLists();
  }
 
  getOrder(){
    this.route.params.subscribe(params => {
      const orderId = params['id']; 
      console.log(orderId);
      if (orderId) {
        this.isLoading = true;
        this.ordersService.getOrder(orderId).subscribe(
          (res) => {
            this.orderDetails = res;
            this.customer = res.customer? res.customer:{};
            console.log(this.orderDetails);
            this.isLoading = false;
          }
          
        );
      }
    });
  

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

  getCustomerDetails(customerId: number): any {
    const customer = this.customers.find(cust => cust.id === customerId);
    return customer ? {
      fullName: customer.full_name,
      address: customer.address,
      mobileNumber: customer.mobile_no,
      email: customer.email,
      gender: customer.gender,
      previlege: customer.previlege,
      points: customer.points
    } : null;
    
  }

  getProductName(productId: number): any {
    const product = this.products.find(prod => prod.id === productId);
    return product ?{
    
    Name: product.name
    
  }:null
  }


  
  
}
