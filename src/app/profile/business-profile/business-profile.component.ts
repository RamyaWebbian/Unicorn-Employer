import { Component, OnInit, Input, ViewChild, TemplateRef, } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  public registerUser:FormGroup;
  public submitted: boolean = false;
  public loading: boolean;
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
    this.registerUser = this.formBuilder.group({
      'businessname': ['', {updateOn: 'change', validators: [Validators.required]}],
      'businessdesc': ['', {updateOn: 'change', validators:[Validators.required]}],
    })
  }
  helpText() {
    this.router.navigate(['/why-business-profile-imp']);
  }
  viewProfile() {
    this.router.navigate(['/view-business-profile']);
  }

  onSubmit(fvalue:any , valid: boolean) {
    this.submitted = true;
     this.loading = true;
     const userObj = {
       'field_businessname': fvalue.controls['businessname'].value,
       'field_businessdesc': fvalue.controls['businessdesc'].value
     };
    console.log(valid)
     if (valid) {
               this.router.navigate(['/view-business-profile']);
         } else {
          this.loading = false;
        }
     }

    }