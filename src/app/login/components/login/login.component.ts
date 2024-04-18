import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  public loginFormGroup: FormGroup;
  public viewPass = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry
      .addSvgIcon(
        'eye',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/eye.svg'
        )
      )
      .addSvgIcon(
        'eye-crossed',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/eye-crossed.svg'
        )
      );
  }

  public ngOnInit() {
    this.initLoginFormGroup();
  }

  public login() {
    const val = this.loginFormGroup.value;

    if (val.email && val.password) {
      this.loginService
        .login(val.email, val.password)
        .pipe(
          catchError(() => this.router.navigateByUrl('/login')) // TODO remove when api is ready
        )
        .subscribe(() => this.router.navigateByUrl('/dashboard'));
      this.loginService.isAuthenticated = true;
    }
  }

  public togglePassView() {
    this.viewPass = !this.viewPass;
  }

  public activateForgotPassProcedure() {
    console.log('nothing here');
  }

  private initLoginFormGroup() {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
