import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { SemiCircleChartService } from '../../services/semi-circle-chart.service'

@Component({
  selector: 'app-semi-circle-chart',
  templateUrl: './semi-circle-chart.component.html',
  styleUrls: ['./semi-circle-chart.component.scss'],
})
export class SemiCircleChartComponent implements OnInit {
  reportStats: any;
  userData: any
  constructor(
    private semiCircleChartService: SemiCircleChartService,
  ) {
    this.userData = localStorage.getItem('userId');
   }

  public ngOnInit() { 
    this.reportsData();
  }

  public reportsData() {
    const userId = this.userData
    this.semiCircleChartService
      .reportStats(userId)
      .pipe(
        catchError(async (err: any) => console.log(err))
      )
      .subscribe((res: { data: any; }) => {
        this.reportStats = res.data
        console.log(this.reportStats)
      });
  }
}
