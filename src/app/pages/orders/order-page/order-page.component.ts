import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { OrdersResponse, OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  constructor(private ordersService: OrdersService, private customersService: CustomersService,
    private productsService: ProductsService,) { }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource!: MatTableDataSource<OrdersResponse>;
    displayedColumns: string[] = ['id', 'customer', 'products', 'dateOrdered', 'status'];

  errors: any = [];
  orders: OrdersResponse []=[];
  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  mappedOrders: any[] = [];

  isLoading: boolean = false;

  ngOnInit() {

    this.getOrdersLists(); 
    this.getCustomersLists();
    this.getProductsLists();
  }

  initializePaginator() {
    this.paginator.pageSize = 10; 
    this.paginator.pageIndex = 0; 
    this.paginator.length = this.orders.length; 
  }

  filterByDate(date: Date) {
    this.dataSource.filter = date.toString().trim().toLowerCase();
  }
  getOrdersLists(){
    try {

      this.isLoading = true;
      this.ordersService.getOrdersLists().subscribe((res: any) =>{
        this.orders = res
        this.isLoading = false 
        this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      });

    } catch (error) {
      this.errors = error
    }
    
  }

  getCustomersLists() {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  getProductsLists() {
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) => {
        this.products = res;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(cust => cust.id === customerId);
    return customer ? customer.full_name : '';
  }

  getProductName(productId: number): string {
    const product = this.products.find(prod => prod.id === productId);
    return product ? product.name : '';
  }

  
  
}
