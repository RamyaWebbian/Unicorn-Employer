import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/Rx';
import {UserService} from './user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ProfileService {
  public switchUrl= this.userService.switchUrl;
  private businessAddressUrl= this.switchUrl + 'create_business_address.json';
  private dashboardUrl = this.switchUrl + 'employer_dashboard.json/';
  private postUserProfileUrl = this.switchUrl + 'user_update.json';
  private getinvitedUser = this.switchUrl + 'memberlists.json';
  private postInviteUserUrl = this.switchUrl + 'invite_user.json';
  private getAddress= this.switchUrl + 'address/api?uid=';
  private getAddressbyidUrl= this.switchUrl + 'address/api?nid=';
  private deleteAddressbyidUrl= this.switchUrl + 'delete_nid.json';
  private headers = new Headers();
  private _isLogedIn: boolean;
  private subjectIsLogin: Subject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private http: Http, 
  private userService: UserService,
  private cookieService:CookieService) {

  }
  // remove
  getDashboardData(uid): any {
    return this.http.post(this.dashboardUrl, uid, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

getinvitedUserList(uid): any {
  return this.http.post(this.getinvitedUser, {'uid': uid}, this.jwt())
    .map((res: Response) => res.json())
    .catch((error: any) => error.json());
}
sendInviteUsers(udata) {
  return this.http.post(this.postInviteUserUrl, udata, this.jwt())
    .map((res: Response) => res.json())
    .catch((error: any) => error.json());
}
  getUserProfile(udata) {
    return this.http.post(this.postUserProfileUrl, udata, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
 /* setLogedIndata(isLogedIn: boolean): void {
    this._isLogedIn = isLogedIn;
    this.subjectIsLogin.next(isLogedIn);
  }

  getLogedIndata(): Observable<Boolean> {
    return this.subjectIsLogin.asObservable();
  } */
 createBusinessLocation(uid): any {
    return this.http.post(this.businessAddressUrl, uid, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
deleteAddressById(obj): any {
    return this.http.post(this.deleteAddressbyidUrl, obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

 getaddress(uid) {
    return this.http.get(this.getAddress + uid, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
   getaddressById(nid) {
    return this.http.get(this.getAddressbyidUrl + nid, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  authHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new RequestOptions({ headers: headers });
    // return headers;
  }
// Token Auth here
   jwt() {
    // create authorization header with jwt token
    
     var userToken;
     if(this.userService.isLocalStorage()){
     userToken = JSON.parse(localStorage.getItem('userToken'));
     }else{
        if( this.cookieService.check('userToken')) {
     userToken  = JSON.parse(this.cookieService.get('userToken'));
        }
     }

    if (userToken) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + userToken.token });
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
    //  headers.append('X-XSRF-TOKEN', userToken);
      return new RequestOptions({ headers: headers });
    }
  }
}
