import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, HwaCommonService } from '../../services/index';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
public greeting = '';
  constructor(
    private router: Router,
    private userService:UserService,
    private hwaCommonService:HwaCommonService,
    ) { }

  ngOnInit() {
     const user = this.userService.isLogedin();
   this.getGreetingInfo(user);
   // this.getCountOfHWA(user.uid);
  }

getGreetingInfo(user) {
    if (user) {
      const d = new Date();
      const hrs = d.getHours();
      let msg = '';
      if (hrs < 12) {
        msg = 'Good Morning';
      } else if (hrs >= 12 && hrs < 16) {
        msg = 'Good Afternoon';
      } else if (hrs >= 16 && hrs <= 24) {
        msg = 'Good Evening';
      }
      console.log(user.full_name)
      this.greeting = msg + ' ' + user.full_name; //user['details'].field_first_name[0]['value'];
    } else {
     // this.router.navigate(['/login']);
    }
  }

}
