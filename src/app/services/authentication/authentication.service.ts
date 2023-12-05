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
  

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  createUser(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }
  
  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
  
}
