import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {

  customerId!: any
  customer!: any

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  constructor (private route: ActivatedRoute, private customersService: CustomersService) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.customerId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true
    this.customersService.getCustomer(this.customerId).subscribe((res) => {
      console.log(res)
      this.customer = res.result[0]
      this.isLoading = false
    })
  }

  updateCustomer() {

    var inputData = {
      first_name: this.customer.first_name,
      last_name: this.customer.last_name,
      gender: this.customer.gender,
      email: this.customer.email,
      mobile_no: this.customer.mobile_no,
      birth_date: this.customer.birth_date,
      address: this.customer.address,
      privilege: this.customer.privilege,
    }

    this.isLoading = true

    this.customersService.updateCustomer(inputData, this.customerId).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message)
        this.isLoading = false
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false
      }
    });
  }

}
