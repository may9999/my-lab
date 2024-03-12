import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, localStoageKeys } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<any> {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');

    return this.http.get<any>(`${environment.apiUrl}/user/${id}`, { headers: headers } );
  } 
}
