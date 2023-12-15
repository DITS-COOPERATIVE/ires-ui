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
import { ServiceResponse, ServiceService } from 'src/app/services/services/service.service';

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
  services: ServiceResponse[] = [];
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
    private serviceService: ServiceService,
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
    this.getServiceLists();
  }

  getServiceLists(){
  
    try {
      this.serviceService.getServiceList().subscribe((res) =>{
        this.services = res;
      })
    } catch (error) {
      this.errors = error
    };
    
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

  getServiceType(serviceId: number): string {
    const service = this.services.find((service) => service.id === serviceId);
    return service ? service.type : '';
  }
  getServicePrice(serviceId: number): string {
    const service = this.services.find((service) => service.id === serviceId);
    return service ? service.price : '';
  }
  printReport() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const reportTable = document.getElementById('reportTable');
      if (reportTable) {
        printWindow.document.write(`
          <html>
            <head>
              <title>DTIS Report</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <table>
                ${reportTable.innerHTML}
              </table>
            </body>
          </html>
        `);
        printWindow.print();
      } else {
        console.error('Report table element not found');
      }
    } else {
      console.error('Failed to open print window');
    }
  }
 
  printServiceReport() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const reportServiceModal = document.getElementById('reportServiceModal');
      if (reportServiceModal) {
        const modalContent = reportServiceModal.innerHTML;
        printWindow.document.write(`
          <html>
            <head>
              <title>DTIS Report</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              ${modalContent}
            </body>
          </html>
        `);
        printWindow.print();
      } else {
        console.error('ReportServiceModal element not found');
      }
    } else {
      console.error('Failed to open print window');
    }
  }
  


  generateSalesReports() {
    this.showSalesModal = true;
  }

  closeModal() {
    this.showServiceModal = false;
    this.showSalesModal = false;
  }
}
