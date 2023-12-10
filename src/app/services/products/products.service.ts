import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomersResponse } from 'src/app/services/customers/customers.service';

export interface ProductsResponse {
  id: number;
  image: string;
  category: string;
  name: string;
  note?: string;
  internalNote?: string;
  model: string;
  price: string;
  discount: number;
  quantity: number;
  sold: number;
  sub_Products: number;
  points: number;
  created_at: string;
  updated_at: string;
  customer: CustomersResponse;

}

export interface ProductsResponseType {
  res: ProductsResponse[];
}

export interface ProductEditResponse {
  result: ProductsResponse[];
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
