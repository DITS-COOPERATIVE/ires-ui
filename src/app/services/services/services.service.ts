import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ServicesResponse {
  id: number;
  image: string;
  category: string;
  name: string;
  code: string;
  note?: string;
  internalNote?: string;
  model: string;
  price: string;
  discount: number;
  quantity: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponseType {
  res: ServicesResponse[];
}

export interface ProductEditResponse {
  result: ServicesResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private endpoint = 'products/';

  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getProductsLists() {
    return this.httpClient.get<ProductsResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getProduct(productId: number) {
    return this.httpClient.get<ProductsResponse>(
      `${this.domain}${this.endpoint}${productId}`
    );
  }

  saveProduct(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateProduct(inputData: object, productId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${productId}`,
      inputData
    );
  }

  destroyProduct(productId: number) {
    return this.httpClient.delete(`${this.domain}${this.endpoint}${productId}`);
  }
}
