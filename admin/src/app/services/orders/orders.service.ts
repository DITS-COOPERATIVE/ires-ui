import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface OrdersResponse {
  "id": number,
  "customer_id": number,
  "product_id": number,
  "quantity": number,
  "created_at": string,
  "updated_at": string,
    "product": 
      {
      "id": number,
      "name": string,
      "code": string,
      "model": string,
      "price": number,
      "quantity": number,
      "points": number,
      "created_at": string,
      "updated_at": string
      },
    "customer": {
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
      "updated_at": string
    },
    "sale": {
      "id": number,
      "order_id": number,
      "total_price": number,
      "total_points": number,
      "created_at": string,
      "updated_at": string
    }
}

export interface OrdersResponseType {
  status: number,
  result: OrdersResponse []
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private httpClient: HttpClient ) {}

  getOrdersLists() {

    return  this.httpClient.get<OrdersResponseType>(`http://127.0.0.1:8000/api/orders`);
  }

  saveOrder(inputData: object){
    
    return  this.httpClient.post(`http://127.0.0.1:8000/api/orders`, inputData);
  }

  destroyOrder(orderId: number) {

    return  this.httpClient.delete(`http://127.0.0.1:8000/api/orders/${orderId}`);
  }
}
