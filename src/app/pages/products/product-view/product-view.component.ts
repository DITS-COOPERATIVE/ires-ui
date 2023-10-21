import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  isReadOnly = true;
  isEditable = false;
  isEditing = false;
  successMessage: string | null = null;

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
  edit() {
    this.isReadOnly = false;
    this.isEditable = true;
  }


  
  productId!: any
  product: any = {};

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  constructor (private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.productId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true
    this.productsService.getProduct(this.productId).subscribe((res) => {
      this.product = res
      this.isLoading = false
    })
  }

  updateProduct() {

    var inputData = {
      image: this.product.image,
      name: this.product.name,
      model: this.product.model,
      code: this.product.code,
      price: this.product.price,
      quantity: this.product.quantity,
      points: this.product.points,
    }


    this.isLoading = true

    this.productsService.updateProduct(inputData, this.productId).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this.successMessage = 'Success! Product saved.';
        setTimeout(() => this.successMessage = null, 3000);
        this.isEditing = false;
        this.isReadOnly = true;
        this.isEditable = false;
        this.errors ={};
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false
      }
    });
 

  }
}
