import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Here, you can implement your login logic.
    // You can send a request to a server to authenticate the user.
    // For this example, we'll just print the username and password to the console.
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
