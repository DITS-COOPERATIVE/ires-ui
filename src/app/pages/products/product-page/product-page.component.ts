import { Component } from '@angular/core';
import { ProductsService , ProductsResponse } from 'src/app/services/products/products.service';
import { SearchService } from 'src/app/shared/search.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  constructor(private productsService: ProductsService,
    private searchService: SearchService,
    private toast: NgToastService) { this.filteredProducts = this.products;}

  
  errors: any = [];
  products: ProductsResponse [] =[];
  product!: ProductsResponse;
  isLoading: boolean = false;
  isCardView: boolean = true;
  filteredProducts: any[] = [];
  selectedCategory: string = '';
  selectedFilterCategory:string = 'all';
  activeCardIndex: number | null = null;

  ngOnInit() {
    this.searchService.searchQuery$.subscribe((query) => {
      this.searchsCustomer(query);
    });
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

  searchsCustomer(query: string) {
    try {
      this.isLoading = true;

      if (query) {
        this.productsService.getProductsLists().subscribe((res) => {
          this.products = res;

          
          this.products  = this.products .filter((item) => {
            return (
              item.id.toString() === query ||
              item.name.toString().toLowerCase().includes(query.toLowerCase()) ||
              item.barcode.toString() === query
            );
          });

          console.log(this.products );

          if (this.products .length === 0) {
       
              this.toast.info({detail:"WARNING",summary:'Search not found',duration:3000, position:'topCenter'});
            
          }

          this.isLoading = false;
        });
      } else {
        this.getProductsLists();
      }
    } catch (error) {
      this.errors = error;
    }
  }

  searchProduct(){
    var input = (<HTMLInputElement>document.getElementById("search_id")).value;
    var sort = (<HTMLInputElement>document.getElementById("sortBy")).value;
    console.log(input);
    try {
      this.isLoading = true;
      if (input) {
        this.productsService.getProductsLists().subscribe((res) =>{
          switch (sort) {

            case "1":
              this.filteredProducts = this.products.filter(item => item.id === parseInt(input))
              break;
            
            case "2":
              this.filteredProducts = this.products.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
              break;
          
            case "3":
              this.filteredProducts = this.products.filter(item => item.barcode === parseInt(input))
              break;

            default:
              break;
          }
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
}
