import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { HawkFormComponent } from './components/hawk-form/hawk-form.component';
import { SearchComponent } from './components/search.component';
import { SubmitSuccessComponent } from './components/submit-success/submit-success.component';
import { SearchRoutingModule } from './search-routing.module';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    SharedModule,
    NgxFileDropModule

  ],
  declarations: [
    SearchComponent,
    HawkFormComponent,
    CategoriesComponent,
    SubmitSuccessComponent,
  ],
})
export class SearchModule {}
