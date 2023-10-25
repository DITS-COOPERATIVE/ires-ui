import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface ProductsResponse  {
  "id": number,
  "image":string,
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
  res: ProductsResponse []
}

  export interface ProductEditResponse {
  result: ProductsResponse[]
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private endpoint = "products/";
  private domain: string | undefined;


  constructor( private httpClient: HttpClient ) {
    this.domain = environment.domain;
  }

  getProductsLists() {

    return  this.httpClient.get<ProductsResponse[]>(`${this.domain}${this.endpoint}`);
  }

  getProduct(productId : number) {

    return  this.httpClient.get<ProductsResponse>(`${this.domain}${this.endpoint}${productId}`);
  }

  saveProduct(inputData: object){
    
    return  this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateProduct(inputData: object, productId: number) {

    return  this.httpClient.put(`${this.domain}${this.endpoint}${productId}`, inputData);
  }

  destroyProduct(productId: number) {

    return  this.httpClient.delete(`${this.domain}${this.endpoint}${productId}`);
  }
}
