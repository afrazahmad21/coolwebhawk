import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { NavItem } from '../../../navbar/navigation.model';
import { menuConfiguration } from '../../menu-config';
import { Breadcrumb } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  currentUrl: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlService: UrlService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.setDefaultBreadcrumb();
    this.listenForRouteChange();
    this.listenForBreadcrumbUpdate();
  }

  private setDefaultBreadcrumb() {
    this.setCurrentUrl();

    if (this.currentUrl) {
      let navItem: NavItem = this.findRoute();

      if (navItem) {
        let breadcrumb: Breadcrumb = {
          icon: navItem.iconName,
          name: navItem.displayName,
          url: this.currentUrl,
        };
        this.breadcrumbs.push(breadcrumb);
      }
    }
  }

  private listenForBreadcrumbUpdate() {
    this.breadcrumbService.onUpdate().subscribe((str: string) => {
      this.handleBreadcrumbUpdate(str);
    });
  }

  private handleBreadcrumbUpdate(str: string) {
    //breadcrumb updates only happen on current route
    //so the breadcrumb we need to update is the latest one
    let lastBreadcrumb: Breadcrumb =
      this.breadcrumbs[this.breadcrumbs.length - 1];

    if (lastBreadcrumb.pauseDisplay) {
      lastBreadcrumb.pauseDisplay = false;
      lastBreadcrumb.name = str;
    }
  }

  private listenForRouteChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        distinctUntilChanged()
      )
      .subscribe((route: ActivatedRoute) => this.handleCurrentRoute(route));
  }

  private setCurrentUrl() {
    let url: string = this.router.url;

    if (url) {
      //don't need the query parameter list here
      //nor do we need the initial /
      this.currentUrl = this.urlService.shortenUrlIfNecessary(url.substring(1));
    }
  }

  private handleCurrentRoute(route: ActivatedRoute) {
    this.setCurrentUrl();

    let navItem: NavItem = this.findRoute(menuConfiguration);

    if (navItem) {
      //if we get here, the user clicked on item on the sidebar
      //we'll reset the breadcrumbs to start over
      this.handleTopLevelBreadcrumb(navItem);
    } else {
      //if we get here, the user clicked a link in the main content section
      //we'll add to the breadcrumbs
      this.addBreadcrumb(route);
    }
  }

  private addBreadcrumb(route: ActivatedRoute) {
    if (this.breadcrumbs.length < 6) {
      // @ts-ignore
      let breadcrumb: Breadcrumb = null;

      route.data.subscribe((data: any) => {
        breadcrumb = {
          icon: data.icon,
          name: data.breadcrumb,
          url: this.currentUrl,
          pauseDisplay: data.pauseDisplay,
        };
      });

      if (breadcrumb) {
        //we only add a new breadcrumb if the person isn't visiting a page that's
        //already in the breadcrumbs array
        if (
          breadcrumb.url != this.breadcrumbs[this.breadcrumbs.length - 1]?.url
        ) {
          route.queryParams.subscribe((queryParams: any) => {
            if (queryParams) {
              breadcrumb.queryParams = queryParams;
            }
          });

          this.breadcrumbs.push(breadcrumb);
        }
      }
    }
  }

  private handleTopLevelBreadcrumb(navItem: NavItem) {
    this.breadcrumbs = [];

    let breadcrumb: Breadcrumb = {
      icon: navItem.iconName,
      name: navItem.displayName,
      url: navItem.route,
      
    };
    this.breadcrumbs.push(breadcrumb);
  }

  private findRoute(navItems?: NavItem[]): NavItem {
    if (!navItems) navItems = menuConfiguration;

    // @ts-ignore
    let returnedItem: NavItem = null;

    if (this.currentUrl) {
      for (let item of navItems) {
        if (this.currentUrl == item.route) {
          returnedItem = item;
          break;
        } else if (item.children) {
          returnedItem = this.findRoute(item.children);
          if (returnedItem != null) break;
        }
      }
    }

    return returnedItem;
  }

  routeTo(index: number) {
    if (index < this.breadcrumbs.length - 1) {
      //if the person clicked on a link in the breadcrumbs list,
      //get rid of every breadcrumb after that point
      this.breadcrumbs.splice(index + 1);
    }

    let breadcrumb: Breadcrumb = this.breadcrumbs[index];

    let route = breadcrumb.url;
    this.router.navigate([route], { queryParams: breadcrumb.queryParams });
  }
}
