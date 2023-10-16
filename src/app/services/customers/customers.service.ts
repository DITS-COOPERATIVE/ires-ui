import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CustomersResponse {
  "id": number,
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

  constructor( private httpClient: HttpClient ) {}

  getCustomersLists() {

    return  this.httpClient.get<CustomersResponseType>(`http://127.0.0.1:8000/api/customers`);
  }

  getCustomer(customerId : number) {

    return  this.httpClient.get<CustomerEditResponse>(`http://127.0.0.1:8000/api/customers/${customerId}`);
  }

  saveCustomer(inputData: object){
    
    return  this.httpClient.post(`http://127.0.0.1:8000/api/customers`, inputData);
  }

  updateCustomer(inputData: object, customerId: number) {

    return  this.httpClient.put(`http://127.0.0.1:8000/api/customers/${customerId}`, inputData);
  }

  destroyCustomer(customerId: number) {

    return  this.httpClient.delete(`http://127.0.0.1:8000/api/customers/${customerId}`);
  }
}
