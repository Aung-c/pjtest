import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
     providedIn: 'root'
})
export class collaService{
 private loginUrl = 'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';
 private listUrl =  'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/list';


public token = '';

constructor (private http :HttpClient){}

private getHeaders(): HttpHeaders {
     return new HttpHeaders({
          'Authorization': `Bearer ${this.token }`,
          'Content-Type' : 'application/json'
     });
}
  login(email: string, password: string): Observable<any> {
    const body = {
      Email: email,
      Password: password,
      GrantType: 'password'
    };
    return this.http.post<any>(this.loginUrl, body);
  }
      adminList(aaa: any): Observable<any> {
    const body = {
      UserName: '',
      Email: '',
      PhoneNumber: '',
      RoleId: '',
      Status: '',
      RegisterDateFrom: '',
      RegisterDateTo: '',
      CurrentPageNumber: aaa.page,
      PageSize: aaa.pageSize
    };

    return this.http.post<any>(this.listUrl, body, { headers  : this.getHeaders() });
  }
}