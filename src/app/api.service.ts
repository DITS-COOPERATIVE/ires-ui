import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;
  private endpoint = "users";

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = `${environment.domain}`;
  }

  private getUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;

  }

  private getUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }
}
