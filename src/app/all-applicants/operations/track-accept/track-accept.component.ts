import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {AllApplicantServicesService} from '../../services/all-applicant-services.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UserService } from '../../../services/index';

@Component({
  selector: 'app-track-accept',
  templateUrl: './track-accept.component.html',
  styleUrls: ['./track-accept.component.css']
})
export class TrackAcceptComponent implements OnInit {
  private HwaId;
  private applicantId;
  private HwaAuthor;
  private status;
  private statusId;
  public showThis: boolean;
  public showThis1: boolean;
  public showThis2: boolean;
  public statusInfo;
  private status2;
  constructor(private allApplicantservice: AllApplicantServicesService,
    private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      const applicantId = params['applicantid'];
      const HwaId = params['hwaid'];
      const HwaAuthor = params['hwaauthor'];
      const Status = params['status'];
      this.status2 = params['status2'];
      this.applicantId = applicantId;
      this.HwaId = HwaId;
      this.HwaAuthor = HwaAuthor;
      this.status = Status;
      if (this.status === '1') {
        this.statusId = '32';
      } else if (this.status === '0') {
        this.statusId = '33';
      }
    });
    this.updateStatus();
  }

  updateStatus() {
    // recruitmentAction
    const statusInfo = {
      'hwa_id': this.HwaId,
      'applicant_id': this.applicantId,
      'author_uid': this.HwaAuthor,
      'status_id': this.statusId,
      'action': 'setstatus',
      'token_value': this.status2
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {
        console.log('Niraj', res);
        if (res[0] === 'interview already applied or cancel') {
          this.showThis = false;
          this.showThis1 = false;
          this.statusInfo = 'You have already responded or interview time has passed.';
          this.showThis2 = true;
        } else {
          if (this.status === '1') {
            this.statusInfo = 'You have accepted the invitation.';
            this.showThis = true;
          } else if (this.status === '0') {
            this.showThis1 = true;
            this.statusInfo = ' You have rejected the invitation.';
          }
        }
      }
    );
  }
}
