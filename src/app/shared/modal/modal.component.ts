import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    private customersService: CustomersService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  customers!: CustomersResponse[];
  full_name!: string;

  onCancel(): void {
    this.dialogRef.close();
  }

  onPrint(): void {
    // Add your print logic here
    console.log('Printing...');
  }
}
