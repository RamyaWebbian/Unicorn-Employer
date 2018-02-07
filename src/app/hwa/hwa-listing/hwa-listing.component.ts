import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HwaCommonService, HoldDataService, UserService} from '../../services/index';
declare var $: any;
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
  popupHwaId;
  hwaID4Preview;
  jobTitle;
  describeUrJob;
  typeOfPosition;
  previewKo = [];
  previewSkill = [];
  previewBusinessProfile = [];
  previewBname;
  previewNooFHire;
  previewLocationLength;
  PreviewJobType;
  previewLocations = [];
  previewLoad: boolean;
  constructor(private hwaService: HwaCommonService,
              private userService: UserService,
              private holdDataService: HoldDataService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.fetchAllHwa();

  }
  // Discard Saved Ads
  discardAd(hwaId) {
    this.popupHwaId = hwaId;
  }
  discardHwa() {
    const discardHwaObj = {
      'hwa_nid': [this.popupHwaId]
    };
    this.hwaService.discardHwa(discardHwaObj)
      .subscribe(res => {
        this.popupHwaId = '';
        if (res['hwa_discard'] === 'deleted') {
          this.fetchAllHwa();
          this.holdDataService.setMessage({
            msg: 'Deleted Successfully',
            sucsess: true
          });
        }
        $('#confirmModal').modal('hide');
      });
  }
  // Get HWA ID
  getHwaId(hwaIDPre) {
    this.previewLoad = false;
    this.hwaID4Preview = hwaIDPre;
    this.loadPreviewData();
    this.loadKoPreviewData();
    this.loadSkillPreviewData();
    this.loadBusinessProfile();
  }
  // Load Preview Data
  loadPreviewData() {
    const user = this.userService.isLogedin();
    this.hwaService.loadDraftData(this.hwaID4Preview, user.uid).subscribe(
      res => {
        this.previewNooFHire = res['field_how_many_people_do_you_nee'][0].value;
        this.previewLocationLength = res['field_which_location_s_are_you_h'].length;
        this.previewLocations = res['field_which_location_s_are_you_h'];
        this.jobTitle = res.title[0].value;
        this.PreviewJobType = res['field_will_they_be_full_time_par'][0].value;
        this.describeUrJob = res.field_how_would_you_describe_thi[0].value;
        this.previewLoad = true;

      }, error => {
        console.log(error);
      });
  }
  // Ko Data 4 Preview
  loadKoPreviewData() {
    const user = this.userService.isLogedin();
    this.hwaService.loadkosDraftData(this.hwaID4Preview, user.uid).subscribe(
      res => {
        this.previewKo = res;
      }, error => {
        console.log(error);
    });
  }
  // Skill & Exp
  loadSkillPreviewData() {
    const user = this.userService.isLogedin();
    this.hwaService.loadSkillsDraftData(this.hwaID4Preview, user.uid).subscribe(
      res => {
        this.previewSkill = res;
      }, error => {
        console.log(error);
      });
  }
  //
  //
  loadBusinessProfile() {
    const user = this.userService.isLogedin();
    const obj = {
      'uid': user.uid
    };
    this.userService.accesData(obj).subscribe(
      res => {
        this.previewBname = res['details']['field_name_of_your_business'][0].value;
        const businessId = {
          'bptnid': res['business_profile_id'][0].nid
        };
        this.hwaService.getBusinessTopic(businessId).subscribe(
          bus => {
            this.previewBusinessProfile = bus.business_topic;
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
      });
  }
  // fetchAllHwa
  fetchAllHwa() {
    const user = this.userService.isLogedin();
    if (user == null) {
      return false;
    }
    this.hwaService.getAllHWAList(user.uid)
      .subscribe(res => {
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
      });
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

helpText() {

}

}
