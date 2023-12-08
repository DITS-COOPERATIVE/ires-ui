import { Component } from '@angular/core';
import { ProductsService , ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  constructor(private productsService: ProductsService) { this.filteredProducts = this.products;}

  
  errors: any = [];
  products!: ProductsResponse [];
  product!: ProductsResponse;
  isLoading: boolean = false;
  isCardView: boolean = true;
  filteredProducts: any[] = [];
  selectedCategory: string = '';
  selectedFilterCategory:string = 'all';
  activeCardIndex: number | null = null;

  ngOnInit() {
    this.getProductsLists();
  }

  toggleView(): void {
    this.isCardView = true;
  }
  cardView(): void {
    this.isCardView = false;
  }

  activateCard(index: number): void {
    this.activeCardIndex = index;
  }

  getProductsLists(){
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) =>{
        this.products = res;
        this.filteredProducts = this.products
        this.sortProducts(this.selectedCategory);
        this.products = res.sort((a, b) => a.name.localeCompare(b.name));
        this.isLoading = false
  
      })
    } catch (error) {
      this.errors = error
    };
  }

  searchProduct(){
    var input = (<HTMLInputElement>document.getElementById("search_id")).value;
    console.log(input);
    try {
      this.isLoading = true;
      if (input) {
        this.productsService.getProductsLists().subscribe((res) =>{
          this.products = res;
          this.filteredProducts = this.products.filter(item => item.barcode === input )
          this.filteredProducts = this.products.filter(item => item.id === parseInt(input) )
          this.filteredProducts = this.products.filter(item => item.name === input )
          console.log(this.products);
          if (this.products.length == 0) {
            alert ("Not found.");
            this.ngOnInit();
            (<HTMLInputElement>document.getElementById("search_id")).value = "";
          }
          this.isLoading = false;
        })
      } else {
        this.ngOnInit();
      }
    } catch (error) {
      this.errors = error
    };
  }

  sortProducts(selectedCategory: string) {
    switch (selectedCategory) {
      case 'date':
        this.products.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        });
        break;
      case 'points':
        this.products.sort((a, b) => b.points - a.points); 
        break;
      case 'price':
        this.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        break;
    }
  }
  filterProducts() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(item => item.category === this.selectedFilterCategory);
    }
  }
}
