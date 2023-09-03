import { Component } from '@angular/core';
import { OrdersResponse, OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  constructor(private ordersService: OrdersService) { }

  errors: any = [];
  orders!: OrdersResponse [];
  isLoading: boolean = false;

  ngOnInit() {

    this.getOrdersLists();

  }

  getOrdersLists(){
    try {

      this.isLoading = true;
      
      this.ordersService.getOrdersLists().subscribe((res: any) =>{
        console.log(res.result);
        this.orders = res.result
        this.isLoading = false
        
      });

    } catch (error) {
      this.errors = error
    }
    
  }

  deleteOrder(event: any, orderId: number) {

    if (confirm('Are you sure you want to delete this order?')) 
    {
      event.target.innerText = "Deleting..."  

      this.ordersService.destroyOrder(orderId).subscribe((res: any) => {

        this.getOrdersLists();

        alert(res.message);
      })
    }
  }
}
