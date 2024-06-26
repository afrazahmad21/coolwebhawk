import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  userData: any
  data: any;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.userData = localStorage.getItem('user_data');
    this.data = JSON.parse(this.userData)
    matIconRegistry
      .addSvgIcon(
        'dashboard',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/dashboard.svg'
        )
      )
      .addSvgIcon(
        'dashboard',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/icons/dashboard.svg'
        )
      );
      console.log(this.data)
  }
}

