import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './submit-success.component.html',
  styleUrls: ['./submit-success.component.scss'],
})
export class SubmitSuccessComponent implements OnInit {
  constructor(private router: Router,
  ) {
  }

  ngOnInit(): void {
    console.log('kurov mi');
  }
  redirectToSuccessPage() {
    this.router.navigateByUrl('/dashboard');
  }
}
