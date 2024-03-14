import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, localStoageKeys } from '../../../environments/environment';
import { User } from '../models/user';

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

    return this.http.get<any>(`${environment.apiUrl}/users/${id}`, { headers: headers });
  }

  getUsers(status: string): Observable<any> { // actice - inactive
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');

    return this.http.get<any>(`${environment.apiUrl}/users?status=${status}`, { headers: headers });
  }

  addUser(userObj: User) {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}/users/register`, userObj, { headers: headers });
  }
}
