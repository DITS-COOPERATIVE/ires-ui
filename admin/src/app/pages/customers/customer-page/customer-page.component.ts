import { Component } from '@angular/core';
import { CustomersResponse, CustomersService } from '../../../services/customers/customers.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent {

  constructor(private customersService: CustomersService) { }

  errors: any = [];
  customers!: CustomersResponse [];
  isLoading: boolean = false;

  ngOnInit() {

    this.getCustomersLists();

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

  deleteCustomer(event: any, customerId: number) {

    if (confirm('Are you sure you want to delete this customer?')) 
    {
      event.target.innerText = "Deleting..."  

      this.customersService.destroyCustomer(customerId).subscribe((res: any) => {

        this.getCustomersLists();

        alert(res.message);
      })
    }

  }
}
