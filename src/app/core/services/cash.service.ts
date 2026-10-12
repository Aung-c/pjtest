import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  private cashListUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/cashrequest/list';

  private cashDetailUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/cashrequest/detail';

  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      Email: email,
      Password: password,
      GrantType: 'password'
    };
    return this.http.post<any>(this.loginUrl, body);
  }

  cashList(page: number,
    pageSize: string,
    token: string
    ): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      FromDate: '',
      ToDate: '',
      Status: '',
      BranchId: '',
      TerminalId: '',
      UserName: '',
      CurrentPageNumber: page.toString(),
      PageSize: pageSize.toString()
    };

    return this.http.post<any>(this.cashListUrl, body, { headers });
  }

  cashDetail(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { id: id };

    return this.http.post<any>(this.cashDetailUrl, body, { headers });
  }
}