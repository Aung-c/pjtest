import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombineService {

  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  private nomiUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/paymeusers/nomineelist';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    const body = {
      Email: username.trim(),
      Password: password.trim(),
      GrantType: 'password'
    };

    return this.http.post<any>(this.loginUrl, body);
  }

 getNomineeList(
  currentPage: number,
  pageSize: number,
  fromDate: string,
  toDate: string,
  accessToken: string,
): Observable<any> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });

  const body = {
  
      FromDate: fromDate,
      ToDate: toDate,
      Status: 'true',           
      CurrentPageNumber: currentPage.toString(),
      PageSize: pageSize.toString(),
    
  };


  return this.http.post<any>(this.nomiUrl, body, { headers });
}
}