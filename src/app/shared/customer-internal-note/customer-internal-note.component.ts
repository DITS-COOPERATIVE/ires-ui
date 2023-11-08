import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer-internal-note',
  templateUrl: './customer-internal-note.component.html',
  styleUrls: ['./customer-internal-note.component.css'],
})
export class CustomerInternalNoteComponent {
  textInput: string = '';
  constructor(
    private customersService: CustomersService,
    public dialogRef: MatDialogRef<CustomerInternalNoteComponent>,
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
