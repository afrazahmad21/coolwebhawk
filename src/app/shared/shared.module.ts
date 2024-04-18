import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BreadcrumbComponent } from './components/breadcrumbs/breadcrumbs.components';
import { SemiCircleChartComponent } from './components/semi-circle-chart/semi-circle-chart.component';
import { HttpErrorInterceptor } from './errors/http-error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MaterialModule } from './material.module';
import { ErrorSnackbarService } from './services/error-snackbar.service';
import { IconsService } from './services/icons.service';

@NgModule({
  declarations: [SemiCircleChartComponent, BreadcrumbComponent],
  imports: [
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RoundProgressModule,
  ],
  exports: [
    //components
    SemiCircleChartComponent,
    BreadcrumbComponent,

    // modules
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RoundProgressModule
  ],
  providers: [
    IconsService,
    ErrorSnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class SharedModule { }
