import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersResponse, CustomersService } from '../../services/customers/customers.service';
import { DatePipe } from '@angular/common';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('barcode') barcode!: ElementRef<any>;
  constructor(
    private customersService: CustomersService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
  ) {this.value = this.data.barcode;}
  customers!: CustomersResponse[];
  full_name!: string;
  value: any; 

  onCancel(): void {
    this.dialogRef.close();
  }

  generateBarcodeImage(barcodeValue: string): string {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, { format: 'CODE128' }); // Use the desired format
  
    const base64Image = canvas.toDataURL('image/png');
    return base64Image;
  }

  onPrint(): void {
    const formattedDate = this.datePipe.transform(this.data.createdDate, 'medium');
    const barcodeImage = this.generateBarcodeImage(this.data.barcode);
  
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Registration Details</title>
            <style>
              /* Add any custom styles for the printout here */
            </style>
          </head>
          <body>
            <h2 class="modal-title">Registration Details</h2>
            <div>
              <p>Name: ${this.data.full_name}</p>
              <img src="${barcodeImage}" alt="Barcode Image" />
              <p>Date Created: ${formattedDate}</p>
            </div>
  
            <script type="text/javascript">
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 100);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
  
}
