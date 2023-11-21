import { Component } from '@angular/core';
import {
  CustomersResponse,
  CustomersService,
} from '../../../services/customers/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-customer-create',
  templateUrl: './transaction-customer-create.component.html',
  styleUrls: ['./transaction-customer-create.component.css'],
})
export class TransactionCustomerCreateComponent {
  products: any[] = [];
  isGridView: boolean = true;
  isCardView: boolean = true;
  customers: CustomersResponse[] = [];

  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog , private router: Router
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
  address!: string;
  privilege!: string;
  points: number = 0;
  image!: string;
  loadingTitle: string = 'Loading';

  ngOnInit() {}
  toggleView(): void {
    this.isCardView = true;
  }
  cardView(): void {
    this.isCardView = false;
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
        this.address = '';
        this.privilege = '';
        this.points = 0;
        this.image = '';

        const newCustomer: CustomersResponse = res.customer;
        this.customers.push(newCustomer);
        this.isLoading = false;
        this.router.navigate(['/transaction-customer/']);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
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
}
