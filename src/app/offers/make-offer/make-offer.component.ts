import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService, HoldDataService } from '../../services/index';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';


@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.css','../../all-applicants/all-applicants.css']
})
export class MakeOfferComponent implements OnInit {
  private toolbarOptions = [
    'bold',
    'italic',
    'underline',
    { 'align': '' },
    { 'align': 'center' },
    { 'align': 'right' },
    { 'list': 'ordered' },
    { 'list': 'bullet' },
    { 'indent': '-1' },
    { 'indent': '+1' }
  ];
  public offerTemplate = {
    modules: {
      toolbar: this.toolbarOptions
    }
  };
  public sendOffer: FormGroup;
  public hwaId;
  public applicantId;
  public empId;
  editorConfig: Object = {
    'editable': true,
    'spellcheck': true,
    'height': '300',
    'minHeight': '329',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'toolbar': [
      ['bold', 'italic', 'underline']
    ]
  };
  public shortlistedText = 'Send Offer';
  public abs: boolean;
  public pageLoded: boolean;
  public positionName;
  public editorData;
  constructor(private formbuilder: FormBuilder,
              private router: Router, private services: AllApplicantServicesService,
              private activatedRoute: ActivatedRoute,
              private holdDataService: HoldDataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hwaId = params['hwaId'];
      this.applicantId = params['applicantId'];
      this.empId = params['empId'];
      this.positionName = params['position'];
    });
    this.sendOffer = this.formbuilder.group({
      'emailContent': ['', Validators.required],
      /*'field_how_would_you_describe_thi': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }], */
    },{
      updateOn: 'change'
    });
    this.pageLoded = true;
  }

  sendEmail() {
    this.abs = true;
    this.shortlistedText = 'Sending Offer';
    const statusInfo = {
      'hwa_id': this.hwaId,
      'applicant_id': this.applicantId,
      'author_uid': this.empId,
      'offer_email_message': this.sendOffer.controls['emailContent'].value,
      'status_id': '23',
      'action': 'setstatus'
    };
    this.services.recruitmentAction(statusInfo).subscribe(
      res => {
        this.holdDataService.setMessage({
          msg: 'Success! ,Offer is sent to Applicant!',
          sucsess: true
        });
        this.abs = false;
        this.shortlistedText = 'Send Offer';
        this.router.navigate(['offered-candidate-list', this.positionName, this.hwaId]);
      }
    );
  }

  onKeydown(event) {
    let keyVal = event.keyCode;
    let textVal = this.editorData;

    if (keyVal == 32 && this.editorData == null) {
      return false;
    }
  }
}
