import {ShowHideInput} from '../../common/directives/show-hide-directive';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';
import {NotificationsService} from 'angular2-notifications';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
   private cookieService:CookieService,
    private router: Router,
    private _notificationsService: NotificationsService
) { }

public loginform: FormGroup;
  public loading: boolean;
  public show = false;
  public rememberme: boolean;
  @ViewChild(ShowHideInput) input: ShowHideInput;
  public emailMask = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };

  ngOnInit() { 
  var user = this.userService.isLogedin();
  //console.log(user);

    this.loginform = this.formBuilder.group({
      'password': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]
    },{updateOn: 'change'});
  }


  Register() {
    this.router.navigate(['registration']);
  }
  forgotPass() {
    this.router.navigate(['forgot-password']);
  }

onSubmitLogin(loginfields){
 this.loading = true;
    const data = { 'name': loginfields.email, 'pass': loginfields.password };
    this.userService.login(data).subscribe(
      res => {
        console.log(res);
        if(res['status']){
         this._notificationsService.error('Sorry',res['status'].message, { timeOut: 2500, showProgressBar: true, pauseOnHover: false, clickToClose: true });
      }else{
        this.loading = false;
          const user = res['current_user'];
         // console.log(typeof localStorage)
          
         this._notificationsService.success('success','Login Success', { timeOut: 2500, showProgressBar: true, pauseOnHover: false, clickToClose: true });
         var token = {token:res['jwt_token']};

         this.saveRememberMedata(data);

              if (this.userService.isLocalStorage()) {
                
              localStorage.setItem('userToken', JSON.stringify(token));
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.userService.setLogedIn(true);
            }else{
            
              // this.cookieService.deleteAll();
               this.cookieService.delete('currentUser');
               this.cookieService.delete('userToken');
               this.cookieService.set('userToken', JSON.stringify(token));
               this.cookieService.set('currentUser', JSON.stringify(user));

               console.log('set cooki', JSON.parse(this.cookieService.get('userToken')));
               //console.log('check', this.cookieService.getAll())
               this.userService.setLogedIn(true);
                }
             // }
            this.loading = false;
            this.router.navigate(['user-profile']);
            
    }
      
      },
      error => {
        this._notificationsService.error(
          'Sorry',
          error,
          {
            timeOut: 2500,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          }
        );
        this.loading = false;
      });
  }
 
   toggleShow(flag:boolean) {
     console.log(flag)
      console.log(this.input)
    this.show = flag;
    if (this.show) {
      this.input.changeType('text');
    } else {
      this.input.changeType('password');
    //  this.inputcnf.changeType('password');
    }
  }

  rememberMe(event) {
    this.rememberme = event.target.checked;
  }

  saveRememberMedata(data) {
    if (this.rememberme) {
      localStorage.setItem('rememberme', data);
      this.cookieService.set('rememberme', data);
    } else {
      localStorage.removeItem('rememberme');
      this.cookieService.delete('rememberme');
    }
  }

}