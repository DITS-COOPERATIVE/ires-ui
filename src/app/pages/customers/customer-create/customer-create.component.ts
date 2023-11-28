import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

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
  points: number = 0;
  image!: string;
  customers: CustomersResponse[] = [];
  errors: any = {};
  uploadedImage: any;
  selectedImage: string = '';
  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        name: 'John Doe',
        barcode: '1234567890',
        dateCreated: new Date(),
      },
    });
  }
  saveCustomer() {
    this.image = this.image || 'default_image.jpg';

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
        this.full_name ='' ;
        this.gender = '';
        this.email = '';
        this.address = '';
        this.privilege = '';
        this.points = 0;
        this.image = '';

        const newCustomer: CustomersResponse = res;
        this.customers.push(newCustomer);
        this.openDialog();
      },
      error: (err: any) => {
        this.errors = err.error.errors;
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
