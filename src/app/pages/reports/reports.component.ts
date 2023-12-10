import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CustomersResponse, CustomersService } from '../../services/customers/customers.service';
import { ProductsResponse, ProductsService } from '../../services/products/products.service';
import { OrdersResponse, OrdersService } from '../../services/orders/orders.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReportService } from 'src/app/services/services/reports/report.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selected: any;
  selectedDateSection!: string;
  selectedDate!: string;
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
  reportData: any[] = [];
  isLoading: boolean = false;
  showStockModal: boolean = false;
  showSalesModal: boolean = false;
  showSecondForm: boolean = false;
  buttonLabel: string = 'Inventory Report';
  from!: string;
  to!:string;
 
  reportName!: string;
  selectedType!: string;


  constructor(
    private customersService: CustomersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private reportService: ReportService
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

  toggleForm() {
    this.showSecondForm = !this.showSecondForm;
    this.buttonLabel = this.showSecondForm ? 'Sales Report' : 'Inventory Report';
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
    });
   
  }

  generateReports() {
    const payload = {
      name: this.reportName,
      from: moment(this.selected.startDate).format('YYYY-MM-DD'),
      to: moment(this.selected.endDate).format('YYYY-MM-DD'),
      type: this.selectedType
    };
    this.reportService.saveReport(payload).subscribe({
      next: (res: any) => {
        this.reportName ='';
        this.from = '';
        this.to = '';
        this. selectedType ='';
      },
    }
    )};
    
  
  

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

    this.reportData = [
    ];

    this.showSalesModal = true;
  }
  // generateInventoryReports() {

  //   this.reportData = [
  //   ];

  //   this.showStockModal = true;
  // }


  closeModal() {
    this.showStockModal = false;
    this.showSalesModal = false;
  }
}