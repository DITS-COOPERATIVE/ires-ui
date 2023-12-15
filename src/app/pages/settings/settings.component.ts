import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CashierService } from 'src/app/services/settings/cashier.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(  private toast: NgToastService,private cashierService: CashierService){
  }
  name!: string;
  email!: string;
  password!: string;
  address!: string;
  mobile_no!:string;
  errors: any = {};
  user_type!: string;



  saveCashier() {
    var inputData = {
     name: this.name,
      email:this.email,
      address:this.address,
      mobile_no: this.mobile_no,
      password:this.password,
      user_type: 'Cashier',

    };

    this.cashierService.saveCustomer(inputData).subscribe({
      next: (res:any) => {
        this.toast.success({detail:"SUCCESS",summary:'Succesfully Created New Cashier!',duration:3000, position:'topCenter'});
        this.name ='' ;
        this.email;
        this.address ='';
        this.mobile_no ='';
        this.password = '';
        this.user_type ='';
      },
      error: (err: any) => {
        this.toast.error({detail:"ERROR",summary:'Failed to Create new Cashier!',duration:3000, position:'topCenter'});
        this.errors = err.error.errors;
      },
    });
  }
}
