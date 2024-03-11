import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment, localStoageKeys } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(id: string): Observable<boolean> {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');

    return this.http.post<any>(`${environment.apiUrl}/user/${id}`,null, { headers: headers });
  } 
}
