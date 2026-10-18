import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class Status {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/statuses`;

    getStatus():Observable<any>{
        return this.http.get(this.apiUrl);
    }
}
