import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ServiceResponse {
  id: number;
  name:string;
  price: string;
  type:string;
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
  private endpoint = 'services/';

  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getServiceList() {
    return this.httpClient.get<ServiceResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getService(serviceId: number) {
    return this.httpClient.get<ServiceResponse>(
      `${this.domain}${this.endpoint}${serviceId}`
    );
  }

  saveService(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateService(inputData: object, serviceId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${serviceId}`,
      inputData
    );
  }

  destroyService(serviceId: number) {
    return this.httpClient.delete(`${this.domain}${this.endpoint}${serviceId}`);
  }
}


