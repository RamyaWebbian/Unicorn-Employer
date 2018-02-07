import { Component, OnInit, Input,Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AllApplicantServicesService} from '../../../services/all-applicant-services.service';
import { HoldDataService } from '../../../../services/index';

@Component({
  selector: 'app-negative-notes',
  templateUrl: './negative-notes.component.html',
  styleUrls: ['./negative-notes.component.css', '../../../all-applicants.css']
})
export class NegativeNotesComponent implements OnInit {
  @Output()
  submitndClose: EventEmitter<any> = new EventEmitter();
  public showPopup: boolean;
  public interviewNotes: FormGroup;
  public abs: boolean;
  hwaID: any;
  @Input() applicantId: string;
  @Input() authorId: string;
  @Input() buttonFalse: boolean;
  public btnText = 'Save';
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(private formbuilder: FormBuilder, private service: AllApplicantServicesService,
              private router: Router,
              private holdDataService: HoldDataService,
             ) { }

  ngOnInit() {
    this.interviewNotes = this.formbuilder.group({
      'notes': ['', Validators.required]
    });

    //
    this.service.getHwaId().subscribe((storedhwaId)=> {
      this.hwaID = storedhwaId;
    });
  }
  negativeDone() {
    this.submitndClose.emit('complete');
  }
  clearThis() {
    this.interviewNotes.controls['notes'].setValue('');
    // this.negativeDone();
  }

  // Status Change Function
  submitNotes() {
    this.abs = true;
    this.btnText = 'Processing';
    const statusInfo = {
      'hwa_id': this.hwaID,
      'applicant_id': this.applicantId,
      'author_uid': this.authorId,
      'message': this.interviewNotes.controls['notes'].value,
      'action': 'setnotes'
    };
    this.service.recruitmentAction(statusInfo).subscribe(
      res => {
        this.negativeDone();
        this.interviewNotes.controls['notes'].setValue('');
        this.abs = false;
        // this.btnText = 'Save';
        this.holdDataService.setMessage({
          msg: 'You have rejected this Applicant!',
          sucsess: false
        });


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
