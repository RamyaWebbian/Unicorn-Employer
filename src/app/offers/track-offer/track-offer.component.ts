import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-track-offer',
  templateUrl: './track-offer.component.html',
  styleUrls: ['./track-offer.component.css']
})
export class TrackOfferComponent implements OnInit {
  private HwaId;
  private applicantId;
  private HwaAuthor;
  private status;
  private statusId;
  public showThis: boolean;
  public showThis1: boolean;
  public showThis2: boolean;
  public statusInfo;
  constructor(private allApplicantservice: AllApplicantServicesService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const applicantId = params['applicantid'];
      const HwaId = params['hwaid'];
      const HwaAuthor = params['hwaauthor'];
      const Status = params['status'];
      this.applicantId = applicantId;
      this.HwaId = HwaId;
      this.HwaAuthor = HwaAuthor;
      this.status = Status;
      if (this.status === '1') {
        this.statusId = '28';
      } else if (this.status === '0') {
        this.statusId = '29';
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
      'action': 'setstatus'
    };
    this.allApplicantservice.recruitmentAction(statusInfo).subscribe(
      res => {
        console.log(res)

        if (res[0] === 'offer already applied or cancel') {
          this.showThis = false;
          this.showThis1 = false;
          this.statusInfo = 'You have already responded to this offer.';
          this.showThis2 = true;
        } else {
          if (this.status === '1') {
            this.statusInfo = 'For accepting the offer';
            this.showThis = true;
          } else if (this.status === '0') {
            this.showThis1 = true;
            this.statusInfo = ' For rejecting the offer';
          }
        }
      }
    );
  }
}
