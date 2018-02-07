import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/index';
import { HwaCommonService } from '../services/hwa-common.service';
import {DOCUMENT, SafeUrl} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-active-hwa',
  templateUrl: './active-hwa.component.html',
  styleUrls: ['./active-hwa.component.css', '../all-applicants/all-applicants.css']
})
export class ActiveHwaComponent implements OnInit {
  public testActive: string;
  public subscription: Subscription;

  public position: any;
  public posType: any;
  public describePos: any;
  public describeSkill: any;
  public City: any[];
  public address1: any;
  public address2: any;
  public address3: any;

  public companyname = '';
  public cityName = '';
  public stateName = '';
  public shoBasicHwa = false;
  public locationLenght: any;

  public noOfPosition: number;
  public showProfile: boolean;
  public addressLenght: number;
  public proFileObj: any;
  public image1Url: any;
  public image2Url: any;
  public image3Url: any;
  public image4Url: any;

  public titalText1: any;
  public titalText2: any;
  public titalText3: any;
  public titalText4: any;

  public bodyText1: any;
  public bodyText2: any;
  public bodyText3: any;
  public bodyText4: any;

  public HwaIdApplyNow;
  public activejobad: boolean;
  public hwaMessage;
  public pageLoded: boolean;
  public hideEntireBP: boolean;
  public hide4th: boolean;
  private scriptA;
  public applicantUrl: SafeUrl;
  public locationId: any;
  public validHwa: boolean;
  public islocationId: boolean;

  constructor(
    // private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private hwaServices: HwaCommonService,
    private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.scriptA = this._renderer2.createElement('script');
    this.scriptA.type = 'text/javascript';
    this.scriptA.src = 'https://click.appcast.io/pixels/talentrackr1-3992.js?ent=145';
    this._renderer2.appendChild(this._document.getElementById('Neeraj'), this.scriptA);
    //////////////////////////////////////////////////////////
    this.testActive = 'active';
    //  let user = this.userService.isLogedin();
    //  this.companyname =' ' // user.details.field_name_of_your_business[0].value;

    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        //  console.log(param['totalAmt']);
        if (param['hwa_id']) {
          this.HwaIdApplyNow = param['hwa_id'];
          // this.paymentAmt = param['frmpaypal'];
          this.showAllDataOfHwa(param['hwa_id']);
           this.validHwa = true;
        }
        if ( param['locationId']) {
          this.validHwa = false;
          this.islocationId = true;
          this.locationId = param['locationId'];
        }
      });
    if (this.locationId !== undefined) {
      this.applicantUrl = 'http://tushar.hurekadev.info/landing/' + this.HwaIdApplyNow + '/' + this.locationId;
    } else {
      this.applicantUrl = 'http://tushar.hurekadev.info/landing/' + this.HwaIdApplyNow + '/' + 'Loc';
    }

  }

  applyNow() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {

       // localStorage.setItem('applicantHWAToken', this.HwaIdApplyNow = param['hwa_id']);
        this.router.navigate(['http://tushar.hurekadev.info/landing']);
        this.router.navigate(['http://tushar.hurekadev.info/landing/']);
      });
  }
  public showAllDataOfHwa(hwaid) {
    const hwaObj = {
      'hwa_nid': hwaid
    };

    this.hwaServices.getAllDataOfHwa(hwaObj).subscribe(
      res => {
        console.log(res);
        if (res['Hwa']) {
          const a = res.business_profile.field_image1 === undefined;
          const b = res.business_profile.field_image2 === undefined;
          const c = res.business_profile.field_image3 === undefined;
          const d = res.business_profile.field_image4 === undefined;
          if (a && b  && c && d) {
            this.hideEntireBP = true;
          } else {
            this.hideEntireBP = false;
          }

          if (res.business_profile.field_image4 === undefined) {
            this.hide4th = true;
          } else {
            this.hide4th = false;
          }

          // this.activejobad = false;
          this.hwaMessage = 'This HWA doesn\'t exist';
          if (res.stop_resume_status[0].field_stop_resume === 'Stop' || res.hwa_post_ads_status[0].field_post_ads_status === 'Expired'  || res.hwa_post_ads_status[0].field_post_ads_status === 'Draft'  ) {

          }  else {
            this.hwaMessage = '';
            this.shoBasicHwa = true;
            this.City = [];
            this.addressLenght = res['Hwa'].field_which_location_s_are_you_h.length;
            this.locationLenght = res['Hwa'].field_which_location_s_are_you_h.length;
            this.companyname = res['business'];
            this.position = res['Hwa'].title[0].value;
            this.posType = res['Hwa'].field_will_they_be_full_time_par[0].value;
            this.noOfPosition = Number(res['Hwa'].field_how_many_people_do_you_nee[0].value);

            if (this.locationLenght > 0) {
              this.City = [];
              this.City = res['Hwa'].field_which_location_s_are_you_h;
              this.address1 = '';
              this.address2 = '';
              this.address3 = '';
if (this.islocationId) {
    for (let i = 0; i < this.City.length; i++) {
        if (this.locationId === this.City[i].nid[0].value) {
          this.validHwa = true;
        }

    }
    }
            } else if (this.locationLenght === 1) {
              this.validHwa = true;
            }

            this.describePos = res['Hwa'].field_how_would_you_describe_thi[0].value;
            this.describeSkill = res['Hwa'].field_describe_the_skills_and_ex[0].value;
            if (res['Hwa'].field_which_location_s_are_you_h.length === 1) {
              this.City = [];
              if (res['Hwa'].field_which_location_s_are_you_h[0].field_city[0].value) {
                this.address1 = res['Hwa'].field_which_location_s_are_you_h[0].field_city[0].value + ',';
              } else {
                this.address1 = res['Hwa'].field_which_location_s_are_you_h[0].field_city[0].value;
              }
              if (res['Hwa'].field_which_location_s_are_you_h[0].field_city[0].value) {
                this.address2 = res['Hwa'].field_which_location_s_are_you_h[0].field_state[0].value + ',';
              } else {
                this.address2 = res['Hwa'].field_which_location_s_are_you_h[0].field_state[0].value;
              }
              if (res['Hwa'].field_which_location_s_are_you_h[0].title[0].value) {
                this.address3 = res['Hwa'].field_which_location_s_are_you_h[0].title[0].value + ',';
              } else {
                this.address3 = res['Hwa'].field_which_location_s_are_you_h[0].title[0].value;

              }
            } else {
              this.address1 = '';
              this.address2 = '';
              this.address3 = '';
            }
            if (res['business_profile']) {
              this.showProfile = true;
              this.proFileObj = res['business_profile'];

              if (this.proFileObj.field_image1) {
                this.image1Url = this.proFileObj.field_image1[0].url;
              } else {
                this.image1Url = '';
              }
              if (this.proFileObj.field_image2) {
                this.image2Url = this.proFileObj.field_image2[0].url;
              } else {
                this.image2Url = '';
              }
              if (this.proFileObj.field_image3) {
                this.image3Url = this.proFileObj.field_image3[0].url;
              } else {
                this.image3Url = '';
              }
              if (this.proFileObj.field_image4) {
                this.image4Url = this.proFileObj.field_image4[0].url;
              } else {
                this.image4Url = '';
              }
              // -------------------------sssss---------------------------------------
              if (this.proFileObj.field_title1) {
                this.titalText1 = this.proFileObj.field_title1[0].value;
                console.log(this.titalText1);
              } else {
                this.titalText1 = '';
              }
              if (this.proFileObj.field_title2) {
                this.titalText2 = this.proFileObj.field_title2[0].value;
              } else {
                this.titalText2 = '';
              }
              if (this.proFileObj.field_title3) {
                this.titalText3 = this.proFileObj.field_title3[0].value;
              } else {
                this.titalText3 = '';
              }
              if (this.proFileObj.field_title4) {
                this.titalText4 = this.proFileObj.field_title4[0].value;
              } else {
                this.titalText4 = '';
              }
              // ---------------------------------------------------------------------------
              if (this.proFileObj.body) {
                this.bodyText1 = this.proFileObj.body[0].value;
              } else {
                this.bodyText1 = '';
              }
              if (this.proFileObj.field_body2) {
                this.bodyText2 = this.proFileObj.field_body2[0].value;
              } else {
                this.bodyText2 = '';
              }
              if (this.proFileObj.field_body3) {
                this.bodyText3 = this.proFileObj.field_body3[0].value;
              } else {
                this.bodyText3 = '';
              }
              if (this.proFileObj.field_body4) {
                this.bodyText4 = this.proFileObj.field_body4[0].value;
              } else {
                this.bodyText4 = '';
              }
            }
            this.activejobad = true;
          }
        }
        this.pageLoded = true;
      });
  }
}

