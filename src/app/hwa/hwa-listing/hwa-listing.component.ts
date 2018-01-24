import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HwaCommonService} from '../../services/hwa-common.service';

@Component({
  selector: 'app-hwa-listing',
  templateUrl: './hwa-listing.component.html',
  styleUrls: ['./hwa-listing.component.css']
})
export class HwaListingComponent implements OnInit {
  allListofHwa = [];
  expiredHwa = [];
  draftHwa = [];
  leftDays: number;
  noData: string;
  activeData: string;
  isPassed: boolean;
  constructor(private hwaService: HwaCommonService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.fetchAllHwa();
  }
  // fetchAllHwa
  fetchAllHwa() {
    const obj = {
      'uid': '2037'
    };
    this.hwaService.getAllHWAList(2090).subscribe(
      res => {
        console.log(res);
        this.allListofHwa = res.hwa_published;
        this.expiredHwa = res.hwa_expired_listing;
        this.draftHwa = res.hwa_draft;

        for (let i = 0; i < res['hwa_published'].length; i++) {
          const val1 = res['hwa_published'][i].field_extend_from_date;
          const val2 = res['hwa_published'][i].field_extend_to_date;
          this.leftDays = this.getDiffrencedays(val1, val2);
          if (this.leftDays < 4) {
            this.noData = 'No';
          }
          if (this.leftDays > 3) {
            this.activeData = 'Yes';
          }
        }
      }
    );
  }
  // get days
  getDiffrencedays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; //  hours*minutes*seconds*milliseconds.
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    let currDate = new Date();
    if (firstDate.getTime() > currDate.getTime()) {
      currDate = firstDate;
    } else {
      currDate = new Date();
    }
    const diffDays = Math.round(Math.abs((currDate.getTime() - secondDate.getTime()) / (oneDay)));
    return diffDays;
  }
  // Timestamp to Human
  humanReadableTime(timestamp) {
    return new Date(timestamp * 1000);
  }

  // Edit HWA
  editHwa() {
  this.router.navigate(['edit-hwa']);
  }

}
