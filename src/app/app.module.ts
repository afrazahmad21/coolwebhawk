import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HawksTableComponent } from './dashboard/components/hawks-table/hawks-table.component';
import { NewsComponent } from './dashboard/components/news/news.component';
import { MenuComponent } from './navbar/components/menu/menu.component';
import { NavbarComponent } from './navbar/components/navbar.component';
import { TopRowComponent } from './navbar/components/top-row/top-row.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    TopRowComponent,
    MenuComponent,
    HawksTableComponent,
    NewsComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
