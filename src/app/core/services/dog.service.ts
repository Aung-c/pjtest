import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl ='https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login';

  constructor(
    private http: HttpClient
  ) {}

  login(loginData: any): Observable<any> {
    return this.http.post( `${this.apiUrl}`, loginData);
  }
}