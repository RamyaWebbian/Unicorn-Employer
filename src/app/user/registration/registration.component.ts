import { Component, OnInit, Input, ViewChild, TemplateRef, } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
public showHelp:any = true;
public registerUser:FormGroup;
public submitted: boolean = false;
  public loading: boolean;
  public myModel = '';
  public emailMask = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private _notificationsService: NotificationsService
   ) { }
  

  ngOnInit() {
    var user = this.userService.isLogedin();
    // updateOn: 'blur submit'
    this.registerUser = this.formBuilder.group({
      'businessname': ['', {updateOn: 'change', validators: [Validators.required]}],
      'firstname': ['', {updateOn: 'change', validators:[Validators.required]}],
      'lastname': ['', {updateOn: 'change', validators:[Validators.required]}],
      'email': ['',{updateOn: 'change',validators:[ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
      'confirmemail': ['',{updateOn: 'change',validators: [ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
      'phone': ['', {updateOn: 'change',validators: [Validators.required]}]
     // 'phone': ['', {updateOn: 'change',validators:[Validators.required, Validators.pattern('^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$')]}]
    }, {updateOn: 'change', asyncValidators: [this.isEqualEmail]});


  }

isEqualEmail(control: FormGroup ): {[s: string]: boolean} {
    if (!control) {
      return {emailNotMatch: true};
    }

    if (control.controls['email'].value === control.controls['confirmemail'].value) {
      return null;
    } else {
      return {'emailNotMatch': true};
    }
  }

 onSubmit(fvalue:any , valid: boolean) {
   this.submitted = true;
   console.log(fvalue.controls['confirmemail'].valid)
    this.loading = true;
    const userObj = {
      'field_name_of_your_business': fvalue.controls['businessname'].value,
      'mail': fvalue.controls['email'].value,
      'field_first_name': fvalue.controls['firstname'].value,
      'field_last_name': fvalue.controls['lastname'].value,
      'field_phone_number': fvalue.controls['phone'].value
    };
 console.log(valid)
    if (valid) {
      this.userService.create(userObj).subscribe(
        res => {
          if (res) {
            this.loading = false;
            if (res.user_status === 'existing') {
              this.loading = false;
              this._notificationsService.error(
                'An account with this email already exists!',
                'Please use the LOGIN button below to access Talentrackr.',
                {
                  timeOut: 3500,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                }
              );
             // this.router.navigate(['/']);
            } else {
              this.router.navigate(['/registration-success']);
            }
          }
        },
        error => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  gotologin() {
    this.router.navigate(['/login']);
  }
  gotoRegSuccess() {
    this.router.navigate(['/registration-success']);
  }
}
