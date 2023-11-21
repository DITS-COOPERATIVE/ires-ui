import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersResponse } from 'src/app/services/customers/customers.service';
import { ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.totalAmount) {
      this.totalAmount = data.totalAmount;
    }
    if (data && data.cart) {
      this.cart = data.cart;
    }
  }
  textInput: string = '';
  totalAmount: number = 0;
  receiptVisible: boolean = false;
  paymentSuccess: boolean = false;
  customers!: CustomersResponse[];
  cart: ProductsResponse[] = [];
  full_name!: string;
  amountPaid: number = 0;
  name!: string;
  code!: string;
  model!: string;
  price!: string;
  quantity!: string;
  paymentMade: boolean = false;
  receiptContent: string = '';

  onCancel(): void {
    this.paymentSuccess = true;

    this.dialogRef.close();
  }
  calculateSubtotal(cartItem: any): number {
    // Calculate the subtotal for a cart item
    const subtotal = cartItem.price * cartItem.quantity;
    return subtotal;
  }
  calculateTotal(): number {
    // Calculate the total by summing up all the subtotals
    let total = 0;
    for (const cartItem of this.cart) {
      total += this.calculateSubtotal(cartItem);
    }
    return total;
  }
  onAdd(): void {
    this.paymentSuccess = true;
    this.paymentMade = true;
    console.log('Printing...');
  }

  calculateChange(): number {
    const change = this.amountPaid - this.totalAmount;
    return change < 0 ? 0 : change;
  }

  onPaymentSuccess(): void {
    this.paymentSuccess = true;
  }



  onPrintReceipt(): void {
    window.print();
    
}
}
