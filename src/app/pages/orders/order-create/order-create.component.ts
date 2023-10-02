import { Component } from '@angular/core';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {

  constructor(private customersService: CustomersService,
     private ordersService: OrdersService,
     private productsService: ProductsService,) {}

  customer_id!: any
  product_id!: any
  quantity!: any

  customers!: CustomersResponse [];
  products!: ProductsResponse [];
  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  ngOnInit() {

    this.getCustomersLists();
    this.getProductsLists();

  }

  getCustomersLists(){
    try {

      this.isLoading = true;
      
      this.customersService.getCustomersLists().subscribe((res: any) =>{
        console.log(res.result);
        this.customers = res.result
        this.isLoading = false
        
      });

    } catch (error) {
      this.errors = error
    }
  }

  getProductsLists(){
    try {

      this.isLoading = true;
      
      this.productsService.getProductsLists().subscribe((res: any) =>{
        console.log(res.result);
        this.products = res.result
        this.isLoading = false
        
      });

    } catch (error) {
      this.errors = error
    }
  }

  saveOrder(){
    this.loadingTitle = "Saving";
    this.isLoading = true;

    var inputData = {
      customer_id: this.customer_id,
      product_id: this.product_id,
      quantity: this.quantity,
    }

    this.ordersService.saveOrder(inputData).subscribe({

      next: (res: any) => {
        console.log(res, 'response')
        alert(res.message);
        this.customer_id = '';
        this.product_id = '';
        this.quantity = '' ;
        this.isLoading = false  
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        console.log(err, 'response')
        alert(err.error.message);
        location.reload()
        this.isLoading = false  
        console.log(this.errors)
      }
    })
  }
}
