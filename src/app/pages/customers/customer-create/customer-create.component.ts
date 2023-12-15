import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  full_name!: string;
  gender!: string;
  email!: string;
  mobile_no!: string;
  address!: string;
  privilege!: string;
  barcode!: string;
  points: number = 0;
  image!: string;
  customers: CustomersResponse[] = [];
  errors: any = {};
  uploadedImage: any;
  selectedImage: string = '';
  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog,
    private toast: NgToastService
  ) {}

  openDialog(newCustomer: CustomersResponse): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        full_name: newCustomer.full_name,
        barcode: newCustomer.barcode,
        createdDate: newCustomer.created_at,
      },
    });
  }
  
  saveCustomer() {
    if (this.gender === 'Female' && !this.image) {
      this.image = 'assets/female.png';
  }else if (this.gender === 'Male' && !this.image){
    this.image = 'assets/male.png';
  }else if(this.image && this.image.includes('C:\\fakepath\\')){
    this.image = this.image.replace('C:\\fakepath\\', '');
  }
    var inputData = {
      full_name: this.full_name,
      gender: this.gender,
      email: this.email,
      mobile_no: this.mobile_no,
      address: this.address,
      privilege: this.privilege,
      points: this.points,
      image: this.image,
    };

    this.customersService.saveCustomer(inputData).subscribe({
      next: (res:any) => {
        this.barcode;
        this.full_name ='' ;
        this.gender = '';
        this.email = '';
        this.address = '';
        this.privilege = '';
        this.points = 0;
        this.image = '';
        this.selectedImage = '';
        const newCustomer: CustomersResponse = res;
        this.toast.success({detail:"SUCCESS",summary:'New Customer Added',duration:5000, position:'topCenter'});
        this.openDialog(newCustomer);        
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.toast.error({detail:"ERROR",summary:'Faild to Add Customer',duration:5000, position:'topCenter'});
      },
    });
  }
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.uploadedImage = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

}
