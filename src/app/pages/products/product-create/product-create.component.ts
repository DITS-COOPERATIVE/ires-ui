import { Component } from '@angular/core';
import { ProductsResponse, ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  successMessage: string | null = null;
  selectedImage: string = '';
  products!: ProductsResponse [];
  product_id : any
  productForm: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  constructor(private productsService: ProductsService) {}
  image!: string
  name!: string
  model!: string
  price!: string
  category!: string
  quantity!: string
  points!: string
  errors: any = [];
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
  saveProduct() {
    this.loadingTitle = 'Saving';
    this.isLoading = true;

    var inputData = {
      image:this.image,
      name: this.name,
      model: this.model,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      points: this.points,
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
        this.successMessage = 'Success! Product saved.';
        setTimeout(() => this.successMessage = null, 1500);
        this.isLoading = false  
        this.errors = {};
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false  
      }
    })
  }
}
