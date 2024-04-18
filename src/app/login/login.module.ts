import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginParentComponent } from './components/login-base/login-parent.component';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
  ],
  declarations: [LoginParentComponent, LoginComponent],
})
export class LoginModule {}
