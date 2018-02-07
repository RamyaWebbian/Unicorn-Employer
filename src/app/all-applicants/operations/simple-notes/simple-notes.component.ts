import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AllApplicantServicesService} from '../../services/all-applicant-services.service';
import { HoldDataService } from '../../../services/index';
@Component({
  selector: 'app-simple-notes',
  templateUrl: './simple-notes.component.html',
  styleUrls: ['./simple-notes.component.css','../../all-applicants.css']
})
export class SimpleNotesComponent implements OnInit {
  public showPopup: boolean;
  public simpleNotes: FormGroup;
  public abs: boolean;
  @Input() hwaID: string;
  @Input() applicantId: string;
  @Input() authorId: string;
  @Input() buttonFalse: boolean;
  @Input() statusId: string;
  public  btnText = 'Save';
  public interviewNotes;
  public simpleNote;
  public statusNumber;
  checkemptyVal: boolean;
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
    this.fetchInterviewNotes();
    this.simpleNotes = this.formbuilder.group({
      'notes': ['', Validators.required]
    });
  }
  humanReadableTime(timestamp) {
    return new Date(timestamp * 1000);
  }
  clearThis() {
    this.simpleNotes.controls['notes'].setValue('');
  }
  // Status Change Function
  emptyValue() {
    const abc = this.simpleNotes.controls['notes'].value;
    if (!abc.replace(/\s/g, '').length) {
     // alert('string only contained spaces');
      this.checkemptyVal = true;
    } else {
      this.checkemptyVal = false;
    }
  }
  submitNotes() {
    switch (this.statusId) {
      case 'new':
        this.statusNumber = '22';
        break;
      case 'viewed':
        this.statusNumber = '25';
        break;
      case 'shortlisted':
        this.statusNumber = '24';
        break;
      case 'interview':
        this.statusNumber = '21';
        break;
      case 'interview-accepted':
        this.statusNumber = '32';
        break;
      case 'interview-declined':
        this.statusNumber = '33';
        break;
      case 'interviewed-on-hold':
        this.statusNumber = '31';
        break;
      case 'good-to-offer':
        this.statusNumber = '27';
        break;
      case 'offer-accepted':
        this.statusNumber = '28';
        break;
      case 'offer-declined':
        this.statusNumber = '29';
        break;
      case 'offered':
        this.statusNumber = '23';
        break;
      case 'rejected':
        this.statusNumber = '26';
        break;
    }
    this.abs = true;
    this.btnText = 'Processing';
    const statusInfo = {
      'hwa_id': this.hwaID,
      'applicant_id': this.applicantId,
      'author_uid': this.authorId,
      'status_id': this.statusNumber,
      'message': this.simpleNotes.controls['notes'].value,
      'action': 'setstatus'
    };
    this.service.recruitmentAction(statusInfo).subscribe(
      res => {
        this.holdDataService.setMessage({
          msg: 'Success!, Notes are Added Successfully!',
          sucsess: true
        });
        console.log(res)
        this.fetchInterviewNotes();
        this.simpleNotes.controls['notes'].setValue('');
        this.abs = false;
        this.btnText = 'Save';
      }
    );
  }

  // Fetch Interview Notes
  fetchInterviewNotes() {
    const state = {
      'applicant_id' : this.applicantId,
      'hwa_id' : this.hwaID,
      'author_uid' : this.authorId
    };
    this.service.interviewNotesGet(state).subscribe(
      res => {
        this.simpleNote = res.review_notes;
        console.log('ssssssssssssssssssssssssssssssss', res.review_notes)
      }
    );
  }

}

