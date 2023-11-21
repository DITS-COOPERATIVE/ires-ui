import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers: CustomersResponse[] = [];
  products: ProductsResponse[] = [];
  totalCustomers: number = 0;
  activeCardIndex: number | null = null;
  myChart: any;
  

  constructor(private customersService: CustomersService, private productsService: ProductsService) {}

  ngOnInit() {
    this.getCustomersList();
    this.getProductsList();
    this.createChart()

    
  }

  createChart() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Orders',
            data: [2, 19, 43, 75, 20, 40, 4, 7, 5, 81, 79, 60],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Income',
            data: [10, 20, 15, 30, 50, 18, 22, 40, 35, 30, 25, 20],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Customers',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Transactions',
            data: [50, 45, 60, 70, 55, 40, 80, 75, 90, 85, 70, 60],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function (value) {
                const numberValue = Number(value);
                return numberValue.toFixed(0) + '%';
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage'
            }
          }]
        },
        onClick: (event: MouseEvent, activeElements: { _datasetIndex?: number }[]) => {
          if (activeElements.length > 0 && activeElements[0]._datasetIndex !== undefined) {
            const clickedDatasetIndex: number = activeElements[0]._datasetIndex;
            this.updateChartType(clickedDatasetIndex);
          }
        }
      }
    });
  
    this.getCustomersList();
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
    this.customersService.getCustomersLists().subscribe((customers: CustomersResponse[]) => {
      this.customers = customers;
      this.customers.sort((a, b) => b.points - a.points);
      this.totalCustomers = customers.length;
  
      this.updateChartData();
    });
  }
  
  updateChartData() {
    const customersData = Array(12).fill(0); 
    for (const customer of this.customers) {
      const monthIndex = new Date(customer.created_at).getMonth();
      customersData[monthIndex]++;
    }
  
    const totalCustomersDataset = this.myChart.data.datasets.find((dataset: any) => dataset.label === 'Total Customers');
    if (totalCustomersDataset) {
      totalCustomersDataset.data = customersData;
    }
    this.myChart.update();
  }
  
getProductsList(){
  this.productsService.getProductsLists().subscribe((products: ProductsResponse[]) => {
    this.products = products;
    this.products.sort((a, b) => b.quantity - a.quantity);

  });
}

  activateCard(index: number): void {
    this.activeCardIndex = index;
  }


  
}
