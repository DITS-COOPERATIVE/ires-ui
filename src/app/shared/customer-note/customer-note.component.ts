import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.css'],
})
export class CustomerNoteComponent {
  textInput: string = '';
  constructor(
    private customersService: CustomersService,
    public dialogRef: MatDialogRef<CustomerNoteComponent>,
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
