import { Component, ElementRef, ViewChild } from '@angular/core';
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
  image: File | null = null;
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
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
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
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.image = file; // Store the File object
      this.previewImage(file); // Optional: Preview the selected image
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
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

  const productData = new FormData();

  if (this.image) {
    productData.append('image', this.image, this.image.name); // Append the File object to the FormData
  }

  productData.append('name', this.name);
  productData.append('model', this.model);
  productData.append('price', this.price);
  productData.append('quantity', this.quantity);
  productData.append('category', this.category);
  productData.append('points', this.points);
  this.subProducts.forEach((subProduct, index) => {
    productData.append(`subProducts[${index}][id]`, subProduct.id);
    productData.append(`subProducts[${index}][qty]`, subProduct.qty.toString());
  });

  this.productsService.saveProduct(productData).subscribe({
    next: (res: any) => {
      this.image = null;
      this.name = '';
      this.model = '';
      this.price = '';
      this.quantity = '';
      this.category = '';
      this.points = '';
      this.selectedImage = '';
      this.subID = '';
      this.subQuan = 0;
      this.toast.success({detail: "SUCCESS", summary: 'Product Added', duration: 5000, position: 'topCenter'});
      this.isLoading = false;
      this.errors = {};
    },
    error: (err: any) => {
      this.toast.error({detail: "ERROR", summary: 'Failed to add product', duration: 5000, position: 'topCenter'});
      this.errors = err.error.errors;
      this.isLoading = false;
    }
  });
}
}