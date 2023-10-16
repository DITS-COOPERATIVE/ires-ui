import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface TransactionsResponse {
  "id": number,
  "sale_id": any,
  "amount_rendered": number,
  "change": number,
  "created_at": string,
  "updated_at": string,
    "sale": {
      "id": number,
      "order_id": number,
      "total_price": number,
      "total_points": number,
      "created_at": string,
      "updated_at": string,
        "orders": {
        "id": number,
        "customer_id": number,
        "product_id": number,
        "quantity": number,
        "created_at": string,
        "updated_at": string,
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
            "product": {
            "id": number,
            "name": string,
            "code": string,
            "model": string,
            "price": number,
            "quantity": number,
            "points": number,
            "created_at": string,
            "updated_at": string,
            }
          }
        }
      }

export interface TransactionsResponseType {
  status: number,
  result: TransactionsResponse []
}

export interface TransactionEditResponse {
  status: number,
  result: TransactionsResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private endpoint = "transactions";
  private domain: string | undefined;

  constructor( private httpClient: HttpClient ) {
    this.domain = environment.domain;
  }

  getTransactionsList() {

    return  this.httpClient.get<TransactionsResponseType>(`${this.domain}${this.endpoint}`);
  }

  getTransaction(transactionId : number) {

    return  this.httpClient.get<TransactionEditResponse>(`${this.domain}${this.endpoint}${transactionId}`);
  }

  saveTransaction(inputData: object){
    
    return  this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateTransaction(inputData: object, transactionId: number) {

    return  this.httpClient.put(`${this.domain}${this.endpoint}${transactionId}`, inputData);
  }

  destroyTransaction(transactionId: number) {

    return  this.httpClient.delete(`${this.domain}${this.endpoint}${transactionId}`);
  }
}
