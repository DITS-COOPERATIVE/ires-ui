import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor( private httpClient: HttpClient ) {}

  getTransactionsList() {

    return  this.httpClient.get<TransactionsResponseType>(`http://127.0.0.1:8000/api/transactions`);
  }

  getTransaction(transactionId : number) {

    return  this.httpClient.get<TransactionEditResponse>(`http://127.0.0.1:8000/api/transactions/${transactionId}`);
  }

  saveTransaction(inputData: object){
    
    return  this.httpClient.post(`http://127.0.0.1:8000/api/transactions`, inputData);
  }

  updateTransaction(inputData: object, transactionId: number) {

    return  this.httpClient.put(`http://127.0.0.1:8000/api/transactions/${transactionId}`, inputData);
  }

  destroyTransaction(transactionId: number) {

    return  this.httpClient.delete(`http://127.0.0.1:8000/api/transactions/${transactionId}`);
  }
}
