import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse, ServiceService } from '../services/service.service';


export interface ReservationResponse {
  id:number;
  service_id: number;
  customer_id:string;
  customer_name: string;
  service: ServiceResponse[];
  status:string;
  when: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface ReservationResponseType {
  res: ReservationResponse[];
}

export interface ReservationEditResponse {
  result: ReservationResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private endpoint = 'reservations/';

  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getReservationList() {
    return this.httpClient.get<ReservationResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getReservation(reservationId: number) {
    return this.httpClient.get<ReservationResponse>(
      `${this.domain}${this.endpoint}${reservationId}`
    );
  }

  saveReservation(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateReservation(inputData: object, reservationId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${reservationId}`,
      inputData
    );
  }

  destroyReservation(reservationId: number) {
    return this.httpClient.delete(`${this.domain}${this.endpoint}${reservationId}`);
  }
}


