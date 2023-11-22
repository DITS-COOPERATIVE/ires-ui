import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers/customers.service';

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
    private customersService: CustomersService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.customersService.getCustomer(this.customerId).subscribe((res) => {
      this.customer = res;
      this.isLoading = false;
    });
  }

  edit() {
    this.isReadOnly = false;
    this.isEditable = true;
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

  openImageInput() {
    const inputElement: HTMLInputElement = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    inputElement.click();
  }
}
