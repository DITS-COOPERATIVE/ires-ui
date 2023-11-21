import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly dummyUsername = 'demo';
  private readonly dummyPassword = 'password';
  private readonly tokenKey = 'authToken';

  private isAuthenticatedFlag: boolean = false;
  private authenticationStatusSubject = new BehaviorSubject<boolean>(false);
  authenticationStatus = this.authenticationStatusSubject.asObservable();

  constructor() {
    this.isAuthenticatedFlag = !!localStorage.getItem(this.tokenKey);
  }

  authenticate(username: string, password: string): boolean {
    if (username === this.dummyUsername && password === this.dummyPassword) {
      // Generate and store a token
      const authToken = this.generateAuthToken();
      localStorage.setItem(this.tokenKey, authToken);

      this.isAuthenticatedFlag = true;
      this.authenticationStatusSubject.next(true);

      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  logout(): void {
    // Clear the token and update authentication status
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedFlag = false;
    this.authenticationStatusSubject.next(false);
  }

  private generateAuthToken(): string {
    // Generate a random or secure token (e.g., using JWT)
    return 'your_generated_token_here';
  }
}
