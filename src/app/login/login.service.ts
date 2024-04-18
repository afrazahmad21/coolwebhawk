import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { User } from './login.model';
import { CONFIG } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private static LOGIN_URL = `${CONFIG.API_URL}api/user/login`;
  public isAuthenticated = false;

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(LoginService.LOGIN_URL, { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  public register(email: string, password: string) {
    return this.http
      .post('https://reqres.in/api/register', { email, password })
      .subscribe();
      
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration(): Moment {
    const expiration = localStorage.getItem('expires_at');
    let expiresAt: string;
    if (!!expiration) {
      expiresAt = JSON.parse(expiration);
    } else {
      const date = new Date();

      expiresAt = date.setSeconds(date.getSeconds() - 1).toString(); // TODO debug possibly buggy code
    }
    return moment(expiresAt);
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.data.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.data.token);
    localStorage.setItem('userId', authResult.data.user._id);
    localStorage.setItem('user_data', JSON.stringify(authResult.data.user));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
