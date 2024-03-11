import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment, localStoageKeys } from './../../../environments/environment';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, pass: string): Observable<boolean> {
    const body = { email: email, password: pass};
    
    return this.http.post<any>(`${environment.apiUrl}/usr/login`, body )
      .pipe(
        tap(res => this.storeInStorage(res)),
        mapTo(true),
        catchError(error => {
          return of(false);
    }));
  }

  logout(): Observable<boolean> {
    const token = this.getRefreshToken();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');

    return this.http.post<any>(`${environment.apiUrl}/usr/logout`, null, 
    { headers: headers })
      .pipe(tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
      }));
  }

  // forgotPass(userName: string, email: string ): Observable<boolean> {
  //   const body = { username: userName, email };
  //   return this.http.post<any>(`${environment.apiUrl}/forgot`, body )
  //     .pipe(
  //       tap(res => this.storeInStorage(res)),
  //       mapTo(true),
  //       catchError(error => {
  //         return of(false);
  //       }));
  // }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    const token = this.getRefreshToken();
    const headers = new HttpHeaders()
                  .set('Authorization', [token != null ? token : ''])
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');

    return this.http.post<any>(`${environment.apiUrl}/usr/token`, null, 
    { headers: headers } )
      .pipe(tap((tokens: Tokens) => {
      this.storeRefreshToken(tokens.accessToken);
    }));
  }

  getJwtToken() {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
    } else {
      return false;
    }
  }

  private doLogoutUser() {
    localStorage.removeItem(localStoageKeys.ID);
    localStorage.removeItem(localStoageKeys.REFRESH_TOKEN);
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(localStoageKeys.REFRESH_TOKEN);
  }

  private storeRefreshToken(jwt: string) {
    localStorage.setItem(localStoageKeys.REFRESH_TOKEN, jwt);
  }

  private storeInStorage(res: any) {
    localStorage.setItem(localStoageKeys.ID, res.userObj.id);
    localStorage.setItem(localStoageKeys.JWT_TOKEN, res.accessToken);
    localStorage.setItem(localStoageKeys.REFRESH_TOKEN, res.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(localStoageKeys.JWT_TOKEN);
    localStorage.removeItem(localStoageKeys.REFRESH_TOKEN);
  }

  // changePassword(oldPass: string, newPass: string){
  //   const headers = new HttpHeaders()
  //                 .set('Authorization', ['Bearer ' + localStorage.getItem(localStoageKeys.REFRESH_TOKEN)])
  //                 .set('Content-Type', 'application/json')
  //                 .set('Accept', 'application/json');

  //   const body = {
  //     oldPass: oldPass,
  //     newPass: newPass
  //   };

  //   return this.http.post<any>(`${environment.apiUrl}/users/change-password/` + localStorage.getItem(localStoageKeys.ID), {
  //     body }, { headers: headers})
  //     .pipe(
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
  //       return of(false);
  //     }));
  // }
}
