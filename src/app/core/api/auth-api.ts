import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface MeResponse {
  status: string;
  message: string;
  data: CurrentUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  login(loginrequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginrequest);
  }

  me() {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
