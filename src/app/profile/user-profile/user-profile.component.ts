import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public helpShow : boolean;
  constructor(private router : Router) { }
  
  ngOnInit() {
   // this.helpShow = true;
  }
  addLoc() {
    this.router.navigate(['/add-location']);
  }
  helpText() {
   this.helpShow = !this.helpShow;
  // alert(this.helpShow)
  }
}
