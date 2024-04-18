import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../utils';

@Injectable({ providedIn: 'root' })
export class FormSubmitService {

  private static API_ROUTE = `${CONFIG.API_URL}api/user/form`;
  private static API_FILES_ROUTE = `${CONFIG.API_URL}api/user/upload-files`;

  constructor(private http: HttpClient) {
  }

  public submitForm(formValue: any): Observable<any> {
    return this.http.post(`${FormSubmitService.API_ROUTE}`, {
      ...formValue,
    });
  }

  public filesUpload(files: any): Observable<any> {
    return this.http.post(`${FormSubmitService.API_FILES_ROUTE}`, files);
  }

}
