import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AllApplicantServicesService} from '../../services/all-applicant-services.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService, ProfileService, HoldDataService } from '../../../services/index';


@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css','../../all-applicants.css']
})
export class ScheduleInterviewComponent implements OnInit {
  public scheduledInterview: FormGroup;
  public applicantId;
  public HwaId;
  public HwaAuthor;
  public startTime;
  public endTime;
  public positionName;
  public momentValue;
  public applicantName;
  public invalidDate: boolean;
  public btnText = 'Send Invite';
  public abs: boolean;
  public momentVariable;
  public momentVariable1;
  public momentVariable2;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  public addressList: Array<string> = [];
  dynamicLabel = 'Venue';
  enableInput: boolean;
  selectAddress = [];
  showlist: boolean;
  hideInput: boolean;
  public hideolddate = new Date();
  dropdownLabel = 'Select Address';
  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document,
              private formbuilder: FormBuilder, private service: AllApplicantServicesService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private holdDataService: HoldDataService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    // Get URL Parm
    this.activatedRoute.params.subscribe((params: Params) => {
      const applicantId = params['applicantId'];
      const HwaId = params['hwaId'];
      const Hwaname = params['hwaName'];
      this.applicantId = applicantId;
      this.HwaId = HwaId;
      this.positionName = Hwaname;
      this.applicantName = params['applicantName'];

    });

    //
    const user = this.userService.isLogedin();
    this.HwaAuthor = user.uid;

    this.scheduledInterview = this.formbuilder.group({
      'date': ['', Validators.required],
      'start': ['', Validators.required],
      'end': ['', Validators.required],
      'where': ['', Validators.required],
      'mode': ['', Validators.required],
    });
    if (user) {
      this.loadAddress(user);
    }
  }
  loadAddress(user) {
    this.profileService.getaddress(user.uid)
      .subscribe(res => {
        //console.log(res);
        this.addressList = res;

        this.addressList.forEach((item, index) => {
          if (item['field_make_default'] === 1) {
            this.addressList = [];
            this.addressList.push(item);
            //this.selectedNid[index] = item['nid'];
          }
        });
        // console.log(' this.selectedNid',  this.selectedNid);
      }, error => {});
  }
  onChange(newValue) {
    // console.log(newValue);
    const user = this.userService.isLogedin();
    console.log(user);
    this.scheduledInterview.controls['where'].setValue('');
    if (newValue === 'telephonic') {
      this.dynamicLabel = 'Enter Telephone Number';
      this.hideInput = false;
      this.showlist = false;
      this.enableInput = false;
    } else if (newValue === 'in person') {
      this.dynamicLabel = 'Venue';
      this.showlist = true;
      this.hideInput = true;
      //this.enableInput = true;
      //console.log("address", user.address);
      //this.selectAddress = this.addressList; 

	    this.enableInput = true;
      this.selectAddress = user.address;
      
      this.enableInput = false;
    } else if (newValue === 'video') {
      this.dynamicLabel = 'Medium';
      this.hideInput = false;
      this.showlist = false;
      this.enableInput = false;
    }
  }
  onChangeInner(newValue) {
    if (newValue === 'Others') {
      this.enableInput = true;
      this.showlist = false;
      this.scheduledInterview.controls['where'].setValue('');
    } else {
      this.enableInput = false;
    }
  }
  closeOther() {
    this.showlist = true;
    this.enableInput = false;
    this.scheduledInterview.controls['where'].setValue('');
  }
  setMoment(moment: any): any {
    this.momentValue = moment;
    this.compareDate(this.scheduledInterview.controls['end'].value, this.scheduledInterview.controls['start'].value);
    // compareDate
  }
  //
  saveDate() {
    this.abs = true;
    this.btnText = 'Scheduling Interview';
    const year = this.scheduledInterview.controls['date'].value.getFullYear();
    const month = this.scheduledInterview.controls['date'].value.getMonth();
    const day = this.scheduledInterview.controls['date'].value.getDate();

    const startH = this.scheduledInterview.controls['start'].value.getHours();
    const startM = this.scheduledInterview.controls['start'].value.getMinutes();

    console.log(this.scheduledInterview.controls['start'].value.getHours());
    console.log(this.scheduledInterview.controls['start'].value.getMinutes());

    const endH = this.scheduledInterview.controls['end'].value.getHours();
    const endM = this.scheduledInterview.controls['end'].value.getMinutes();

    this.startTime = this.toTimestamp(year, month, day, startH, startM);
    this.endTime = this.toTimestamp(year, month, day, endH, endM);

    const statusInfo = {
      'hwa_id': this.HwaId,
      'applicant_id': this.applicantId,
      'author_uid': this.HwaAuthor,
      'status_id': '21',
      'message': 'ee',
      'interview_start_datetime': this.startTime,
      'interview_end_datetime': this.endTime,
      'action': 'setstatus',
      'field_interview_venue': this.scheduledInterview.controls['where'].value,
      'field_interview_mode': this.scheduledInterview.controls['mode'].value
    };
    console.log(statusInfo);
    this.service.recruitmentAction(statusInfo).subscribe(
      res => {
        console.log(res);
        this.abs = false;
        this.btnText = 'Send Invite';
        this.holdDataService.setMessage({
          msg: 'Status Changed!, Interview Scheduled',
          sucsess: true
        });
        this.router.navigate(['applicants-list', this.positionName, this.HwaId, this.HwaAuthor]);
      }
    );
  }

  // Timestamp
  toTimestamp(year, month, day, hour, minute) {
    const datum = new Date(year, month, day, hour, minute);
    return datum.getTime() / 1000;
  }
  //
  goBack() {
    history.back();
  }
  //
  compareDate(toDate, fromDate) {
    if (toDate <= fromDate ) {
      this.invalidDate = true;
    } else {
      this.invalidDate = false;
    }
  }
}
