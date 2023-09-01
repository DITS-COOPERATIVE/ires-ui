import { Component } from '@angular/core';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {

  constructor(private customersService: CustomersService) {}

  first_name!: string
  last_name!: string
  gender!: string
  email!: string
  mobile_no!: string
  birth_date!: string
  address!: string
  privilege!: string

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  saveCustomer(){
    this.loadingTitle = "Saving";
    this.isLoading = true;

    var inputData = {
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      email: this.email,
      mobile_no: this.mobile_no,
      birth_date: this.birth_date,
      address: this.address,
      privilege: this.privilege,
    }

    this.customersService.saveCustomer(inputData).subscribe({

      next: (res: any) => {
        console.log(res, 'response')
        alert(res.message);
        this.first_name = '';
        this.last_name = '';
        this.gender = '';
        this.email = '';
        this.birth_date = '';
        this.address = '';
        this.privilege = '';

        this.isLoading = false  
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false  
        console.log(this.first_name)
      }
    })
  }
}

