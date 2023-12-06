import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = 'auth/login';
  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthentication());


  loginUser(inputData: object): Observable<any> {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  private checkAuthentication(): boolean {

    const token = localStorage.getItem('token');
    return !!token;
  }
  
  storeToken(token: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }
  
  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  createUser(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }
  
  logoutUser(): Observable<any> {
    return this.httpClient.post(`${this.domain}auth/logout`, {});
  }

  logout() {
    this.logoutUser().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.isAuthenticatedSubject.next(false);
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }
  
}
