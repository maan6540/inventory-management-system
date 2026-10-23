import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { skipGlobalLoader } from '../interceptors/loading-context';

export interface UserFilter {
  search?: string;
  departmentId?: number;
  roleId?: number;
  statusId?: number;
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Users`;

  getUsers(filters?: UserFilter): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        pageNumber: filters?.pageNumber ?? 1,
        pageSize: filters?.pageSize ?? 10,
        ...(filters?.search && { search: filters.search }),
        ...(filters?.departmentId && { departmentId: filters.departmentId }),
        ...(filters?.roleId && { roleId: filters.roleId }),
        ...(filters?.statusId && { statusId: filters.statusId }),
      },
      context: new HttpContext().set(skipGlobalLoader, true),
    });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }
}
