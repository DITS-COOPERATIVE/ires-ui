import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  productId!: any
  product!: any

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  constructor (private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.productId = this.route.snapshot.paramMap.get('id');
    // alert(this.productId)
    this.isLoading = true
    this.productsService.getProduct(this.productId).subscribe((res) => {
      console.log(res)
      this.product = res.result[0]
      this.isLoading = false
    })
  }

  updateProduct() {

    var inputData = {
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
        console.log(res);
        alert(res.message)
        this.isLoading = false
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false
      }
    });
  }
}
