import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // @ts-ignore
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry
      .addSvgIcon(
        'dashboard',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/dashboard.svg'
        )
      )
      .addSvgIcon(
        'light',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/light.svg'
        )
      )
      .addSvgIcon(
        'user',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/user.svg'
        )
      )
      .addSvgIcon(
        'search-clean',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/search-clean.svg'
        )
      )
      .addSvgIcon(
        'mail',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/mail.svg'
        )
      )
      .addSvgIcon(
        'search',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/search.svg'
        )
      )
      .addSvgIcon(
        'reports',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/reports.svg'
        )
      )
      .addSvgIcon(
        'index',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/index.svg'
        )
      )
      .addSvgIcon(
        'chat',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/chat.svg'
        )
      )
      .addSvgIcon(
        'power',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/power-switch.svg'
        )
      );
  }

  public get isUserLoggedIn(): boolean {
    // return this.loginService.isAuthenticated;
    return this.loginService.isLoggedIn();
  }

  public redirectToRoute(route: string) {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
  public logout(route: string) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  public mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  public mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  public isRouterActive(url: string): boolean {
    return this.router.url === `/${url}`;
  }
}
