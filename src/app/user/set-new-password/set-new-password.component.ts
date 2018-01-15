import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EqualValidator } from '../../common/directives/equal-validator.directive'; 
import { UserService } from '../../services/index';
import {ShowHideInput} from '../../common/directives/show-hide-directive';
import {ShowHideCnf} from '../../common/directives/show-hide-cnf';
import {Subscription} from 'rxjs/Subscription';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {

 public tokenid: any;
  public uid: any;
  public subscription: Subscription;
  public loading: boolean;
  public show = false;
  public conf_show = false;
  public displayForm: boolean;
  public titalname = 'Set Your Password';
  public disabledButton:boolean;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  public invalidToken: boolean;

  @ViewChild(ShowHideInput) input: ShowHideInput;
  @ViewChild(ShowHideCnf) inputcnf: ShowHideCnf;
  public resetPassword: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    //  private authenticationService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private _notificationsService:NotificationsService
  ) {

  }

  ngOnInit() {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*])(?=.{8,})');
    this.resetPassword = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.pattern(strongRegex)])],
      'cpassword': ['', Validators.compose([Validators.required])]
    }, {updateOn: 'change'}); //  asyncValidators: [this.isEqualEmail] {validator: this.isEqualEmail}

    this.displayForm = false;
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        // console.log(param['isonetime']);
        if (param['token'] && param['uid']) {
          if (param['isonetime'].toString() === '1') {
            this.titalname = 'Reset Your Password';
          } else {
            this.titalname = 'Set Your Password';
          }
          //  this.router.navigate(['/']);
          this.tokenid = param['token'];
          this.uid = param['uid'];
          this.tokenValidateUrl(this.tokenid, this.uid);
        }
      });
  }

  ngOnDestroy() {
    //  prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

/*toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.input.changeType('text');

    } else {
      this.input.changeType('password');

    }
  }*/
conf_toggleShow() {
    this.conf_show = !this.conf_show;
    this.show = !this.show;
    if (this.conf_show && this.show) {
      this.input.changeType('text');
      this.inputcnf.changeType('text');
    } else {
      this.input.changeType('password');
      this.inputcnf.changeType('password');
    }

  }


  tokenValidateUrl(tid, uid) {
    this.userService.validateUrltoken({token: tid, uid: uid}).subscribe(
      res => {
        console.log(res);

        if (res['data']) {
          this.displayForm = true;
          console.log(res['uid']);
          this.uid = res['uid'];
          this.tokenid = res['token'];

          //  this.router.navigate(['/login']);
        } else {
          this.uid = '';
          this.tokenid = '';
        //  if (res['message']) {
          this._notificationsService.error('Sorry', "The provided access token is invalid or has expired",
          { timeOut: 7500, showProgressBar: true, pauseOnHover: false, clickToClose: true });
         // } else {
          //  this.invalidToken = true;
         // }
        }
      },
      error => {
        this.loading = false;
      });
  }
  onSubmit(formGroup) {
// console.log(formGroup);
this.disabledButton = true;
    formGroup.uid = this.uid;
    formGroup.token = this.tokenid;
    this.loading = true;
// let obj ={ formGroup}
    this.userService.resetPass(formGroup).subscribe(
      res => {
        this.disabledButton = false;
       // console.log(res)
        if (res['status']) {
          this.loading = false;
          this.router.navigate(['/login']);
         } else {

        }

      },
      error => {
        this.loading = false;
      });
  }


  isEqualEmail(control: FormGroup ): {[s: string]: boolean} {
    if (!control) {
      return {passwordNotMatch: true};
    }

    if (control.controls['password'].value === control.controls['cpassword'].value) {
      return null;
    } else {
      return { passwordNotMatch: true};
    }
}
}
