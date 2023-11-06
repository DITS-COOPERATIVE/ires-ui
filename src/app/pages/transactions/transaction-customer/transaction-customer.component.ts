import { Component } from '@angular/core';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-transaction-customer',
  templateUrl: './transaction-customer.component.html',
  styleUrls: ['./transaction-customer.component.css'],
})
export class TransactionCustomerComponent {
  constructor(private customersService: CustomersService) {}

  customers: CustomersResponse[] = [];
  isLoading: boolean = false;
  errors: any = [];

  full_name!: string;
  gender!: string;
  email!: string;
  mobile_no!: string;
  address!: string;
  privilege!: string;
  points: number = 0;
  image!: string;
  loadingTitle: string = 'Loading';

  ngOnInit() {
    this.getCustomersLists();
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        // this.customers = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }
}
