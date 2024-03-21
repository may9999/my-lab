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
    const headers = this.userHeaders();
    return this.http.get<any>(`${environment.apiUrl}/users/${id}`, { headers: headers });
  }

  getUsers(status: string): Observable<any> { // actice - inactive
    const headers = this.userHeaders();
    return this.http.get<any>(`${environment.apiUrl}/users?status=${status}`, { headers: headers });
  }

  addUser(userObj: User) {
    const headers = this.adminHeaders();
    return this.http.post<any>(`${environment.apiUrl}/users/register`, userObj, { headers: headers });
  }

  updateUser(userObj: User, id: string) {
    const headers = this.adminHeaders();
    return this.http.patch<any>(`${environment.apiUrl}/users/${id}`, userObj, { headers: headers });
  }

  activateUser(id: string, activate: boolean) {
    const headers = this.adminHeaders();
    const activeObj = {
      active: activate
    }
    return this.http.put<any>(`${environment.apiUrl}/users//activate/${id}`, activeObj, { headers: headers });
  }

  public getCurrentUserId() {
    return localStorage.getItem(localStoageKeys.ID)? localStorage.getItem(localStoageKeys.ID): '';
  }

  adminHeaders() {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const id = this.getCurrentUserId();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json')
                  .set('current-user', id != null ? id : '');
    return headers;
  }

  userHeaders() {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const id = this.getCurrentUserId();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');
    return headers;
  }
}
