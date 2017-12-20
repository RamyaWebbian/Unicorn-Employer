import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  public helpShow : boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  userProfileView() {
    this.router.navigate(['/user-profile-view']);
  }
  helpText() {
    this.helpShow = !this.helpShow;
  }
}
