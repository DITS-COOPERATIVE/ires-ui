import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface TransactionsResponse {
  "id": number,
  "sale_id": any,
  "amount_rendered": number,
  "change": number,
  "created_at": string,
  "updated_at": string,
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
