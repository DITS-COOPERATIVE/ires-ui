import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';
import { ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-customer-internal-note',
  templateUrl: './customer-internal-note.component.html',
  styleUrls: ['./customer-internal-note.component.css'],
})
export class CustomerInternalNoteComponent {
  noteInput: string = '';
  @Output() internalNoteAdded = new EventEmitter<any>();
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
    const updatedCart = this.data.cart.map((item: ProductsResponse) => {
      if (item.id === this.data.selectedProduct.id) {
        return { ...item, internalNote: this.noteInput };
      }
      return item;
    });
    this.internalNoteAdded.emit(this.noteInput);
    this.dialogRef.close(updatedCart);
  }
}
