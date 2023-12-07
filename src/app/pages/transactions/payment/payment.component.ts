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
  discount!:number;
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


  printReceipt() {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
          <title>Receipt</title>
            <style>
            .receipt_header {
              padding-bottom: 10px;
              border-bottom: 1px dashed #000;
              text-align: center;
            }
            
            .receipt_header h1 {
              font-size: 20px;
              margin-bottom: 5px;
              text-transform: uppercase;
            }
            
            .receipt_header h1 span {
              display: block;
              font-size: 25px;
            }
            
            .receipt_header h2 {
              font-size: 14px;
              color: #727070;
              font-weight: 300;
            }
            
            .receipt_header h2 span {
              display: block;
            }
            
            .receipt_body {
              margin-top: 5px;
            }
            
            table {
              width: 100%;
            }

            thead, tfoot {
              position: relative;
            }

            thead th:not(:last-child) {
              text-align: left;
            }
            thead::after {
              content: '';
              width: 100%;
              display: block;
              position: absolute;
            }

            tbody td:not(:last-child), tfoot td:not(:last-child) {
              text-align: left;
            }


            tbody tr:first-child td {
              padding-top: 15px;
            }

            tbody tr:last-child td {
              padding-bottom: 15px;
            }

            tfoot tr:first-child td {
              padding-top: 15px;
            }

            tfoot::before {
              content: '';
              width: 100%;
              border-top: 1px dashed #000;
              display: block;
              position: absolute;
            }

            tfoot tr:first-child td:first-child, tfoot tr:first-child td:last-child {
              font-weight: bold;
              font-size: 20px;
            }

            .date_time_con {
              display: flex;
              justify-content: end;
              column-gap: 25px;
            }

            .items {
              margin-top: 25px;
            }

            h3 {
              border-top: 1px dashed #000;
              padding-top: 10px;
              margin-top: 25px;
              text-align: center;
              text-transform: uppercase;
            }
            </style>
          </head>
          <body>
            <div class="container px-3" style="height: 500px; overflow: auto;">
              <div class="receipt_header">
              <h1><img src="assets/dits.png" alt="" width="10%" class="mt-3"> <span>DITS</span></h1>
                <h2>365 Triumfo St, Carigara, Philippines, 6530
                  <span>Tel: +1 012 345 67 89</span>
                </h2>
              </div>
      
              <div class="receipt_body">
                <div class="date_time_con">
                  <div class="date">11/12/2020</div>
                  <div class="time">11:13:06 AM</div>
                </div>
      
                <div class="items">
                  <table class="text-start">
                    <thead>
                      <tr>
                        <th>QUANTITY</th>
                        <th>ITEM</th>
                        <th>PRICE</th>
                        <th>DISCOUNT</th>
                      </tr>
                    </thead>
                
                    <tbody>
                      ${this.cart.map(cartItem => `
                        <tr>
                          <td>${cartItem.quantity}</td>
                          <td>${cartItem.name}</td>
                          <td>₱${cartItem.price}</td>
                          <td>${cartItem.discount > 0 ? cartItem.discount : ''}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3">Total</td>
                        <td>₱${this.calculateTotal()}</td>
                      </tr>
                
                      <tr>
                        <td colspan="3">Cash</td>
                        <td>₱${this.amountPaid}</td>
                      </tr>
                
                      <tr>
                        <td colspan="3">Change</td>
                        <td>₱${this.calculateChange()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <h3>Thank You!</h3>
              </div>
            </div>
      
            <script type="text/javascript">
              setTimeout(function() {
                const receiptContent = document.querySelector('.container')?.innerHTML;
                if (receiptContent) {
                  document.body.innerHTML = receiptContent;
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                }
              }, 100);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
}
