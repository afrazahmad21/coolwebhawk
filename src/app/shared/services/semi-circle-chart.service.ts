import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONFIG } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class SemiCircleChartService {

    constructor(private http: HttpClient) {
     }

    public reportStats(userId: any): Observable<any> {
        return this.http
            .get( `${CONFIG.API_URL}api/user/report-stats?userId=${userId}`)
            .pipe(tap((res) => console.log()));
    }

}
