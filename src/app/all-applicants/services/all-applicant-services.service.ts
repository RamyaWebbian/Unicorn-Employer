import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {UserService} from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AllApplicantServicesService {
  private _hwaId: any;
  public switchUrl = this.userService.switchUrl;
  private fetchStatusAllApplicantApi = this.switchUrl + 'recruitment_flow_stats.json';
  private summeryOfActiveHwaApi = this.switchUrl + 'summary_of_active_hwa.json';
  private all_applicantsApi = this.switchUrl + 'all_applicant.json';
  private getApplicationApi = this.switchUrl + 'load_resume.json';
  private recruitmentActionApi = this.switchUrl + 'recruitment_actions.json';
  private interviewNotesGetApi = this.switchUrl + 'interview_note_get.json';
  private interviewSummeryApi = this.switchUrl + 'interview_summary.json';
  private interviewListApi = this.switchUrl + 'interview_applicant_list.json';
  private offerSummeryApi = this.switchUrl + 'offer_summary.json';
  private reciterOfferListApi = this.switchUrl + 'recruiter_offer.json';
  private storedHwaId: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(private http: Http, private router: Router, 
    private cookieService: CookieService,
    private userService: UserService) {

  }



  // CORS SEtting
  authHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  // Token Auth here
  private jwt() {
    // create authorization header with jwt token
    let userToken;
    if (this.userService.isLocalStorage()) {
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

  checkQuardrantInfo(empUid) {
    return this.http.post(this.fetchStatusAllApplicantApi, empUid,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  summeryOfActiveHwa(uid) {
    return this.http.post(this.summeryOfActiveHwaApi, uid,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  // interviewSummeryApi
  interviewSummery(uid) {
    return this.http.post(this.interviewSummeryApi, uid,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  //
  offerSummery(uid) {
    return this.http.post(this.offerSummeryApi, uid,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  getAllApplicant(hwaNid) {
    return this.http.post(this.all_applicantsApi, hwaNid,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  getApplication(applicantId) {
    return this.http.post(this.getApplicationApi, applicantId,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  recruitmentAction(statusInfo) {
    return this.http.post(this.recruitmentActionApi, statusInfo,  this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  interviewNotesGet(statusInfo) {
    return this.http.post(this.interviewNotesGetApi, statusInfo,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  interviewList(hwa_id) {
    return this.http.post(this.interviewListApi, hwa_id,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  //
  reciterOfferList(hwa_id) {
    return this.http.post(this.reciterOfferListApi, hwa_id,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  setHwaId(HwaId: any): void {
  this._hwaId = HwaId
      this.storedHwaId.next(this._hwaId);
    }
  getHwaId(): Observable<any> {
    return this.storedHwaId.asObservable();
  }

}
