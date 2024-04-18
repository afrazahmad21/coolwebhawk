import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData: any
  data: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userData = localStorage.getItem('user_data');
    this.data = JSON.parse(this.userData)
  }
  public redirectToRoute(route: string) {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
  ngOnInit(): void {
    
  }

}
