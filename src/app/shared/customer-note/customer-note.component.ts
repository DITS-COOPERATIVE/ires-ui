import { Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';
import { ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.css'],
})
export class CustomerNoteComponent {
  textInput: string = '';
  @Output() noteAdded = new EventEmitter<any>();

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
    const updatedCart = this.data.cart.map((item: ProductsResponse) => {
      if (item.id === this.data.selectedProduct.id) {
        return { ...item, note: this.textInput };
      }
      return item;
    });
    this.noteAdded.emit(updatedCart);
    this.dialogRef.close(updatedCart);
  }
}
