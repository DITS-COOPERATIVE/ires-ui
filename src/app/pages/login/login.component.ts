import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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

  constructor(private authService: AuthenticationService) {}

  login() {
    var inputData = {
      email:this.email,
      password:this.password
    };

    this.authService.loginUser(inputData).subscribe({
      next: (res: any) => {
        this.email = '';
        this.password = '';
        this.errors = {};
        alert(res);
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false
        alert(this.errors);
      }
    })
  }
}
