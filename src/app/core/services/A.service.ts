import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Aservice {

  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  private listUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/list';

  private detailUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/detail';

  private permissionUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agents/permissionlist';

  public accessToken = '';
  public hashValue = '';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
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

  agentList(name: string, page: string, pageSize: string): Observable<any> {
    const body = {
      Name: name,
      CurrentPageNumber: page,
      PageSize: pageSize
    };
    return this.http.post<any>(this.listUrl, body, { headers: this.getHeaders() });
  }

  agentDetail(agentRoleId: string): Observable<any> {
    const body = { AgentRoleId: agentRoleId };
    return this.http.post<any>(this.detailUrl, body, { headers: this.getHeaders() });
  }

  agentPermissionList(): Observable<any> {
    return this.http.get<any>(this.permissionUrl, { headers: this.getHeaders() });
  }

}