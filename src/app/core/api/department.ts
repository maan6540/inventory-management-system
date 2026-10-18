import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class Department {
    
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Departments`;

  getDepartment():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
