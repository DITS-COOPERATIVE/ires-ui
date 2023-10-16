import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ProductsResponse {
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

export interface ProductsResponseType {
  status: number,
  result: ProductsResponse []
}

  export interface ProductEditResponse {
  status: number,
  result: ProductsResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient: HttpClient ) {}

  getProductsLists() {

    return  this.httpClient.get<ProductsResponseType>(`http://127.0.0.1:8000/api/products`);
  }

  getProduct(productId : number) {

    return  this.httpClient.get<ProductEditResponse>(`http://127.0.0.1:8000/api/products/${productId}`);
  }

  saveProduct(inputData: object){
    
    return  this.httpClient.post(`http://127.0.0.1:8000/api/products`, inputData);
  }

  updateProduct(inputData: object, productId: number) {

    return  this.httpClient.put(`http://127.0.0.1:8000/api/products/${productId}`, inputData);
  }

  destroyProduct(productId: number) {

    return  this.httpClient.delete(`http://127.0.0.1:8000/api/products/${productId}`);
  }
}
