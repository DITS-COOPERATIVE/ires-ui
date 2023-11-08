import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';
import {
  ProductsService,
  ProductsResponse,
} from 'src/app/services/products/products.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  textInput: string = '';
  cart: ProductsResponse[] = [];
  constructor(
    private customersService: CustomersService,
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  customers!: CustomersResponse[];
  full_name!: string;

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    // Add your print logic here
    console.log('Printing...');
  }
}
