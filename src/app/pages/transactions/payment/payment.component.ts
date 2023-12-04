import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersResponse } from 'src/app/services/customers/customers.service';
import { ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  @Output() paymentMade: EventEmitter<any> = new EventEmitter<any>();
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
  amountPaid: number | null = null;
  name!: string;
  code!: string;
  model!: string;
  price!: string;
  quantity!: string;
  payment: boolean = false;
  receiptContent: string = '';

  newOrder(): void {
    this.paymentSuccess = true;
    this.paymentMade.emit({ success: true });
    this.dialogRef.close();
  }

  onBack(): void {
    this.dialogRef.close();
  }
  calculateSubtotal(cartItem: any): number {
    const subtotal = cartItem.price * cartItem.quantity;
    return subtotal;
  }
  calculateTotal(): number {
    let total = 0;
    for (const cartItem of this.cart) {
      total += this.calculateSubtotal(cartItem);
    }
    return total;
  }

  onPay(): void {
    this.paymentSuccess = true;
    this.payment = true;
    const amountRendered = this.amountPaid;
    const change = this.calculateChange();

  
    this.paymentMade.emit({ success: true, amountRendered, change });
  }
  calculateChange(): number {
    const change = this.amountPaid !== null ? this.amountPaid - this.totalAmount : 0;
    return change < 0 ? 0 : change;
  }

  onPaymentSuccess(): void {
    this.paymentSuccess = true;
  }

  onPrintReceipt(): void {
    window.print();
  }
}
