import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService, HoldDataService } from '../../services/index';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
// import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

public forgotPasswordForm: FormGroup;
  public loading: boolean;
  public disabledButton:boolean;

  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  // public enableLogin: boolean;
  public emailMask = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    //@Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private holdDataService: HoldDataService
  ) { }

  ngOnInit() {
   // var user = this.userService.isLogedin();
    //this.document.body.classList.remove('buildresume1');

    this.forgotPasswordForm = this.formBuilder.group(
      {
        'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]
      });
  }

  onSubmit(fields) {
this.disabledButton = true;
    this.loading = true;
    const data = JSON.stringify({'mail': fields.email, 'action': 'forget-password'});
    this.userService.forgotPassword(data).subscribe(
      res => {
        console.log(res);
        this.disabledButton = false;
        if (res) {
          this.loading = false;
          if (res['error_message']) {
             this.holdDataService.setMessage({msg:res['error_message'], sucsess: false});
          } else {
            // this.holdDataService.setMessage({msg: '', sucsess: true});
            this.router.navigate(['forgot-success']);
          }
        } else {
          this.loading = false;
        }
        const user = res['current_user'];

      },
      error => {
        this.disabledButton = false;
        this.loading = false;
        this.holdDataService.setMessage({msg:error, sucsess: false});
      });
  }

}
