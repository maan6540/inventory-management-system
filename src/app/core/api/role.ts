import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface RoleOption {
  roleId: number;
  roleName: string;
  priority: number;
}

export interface RolesResponse {
  status: string;
  message: string;
  data: RoleOption[];
}

@Injectable({
  providedIn: 'root',
})
export class Role {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Roles`;

  getRoles(): Observable<RolesResponse> {
    return this.http.get<RolesResponse>(this.apiUrl);
  }
}
