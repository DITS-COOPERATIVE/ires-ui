import { Component } from '@angular/core';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-kit',
  templateUrl: './product-kit.component.html',
  styleUrls: ['./product-kit.component.css']
})
export class ProductKitComponent {
  constructor(private productsService: ProductsService){}
  products!: ProductsResponse [];
  errors: any = [];
  removedProducts: any[] = [];
  showPreview: boolean = false;
  ngOnInit() {
    this.getProductsLists();
  }
  getProductsLists(){
    try {
      this.productsService.getProductsLists().subscribe((res) =>{
        this.products = res;
        console.log(res);
      })
    } catch (error) {
      console.log(error);
      this.errors = error
    };
  }
  removeProduct(productId: number) {
    const removedProduct = this.products.find(product => product.id === productId);
    if (removedProduct) {
      this.removedProducts.push(removedProduct);
      const index = this.products.indexOf(removedProduct);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    }
  }

  saveRemovedProducts() {
    console.log('Removed Products:', this.removedProducts);
  }
}

