import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface CustomersResponse {
  "id": number,
  "full_name": string,
  "first_name": string,
  "last_name": string,
  "gender": string,
  "email": string,
  "mobile_no": string,
  "birth_date": string,
  "address": string,
  "privilege": string,
  "points": number,
  "created_at": string,
  "updated_at": string,
}

export interface CustomersResponseType {
  status: number,
  result: CustomersResponse []
}

export interface CustomerEditResponse {
  status: number,
  result: CustomersResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private endpoint = "customers";
  private domain: string | undefined;

  constructor( private httpClient: HttpClient ) {
    this.domain = environment.domain;
  }

  getCustomersLists() {

    return  this.httpClient.get<CustomersResponseType>(`${this.domain}${this.endpoint}`);
  }

  getCustomer(customerId : number) {

    return  this.httpClient.get<CustomerEditResponse>(`${this.domain}${this.endpoint}${customerId}`);
  }

  saveCustomer(inputData: object){
    
    return  this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateCustomer(inputData: object, customerId: number) {

    return  this.httpClient.put(`${this.domain}${this.endpoint}${customerId}`, inputData);
  }

  destroyCustomer(customerId: number) {

    return  this.httpClient.delete(`${this.domain}${this.endpoint}${customerId}`);
  }
}
