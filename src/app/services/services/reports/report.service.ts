import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ReportResponse {
  reportName:string;
  from:string;
  to:string;
  type:string;
  created_at: string;
  updated_at: string;
}

export interface ReportResponseType {
  res: ReportResponse[];
}

export interface ServiceEditResponse {
  result: ReportResponse[];
}


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private endpoint = 'reports/';

  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
  }

  getReportList() {
    return this.httpClient.get<ReportResponse[]>(
      `${this.domain}${this.endpoint}`
    );
  }

  getReport(report:number) {
    return this.httpClient.get<ReportResponse>(
      `${this.domain}${this.endpoint}${report}/data`
    );
  }

  saveReport(inputData: object) {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, inputData);
  }

  updateReport(inputData: object, serviceId: number) {
    return this.httpClient.put(
      `${this.domain}${this.endpoint}${serviceId}`,
      inputData
    );
  }

  destroyReport(serviceId: number) {
    return this.httpClient.delete(`${this.domain}${this.endpoint}${serviceId}`);
  }

}
