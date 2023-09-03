import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {

  constructor(private ordersService: OrdersService) {}

  customer_id!: any
  product_id!: any
  quantity!: number

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  saveCustomer(){
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
        this.quantity = 0 ;

        this.isLoading = false  
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false  
        console.log(this.errors)
      }
    })
  }

}
