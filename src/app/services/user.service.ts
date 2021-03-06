import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
// import { MemoryStorage } from './MemoryStorage';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import {JwtHelper} from './JwtHelper';

@Injectable()
export class UserService {
  public switchUrl = 'https://dev-hwaredesign.pantheonsite.io/'; // https://test-frslive.pantheonsite.io/
  public paypalRedirect = 'https://ramya.hurekadev.info/'; // 'https://frsapp.talentrackr.com/';
  private registerUrl = this.switchUrl + 'user_registration.json';
  private authValidUrl = this.switchUrl + 'user_token_aunthentication.json/';
  private resetPassUrl = this.switchUrl + 'user_reset_password.json';
  //  private loginUrl = this.switchUrl +"user/login?_format=json";
  // private loginUrl = this.switchUrl + 'login.json';
  private loginUrl = this.switchUrl + 'employer_login.json';
  // forgot password urls
  private forgotPassUrl = this.switchUrl + 'user_forgot_password_step_first.json';
  private tokenValidateUrl = this.switchUrl + 'user_forgot_password_step_second.json'; // token validate
  private resetPassUrl_fotgot = this.switchUrl + 'user_forgot_password_step_third.json'; // save password
  private userInfoUrl = this.switchUrl + 'user_information.json';
  // private getAddress= this.switchUrl + 'address/api?uid=';
  // private getAddressbyidUrl= this.switchUrl + 'address/api?nid=';
  private googeMap = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private ifUserExistApi = this.switchUrl + 'user_exist/';
  private getHWAtokenUrl = this.switchUrl + 'jwt/token';
  private logoutTokenUrl = this.switchUrl + 'logout.json';
  private headers = new Headers();
  private _isLogedIn: boolean;
  //  @Input()
  private subjectIsLogin: Subject < boolean > = new Subject < boolean > ();
  constructor(private http: Http, private cookieService: CookieService, private router: Router) {}
  create(user): any { // Array<Object>
    return this.http.post(this.registerUrl, user, {
      headers: this.authHeaders()
    })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  validateUrltoken(user) {
    return this.http.post(this.authValidUrl, user, {
      headers: this.authHeaders()
    })
      .map((response: Response) => response.json())
      .catch((error: any) => error.json());
  }
  resetPass(user) { // uid, tokenid // + tokenid + "/" + uid
    return this.http.post(this.resetPassUrl, user, {
      headers: this.authHeaders()
    })
      .map((response: Response) => response.json())
      .catch((error: any) => error.json());
  }
  login(user) {
    return this.http.post(this.loginUrl, user, {
      headers: this.authHeaders()
    })
      .map((response: Response) => response.json())
      .catch((error: any) => error.json());
  }
  forgotPassword(email) {
    return this.http.post(this.forgotPassUrl, email, {
      headers: this.authHeaders()
    })
      .map((response: Response) => response.json())
      .catch((error: any) => error.json());
  }
  accesData(userId) {
    return this.http.post(this.userInfoUrl, userId, this.jwt())
      .map((response: Response) => response.json())
      .catch((error: any) => error.json());
  }
  isLogedin() {
    let user = null;
    if (!this.isInSession()) {
      user = null;
      this.setLogedIn(false);
      // this.router.navigate(['/login']);
    } else {
      this.setLogedIn(true);
      if (this.isLocalStorage()) {
        // token = JSON.parse(localStorage.getItem('userToken'));
        user = JSON.parse(localStorage.getItem('currentUser'));
      } else {
        // console.log('check', this.cookieService.getAll())
        if (this.cookieService.check('userToken')) {
          // token = JSON.parse(this.cookieService.get('userToken'));
          user = JSON.parse(this.cookieService.get('currentUser'));
          // console.log('token', token)
        }
      }
    }
    return user;
  }
  //
  //
  ifUserExist(uid) {
    return this.http.get(this.ifUserExistApi + uid)
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  getUserData() {
    let user;
    if (this.isLocalStorage()) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      user = JSON.parse(this.cookieService.get('userToken'));
    }
    if (user) {
      //  console.log("USER data: ", user)
      const userId = {
        'uid': user.uid
      };
      this.accesData(userId)
        .subscribe(res => {
          if (res) {
            if (this.isLocalStorage()) {
              localStorage.setItem('currentUser', JSON.stringify(res));
              this.setLogedIn(true);
            } else {
              // JSON.parse(this.cookieService.get('userToken'));
              this.cookieService.set('currentUser', JSON.stringify(res));
              this.setLogedIn(true);
            }
          }
        }, error => {
          console.log(error);
          this.setLogedIn(false);
        });
    }
  }
  removeHWAstorage() {
    /* localStorage.removeItem('storeHwaFormData');
         localStorage.removeItem('storeHwaNid');
         localStorage.removeItem('profileNid');
         localStorage.removeItem('prof1_img_nid');
         localStorage.removeItem('prof2_img_nid');
         localStorage.removeItem('prof3_img_nid');
         localStorage.removeItem('prof4_img_nid');
         localStorage.removeItem('pamentData');
         localStorage.removeItem('copyHwaNid'); */
  }
  getHwatoken(user) {
    return this.http.get(this.getHWAtokenUrl, {
      headers: this.basicAuth(user)
    })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  logout() {
    // remove user from local storage to log user out
    /*  return this.http.get(this.logoutTokenUrl, { headers: this.authHeaders() })
           .map((res: Response) => res.json())
           .catch((error: any) => error.json()); */
    localStorage.removeItem('userToken');
    this.cookieService.delete('userToken');
    this.router.navigate(['/login']);
  }
  setLogedIn(isLogedIn: boolean): void {
    this._isLogedIn = isLogedIn;
    // alert(this._isLogedIn)
    this.subjectIsLogin.next(this._isLogedIn);
  }
  getLogedIn(): Observable < boolean > {
    return this.subjectIsLogin.asObservable();
  }
  //
  searchZip(zipc) {
    return this.http.get(this.googeMap + zipc)
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  // just header setting
  isLocalStorage(): boolean {
    // var isLocalStoragevar = false;
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (exception) {
      return false;
    }
  }
  isInSession(): boolean {
    const isExp = moment()
      .isBefore(moment.unix(this.getExpiration()));
    if (!isExp) {
      // this.router.navigate(['/login']);
      this.logout();
    }
    return isExp;
  }
  resetUserInfo(user) {
    if (this.isLocalStorage()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      this.cookieService.delete('currentUser');
      this.cookieService.set('currentUser', JSON.stringify(user));
    }
  }
  getHwaId() {
    let hwaId = null;
    if (this.isLocalStorage()) {
      hwaId = localStorage.getItem('storeHwaNid');
      // JSON.parse(localStorage.getItem('hwaData'));
      //  JSON.parse(localStorage.getItem('address'));
      // this.holdDataService.setSelectedAddress(this.addressList);
      // JSON.parse(localStorage.getItem('koData'));
      // JSON.parse(localStorage.getItem('skillData'));
    } else {
      hwaId = this.cookieService.get('storeHwaNid');
      // JSON.parse(this.cookieService.get('hwaData'));
      // JSON.parse(this.cookieService.get('address'));
      // this.holdDataService.setSelectedAddress(this.addressList);
      // this.cookieService.get('koData');
      // this.cookieService.get('skillData');
    }
    return hwaId;
  }
  removeHwaId() {
    if (this.isLocalStorage()) {
      localStorage.removeItem('storeHwaNid');
      // JSON.parse(localStorage.getItem('hwaData'));
      //  JSON.parse(localStorage.getItem('address'));
      // this.holdDataService.setSelectedAddress(this.addressList);
      // JSON.parse(localStorage.getItem('koData'));
      // JSON.parse(localStorage.getItem('skillData'));
    } else {
      this.cookieService.delete('storeHwaNid');
      // JSON.parse(this.cookieService.get('hwaData'));
      // JSON.parse(this.cookieService.get('address'));
      // this.holdDataService.setSelectedAddress(this.addressList);
      // this.cookieService.get('koData');
      // this.cookieService.get('skillData');
    }
  }
  getExpiration() {
    let token = null;
    let parsedToken = 0;
    if (this.isLocalStorage()) {
      token = localStorage.getItem('userToken');
    } else {
      token = this.cookieService.get('userToken');
    }
    const jwtHelper = new JwtHelper();
    if (token) {
      parsedToken = jwtHelper.decodeToken(token)
        .exp;
    }
    return parsedToken;
  }
  authHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }
  // basic auth
  basicAuth(obj) {
    // Temp hide untill basic auth
    const username = obj.name;
    const password = obj.pass;
    const token = btoa(username + ':' + password);
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }
  // Token Auth here
  private jwt() {
    // create authorization header with jwt token
    let userToken;
    if (this.isLocalStorage()) {
      userToken = JSON.parse(localStorage.getItem('userToken'));
    } else {
      if (this.cookieService.check('userToken')) {
        userToken = JSON.parse(this.cookieService.get('userToken'));
      }
    }
    if (userToken) {
      const headers = new Headers({
        'Authorization': 'Bearer ' + userToken.token
      });
      return new RequestOptions({
        headers: headers
      });
    }
  }
}

