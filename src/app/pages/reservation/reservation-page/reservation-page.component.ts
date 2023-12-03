import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { ReservationResponse, ReservationService } from 'src/app/services/reservation/reservation.service';
import { ServiceResponse, ServiceService } from 'src/app/services/services/service.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent {
  constructor(private serviceService: ServiceService, private customersService: CustomersService, 
    private reservationService: ReservationService, private http: HttpClient) {}
  
    ngOnInit() {
      this.getCustomersLists();
      this.getServiceLists();
      this.getReservationLists();
    } 
  services: ServiceResponse[] = [];
  reservation: ReservationResponse[] = [];
  customers: CustomersResponse[] = [];
  successMessage: string | null = null;
  errors: any = [];
  isLoading: boolean = false;
  service_id!: number;
  customer_id!: number;
  customer_name!: string;
  status!: string;
  when!: string;
  location!: string;

  saveReservation() {
    var inputData = {
      service_id: this.service_id,
      customer_name: this.customer_name,
      status: this.status,
      when: this.when,
      location: this.location
    };

    this.reservationService.saveReservation(inputData).subscribe({
      next: (res: any) => {
        this.service_id = 0;
        this.customer_name = '';
        this.status = '';
        this.when = '';
        this.location = '';
        this.successMessage = 'Success! Product saved.';
        setTimeout(() => (this.successMessage = null), 1500);
        this.isLoading = false;
        this.errors = {};
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
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
  getServiceLists(){
  
    try {
      this.serviceService.getServiceList().subscribe((res) =>{
        this.services = res;
      })
    } catch (error) {
      this.errors = error
    };
    
  }
  getReservationLists() {
    forkJoin([
      this.reservationService.getReservationList(),
      this.serviceService.getServiceList()
    ]).subscribe(
      ([reservationData, serviceData]: [ReservationResponse[], ServiceResponse[]]) => {
        this.reservation = reservationData;
        this.services = serviceData;
      },
      (error) => {
        this.errors = error;
      }
    );
  }
  getServiceType(serviceId: number): string {
    const service = this.services.find(service => service.id === serviceId);
    return service ? service.type : 'Unknown';
  }
  onDateChange() {
    if (this.service_id && this.when) {
      const apiUrl = `services/${this.service_id}/availability`;
      const payload = { when: this.when };
      this.http.post(apiUrl, payload).subscribe(
        (response) => {
          console.log('API response:', response);
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }
}
