import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class Role {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Roles`;

  getRoles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
