import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface OrdersResponse {
  id: number,
  customer_id: number,
  product_id: number,
  quantity: number,
  price: number,
  discount: number,
  points: number,
  total:string,
  created_at: string,
  updated_at: string,
}

export interface OrdersResponseType {
  res: OrdersResponse []
}

export interface OrderEditResponse {
  status: number,
  result: OrdersResponse[]
}
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private endpoint = "orders";
  private domain: string | undefined;

  constructor( private httpClient: HttpClient ) {
    this.domain = environment.domain;
  }

  getOrdersLists() {

    return  this.httpClient.get<OrdersResponse[]>(`${this.domain}${this.endpoint}`);
  }

  getOrder(orderId : number) {

    return  this.httpClient.get<OrderEditResponse>(`${this.domain}${this.endpoint}${orderId}`);
  }

  saveOrder(inputData: object){
    
    return  this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateOrder(inputData: object, orderId: number) {

    return  this.httpClient.put(`${this.domain}${this.endpoint}${orderId}`, inputData);
  }

  destroyOrder(orderId: number) {

    return  this.httpClient.delete(`${this.domain}${this.endpoint}${orderId}`);
  }
}
