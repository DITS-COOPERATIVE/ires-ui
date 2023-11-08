import { ProductsResponse } from '../services/products/products.service';

export class HistoryEntry {
  action: string;
  product: ProductsResponse;
  property?: string;
  originalValue?: any;

  constructor(
    action: string,
    product: ProductsResponse,
    property?: string,
    originalValue?: any
  ) {
    this.action = action;
    this.product = product;
    this.property = property;
    this.originalValue = originalValue;
  }
}
