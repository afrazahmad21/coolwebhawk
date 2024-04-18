import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../dashboard.service'
import { catchError } from 'rxjs';
import { saveAs } from 'file-saver';

interface HawkTable {
  id: number;
  reportName: string;
  status: number;
  flag: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-hawks-table',
  templateUrl: './hawks-table.component.html',
  styleUrls: ['./hawks-table.component.scss'],
})
export class HawksTableComponent implements OnInit {
  reportData: any;
  userData: any
  displayedColumns: string[] = [
    'select',
    'formId',
    'flag',
    'status',
    'date',
    'time',
    'action'
  ];
  dataSource = new MatTableDataSource<HawkTable>([]);
  selection = new SelectionModel<HawkTable>(true, []);

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.userData = localStorage.getItem('userId');
  }

  public ngOnInit() {
    this.reportsData();
  }

  public reportsData() {
    const userId = this.userData
    this.dashboardService
      .reports(userId)
      .pipe(
        catchError(async (err) => console.log(err))
      )
      .subscribe((res) => this.dataSource.data = res.data);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
        this.selection.select(row)
      });
  }

  public logSelection() {
    this.selection.selected.forEach((s) => console.log(s.reportName));
  }

  public generateRandomPercentage(status: number): string {
    return `${status}%`;
  }
  downloadReport(element: any) {
    if (!element.fileUrl) {
      return;
    }
    const formId = element.formId
    this.dashboardService.reportDownload(formId).subscribe((response: any) => {
      console.log(response.type)
      let blob: any = new Blob([response], { type: response.type });
      saveAs(blob, formId.type);
    }), (error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

}
