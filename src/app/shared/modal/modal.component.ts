import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersResponse, CustomersService } from '../../services/customers/customers.service';

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
  ) {this.value = this.data.barcode;}
  customers!: CustomersResponse[];
  full_name!: string;
  value: any; 

  onCancel(): void {
    this.dialogRef.close();
  }

  onPrint(): void {
    // Add your print logic here
    console.log('Printing...');
  }
}
