import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponseData extends CurrentUser {
  token: string;
}

export interface MeResponse {
  status: string;
  message: string;
  data: CurrentUser;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: AuthResponseData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  login(loginrequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginrequest);
  }

  me() {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`);
  }

  switchRole(roleId: number): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/switch-role`, { roleId });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
