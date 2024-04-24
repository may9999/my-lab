import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, localStoageKeys } from '../../../environments/environment';
import { Order } from '../models/order';
import { ClinicalStudy } from '../models/clinical.study';

@Injectable({
  providedIn: 'root'
})
export class ClinicalStudiesService {
  constructor(private http: HttpClient) {}

  // getUser(id: string): Observable<any> {
  //   const headers = this.userHeaders();
  //   return this.http.get<any>(`${environment.apiUrl}/users/${id}`, { headers: headers });
  // }

  getClinicalStudies(status: string): Observable<any> { // actice - inactive
    const headers = this.userHeaders();
    return this.http.get<any>(`${environment.apiUrl}/studies?status=${status}`, { headers: headers });
  }

  addStudy(studyObj: ClinicalStudy) {
    const headers = this.adminHeaders();
    return this.http.post<any>(`${environment.apiUrl}/studies`, studyObj, { headers: headers });
  }

  updateStudy(studyObj: ClinicalStudy, id: string) {
    const headers = this.adminHeaders();
    return this.http.patch<any>(`${environment.apiUrl}/studies/${id}`, studyObj, { headers: headers });
  }

  // activateUser(id: string, activate: boolean) {
  //   const headers = this.adminHeaders();
  //   const activeObj = {
  //     active: activate
  //   }
  //   return this.http.put<any>(`${environment.apiUrl}/users//activate/${id}`, activeObj, { headers: headers });
  // }

  private getCurrentUserId() {
    return localStorage.getItem(localStoageKeys.ID)? localStorage.getItem(localStoageKeys.ID): '';
  }

  private adminHeaders() {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const id = this.getCurrentUserId();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json')
                  .set('current-user', id != null ? id : '');
    return headers;
  }

  private userHeaders() {
    const token = localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    const id = this.getCurrentUserId();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');
    return headers;
  }
}
