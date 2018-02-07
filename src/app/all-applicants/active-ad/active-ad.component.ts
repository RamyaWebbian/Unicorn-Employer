import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../services/all-applicant-services.service';

import { HoldDataService } from '../../services/index';
@Component({
  selector: 'app-active-ad',
  templateUrl: './active-ad.component.html',
  styleUrls: ['./active-ad.component.css','../all-applicants.css']
})
export class ActiveAdComponent implements OnInit  {

  public listData = [];
  public listData2 = [];
  public HwaId;
  public pageLoded: boolean;
  public status = 'Sort by Ad';
  public  order = 'expirydate';
  public ascending: boolean;
  noactive: boolean;
  noexpired: boolean;
  ActiveArray = [];
  ExpiredArray = [];
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(
    private allApplicantApi: AllApplicantServicesService,
    private userservice: UserService,
    private router: Router,
    private holdDataService: HoldDataService,
  ) { }

  ngOnInit() {
    this.fetchList();

  }

  // Get List of All active HWA that applicant applied
  fetchList() {
    const user = this.userservice.isLogedin();
    const empid = {'uid': user.uid };
    this.allApplicantApi.summeryOfActiveHwa(empid).subscribe(
      res => {
        
        this.listData = res.active;
        this.listData2 = res.expired;
        console.log(this.listData);
        this.pageLoded = true;
        for ( let i = 0; i < res.active.length; i++) {
          if (res.active[i].total_application !== 0) {
            this.ActiveArray.push(res.active[i].total_application);
          }
        }
        if (this.ActiveArray.length === 0) {
          this.noactive = true;
        }

        for ( let i = 0; i < res.expired.length; i++) {
          if (res.expired[i].total_application !== 0) {
            this.ExpiredArray.push(res.expired[i].total_application);
          }
        }
        if (this.ExpiredArray.length === 0) {
          this.noexpired = true;
        }
      }
    );
  }
  downloadxsl() {
    const user = this.userservice.isLogedin();
    window.open('http://dev-hwaredesign.pantheonsite.io/export_hwa_summary.json?uid=' + user.uid);
  }
 
  // Get HwaIdInfo
  whoApplied() {
    this.router.navigate(['applicants-list', 1004]);
  }

  // Shorting Pipes
  shortBy() {
    if  (this.status === 'Sort by Expiration Date') {
      this.status = 'Sort by Ad';
      this.order = 'expirydate';
      this.ascending = true;
      this.holdDataService.setMessage({
        msg: 'Sort by Expiration Date!, List Sorted by Expiration Date!',
        sucsess: true
      });
    } else {
      this.status = 'Sort by Expiration Date';
      this.order = 'title';
      this.ascending = true;

      this.holdDataService.setMessage({
        msg: 'Sort by Ad!, List sorted alphabetically!',
        sucsess: true
      });
    }
  }
}

//,'../../hwa/only-hwa.css'