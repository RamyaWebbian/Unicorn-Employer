import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UserService, HoldDataService} from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css','../../all-applicants/all-applicants.css']
})
export class CandidateListComponent implements OnInit {
  public hwaId;
  public hwaName;
  public applicantList;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
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
  public hWaAuthor;
  constructor(private router: Router, 
    private services: AllApplicantServicesService,
              private activatedRoute: ActivatedRoute,
              private holdDataService: HoldDataService) { }

  ngOnInit() {
    // Subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hwaId = params['hwaId'];
      this.hwaName = params['hwaName'];
      this.hwaAuthor = params['hwaAuthor'];
    });
    this.fetchInterviewList();
    this.services.setHwaId(this.hwaId);
  }

  // interviewList
  fetchInterviewList() {
    const hwaId = {
      'hwa_id': this.hwaId
    };
    this.services.interviewList(hwaId).subscribe(
      res => {
        this.statusKey = res.interview_applicant_list;
        this.getAllApplicant = res.interview_applicant_list.all;
        this.pageLoded = true;
        console.log(res);
        if (this.getAllApplicant.length === 0) {
          this.router.navigate(['landing-page/1']);
        }
    }
    );
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
    this.services.recruitmentAction(statusInfo).subscribe(
      res => {
        this.holdDataService.setMessage({
          msg: 'Status Changed!, This Applicant is moved to shortlisted!',
          sucsess: true
        });
        this.fetchInterviewList();
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
    this.services.recruitmentAction(statusInfo).subscribe(
      res => {
        this.fetchInterviewList();
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
    this.fetchInterviewList();
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
    this.services.recruitmentAction(statusInfo).subscribe(
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
    this.services.recruitmentAction(status).subscribe(
      res => {
        this.fetchInterviewList();
        this.holdDataService.setMessage({
          msg: 'Status Changed!, Moved to Offer',
          sucsess: true
        });
      }
    );
  }

}
