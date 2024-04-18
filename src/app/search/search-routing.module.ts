import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { HawkFormComponent } from './components/hawk-form/hawk-form.component';
import { SearchComponent } from './components/search.component';
import { SubmitSuccessComponent } from './components/submit-success/submit-success.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: '',
        component: CategoriesComponent,
        data: {
          breadcrumb: 'Search',
        },
      },
      {
        path: 'success',
        component: SubmitSuccessComponent,
        data: {
          breadcrumb: 'Successful Submit',
        },
      },
      {
        path: 'Individual',
        component: HawkFormComponent,
        data: {
          breadcrumb: {
            routeInterceptor: (routeLink: any) => {
              return routeLink;
            },
            info: 'Individual',
          },
        },
      },
      {
        path: 'Company',
        component: HawkFormComponent,
        data: {
          breadcrumb: {
            routeInterceptor: (routeLink: any) => {
              return routeLink;
            },
            info: 'Company',
          },
        },
      },
      {
        path: 'Other',
        component: HawkFormComponent,
        data: {
          breadcrumb: {
            routeInterceptor: (routeLink: any) => {
              return routeLink;
            },
            info: 'Other',
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
