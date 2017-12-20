import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {
  public helpShow : boolean;
  constructor(private router : Router) { }

  ngOnInit() {
  }
  businessCreate() {
    this.router.navigate(['/business-profile']);
  }
  userProfile() {
    this.router.navigate(['/user-profile']);
  }
  addLoc() {
    this.router.navigate(['/add-location']);
  }
  addNewLoc() {
    this.router.navigate(['/add-new-location']);
  }
  helpText() {
    this.helpShow = !this.helpShow;
   // alert(this.helpShow)
   }
}
