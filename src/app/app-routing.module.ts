import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { SearchComponent } from './search/components/search.component';
import { AuthGuard } from './shared/guards/auth.guard';

const loginModule = () =>
  import('./login/login.module').then((x) => x.LoginModule);
const searchModule = () =>
  import('./search/search.module').then((x) => x.SearchModule);

const routes: Routes = [
  { path: 'login', loadChildren: loginModule },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      breadcrumb: 'Search',
    },
    canActivate: [AuthGuard],
    loadChildren: searchModule,
  },
  // otherwise, redirect to home
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
