import { Component, OnInit } from '@angular/core';
import {AllApplicantServicesService} from '../services/all-applicant-services.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HoldDataService } from '../../services/index';
@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css','../all-applicants.css']
})
export class ApplicantsListComponent implements OnInit {
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  public hwaId;
  public hwaName;
  public hwaAuthor;
  public hwaStatus;
  public getAllApplicant;
  public scoringNumber = '87';
  public pageLoded: boolean;
  public isPassed: boolean;
  public showPopup: boolean;
  public hideOther: boolean;
  public showThis: boolean;
  public applicantIdFinal;
  public applicantName;
  public statusKey;
  public interviewLifeCycle = [];
  constructor(private allApplicantservice: AllApplicantServicesService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private holdDataService: HoldDataService) {
  }

  ngOnInit() {
    // Subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hwaId = params['hwaId'];
      this.hwaName = params['hwaName'];
      this.hwaAuthor = params['hwaAuthor'];
      this.hwaStatus = params['status'];

    });
    // Call Fetch applicant data
    this.fetchAllApplicant();

    this.allApplicantservice.setHwaId(this.hwaId);
  }

  // Fetch All Applicant data
  fetchAllApplicant() {
    const hwaId = {
      'hwa_id': this.hwaId
      
    };
    this.allApplicantservice.getAllApplicant(hwaId).subscribe(
      res => {
        console.log(res.all_applicant_list);
        this.statusKey = res.all_applicant_list;
        this.getAllApplicant = res.all_applicant_list.all;
        console.log(this.getAllApplicant.length);
        this.pageLoded = true;
        this.interviewLifeCycle = this.interviewLifeCycle.concat(res.all_applicant_list['interview'],
          res.all_applicant_list['interview-declined'],
          res.all_applicant_list['interview-accepted'], res.all_applicant_list['interviewed-on-hold']);
        console.log(this.interviewLifeCycle)
        if(this.getAllApplicant.length == 0) {
          this.router.navigate(['landing-page']);
        }
      });
  }

  // Check If Interview Time passed
  compareDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    if (new Date(now).getTime() > new Date(date).getTime()) {
      return this.isPassed = true;
    } else {
      return this.isPassed = false;
    }
  }
  // Timestamp to Human
  humanReadableTime(timestamp) {
    return new Date(timestamp * 1000);
  }

  // Kebab Menu Option
  rescheduledInterview(i) {
    const applicantUid = this.getAllApplicant[i]['field_applicant_author_1'];
    const name =  this.getAllApplicant[i]['field_first_name'];
    this.router.navigate(['schedule-interview', this.hwaName, this.hwaId, name, applicantUid]);
  }
  interviewLater(i) {
    // Status Change Function
    const statusInfo = {
      'hwa_id': this.hwaId,
      'applicant_id': this.getAllApplicant[i]['field_applicant_author_1'],
      'author_uid': this.hwaAuthor,
      'status_id': '24',
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {
        this.fetchAllApplicant();
        this.holdDataService.setMessage({
          msg: 'Status Changed!, This Applicant is moved to shortlisted!',
          sucsess: true
        });
      }
    );

  }
  reject(i) {

    // Status Change Function
    const statusInfo = {
      'hwa_id': this.hwaId,
      'applicant_id': this.getAllApplicant[i]['field_applicant_author_1'],
      'author_uid': this.hwaAuthor,
      'status_id': '26',
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {
        this.fetchAllApplicant();
        this.holdDataService.setMessage({
          msg: 'Status Changed!, You have rejected this Applicant!',
          sucsess: false
        });
      }
    );

  }
  // Open Dialog For Notes
  openDialog(i) {
    this.applicantIdFinal = this.getAllApplicant[i]['field_applicant_author_1'];
    this.applicantName = this.getAllApplicant[i]['field_first_name'];
    this.showPopup = true;
    this.hideOther = true;
  }
  openNegativeDialog(i) {
    this.applicantIdFinal = this.getAllApplicant[i]['field_applicant_author_1'];
    this.applicantName = this.getAllApplicant[i]['field_first_name'];
    this.showPopup = true;
    this.hideOther = false;
  }
  closeDialog() {
    this.showPopup =  !this.showPopup;
  }
  formReload(event) {
    this.showPopup = false;
    this.fetchAllApplicant();
  }
  // Static Action
  reject2() {
    this.showThis = true;
    // Status Change Function
    const statusInfo = {
      'hwa_id': this.hwaId,
      'applicant_id': this.applicantIdFinal,
      'author_uid': this.hwaAuthor,
      'status_id': '26',
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {

      }
    );
  }
  rescheduledInterview2() {
    const applicantUid = this.applicantIdFinal;
    const name =  this.applicantName;
    this.router.navigate(['schedule-interview', this.hwaName, this.hwaId, name, applicantUid]);
  }

  goodToOffer(applicantId) {
    const status = {
      'hwa_id': this.hwaId,
      'applicant_id': applicantId,
      'author_uid': this.hwaAuthor,
      'status_id': '27',
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(status).subscribe(
      res => {
        this.fetchAllApplicant();
        this.holdDataService.setMessage({
          msg: 'Status Changed!, Moved to Offer',
          sucsess: true
        });
      }
    );
  }

}

//,'../../hwa/only-hwa.css'