import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { hawkScope } from '../../../shared/constants';
import { HawkScope } from '../../../shared/models/hawk-scope.model';

@Component({
  selector: 'app-hawk-form',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public hawkScopes: HawkScope[] = hawkScope;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry
      .addSvgIcon(
        'individual',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/icons/individual.svg')
      )
      .addSvgIcon(
        'building',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../assets/icons/building.svg'
        )
      )
      .addSvgIcon(
        'chart',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './../assets/icons/chart.svg'
        )
      );
  }

  ngOnInit(): void {}

  public redirectToForm(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
