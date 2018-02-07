
import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import {AllApplicantServicesService} from '../services/all-applicant-services.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UserService, HoldDataService } from '../../services/index';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.css','../all-applicants.css']
})
export class ViewApplicantComponent implements OnInit {
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  pageLoded: boolean;
  applicantId;
  HwaId;
  positionName;
  HwaAuthor;
  firstName;
  lastName;
  phoneNumber;
  city;
  state;
  zip;
  email;
  score;
  public resumeFile: boolean;
  checkType;
  employerData;
  educationalData;
  licenceData;
  militryData;
  refData;
  resumeBuilder;
  ifDocument;
  documentUrl;
  staticURL;
  basicInfo;
  koList;
  skillList;
  resumeInfo;
  objective;
  accomplishment;
  public currentStatus;
  openThis: boolean;
  openThis2: boolean;
  abs: boolean;
  shortlistedText = 'Shortlist';
  hideAction: boolean;
  interviewNotes;
  sInterviewText = 'Schedule Interview';
  hideSinterview: boolean;
  hideIntNotes;
  removeCta: boolean;
  removeThis: boolean;
  removeReject: boolean;
  hideInterViewNotes: boolean;
  ifReject: boolean;
  constructor(private allApplicantservice: AllApplicantServicesService,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private holdDataService: HoldDataService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.applicantId = params['applicantId'];
      this.HwaId  = params['hwaId'];
      this.positionName = params['hwaName'];
      this.HwaAuthor = params['hwaAuthor'];
    });
    this.fetchApplication();
    this.fetchInterviewNotes();

  }

  // Fetch Applicant's profile
  fetchApplication() {
    const Uid = {
      'uid': this.applicantId,
      'hwa_id': this.HwaId,
      'author_uid' : this.HwaAuthor
    };
    this.allApplicantservice.getApplication(Uid).subscribe(
      res => {
        this.currentStatus = res.applicant_current_status[0]['field_status'];
        this.checkType = res.applicant_resume_detail.field_resume_type[0].value;
        this.basicInfo = res.user_detail;
        this.koList = res.skill_ko_result.ko_result;
        this.skillList = res.skill_ko_result.skill_result;
        this.resumeInfo = res.applicant_resume_detail;
        this.objective = res.applicant_resume_detail.field_career_objective;
        this.accomplishment = res.applicant_resume_detail.field_accomplishment_skill;
        this.score = res['resume_score'];

        console.log(this.resumeFile);

        // Basic Information
        this.firstName = res.user_detail.field_first_name[0].value;
        console.log(this.firstName);
        this.lastName = res.user_detail.field_last_name[0].value;
        this.phoneNumber = res.user_detail.field_phone_number[0].value;
        this.city = res.user_detail.field_city[0].value;
        this.state = res.user_detail.field_state[0].value;
        this.zip = 12345; //res.user_detail.field_zip[0].value;
        //console.log(res.user_detail.field_zip[0].value);
        this.email = res.user_detail.mail[0].value;
        this.staticURL = this.userService.switchUrl+'ttv-pdf-download?'+this.HwaId+'/'+this.HwaAuthor+'/'+this.applicantId;
        if (this.checkType !== 'File') {
          this.employerData = res.applicant_resume_detail.field_employment_history;
          this.educationalData = res.applicant_resume_detail.field_education_details;
          this.licenceData = res.applicant_resume_detail.field_licenses_certification;
          this.militryData = res['applicant_resume_detail'].field_military_history;
          this.refData = res.applicant_resume_detail.field_references;
          this.resumeBuilder = true;
        } else {
          this.resumeFile = true;
          this.ifDocument = res.applicant_resume_detail.field_resume_upload[0].file_name;
          this.documentUrl = res.applicant_resume_detail.field_resume_upload[0].url;
        }
        this.pageLoded = true;
        this.currentStatusAction();
      }
    );
  }

  // Action Items Events on page load
  // If status is new then it will changed to viewed: status code:25
  // Shortlisted: 24
  currentStatusAction() {
    // check if new candidate and change the status to viewed
    // alert(this.currentStatus)
    if (this.currentStatus === 'new') {
      this.statusChange('25',  'Viewed', 'Status Changed to Viewed !');
    } else if (this.currentStatus === 'viewed') {
      // 1 this.fetchApplication();
    } else if (this.currentStatus === 'shortlisted') {
      this.shortlistedText = 'Schedule Interview';
      this.hideSinterview = true;
      this.removeThis = true;
      this.removeReject = false;

      // this.statusChange('22',  'new', 'Status Changed to New !');
    } else if (this.currentStatus === 'interview') {
      this.shortlistedText = 'Good to Offer';
      this.sInterviewText = 'Reschedule Interview';
      this.hideAction = true;
    } else if (this.currentStatus === 'interview-accepted') {
      this.shortlistedText = 'Good to Offer';
      this.sInterviewText = 'Reschedule Interview';
      this.hideAction = true;
    } else if (this.currentStatus === 'interview-declined') {
      this.shortlistedText = 'Good to Offer';
      this.sInterviewText = 'Reschedule Interview';
      this.hideAction = true;
    } else if (this.currentStatus === 'interviewed-on-hold') {
      this.shortlistedText = 'Good to Offer';
      this.sInterviewText = 'Reschedule Interview';
    } else if (this.currentStatus === 'rejected') {
      this.shortlistedText = 'Shortlist';
      this.sInterviewText = 'Schedule Interview';
      this.hideAction = false;
      this.removeReject = true;
      this.removeThis = false;
      // 3 this.fetchApplication();
    } else if ( this.currentStatus === 'good-to-offer') {
      this.shortlistedText = 'Offer Now';
      this.sInterviewText = 'Reschedule Interview';
      this.hideSinterview = true;
    } else if (this.currentStatus === 'offered') {
      this.removeCta = true;
    } else if (this.currentStatus === 'offer-accepted') {
      this.removeCta = true;
    } else if (this.currentStatus === 'offer-declined') {
      this.removeCta = true;
    }

  }
  // action event
  statusAction() {
    if (this.currentStatus === 'new') {
      this.statusChange('24',  'Shortlisted', 'Status Changed to Shortlisted !');
    } else if (this.currentStatus === 'viewed') {
      this.statusChange('24',  'Shortlisted', 'Status Changed to Shortlisted !');
        this.ifReject = true;
    } else if (this.currentStatus === 'shortlisted') {
      this.router.navigate(['schedule-interview', this.positionName, this.HwaId, this.firstName, this.applicantId]);
      this.hideSinterview = true;
      this.removeThis = true;
    } else if (this.currentStatus === 'interview') {
      // disabled
    } else if (this.currentStatus === 'interview-declined') {
      this.router.navigate(['schedule-interview', this.positionName, this.HwaId, this.firstName, this.applicantId]);
    } else if (this.currentStatus === 'interviewed-on-hold') {
      this.router.navigate(['offered-candidate-list', this.positionName, this.HwaId]);
      this.statusChange('27',  'Good to Offer', 'Applicant send to Good to Offer!');

    } else if (this.currentStatus === 'rejected') {
      this.statusChange('24',  'Shortlisted', 'Status Changed to Shortlisted !');

    } else if ( this.currentStatus === 'good-to-offer') {
      this.router.navigate(['make-offer', this.HwaId, this.applicantId, this.HwaAuthor, this.positionName]);
    }
  }
  // Fetch Interview Notes
  fetchInterviewNotes() {
    const state = {
      'applicant_id' : this.applicantId,
      'hwa_id' : this.HwaId,
      'author_uid' : this.HwaAuthor
    };
    this.allApplicantservice.interviewNotesGet(state).subscribe(
      res => {
        this.interviewNotes = res.interview_notes;
        this.hideIntNotes = res.interview_notes.length;
      }
    );
  }
  //
  interviewScheduled() {
    // this.hideAction = true;
    this.router.navigate(['schedule-interview', this.positionName, this.HwaId, this.firstName, this.applicantId]);
  }
  rejectCandidate() {
    this.statusChange('26', 'Applicant Rejected ', 'Applicant Rejected!');
    // this.hideAction = true;
  }
  // Convert Timestamp
  convertTimestapm(timestamp) {
    return new Date(timestamp * 1000);
  }
// Status Change Function
  statusChange(statusId, message, stateMessage ) {
    this.abs = true;
    const statusInfo = {
      'hwa_id': this.HwaId,
      'applicant_id': this.applicantId,
      'author_uid': this.HwaAuthor,
      'status_id': statusId,
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {
        this.abs = false;
        this.holdDataService.setMessage({
          msg: 'Status Changed!',
          sucsess: true
        });
        this.fetchApplication()
      }
    );
  }
  // Print This
  print() {
    window.print();
  }
  // Human Readable Format
  humanReadableTime(timestamp) {
    return new Date(timestamp * 1000);
  }
  // Scroll Down
  goTo() {
    setTimeout(() => {
      document.querySelector('#myAnchor').parentElement.scrollIntoView();
    });
  }
  // toggle class
  toggleMenu() {
    this.openThis = !this.openThis;
  }
  toggleMenu2() {
    this.openThis2 = !this.openThis2;
  }
  // View uploaded Resume
  viewResume() {
    this.router.navigate(['/view-resume', this.documentUrl]);
  }
  //
  //
  allHwa() {
    if (this.currentStatus === 'new' || this.currentStatus === 'viewed' || this.currentStatus === 'shortlisted' ||
      this.currentStatus === 'interview' || this.currentStatus === 'rejected') {
      this.router.navigate(['/active-ad']);
    } else if (this.currentStatus === 'interview-accepted' || this.currentStatus === 'interview-declined' ||
      this.currentStatus === 'interviewed-on-hold' ) {
      this.router.navigate(['/interviewed-list']);
    } else if (this.currentStatus === 'offered' || this.currentStatus === 'good-to-offer' ||
      this.currentStatus === 'offer-accepted'  || this.currentStatus === 'offer-declined') {
      this.router.navigate(['/offered-hwa-list']);
    }
  }
  allApp() {
    if (this.currentStatus === 'new' || this.currentStatus === 'viewed' || this.currentStatus === 'shortlisted' ||
      this.currentStatus === 'interview'  || this.currentStatus === 'rejected') {
      this.router.navigate(['applicants-list', this.positionName, this.HwaId, this.HwaAuthor]);
    }  else if (this.currentStatus === 'interview-accepted' || this.currentStatus === 'interview-declined' ||
      this.currentStatus === 'interviewed-on-hold') {
      this.router.navigate(['/applicants-list', this.positionName, this.HwaId, this.HwaAuthor]);
    } else if (this.currentStatus === 'offered' || this.currentStatus === 'good-to-offer'  ||
      this.currentStatus === 'offer-accepted'  || this.currentStatus === 'offer-declined') {
      this.router.navigate(['offered-candidate-list', this.positionName, this.HwaId]);
    }
  }

}

//,'../all-applicants.css'
