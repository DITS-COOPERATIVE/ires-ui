import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CustomersResponse, CustomersService } from '../../services/customers/customers.service';
import { ProductsResponse, ProductsService } from '../../services/products/products.service';
import { OrdersResponse, OrdersService } from '../../services/orders/orders.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selected: any;
  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'));
  };

  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  orders: OrdersResponse[] = [];
  filterOrders: OrdersResponse[]=[];
  errors: any = {};
  isLoading: boolean = false;

  constructor(
    private customersService: CustomersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {
    this.selected = {
      startDate: moment().subtract(6, 'days'),
      endDate: moment()
    };
  
    this.getCustomersLists();
    this.getProductsLists();
    this.getOrdersList();
    
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

  getOrdersList() {
    this.ordersService.getOrdersLists().subscribe((orders: OrdersResponse[]) => {
      this.orders = orders;
      console.log('ini',orders);
    });
   
  }

  generateReport() {
    const startDate = moment(this.selected.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.selected.endDate).format('YYYY-MM-DD');

    const filteredOrders = this.orders.filter(order => {
      const orderDate = moment(order.created_at).format('YYYY-MM-DD');
      return moment(orderDate).isBetween(startDate, endDate, undefined, '[]');
    });

   
    const reportData = filteredOrders.map((order, index) => {
      const customer = this.customers.find(cust => cust.id === order.customer_id);
      const product = this.products.find(prod => prod.id === order.id);
      console.log('order:', order);
      console.log('customer:', customer);
      console.log('product:', product);
      console.log('qty:', order.qty);


      return {
        id: index + 1,
        customer: customer?.full_name,
        product: product?.name,
        quantity: order.qty,
        total: order.total
        
      };
     
    });
    console.log('here',reportData); 

    return reportData;
  }
}