import { Component } from '@angular/core';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ReservationResponse, ReservationService } from 'src/app/services/reservation/reservation.service';
import { ServiceResponse, ServiceService } from 'src/app/services/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent {
  constructor(private serviceService: ServiceService, private customersService: CustomersService, 
    private toast: NgToastService, private reservationService: ReservationService,public permissionService: PermissionService,) {}
  services: ServiceResponse[] = [];
  reservation: ReservationResponse[] = [];
  name!: string;
  price!: string;
  type!: string;
  status!: string;
  successMessage: string | null = null;
  errors: any = [];
  isLoading: boolean = false;
  selectedService: any;
  isUpdateMode: boolean = false;


  ngOnInit() {

    this.getServiceLists();

  } 
  editService(service: any) {
    this.selectedService = { ...service }; 
    this.name = this.selectedService.name;
    this.price = this.selectedService.price;
    this.type = this.selectedService.type;
    this.isUpdateMode = true;
  }

  saveOrupadateService() {
    var inputData = {
      name: this.name,
      type: this.type,
      price: this.price,
      status: this.status,
    };

    if (this.isUpdateMode){
      this.reservationService.updateReservation(inputData, this.  selectedService.id).subscribe({
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
    }else{
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
  }
  resetForm() {

    this.name = '';
    this.price = '';
    this.type = '';
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

  deleteReservation(serviceId: number) {
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
          this.serviceService.destroyService(serviceId).subscribe({
            next: (resp: any) => {
              this.getServiceLists();
            },
          });
        } else {
        }
      },
    });
    
  }
}
