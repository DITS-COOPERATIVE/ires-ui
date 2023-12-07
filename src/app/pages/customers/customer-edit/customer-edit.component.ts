import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent {
  isReadOnly = true;
  isEditable = false;
  isEditing = false;
  successMessage: string | null = null;

  customerId!: any;
  customer: any = {};
  privilege: string = '';
  gender: string = '';
  uploadedImage: any;

  errors: any = [];
  isLoading: boolean = false;
  loadingTitle: string = 'Loading';

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.customersService.getCustomer(this.customerId).subscribe((res) => {
      this.customer = res;
      this.isLoading = false;
    });
  }
  
  cancel() {
    this.isReadOnly = true;
    this.isEditable = false;
  }
  handleImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
    }
  }
  
  toggleEditButton() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.isReadOnly = false;
      this.isEditable = true;
    } else {
      this.isReadOnly = true;
      this.isEditable = false;
    }
  }

  updateCustomer() {
    var inputData = {
      full_name: this.customer.full_name,
      gender: this.customer.gender,
      email: this.customer.email,
      mobile_no: this.customer.mobile_no,
      points: this.customer.points,
      address: this.customer.address,
      privilege: this.customer.privilege,
      
    };

    this.isLoading = true;

    this.customersService.updateCustomer(inputData, this.customerId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = 'Success! Customer saved.';
        setTimeout(() => (this.successMessage = null), 3000);
        this.isEditing = false;
        this.isReadOnly = true;
        this.isEditable = false;
        
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
  }
  generateBarcode() {
    this.isLoading = true;

    this.customersService.getCustomer(this.customerId).subscribe({
      next: (res: any) => {
        this.openDialog(res);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
   
  }
  

  openDialog(customer: CustomersResponse): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        full_name: customer.full_name,
        barcode: customer.barcode,
        createdDate: customer.created_at,
      },
    });
  }
  

  onImageClick() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.customer.image = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

}
