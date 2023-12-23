import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {
  CustomersResponse,
  CustomersService,
} from 'src/app/services/customers/customers.service';
import {
  OrdersResponse,
  OrdersResponseType,
  OrdersService,
} from 'src/app/services/orders/orders.service';
import {
  ProductsResponse,
  ProductsService,
} from 'src/app/services/products/products.service';
import {
  ReservationResponse,
  ReservationService,
} from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  reservations: ReservationResponse[] = [];
  orders: OrdersResponse[] = [];
  totalCustomers: number = 0;
  totalOrders: number = 0;
  totalIncome: number = 0;
  totalReservations: number = 0;
  activeCardIndex: number | null = null;
  myChart: any;
  topSellingProducts: string[] = [];

  constructor(
    private customersService: CustomersService,
    private productsService: ProductsService,
    private datePipe: DatePipe,
    private ordersService: OrdersService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.getReservationList();
    this.getCustomersList();
    this.getProductsList();
    this.getOrdersList();
    this.createChart();
  }

  createChart() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Orders',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            yAxisID: 'defaultScale',
          },
          {
            label: 'Total Income',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'incomeScale', 
            
          },
          {
            label: 'Total Customers',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            yAxisID: 'defaultScale'
          },
          {
            label: 'Total Reservations',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            yAxisID: 'defaultScale'
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              id: 'defaultScale',
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 10, 
                callback: (value: any) => value.toString() + '%', 
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
              },
            },
            {
              id: 'incomeScale',
              position: 'right',
              ticks: {
                beginAtZero: true,
                max: 50000,
                stepSize: 10000,
                display: false, 
              },
              scaleLabel: {
                display: true,
              },
            },
          ],
        },
        
        onClick: (event: MouseEvent, activeElements: any[]) => {
          const activeElement = this.myChart.getElementAtEvent(event);
        
          if (activeElement.length > 0) {
            const clickedDatasetIndex = activeElement[0]?._datasetIndex;
        
            if (clickedDatasetIndex !== undefined) {
              const isIncomeDataset = clickedDatasetIndex === 1;
        
              this.myChart.options.scales.yAxes[0].scaleLabel.display = !isIncomeDataset;
              this.myChart.options.scales.yAxes[1].ticks.display = isIncomeDataset;
        
              this.myChart.update();
            }
          }
        },
      },
    });
  

    this.getCustomersList();
    this.getOrdersList();
    this.getReservationList();
  }

  updateChartType(clickedDatasetIndex: number) {
    const chartTypes = ['bar', 'line', 'bar', 'line'];
    const clickedChartType: string = chartTypes[clickedDatasetIndex];

    this.myChart.config.type = clickedChartType;

    this.myChart.data.datasets.forEach((dataset: any, index: number) => {
      if (index === clickedDatasetIndex) {
        dataset.hidden = false;
      } else {
        dataset.hidden = true;
      }
    });

    this.myChart.update();
  }
  getCustomersList() {
    this.customersService
      .getCustomersLists()
      .subscribe((customers: CustomersResponse[]) => {
        this.customers = customers;
        this.customers.sort((a, b) => b.points - a.points);
        this.totalCustomers = customers.length;

        this.updateChartData();
      });
  }
  
updateTopSellingProducts() {
  const topProducts = this.products.slice(0, 5);
  this.topSellingProducts = topProducts.map((product) => product.name);
}

  updateChartData() {
    const customersData = Array(12).fill(0);
    const ordersData = Array(12).fill(0);
    const incomeData = Array(12).fill(0);
    const reservationData = Array(12).fill(0);

    for (const customer of this.customers) {
      const monthIndex = new Date(customer.created_at).getMonth();
      customersData[monthIndex]++;
    }

    for (const order of this.orders) {
      const monthIndex = new Date(order.created_at).getMonth();
      ordersData[monthIndex]++;
      incomeData[monthIndex] += parseFloat(order.total);
    }
    for (const reserve of this.reservations) {
      const monthIndex = new Date(reserve.created_at).getMonth();
      reservationData[monthIndex]++;
    }

    const totalCustomersDataset = this.myChart.data.datasets.find(
      (dataset: any) => dataset.label === 'Total Customers'
    );
    const totalOrdersDataset = this.myChart.data.datasets.find(
      (dataset: any) => dataset.label === 'Total Orders'
    );
    const totalIncomeDataset = this.myChart.data.datasets.find(
      (dataset: any) => dataset.label === 'Total Income'
    );
    const totalReservationDataset = this.myChart.data.datasets.find(
      (dataset: any) => dataset.label === 'Total Reservations'
    );

    if (totalCustomersDataset) {
      totalCustomersDataset.data = customersData;
    }

    if (totalOrdersDataset) {
      totalOrdersDataset.data = ordersData;
    }

    if (totalIncomeDataset) {
      totalIncomeDataset.data = incomeData;
    }
    if (totalReservationDataset) {
      totalReservationDataset.data = reservationData;
    }

    this.myChart.update();
  }

  getProductsList() {
    this.productsService
      .getProductsLists()
      .subscribe((products: ProductsResponse[]) => {
        this.products = products;
        this.products.sort((a, b) => b.quantity - a.quantity);
        this.updateTopSellingProducts();
      });
  }

  getPercentage(productName: string): string {
    const product = this.products.find((item) => item.name === productName);
    if (product) {
      const maxQuantity = this.products[0].quantity; // Assuming the first product has the highest quantity
      const percentage = Math.round((product.quantity / maxQuantity) * 100);
      return `${percentage}%`;
    }
    return '0%';
  }

  getReservationList() {
    this.reservationService
      .getReservationList()
      .subscribe((reservation: ReservationResponse[]) => {
        this.reservations = reservation;
        this.totalReservations = reservation.length;
        this.updateChartData();
      });
  }

  getOrdersList() {
    this.ordersService
      .getOrdersLists()
      .subscribe((orders: OrdersResponse[]) => {
        this.orders = orders;
        this.totalOrders = orders.length;
        this.updateChartData();
        this.totalIncome = orders.reduce(
          (sum, order) => sum + parseFloat(order.total),
          0
        );
      });
  }



  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMM d, y');
    return formattedDate || '';
  }
}
