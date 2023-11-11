import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      return true;
    } else {
      return false;
    }
  }
}
