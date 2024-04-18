import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorSnackbarService } from '../services/error-snackbar.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  private LOGOUT_URL = `/api/v1.0/authentication/logout`;
  private LOGIN_URL = '/login/';

  constructor(
    private http: HttpClient,
    private errorSnackbarService: ErrorSnackbarService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event) => event,
        // @ts-ignore
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.logout();
          } else if (err.status === 410) {
            const errMsg = 'Please contact hawk and purchase reports.';
            const errAction = 'OK';
            this.errorSnackbarService.showSnackBar(errMsg, errAction);
            return throwError(err);
          }
          else {
            const errMsg = 'Oops something went wrong please try again later.';
            const errAction = 'OK';
            this.errorSnackbarService.showSnackBar(errMsg, errAction);
            return throwError(err);
          }
        }
      )
    );
  }

  private logout(browserWindow: Partial<Window> = window) {
    this.http.post(this.LOGOUT_URL, {}).subscribe(
      () => {
        this.redirectToLoginPage(browserWindow);
      },
      (err) => {
        console.error('logout failed:', err);
        this.redirectToLoginPage(browserWindow);
      }
    );
  }

  private redirectToLoginPage(browserWindow: Partial<Window> = window): void {
    // @ts-ignore
    browserWindow.location.assign(this.LOGIN_URL);
  }
}
