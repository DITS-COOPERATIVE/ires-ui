import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { forkJoin } from 'rxjs';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ReservationResponse, ReservationService } from 'src/app/services/reservation/reservation.service';
import { ServiceResponse, ServiceService } from 'src/app/services/services/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent {
  private domain: string | undefined;
  constructor(private serviceService: ServiceService, private customersService: CustomersService, 
    private route: ActivatedRoute,
    private reservationService: ReservationService, private http: HttpClient,
    public permissionService: PermissionService,
    private toast: NgToastService) {   this.domain = environment.domain;}
  
 
    
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
  isDateAvailable: boolean = true;
  selectedItem: any; 
  reservationId!: any;
  isUpdateMode: boolean = false;
  userRole: string = 'Admin'


  selectRow(item: any) {
    this.selectedItem = item; 
    this.customer_name = item.customer_name;
    this.service_id = item.service_id;
    this.when = item.when;
    this.location = item.location;
    this.status = item.status;
    this.isUpdateMode = true;
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';  
    
  }
  

  ngOnInit() { 
    this.getCustomersLists();
    this.getServiceLists();
    this.getReservationLists();
  } 

  saveOrUpdateReservation() {
    const inputData = {
      service_id: this.service_id,
      customer_name: this.customer_name,
      status: this.status,
      when: this.when,
      location: this.location
    };

    if (this.isUpdateMode) {
      this.reservationService.updateReservation(inputData, this.selectedItem.id).subscribe({
        next: (res: any) => {
          this.resetForm();
          this.toast.success({detail:"SUCCESS",summary:'Succesfully Updated!',duration:3000, position:'topCenter'});
          this.successMessage = 'Success! Reservation updated.';
          setTimeout(() => (this.successMessage = null), 1500);
          this.isUpdateMode = false; 
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:'Failed to Update!',duration:3000, position:'topCenter'});
          this.errors = err.error.errors;
          this.isLoading = false;
        },
      });
    } else {
  
      this.reservationService.saveReservation(inputData).subscribe({
        next: (res: any) => {
   
          this.resetForm();
          this.toast.success({detail:"SUCCESS",summary:'Succesfully Save!',duration:3000, position:'topCenter'});
          this.successMessage = 'Success! Reservation saved.';
          setTimeout(() => (this.successMessage = null), 1500);
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:'Falied to Save!',duration:3000, position:'topCenter'});
 
          this.errors = err.error.errors;
          this.isLoading = false;
        },
      });
    }
  }

  resetForm() {

    this.service_id = 0;
    this.customer_name = '';
    this.status = '';
    this.when = '';
    this.location = '';
    this.isLoading = false;
    this.errors = {};
    this.getReservationLists();
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
      const apiUrl = `${this.domain}services/${this.service_id}/availability`;
      const payload = { when: this.when };
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
  
      this.http.post(apiUrl, payload, { headers }).subscribe(
        (response: any) => {

          this.isDateAvailable = response === 1 || (response && response.preview === 1);
        },
        (error) => {

          console.error('Error checking service availability:', error);
          this.isDateAvailable = false;
        }
      );
    }
  }
  
  deleteReservation(reservationId: number) {
    const newConfirmBox = new ConfirmBoxInitializer();
  
    newConfirmBox.setTitle('Confirm Deletion!');
    newConfirmBox.setMessage('Are you sure you want to delete this Item?');
  
    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
      buttonPosition: 'right',
    });
  
    newConfirmBox.setButtonLabels('Yes', 'No');
  
    newConfirmBox.openConfirmBox$().subscribe({
      next: (resp) => {
        if (resp.clickedButtonID === 'yes') {
          this.reservationService.destroyReservation(reservationId).subscribe({
            next: (resp: any) => {
              this.getReservationLists();
            },
          });
        } else {
        }
      },
    });
    
  }
}
