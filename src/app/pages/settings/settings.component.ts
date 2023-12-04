import { Component } from '@angular/core';
import { CashierService } from 'src/app/services/settings/cashier.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(  private cashiersService: CashierService){
  }
  full_name!: string;
  gender!: string;
  mobile_no!: string;
  address!: string;
  image!: string;
  errors: any = {};
  uploadedImage: any;
  selectedImage: string = '';



  saveCashier() {
    var inputData = {
      full_name: this.full_name,
      gender: this.gender,
      mobile_no: this.mobile_no,
      address: this.address,
      image: this.image,
    };

    this.cashiersService.saveCustomer(inputData).subscribe({
      next: (res:any) => {
        this.full_name ='' ;
        this.gender = '';
        this.address = '';
        this.image = '';
        this.selectedImage = '';
      },
      error: (err: any) => {
        this.errors = err.error.errors;
      },
    });
  }
}
