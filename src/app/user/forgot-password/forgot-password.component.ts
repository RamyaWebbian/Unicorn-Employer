import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import {NotificationsService} from 'angular2-notifications';


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
    private _notificationsService: NotificationsService
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

            this._notificationsService.error(
              'Error!',
              res['error_message'],
              {
                timeOut: 2500,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
              }
            );
            // this.enableLogin = true;
           // localStorage.setItem('yes', 'true');
          } else {

            this.router.navigate(['forgot-success']);
          }
        } else {
          this.loading = false;
        }
        const user = res['current_user'];

        if (user) {
          //  store user details and jwt token in local storage to keep user logged in between page refreshes
         // localStorage.setItem('userToken', JSON.stringify(res['csrf_token']));
         // localStorage.setItem('currentUser', JSON.stringify(user));
         // this.loading = false;
        //  this.userService.setLogedIn(true);
        //  this.router.navigate(['/']);

        }

      },
      error => {
        this.loading = false;
      });
  }

}
