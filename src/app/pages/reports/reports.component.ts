import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  CustomersResponse,
  CustomersService,
} from '../../services/customers/customers.service';
import {
  ProductsResponse,
  ProductsService,
} from '../../services/products/products.service';
import {
  OrdersResponse,
  OrdersService,
} from '../../services/orders/orders.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReportService } from 'src/app/services/reports/report.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  selected: any = {
    startDate: moment().subtract(6, 'days'),
    endDate: moment(),
  };
  selectedDateSection!: string;
  selectedDate!: string;
  alwaysShowCalendars: boolean;
  ranges: any = {
    Today: [moment(this.selected.startDate), moment(this.selected.startDate)],
    Yesterday: [
      moment(this.selected.startDate).subtract(1, 'days'),
      moment(this.selected.endtDate).subtract(1, 'days'),
    ],
    'Last 7 Days': [
      moment(this.selected.startDate).subtract(6, 'days'),
      moment(this.selected.endDate),
    ],
    'Last 30 Days': [
      moment(this.selected.startDate).subtract(29, 'days'),
      moment(this.selected.endDate),
    ],
    'This Month': [
      moment(this.selected.startDate).startOf('month'),
      moment(this.selected.endDate).endOf('month'),
    ],
    'Last Month': [
      moment(this.selected.startDate).subtract(1, 'month').startOf('month'),
      moment(this.selected.endDate).subtract(1, 'month').endOf('month'),
    ],
  };
  invalidDates: moment.Moment[] = [
    moment().add(2, 'days'),
    moment().add(3, 'days'),
    moment().add(5, 'days'),
  ];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  orders: OrdersResponse[] = [];
  filterOrders: OrdersResponse[] = [];
  errors: any = {};
  reportData: any[] = [];
  isLoading: boolean = false;
  showServiceModal: boolean = false;
  showSalesModal: boolean = false;
  showSecondForm: boolean = false;
  buttonLabel: string = 'Inventory Report';
  from!: string;
  to!: string;

  reportName!: string;
  selectedType!: string;
  $last: any;

  constructor(
    private customersService: CustomersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private reportService: ReportService,
    private http: HttpClient
  ) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {
    this.selected = {
      startDate: moment().subtract(6, 'days'),
      endDate: moment(),
    };

    this.getCustomersLists();
    this.getProductsLists();
    this.getOrdersList();
  }

  // toggleForm() {
  //   this.showSecondForm = !this.showSecondForm;
  //   this.buttonLabel = this.showSecondForm ? 'Sales Report' : 'Inventory Report';
  // }

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
    this.ordersService
      .getOrdersLists()
      .subscribe((orders: OrdersResponse[]) => {
        this.orders = orders;
      });
  }

  generateReports() {
    const payload = {
      name: this.reportName,
      from: moment(this.selected.startDate).format('YYYY-MM-DD'),
      to: moment(this.selected.endDate).format('YYYY-MM-DD'),
      type: this.selectedType,
    };
    if (this.selectedType === 'Product') {
      this.showSalesModal = true;
      this.showServiceModal = false;
    } else if (this.selectedType === 'Service') {
      this.showServiceModal = true;
      this.showSalesModal = false;
    }
    this.reportService.saveReport(payload).subscribe({
      next: (res: any) => {
        this.reportName = '';
        this.from = '';
        this.to = '';
        this.selectedType = '';

        this.reportService.getReport(res.id).subscribe({
          next: (reportData: any) => {
           

            console.log('Report Data:', reportData);
            this.reportData = reportData;
          },
          error: (error: any) => {},
        });
      },
      error: (error: any) => {},
    });
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find((cust) => cust.id === customerId);
    return customer ? customer.full_name : '';
  }
  getProductName(productId: number): string {
    const product = this.products.find((prod) => prod.id === productId);
    return product ? product.name : '';
  }

  // onDateChange() {
  //   if (this.report_id && this.when) {
  //     const apiUrl = `${this.domain}reports/${this.service_id}/data`;
  //     const payload = { when: this.when };
  //     const headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     };

  //     this.http.get(apiUrl, payload, { headers }).subscribe(
  //       (response: any) => {

  //         this.isDateAvailable = response === 1 || (response && response.preview === 1);
  //       },
  //       (error) => {

  //       }
  //     );
  //   }
  // }

  // generateReport() {
  //   const startDate = moment(this.selected.startDate).format('YYYY-MM-DD');
  //   const endDate = moment(this.selected.endDate).format('YYYY-MM-DD');

  //   const filteredOrders = this.orders.filter(order => {
  //     const orderDate = moment(order.created_at).format('YYYY-MM-DD');
  //     return moment(orderDate).isBetween(startDate, endDate, undefined, '[]' );
  //   });

  //   const reportData = filteredOrders.map((order, index) => {
  //     const customer = this.customers.find(cust => cust.id === order.customer_id);
  //     const product = this.products.find(prod => prod.id === order.id);

  //     return {
  //       id: index + 1,
  //       customer: customer?.full_name,
  //       product: product?.name,
  //       quantity: order.quantity,
  //       total: order.total

  //     };

  //   });

  //   this.reportData = reportData;
  //   return reportData;
  // }

  // printInventoryReport() {
  //   const doc = new jsPDF();

  //   const headers = ['ID', 'Item Code', 'Name', 'Low Stock Alert', 'Over Stock Alert', 'Stock', 'Status'];

  //     this.generateReports().subscribe((item:any[])=> {
  //     const data = item.map(item => [
  //       item.id.toString(),
  //       item.customer || '-',
  //       item.product,
  //       item.quantity.toString(),
  //       item.total.toString()
  //     ]);
  //     (doc as any).autoTable({
  //       head: [headers],
  //       body: data,
  //       styles: { cellPadding: 1, fontSize: 8 },
  //       margin: { top: 15 },
  //     });

  //     doc.save('report.pdf');
  //   });
  // }

  // printSalesReport() {
  //   const doc = new jsPDF();

  //   const headers = ['ID', 'Customer', 'Product', 'Quantity', 'Sale','Availabe Stocks'];

  //   const data = this.generateReport().map(item => [
  //     item.id.toString(),
  //     item.customer || '-',
  //     item.product,
  //     item.quantity.toString(),
  //     item.total.toString()
  //   ]);

  //  ( doc as any).autoTable({
  //     head: [headers],
  //     body: data,
  //     styles: { cellPadding: 1, fontSize: 8 },
  //     margin: { top: 15 },
  //   });

  //   doc.save('report.pdf');
  // }

  generateSalesReports() {
    this.showSalesModal = true;
  }
  // generateInventoryReports() {

  //   this.reportData = [
  //   ];

  //   this.showStockModal = true;
  // }

  closeModal() {
    this.showServiceModal = false;
    this.showSalesModal = false;
  }
}
