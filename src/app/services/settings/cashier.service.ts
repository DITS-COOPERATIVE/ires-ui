import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface CachiersResponse {
  id: number;
  full_name: string;
  gender: string;
  mobile_no: string;
  username: string;
  address: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface CustomersResponseType {
  res: CachiersResponse[];
}

export interface CustomerEditResponse {
  result: CachiersResponse[];
}


@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private endpoint = 'auth/register';
  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getCustomersLists() {
    return this.httpClient.get<CachiersResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getCustomer(customerId: number) {
    return this.httpClient.get<CustomerEditResponse>(
      `${this.domain}${this.endpoint}${customerId}`
    );
  }

  saveCustomer(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateCustomer(inputData: object, customerId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${customerId}`,
      inputData
    );
  }

  destroyCustomer(customerId: number) {
    return this.httpClient.delete(
      `${this.domain}${this.endpoint}${customerId}`
    );
  }
}
