import { Injectable } from '@angular/core';
import {  HttpClient,  HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  private apiUrl ='https://portal-uat-api.pension.payme.com.mm/api/ver01/paymeusers/nomineelist';

  constructor(
    private http: HttpClient
  ) {}

  nomilist(
    currentPage: number,
    pageSize: number,
    fromDate: string,
    toDate: string,
  ): Observable<any> {

    const token = localStorage.getItem('AccessToken');
    console.log('Token:', token)
   const body = {
  FromDate: fromDate,
  ToDate: toDate,
  Status: '',
  CurrentPageNumber: currentPage.toString(),
  PageSize: pageSize.toString()
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(
      this.apiUrl, body, { headers }
    );
  }
}
