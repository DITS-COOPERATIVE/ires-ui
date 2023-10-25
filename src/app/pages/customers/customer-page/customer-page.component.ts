import { Component } from '@angular/core';
import {
  CustomersResponse,
  CustomersService,
} from '../../../services/customers/customers.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent {
  products: any[] = [];
  isGridView: boolean = true;
  isCardView: boolean = true;
  customers: CustomersResponse[] = [];

  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}
  selectedCategory: string = 'all';
  activeCardIndex: number | null = null;

  errors: any = [];
  isLoading: boolean = false;
  uploadedImage: any;

  full_name!: string;
  gender!: string;
  email!: string;
  mobile_no!: string;
  birth_date!: string;
  address!: string;
  privilege!: string;
  points: number = 0;
  image!: string;
  loadingTitle: string = 'Loading';

  ngOnInit() {
    this.getCustomersLists();
  }
  toggleView(): void {
    this.isCardView = true;
  }
  cardView(): void {
    this.isCardView = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        name: 'John Doe',
        barcode: '1234567890',
        dateCreated: new Date(),
      },
    });
  }

  saveCustomer() {
    this.loadingTitle = 'Saving';
    this.isLoading = true;
    this.image = this.image || 'default_image.jpg';

    var inputData = {
      full_name: this.full_name,
      gender: this.gender,
      email: this.email,
      mobile_no: this.mobile_no,
      birth_date: this.birth_date,
      address: this.address,
      privilege: this.privilege,
      points: this.points,
      image: this.image,
    };

    this.customersService.saveCustomer(inputData).subscribe({
      next: (res: any) => {
        this.full_name = '';
        this.gender = '';
        this.email = '';
        this.birth_date = '';
        this.address = '';
        this.privilege = '';
        this.points = 0;
        this.image = '';

        const newCustomer: CustomersResponse = res.customer;
        this.customers.push(newCustomer);
        this.isLoading = false;
        this.openDialog();
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the uploaded image data to the uploadedImage variable
      this.uploadedImage = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  activateCard(index: number): void {
    this.activeCardIndex = index;
  }

  getErrorPosition(index: number): number {
    const spacing = 10;
    return index * spacing;
  }

  deleteCustomer(event: any, customerId: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      event.target.innerText = 'Deleting...';

      this.customersService
        .destroyCustomer(customerId)
        .subscribe((res: any) => {
          this.getCustomersLists();

          alert(res.message);
        });
    }
  }
}
