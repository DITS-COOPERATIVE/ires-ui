import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedCustomerObject: any;
  private selectedCustomerSource = new BehaviorSubject<string>(''); 
  selectedCustomer$ = this.selectedCustomerSource.asObservable();

  private selectedCustomerKey = 'selectedCustomer';

  constructor() {
    const selectedCustomer = localStorage.getItem(this.selectedCustomerKey);
    if (selectedCustomer) {
      this.selectedCustomerSource.next(selectedCustomer);
    }
  }

  setSelectedCustomer(customerName: string): void {
    localStorage.setItem(this.selectedCustomerKey, customerName);
    this.selectedCustomerSource.next(customerName);
  }

  setSelectedCustomerObject(customer: any): void {
    this.selectedCustomerObject = customer;
  }

  getSelectedCustomerObject(): any {
    return this.selectedCustomerObject;
  }
}
