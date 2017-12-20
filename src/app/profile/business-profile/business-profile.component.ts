import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  helpText() {
    this.router.navigate(['/why-business-profile-imp']);
  }
  viewProfile() {
    this.router.navigate(['/view-business-profile']);
  }
}
