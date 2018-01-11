import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-success',
  templateUrl: './forgot-success.component.html',
  styleUrls: ['./forgot-success.component.css']
})
export class ForgotSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
