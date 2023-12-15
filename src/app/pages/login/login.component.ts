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
  showPassword: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private toast: NgToastService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  login() {
    
      var inputData = {
        email: this.email,
        password: this.password
      };
    
      this.authService.loginUser(inputData).subscribe({
        next: (res: any) => {
          this.authService.storeToken(res.token, res.user); 
          this.authService.isAuthenticatedSubject.next(true);
          this.email = '';
          this.password = '';
          this.errors = {};
          this.toast.success({detail:"SUCCESS",summary:'Log in successful',duration:3000,});

          if (res.user.role === 'Admin') {
            // Redirect to the dashboard page
            this.router.navigate(['/dashboard']);
          } else if (res.user.role === 'Cashier') {
            // Redirect to the transaction page
            this.router.navigate(['/transaction']);
          } else {
            // Handle other roles or scenarios
            // Redirect to a default page or show an error message
          }
          location.reload();
        },
    
        error: (err: any) => {
          this.errors = err.error.errors;
          this.isLoading = false;
          this.toast.error({detail:"ERROR",summary:'Log in unsuccessful',duration:4000,});
      }
    });
  }
}
