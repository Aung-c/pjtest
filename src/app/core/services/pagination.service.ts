import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private apiUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/pensioncashout/getaccounttransaction';

  constructor(private http: HttpClient) {}
  paginate  (  page: number,    pageSize: number,
    filter: { NRC: string; PPANo: (any); PensionType: string }):
      Observable<any> 
        {
          const token = localStorage.getItem('AccessToken');
            console.log('Token:' ,token)
           const body = {
             NRC: filter.NRC?.trim() ,
                PPANo: filter.PPANo?.trim(),
                  PensionType: filter.PensionType?.trim(),
                    CurrentPage: page.toString(),
                     PageSize: pageSize.toString()
                       };
          const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
            });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}