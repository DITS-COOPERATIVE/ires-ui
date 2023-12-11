import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errors: any = [];

  constructor(private authService: AuthenticationService, private router: Router, private toast: NgToastService) {}


  login() {
    
      var inputData = {
        email: this.email,
        password: this.password
      };
    
      this.authService.loginUser(inputData).subscribe({
        next: (res: any) => {
          this.authService.storeToken(res.token, this.email); 
          this.authService.isAuthenticatedSubject.next(true);
          this.email = '';
          this.password = '';
          this.errors = {};
          this.toast.success({detail:"SUCCESS",summary:'Log in successful',duration:3000,});
        },
    
        error: (err: any) => {
          this.errors = err.error.errors;
          this.isLoading = false;
          this.toast.error({detail:"ERROR",summary:'Log in unsuccessful',duration:4000,});
      }
    });
  }
}
