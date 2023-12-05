import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = 'auth/login';
  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  loginUser(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  createUser(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }
  
}
