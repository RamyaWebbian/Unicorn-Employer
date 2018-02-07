import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, HwaCommonService, HoldDataService } from '../services/index';
import {Subscription} from 'rxjs/Subscription';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
declare var $: any;

@Component({
  selector: 'app-post-hwa',
  templateUrl: './post-hwa.component.html',
  styleUrls: ['./post-hwa.component.css']
})
export class PostHwaComponent implements OnInit {
// payment
  public title = 'PayPal Test Payment';
  public paymentAmt = 0;
  public subscription:  Subscription;
  public hwaId: any = '';
  public hwaUid;
  public positionTitle = '';
  public activebutton: boolean;
  public start_date: any;
  public end_date: any;
  public extend_date_days: any;
  public uid: any;
  public action = '';
  public domainUrl = this.userService.paypalRedirect;
  public drupalDomainUrl = this.userService.switchUrl;
  public currencyCode = 'USD';
  public currentDate;
  public currentDateTimestamp;
  public post_ad1: any = 'post_ad1';
  public submitHwaForm: any;
  public datevalue: any;
  public endDatevalue: any;
  public additionalDays = 0;
  public defaultDays = 60;
  public position;
  public selectedNofPostion;
  public posType;
  public defaultAmount = 0;
  public additionalAmt = 0;
  public totalAmt = 0;
  public for7DaysAmt = 12.50 ;
  public for14DaysAmt= 25;
  public isDteValid: boolean;
  public MS_PER_MINUTE = 60000;
  public durationInMinutes = 1;
  public momentValue;
  public hideolddate = new Date().getDate() - 1;
  public isHaveCopon:boolean;
  public payMentData:any;
  public myDatePickerOptions = {
    dateFormat:  'mm/dd/yyyy',
    showClearDateBtn:  false,
    disableUntil: {year:  new Date().getFullYear(), month:  new Date().getMonth() + 1, day:  new Date().getDate() - 1}
  };
  public selectedMoment = '';
  constructor(private router: Router,
              private formbuilder:  FormBuilder,
              private userService:  UserService,
              private holdDataService: HoldDataService,
              private HwaServices:  HwaCommonService,
              public activatedRoute:  ActivatedRoute) { }

  ngOnInit() {
    const user = this.userService.isLogedin();
    this.uid = user.uid;
    const hwaId = this.userService.getHwaId();
    this.hwaUid = hwaId;
  }

  toTimestamp(year, month, day, hour, minute, second) {
    const datum = new Date(Date.UTC(year, month, day, hour, minute, second));
    console.log('only time ', datum.getTime());
    console.log('with1000 time ', datum.getTime() / 1000);
    return datum.getTime() / 1000.0;
  }
  toTimestampParse(strDate) {
    const nowUtc = new Date(strDate).getTime(); // + (new Date().getTimezoneOffset() * 60000);
    return nowUtc / 1000;
  }
  onSubmit() {
    // this.userService.removeHWAstorage()
  }
  apply() {
    this.holdDataService.setMessage({msg: 'Help Wanted Ad Saved in Draft', sucsess: false});
  }
  submitHWA() {
    if (this.datevalue) {
      this.endDatevalue = new Date(this.datevalue);
      this.canculateEndDate();
      // const hwaid = localStorage.getItem('storeHwaNid');
      const hwaid = this.userService.getHwaId();
      console.log(hwaid);

      const data = {
        'hwa_nid':  hwaid,
        'start_date': this.datevalue, // this.formatDate(this.datevalue),
        'end_date': this.endDatevalue,
        'extend_date_days':  this.additionalDays,
        'total_amt': this.totalAmt,
        'action': 'active'
      };
      console.log(data);
      if (hwaid) {
        this.payMentData = data;
        const sd = new Date(this.payMentData.start_date);
        const ed = new Date(this.payMentData.end_date);
        this.start_date  = this.toTimestampParse(sd.toUTCString()); //
        this.end_date  = this.toTimestampParse(ed.toUTCString()); //
        console.log(this.start_date);
        this.extend_date_days  = this.payMentData.extend_date_days;
        this.paymentAmt = this.payMentData.total_amt;
        this.action = this.payMentData.action;
        console.log(this.start_date , this.end_date  );
        this.currentDate = new Date(new Date().toUTCString()).getTime();
        this.currentDateTimestamp = (this.currentDate / 1000);
        console.log('timestamp', this.currentDateTimestamp);
        $('#paymentModel').modal('show');
        // this.router.navigate(['/post-hwa/payment']);
      } else {
        alert('Your have to crate HWA');
        this.router.navigate(['/all-hwa-list']);
      }
    } else {
      this.holdDataService.setMessage({msg: 'You need to select valid date', sucsess: false});
      // alert('You need to select valid date');
    }

  }

  changeDt(event){
    console.log(event);
  }
  selectstartDate(event:  any) {
   // console.log(event);
    //alert('ffffffffffffff')
    if (event.type) {
      // this.additionalDays =
      // console.log(event.target)
    }else{
      const d1 = new Date();
      const d2 = new Date(event.value);
      //   this.selectedMoment = event.value;
     // console.log(this.selectedMoment);

      if ((d1.getDate() === d2.getDate()) && (d1.getMonth() === d2.getMonth() ) && (d1.getFullYear() === d2.getFullYear()) ) {
        this.datevalue =  event.value;
        this.isDteValid = true;
      }else {
        if (d1.getTime() < d2.getTime()) {
          this.datevalue = event.value;
          this.isDteValid = true;
        }else {
          // alert('You need to select valid date');
          this.isDteValid = false;
        }

      }


      if (this.datevalue) {

        this.endDatevalue = new Date(this.datevalue);
        this.canculateEndDate();
        this.defaultAmount = 25.00;
        if (this.additionalDays == 0) {
          this.additionalAmt = 0;
        }else if (this.additionalDays == 7) {
          this.additionalAmt = this.defaultAmount / 2;
        } else if (this.additionalDays == 14) {
          this.additionalAmt = this.defaultAmount;
        }

        this.totalAmt = Number(this.defaultAmount) + Number(this.additionalAmt);
      } else {
        // alert('Please Select Date.');
        this.holdDataService.setMessage({msg: 'You need to select a date.', sucsess: false});
      }
    }
  }

  canculateEndDate() {

    if (this.additionalDays !== 0) {
      const dafutDay = Number(this.defaultDays) + Number(this.additionalDays);
      this.endDatevalue.setDate(this.endDatevalue.getDate() + (dafutDay));
      this.endDatevalue = new Date(this.endDatevalue.getTime() - this.durationInMinutes * this.MS_PER_MINUTE);
      // this.endDatevalue = this.formatDate(this.endDatevalue);
    }else {

      this.endDatevalue.setDate(this.endDatevalue.getDate() + (this.defaultDays));
      this.endDatevalue = new Date(this.endDatevalue.getTime() - this.durationInMinutes * this.MS_PER_MINUTE);
      // this.endDatevalue = this.formatDate(this.endDatevalue);
    }
  }

  formatDate(date) {


    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      h = '' + d.getHours(),
      m = '' + d.getMinutes(),
      s = '' + d.getSeconds();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    if (h.length < 2) { h = '0' + h; }
    if (m.length < 2) { m = '0' + m; }
    if (s.length < 2) {s = '0' + s; }
    if (s === '00') {s = '01'; }
    const dat = [year, month, day].join('-');
    const dateFromat = dat + ' ' + [h, m, s].join(':');
    console.log('dateFromat ',dateFromat )
    return dateFromat;
  }

  onChange(newValue) {
  //  console.log(newValue)
//console.log(newValue.value)
    this.additionalDays = Number(newValue);  // don't forget to update the model here
    if (this.datevalue) {
      this.endDatevalue = new Date(this.datevalue);
      this.canculateEndDate();
      this.defaultAmount = 25.00;
      if (this.additionalDays == 0) {
        this.additionalAmt = 0;
      }else if (this.additionalDays == 7) {
        this.additionalAmt = this.defaultAmount / 2;
      } else if (this.additionalDays == 14) {
        this.additionalAmt = this.defaultAmount;
      }

      this.totalAmt = Number(this.defaultAmount) + Number(this.additionalAmt);
    } else {
      //this.additionalDays = 0;
      // alert('Please Select Date.');
      this.holdDataService.setMessage({msg: 'You need to select a date.', sucsess: false});
    }
  }

}
