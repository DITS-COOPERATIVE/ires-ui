import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  constructor(private productsService: ProductsService) {}

  name!: string
  code!: string
  model!: string
  price!: string
  quantity!: string
  points!: string

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  saveProduct(){
    this.loadingTitle = "Saving";
    this.isLoading = true;

    var inputData = {
      name: this.name,
      code: this.code,
      model: this.model,
      price: this.price,
      quantity: this.quantity,
      points: this.points,
    }

    this.productsService.saveProduct(inputData).subscribe({

      next: (res: any) => {
        console.log(res, 'response')
        alert(res.result);
        this.name = '';
        this.code = '';
        this.model = '';
        this.price = '';
        this.quantity = '';
        this.points = '';

        this.isLoading = false  
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false  
        console.log(this.errors, 'error')
      }
    })
  }
}
