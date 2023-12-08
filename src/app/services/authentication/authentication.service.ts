import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/shared/interfaces/Role';

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

  storeToken(token: string, user: Object): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserEmail(): string | null {
    return JSON.parse(localStorage.getItem('user') as string)?.email as string;
  }

  getUserRole(): Role {
    return JSON.parse(localStorage.getItem('user') as string)?.user_type as Role;
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
        localStorage.removeItem('user');
        
        this.isAuthenticatedSubject.next(false);
       location.reload();
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }

}
