import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {UserService} from '../../services/user.service';


@Injectable()

export class AllApplicantServicesService {
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

  constructor(private http: Http, private router: Router, private userService: UserService) {

  }



  // CORS SEtting
  authHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
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
    return this.http.post(this.recruitmentActionApi, statusInfo,  { headers: this.authHeaders() })
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

}
