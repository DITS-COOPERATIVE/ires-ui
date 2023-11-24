import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomersResponse } from '../customers/customers.service';


export interface ServiceResponse {
  id: number;
  customer:CustomersResponse;
  price: string;
  serviceType:string;
  points: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceResponseType {
  res: ServiceResponse[];
}

export interface ServiceEditResponse {
  result: ServiceResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private endpoint = 'service/';

  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getServiceList() {
    return this.httpClient.get<ServiceResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getService(productId: number) {
    return this.httpClient.get<ServiceResponse>(
      `${this.domain}${this.endpoint}${productId}`
    );
  }

  saveService(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateService(inputData: object, productId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${productId}`,
      inputData
    );
  }

  destroyService(productId: number) {
    return this.httpClient.delete(`${this.domain}${this.endpoint}${productId}`);
  }
}


