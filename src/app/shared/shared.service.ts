// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private selectedCustomerObject: any;
  private selectedCustomerSource = new BehaviorSubject<string>(''); 
  selectedCustomer$ = this.selectedCustomerSource.asObservable();

  setSelectedCustomer(customerName: string): void {
    this.selectedCustomerSource.next(customerName);
  }
  setSelectedCustomerObject(customer: any): void {
    this.selectedCustomerObject = customer;
  }
  
  getSelectedCustomerObject(): any {
    return this.selectedCustomerObject;
  }
}
