import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONFIG } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) { }

    public reports(userId: any): Observable<any> {
        return this.http
            .get(`${CONFIG.API_URL}api/user/report-data?userId=${userId}`)
            .pipe(tap((res) => console.log(res)));
    }
    reportDownload(userId: any): any {
		return this.http.get(`${CONFIG.API_URL}api/user/download-report?userId=${userId}`, {responseType: 'blob'});
  }
}
