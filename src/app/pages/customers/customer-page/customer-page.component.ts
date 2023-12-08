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
  isCardView: boolean = true;
  customers: CustomersResponse[] = [];

  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}
  selectedCategory: string = '';
  activeCardIndex: number | null = null;

  errors: any = {};
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
      address: this.address,
      privilege: this.privilege,
      points: this.points,
      image: this.image,
    };

    this.customersService.saveCustomer(inputData).subscribe({
      next: (res:any) => {
        this.full_name ='' ;
        this.gender = '';
        this.email = '';
        this.address = '';
        this.privilege = '';
        this.points = 0;
        this.image = '';

        const newCustomer: CustomersResponse = res;
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
        this.customers = res.sort((a, b) => a.full_name.localeCompare(b.full_name));
        this.sortCustomers(this.selectedCategory);
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  searchCustomer(){
    var input = (<HTMLInputElement>document.getElementById("search_id")).value;
    console.log(input);
    try {
      this.isLoading = true;
      if (input) {
        this.customersService.getCustomersLists().subscribe((res) =>{
          this.customers = res;
          this.customers = this.customers.filter(item => item.barcode === input)
          console.log(this.customers  );
          if (this.customers.length == 0) {
            alert ("Not found.");
            this.ngOnInit();
            (<HTMLInputElement>document.getElementById("search_id")).value = "";
          }
          this.isLoading = false;
        });
      } else {
        this.ngOnInit();
      }
    } catch (error) {
      this.errors = error
    };
  }

  sortCustomers(selectedCategory: string) {
    switch (selectedCategory) {
      case 'date':
        this.customers.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        });
        break;
      case 'points':
        this.customers.sort((a, b) => b.points - a.points); 
        break;
      case 'gender':
        this.customers.sort((a, b) => a.gender.localeCompare(b.gender)); 
        break;
      default:
        break;
    }
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
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
