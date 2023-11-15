import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-transaction-customer',
  templateUrl: './transaction-customer.component.html',
  styleUrls: ['./transaction-customer.component.css'],
})
export class TransactionCustomerComponent {
  constructor(private customersService: CustomersService, private sharedService:
     SharedService, private router: Router) {}

  customers: CustomersResponse[] = [];
  isLoading: boolean = false;
  errors: any = [];
  full_name!: string;
  email!: string;
  mobile_no!: string;
  address!: string;
  loadingTitle: string = 'Loading';
  selectedCustomer: any = null;
  selectedCustomerName: string = '';
  
 

  ngOnInit() {
    this.getCustomersLists();
   this.sharedService.getSelectedCustomerObject();
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res.sort((a, b) => a.full_name.localeCompare(b.full_name));
        this.sortCustomers() 
        this.customers = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  sortCustomers() {
        this.customers.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        });
       
  }

  selectCustomer(customer: any): void {
    this.selectedCustomer = customer;
    this.sharedService.setSelectedCustomer(customer.full_name);
    this.sharedService.setSelectedCustomerObject(customer);
    this.selectedCustomerName = customer.full_name; 
    // this.router.navigate(['/transactions/']);
    console.log(customer);
  }



  unselectCustomer(event: Event): void {
    event.stopPropagation();
    this.selectedCustomer = null;
    this.sharedService.setSelectedCustomer(''); 
    this.selectedCustomerName = '';
    console.log(this.selectedCustomer);
  }
  
  isSelected(customer: any): boolean {
    return customer === this.selectedCustomer;
  }
  toggleSelectCustomer(customer: any): void {
    if (this.isSelected(customer)) {
      this.unselectCustomer(customer);
    } else {
      this.selectCustomer(customer);
    }
  }


}
