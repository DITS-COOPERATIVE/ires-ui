import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-transaction-customer',
  templateUrl: './transaction-customer.component.html',
  styleUrls: ['./transaction-customer.component.css'],
})
export class TransactionCustomerComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private sharedService: SharedService,
    private router: Router
  ) {}

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
  selectedCustomerId: number | null = null;

  ngOnInit() {
    this.getCustomersLists();
    this.selectedCustomerId = this.sharedService.getSelectedCustomerObject()?.id;
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res.sort((a, b) => a.full_name.localeCompare(b.full_name));
        this.sortCustomers();
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

  selectCustomer(customer: CustomersResponse): void {
    this.selectedCustomerId = customer.id;
    this.sharedService.setSelectedCustomer(customer.full_name);
    this.sharedService.setSelectedCustomerObject(customer);
    this.selectedCustomerName = customer.full_name;
    this.router.navigate(['/transactions/']);
    console.log(customer);
  }

  unselectCustomer(event: Event | null): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedCustomerId = null;
    this.sharedService.setSelectedCustomer('');
    this.sharedService.setSelectedCustomerObject(null);
    this.selectedCustomerName = '';
    this.router.navigate(['/transactions/']);
    console.log(this.selectedCustomerId);
  }

  isSelected(customer: CustomersResponse): boolean {
    return customer.id === this.selectedCustomerId;
  }
  
  toggleSelectCustomer(customer: CustomersResponse): void {
    if (this.isSelected(customer)) {
      this.unselectCustomer(null);
    } else {
      this.selectCustomer(customer);
    }
  }
}