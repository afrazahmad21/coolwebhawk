import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry
      .addSvgIcon(
        'dashboard',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../../../assets/icons/dashboard.svg'
        )
      )
      .addSvgIcon(
        'search',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../../../assets/icons/search.svg'
        )
      )
      .addSvgIcon(
        'reports',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../../../assets/icons/reports.svg'
        )
      )
      .addSvgIcon(
        'index',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../../../assets/icons/index.svg'
        )
      )
      .addSvgIcon(
        'chat',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../../../assets/icons/chat.svg'
        )
      );
  }
}
