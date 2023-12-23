import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errors: object = [];

  constructor(private authService: AuthenticationService) {}

  register() {
    var inputData = {
      name:this.name,
      email:this.email,
      password:this.password
    };
    this.authService.createUser(inputData).subscribe({
      next: (res: any) => {
        this.name = '';
        this.email = '';
        this.password = '';
        this.errors = {};
      },

      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false
        alert(this.errors);
      }
    })
  }
}
