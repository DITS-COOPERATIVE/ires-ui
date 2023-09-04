import { Component } from '@angular/core';
import { ProductsService , ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  constructor(private productsService: ProductsService) { }

  
  errors: any = [];
  products!: ProductsResponse [];
  isLoading: boolean = false;

  ngOnInit() {

    this.getProductsLists();

  }

  getProductsLists(){
    
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) =>{
  
        console.log(res.result);
        this.products = res.result
  
        this.isLoading = false
  
      })
    } catch (error) {
      this.errors = error
    };
    
  }

  deleteProduct(event: any, productId: number) {

    if (confirm('Are you sure you want to delete this product?')) 
    {
      event.target.innerText = "Deleting..."  

      this.productsService.destroyProduct(productId).subscribe((res: any) => {

        this.getProductsLists();

        alert(res.message);
      })
    }

  }

}
