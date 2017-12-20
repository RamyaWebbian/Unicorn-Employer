import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css']
})
export class AddNewLocationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  userProfileView() {
    this.router.navigate(['/user-profile-view']);
  }
}
