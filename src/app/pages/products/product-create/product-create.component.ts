import { Component } from '@angular/core';
import { ProductsResponse, ProductsService } from '../../../services/products/products.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {

  constructor(private productsService: ProductsService, private toast: NgToastService ) {this.rows = [];}
  successMessage: string | null = null;
  selectedImage: string = '';
  products!: ProductsResponse [];
  product_id : any
  productForm: any;
  rows: any[] = [];
  showEditable: boolean = false;
  editRowId: any;
  image!: string
  name!: string
  model!: string
  price!: string
  category!: string
  quantity!: string
  points!: string
  subID!: string;
  subQuan!: number;
  showHeaders: boolean = false;
  errors: any = [];
  i!: number;
  subProducts: { id: string; qty: number }[] = [];
  newSubProduct: { id: string; qty: number } = { id: '', qty: 0 };
  isLoading: boolean = false;
  loadingTitle: string = 'Loading';

  ngOnInit() {
    this.getProductsLists();

  }
  
  getProductsLists(){
    
    try {

      this.productsService.getProductsLists().subscribe((res) =>{
        this.products = res;
          
      })
    } catch (error) {
      this.errors = error
    };
    
  }

  removeRow(index: number) {
    this.rows.splice(index, 1);
  }
  toggle(val: any) {
    this.editRowId = val;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  addRow() {
    this.showHeaders = true;
    this.rows.push({ subID: '', subQuan: null });
    if (this.rows.length >= 3) {
      
    }

  }
  
  submitForm() {
    this.subProducts = this.rows.map(row => ({ id: row.subID, qty: row.subQuan }));
    this.saveProduct();

}

  saveProduct() {
    this.loadingTitle = 'Saving';
    this.isLoading = true;

    const inputData = {
      image: this.image,
      name: this.name,
      model: this.model,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      points: this.points,
      subProducts:this.subProducts
     
    };
  
    this.productsService.saveProduct(inputData).subscribe({
      next: (res: any) => {
        this.image = '';
        this.name = '';
        this.model = '';
        this.price = '';
        this.quantity = '';
        this.category = '';
        this.points = '';
        this.selectedImage = '';
        this.subID = '';
        this.subQuan = 0;
        this.toast.success({detail:"SUCCESS",summary:'Product Added',duration:5000, position:'topCenter'});
        this.isLoading = false;
        this.errors = {};
      },
      error: (err: any) => {
        this.toast.error({detail:"ERROR",summary:'Failed to add product',duration:5000, position:'topCenter'});
        this.errors = err.error.errors;
        this.isLoading = false;
      }
    });
  }
}

