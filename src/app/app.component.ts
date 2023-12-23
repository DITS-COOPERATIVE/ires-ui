import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SearchService } from './shared/search.service';
import { CustomersResponse } from './services/customers/customers.service';
import { ProductsResponse } from './services/products/products.service';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService,  private router: Router, private searchService: SearchService) {}
  title = 'sidenav';

  isSideNavCollapsed = false
  screenWidth = 0;
  isUserLoggedIn: boolean = false;
  customers!: CustomersResponse[];
  products!: ProductsResponse[];

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data. screenWidth;
    this.isSideNavCollapsed = data. collapsed;

  }
  searchCustomer(input: string, sort: string): void {
    this.searchService.searchCustomers(input, sort).subscribe((result) => {
      this.customers = result;
    });
  }
  searchProduct(input: string, sort: string): void {
    this.searchService.searchProducts(input, sort).subscribe((result) => {
      this.products = result;
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
