import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export interface KitResponse {
  id: number,
  product_id: number,
  related_id:number,
  qty:number,

}
