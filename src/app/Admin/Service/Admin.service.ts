import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  private listUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/list';

  private createUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/create';

  private terminalUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/terminallist';

  private branchUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/branchlist';

  private regionUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/regions/options';

  private userroleUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/rolelist';

  public accessToken = '';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  //#region Login
  login(email: string, password: string): Observable<any> {
    const body = {
      Email: email,
      Password: password,
      GrantType: 'password'
    };
    return this.http.post<any>(this.loginUrl, body);
  }
  //#endregion

  //#region Admin List
  adminList(filter: any  ): Observable<any> {
    const body = {
      UserName:  '', 
      Email: '',
      PhoneNumber:  '',
      RoleId:'',
      Status: '',
      RegisterDateFrom: '',
      RegisterDateTo: '',
      CurrentPageNumber: filter.page ,
      PageSize: filter.pageSize 
     };

     return this.http.post<any>(this.listUrl, body, { headers: this.getHeaders() });
  }
  //#endregion

  //#region Create User
  createUser(payload: any): Observable<any> {
    return this.http.post<any>(this.createUrl, payload, {
      headers: this.getHeaders()
    });
  }
  //#endregion


terminalList(branchId: string): Observable<any> {
  const body = {
    BranchId: branchId
  };

  console.log('Terminal list body =>', JSON.stringify(body, null, 2));

  return this.http.post<any>(this.terminalUrl, body, { headers: this.getHeaders() });
}


  //#region Branch List
  branchList(): Observable<any> {
    return this.http.get<any>(this.branchUrl, { headers: this.getHeaders() });
  }
  //#endregion

  //#region Region Options
  regionOptions(): Observable<any> {
    return this.http.get<any>(this.regionUrl, { headers: this.getHeaders() });
  }
  //#endregion

  //#region User Role List
  userRoleList(): Observable<any> {
    return this.http.get<any>(this.userroleUrl, { headers: this.getHeaders() });
  }
  //#endregion
}