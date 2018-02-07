import { Component, OnInit, Input,Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AllApplicantServicesService} from '../../../services/all-applicant-services.service';
import { HoldDataService } from '../../../../services/index';
@Component({
  selector: 'app-positive-notes',
  templateUrl: './positive-notes.component.html',
  styleUrls: ['./positive-notes.component.css', '../../../all-applicants.css']
})
export class PositiveNotesComponent implements OnInit {
  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter();
  public showPopup: boolean;
  public interviewNotes: FormGroup;
  public abs: boolean;
  @Input() hwaID: string;
  @Input() applicantId: string;
  @Input() authorId: string;
  @Input() buttonFalse: boolean;
  public  btnText = 'Save';
  @Input() closePopup: any;
  public good2Offer = 'Good to Offer';
  public abs1: boolean;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(private formbuilder: FormBuilder,
              private service: AllApplicantServicesService,
              private router: Router,
              private holdDataService: HoldDataService,
              ) { }

  ngOnInit() {
    this.interviewNotes = this.formbuilder.group({
      'notes': ['', Validators.required]
    });
    // alert(this.hwaID)
    this.service.getHwaId().subscribe((storedhwaId)=> {
      this.hwaID = storedhwaId;
      // alert(this.hwaID);
    });
  }
  clearThis() {
    this.interviewNotes.controls['notes'].setValue('');
  }
  uploadComplete() {
    this.formSubmit.emit('complete');
  }
  // Status Change Function
  submitNotes() {
    const statusInfo = {
      'hwa_id': this.hwaID,
      'applicant_id': this.applicantId,
      'author_uid': this.authorId,
      'message': this.interviewNotes.controls['notes'].value,
      'action': 'setnotes'
    };
    this.service.recruitmentAction(statusInfo).subscribe(
      res => {
        this.uploadComplete();
        this.interviewNotes.controls['notes'].setValue('');
      }
    );
  }
  // Submit Notes Status Changes
  onHold() {
    this.abs = true;
    this.btnText = 'Processing';
    const status = {
      'hwa_id': this.hwaID,
      'applicant_id': this.applicantId,
      'author_uid': this.authorId,
      'status_id': '31',
      'action': 'setstatus'
    };
    this.service.recruitmentAction(status).subscribe(
      res => {
        this.abs = false;
        this.btnText = 'Save';
        this.submitNotes();
        this.uploadComplete();
        this.holdDataService.setMessage({
          msg: 'Notes are Added Successfully!',
          sucsess: true
        });
      }
    );
  }
  goodToOffer() {
    this.abs1 = true;
    this.good2Offer = 'Processing';
    const status = {
      'hwa_id': this.hwaID,
      'applicant_id': this.applicantId,
      'author_uid': this.authorId,
      'status_id': '27',
      'action': 'setstatus'
    };
    this.service.recruitmentAction(status).subscribe(
      res => {
        this.abs1 = false;
        this.good2Offer = 'Good to Offer';
         this.submitNotes();
         this.uploadComplete();
        this.holdDataService.setMessage({
          msg: 'Moved to offered list!',
          sucsess: true
        });
        //this.router.navigate(['applicants-list', this.positionName, this.hwaID, this.authorId]);
      }
    );
  }

  onKeydown(event) {
    if (event.keyCode == 32 && this.interviewNotes.controls['notes'].value == "") {
      return false;
    }
    if (event.keyCode == 13 && this.interviewNotes.controls['notes'].value == "") {
      return false;
    }
  }

}
