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
  selectedCustomer: any; 
  
 

  ngOnInit() {
    this.getCustomersLists();
    this.selectedCustomer = this.sharedService.getSelectedCustomerObject();
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

  selectCustomer(customer: any): void {
    this.selectedCustomer = customer;
    this.sharedService.setSelectedCustomer(customer.full_name);
    this.sharedService.setSelectedCustomerObject(customer);
    // this.router.navigate(['/transactions/']);
    console.log(customer);
  }

  unselectCustomer(): void {
    this.selectedCustomer = null;
    console.log(this.selectedCustomer);
  }


  isSelected(customer: any): boolean {
    return this.selectedCustomer === customer;
  }
}
