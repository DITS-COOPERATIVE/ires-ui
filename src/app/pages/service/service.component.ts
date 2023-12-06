import { Component } from '@angular/core';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ReservationResponse, ReservationService } from 'src/app/services/reservation/reservation.service';
import { ServiceResponse, ServiceService } from 'src/app/services/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent {
  constructor(private serviceService: ServiceService, private customersService: CustomersService, 
    private reservationService: ReservationService) {}
  services: ServiceResponse[] = [];
  reservation: ReservationResponse[] = [];
  name!: string;
  price!: string;
  type!: string;
  status!: string;
  successMessage: string | null = null;
  errors: any = [];
  isLoading: boolean = false;
  
  ngOnInit() {

    this.getServiceLists();

  } 
  saveService() {
    var inputData = {
      name: this.name,
      type: this.type,
      price: this.price,
      status: this.status,
    };

    this.serviceService.saveService(inputData).subscribe({
      next: (res: any) => {
        this.name = '';
        this.price = '';
        this.type = '';
        this.status = '';
        this.successMessage = 'Success! Product saved.';
        setTimeout(() => (this.successMessage = null), 1500);
        this.isLoading = false;
        this.errors = {};
        this.getServiceLists();
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
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
}
