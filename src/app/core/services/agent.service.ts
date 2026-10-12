import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService { 

  private loginUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  private listUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/list';

  private detailUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/detail';

  private permissionUrl =
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agents/permissionlist';

  private createUrl =
      'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/create';
  private updateUrl =    
    'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/update';

  private deleteUrl =      
      'https://portal-uat-api.pension.payme.com.mm/api/ver01/agentroles/delete';

  public accessToken = '';
  public hashValue = '';

  constructor(private http: HttpClient) { }


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

  //#region Agent List
  agentList(name: string, page: string, pageSize: string): Observable<any> {
    const body = {
      Name: name,
      CurrentPageNumber: page,
      PageSize: pageSize,
    };
    return this.http.post<any>(this.listUrl, body, { headers: this.getHeaders() });
  }
  //#endregion

  //#region Agent Detail
  agentDetail(agentRoleId: string): Observable<any> {
    const body = { AgentRoleId: agentRoleId };
    return this.http.post<any>(this.detailUrl, body, { headers: this.getHeaders() });
  }
  //#endregion

  //#region Agent Permission List
agentPermissionList(): Observable<any> {
  return this.http.get<any>(this.permissionUrl, { headers: this.getHeaders() });
}
//#endregion

  //#region Create / Update Agent Role
 
  setUpAgentRole(payload: any): Observable<any> {
    const url = payload.Id ? this.updateUrl : this.createUrl;
    return this.http.post<any>(url, payload, { headers: this.getHeaders() });
  }
  //#endregion

  //#region Delete Agent Role
  
  deleteAgentRole(agentRoleId: string): Observable<any> {
    const  head = { AgentRoleId : agentRoleId };
    return this.http.post<any>(this.deleteUrl, head , { headers: this.getHeaders() });
  }
  //#endregion

}