import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  
  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  private apiUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/pensioncashout/getaccounttransaction';

   constructor(private http: HttpClient) {}
  login(username:string,password:string):Observable<any>
  {
    const body ={
      Email:username.trim(),
      password:password.trim(),
      GrantType: 'password'
    }
    return this.http.post<any>(this.loginUrl,body)
  }
  
 
   list(
  page: number,
  pageSize: number,
  accessToken: string,
): Observable<any> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });

  const body = {
    NRC: '',
    PPANo: '',
    pensionGroupId: '',
    PensionType: '',
    CurrentPage: page.toString(),
    PageSize: pageSize.toString()
  };

  return this.http.post<any>(
    this.apiUrl,
    body,
    { headers }
  );
}
}
