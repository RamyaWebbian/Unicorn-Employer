import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, HwaCommonService } from '../../services/index';
import {AllApplicantServicesService} from '../../applicants_status/services/all-applicant-services.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
public greeting = '';
  public pageLoded: boolean;
  public enableAllApplicant = true;
  public enableInterview = true ;
  public enableOffer = true ;
  public disable: boolean;
  public editDisableMode: boolean;
  public expireDisableMode: boolean;
  private hwaCounter = 0;
  public editHwaCounter = 0;
  public expireHwaCounter = 0;
  ifHwaexist: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private hwaCommonService: HwaCommonService,
    private allApplicantService: AllApplicantServicesService
    ) { }

  ngOnInit() {
     const user = this.userService.isLogedin();
     console.log(user)
     if(user.business_address_created == 'no'){
      this.router.navigate(['user-profile']); // add-location
     }else if(user.business_profile_created == 'no'){
       this.router.navigate(['business-profile']); // business-profile
     }
   this.getGreetingInfo(user);
   this.getCountOfHWA(user.uid);
  }
  //


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
      this.greeting = msg + ' ' + user.full_name; // user['details'].field_first_name[0]['value'];
    } else {
     // this.router.navigate(['/login']);
    }
  }
  enableApplicant(uid) {
    const empid = {'uid': uid };
    this.allApplicantService.checkQuardrantInfo(empid).subscribe(
      res => {
        console.log(res)
        for (let i = 0; i < res.applicant_status.length ; i++) {
          if (res.applicant_status[i]['value'] === 'Yes') {
            this.enableAllApplicant = false;
            break;
          } else {
            this.enableAllApplicant = true;
          }
        }
        for (let i = 0; i < res.interview.length ; i++) {
          if (res.interview[i]['value'] === 'Yes') {
            this.enableAllApplicant = false;
            this.enableInterview = false;
            break;
          } else {
            this.enableInterview = true;
          }
        }

        for (let i = 0; i < res.offer.length ; i++) {
          if (res.offer[i]['value'] === 'Yes') {
            this.enableOffer = false;
            break;
          } else {
            this.enableOffer = true;
          }
        }

        this.pageLoded = true;
      }
    );
  }
  private getCountOfHWA(uid) {
    const obj = {
      'uid': uid,
      'status_published': 'Published',
      'status_draft': 'Draft',
      'status_expired': 'Expired'
    };
    this.hwaCommonService.loadCountOfHwa(obj).subscribe(
      res => {
        if ((res['Hwa_counter_published'] !== 0) || (res['Hwa_counter_Draft'] !== 0) || (res['hwa_count_expired'] !== 0)) {
          this.ifHwaexist = 'all-hwa-list';
        } else {
          this.ifHwaexist = 'hwa-basic-info';
        }
        if ((res['Hwa_counter_published'] === 0) && (res['Hwa_counter_Draft'] === 0) && (res['hwa_count_expired'] === 0)) {
          this.hwaCounter = 0;
          this.disable = true;
          this.expireHwaCounter = 0;
          this.expireDisableMode = true;
          this.editHwaCounter = 0;
          this.editDisableMode = true;
        } else if ((res['Hwa_counter_published'] === 0) && (res['Hwa_counter_Draft'] > 0)) {
          this.hwaCounter = Number(res['Hwa_counter_Draft']);
          this.disable = false;
          this.editHwaCounter = Number(res['Hwa_counter_Draft']);
          this.editDisableMode = false;

          this.expireHwaCounter = 0;
          this.expireDisableMode = true;

        } else if (res['Hwa_counter_published'] > 0) {
          this.hwaCounter = Number(res['Hwa_counter_published']);
          this.disable = false;
          this.editHwaCounter = Number(res['Hwa_counter_published']);
          this.editDisableMode = false;
          this.expireHwaCounter = Number(res['Hwa_counter_published']);
          this.expireDisableMode = false;
        } else if ((res['Hwa_counter_published'] === 0) && (res['Hwa_counter_Draft'] === 0) && (res['hwa_count_expired'] > 0)) {
          this.hwaCounter = Number(res['hwa_count_expired']);
          this.disable = false;

          this.editHwaCounter = 0;
          this.editDisableMode = true;
          this.expireHwaCounter = 0;
          this.expireDisableMode = true;
        }
        this.enableApplicant(uid);
      });
  }
  createHWA(ifHwaexist) {
    this.router.navigate([ifHwaexist]);
  }
  allApplicant() {
    this.router.navigate(['active-ad']); /* Ramya */
  }
  goToInterview() {
    this.router.navigate(['interviewed-list']);
  }
  goToOffer() {
    this.router.navigate(['offered-hwa-list']);
  }
  moreThings() {
    // this.router.navigate(['profile']);
  }

}
