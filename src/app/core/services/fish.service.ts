import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

private apiUrl = 'https://portal-uat-api.pension.payme.com.mm/api/ver01/adminusers/login://dummyjson.com/users';
  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/add`,
      user
    );
  }

  Edituser(id: number, user: User): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}