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
  textInput: string = '';
  totalAmount: number = 0;
  receiptVisible: boolean = false;

  paymentSuccess: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.totalAmount) {
      this.totalAmount = data.totalAmount;
    }
  }
  customers!: CustomersResponse[];
  cart: ProductsResponse[] = [];
  full_name!: string;
  amountPaid: number = 0;
  name!: string;
  code!: string;
  model!: string;
  price!: string;
  quantity!: string;

  onCancel(): void {
    this.paymentSuccess = true;
    this.dialogRef.close();
  }

  onAdd(): void {
    this.paymentSuccess = true;
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
    this.printReceipt();
  }

  private printReceipt(): void {}
}
