import { Component } from '@angular/core';
import { CustomersResponse } from 'src/app/services/customers/customers.service';
import { ServiceService } from 'src/app/services/sevice/service.service';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

constructor(private serviceService:ServiceService){}
  
  customer!:CustomersResponse;
  price!: string
  serviceType!:string;
  points!: string;
  status!: string;
  successMessage: string | null = null;
  errors: any = [];
  isLoading: boolean = false;



  saveProduct() {
   

    var inputData = {
    
    customer:this.customer,
    service:this.serviceType,
      price: this.price,
      points: this.points,
    };

    this.serviceService.saveService(inputData).subscribe({
      next: (res: any) => {
        this.customer
        this.price = '';
        this.points = '';
        this.serviceType='';
        this.status='';
        this.successMessage = 'Success! Product saved.';
        setTimeout(() => this.successMessage = null, 1500);
        this.isLoading = false  
        this.errors = {};
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false  
      }
    })
  }
}
