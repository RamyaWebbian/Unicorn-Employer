import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserService} from './user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HwaCommonService {
  public switchUrl= this.userService.switchUrl;
  private create_hwa = this.switchUrl + 'create_hwa.json';
  private popupAddress= this.switchUrl + 'create_business_address.json';
  private koQuestion= this.switchUrl + 'default-knockout-questions';
  private skillQuestion= this.switchUrl + 'create_skill_exp_ques.json';
  private koCustomQ= this.switchUrl + 'create_ko.json';

  private profilesUrl = this.switchUrl + 'build_out_your_business_profile.json';
  private uploadProfilesUrl = this.switchUrl + 'upload_image.json';
  private getProfileDataUrl = this.switchUrl + 'business_profile?nid=';
  private getBusinessTopicUrl = this.switchUrl + 'business_topic_deatils.json';
  // for  draft data
  private getDraftDataUrl = this.switchUrl + 'hwaedit?hwa_nid=';
  private getDraftSkillUrl = this.switchUrl + 'skils?hwa_id=';
  private getDraftKoUrl = this.switchUrl + 'Ko_listings?hwa_id=';

  private getHwaCountUrl = this.switchUrl + 'hwa_status_counter.json';
  private getAllDataOfHwaUrl = this.switchUrl + 'hwa_full_data.json';
  private submitHwaUrl =  this.switchUrl + 'hwa_status_update.json';

  private getAllHWAListUrl = this.switchUrl + 'hwa_status_listings.json?uid=';
  private linkToProfileUrl = this.switchUrl + 'hwa_bp_save.json';
  private stopHwaUrl =  this.switchUrl + 'hwa_stop_resume.json';

  private deleteImgUrl =  this.switchUrl + 'bp_image_delete.json';
  private discardUrl = this.switchUrl + 'hwa_discard.json';

// Ko_listings?hwa_id=918
  //
  private _hwanid: any;
  constructor(private http: Http,
  private cookieService:CookieService,
   private userService: UserService) { }
  // Create Help Wanted Ads
  // this.switchUrl = this.userService.switchSample;
  // getting HWA NID
  get hwaNid(): any {
    return this._hwanid;
  }

  set hwaNid(value: any) {
    this._hwanid = value;
  }
  createHWA(uid): any {
    return this.http.post(this.create_hwa, uid, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  // popup
  popUpAddLocation(uid): any {
    return this.http.post(this.popupAddress, uid, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  // Knockout Question
  defaultQuestion(): any {
    return this.http.get(this.koQuestion, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());

  }
  // Custom Question
  customQuestion(qObj): any {
    return this.http.post(this.koCustomQ, qObj, {headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  // Skill Assesment
  skillQusestion(skillObj): any {
    return this.http.post(this.skillQuestion, skillObj, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  createProfile(profileObj) {
  /*  const user = this.userService.isLogedin();
    const hid = localStorage.getItem('storeHwaNid');
    const prof_nid = localStorage.getItem('profileNid');
    profileObj.uid = user.uid;
    profileObj.nid = prof_nid;
    profileObj.hwa_nid = hid;
    profileObj.status = '1'; */
    return this.http.post(this.profilesUrl, profileObj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  uploadProfileImage(profileImgObj) {
    return this.http.post(this.uploadProfilesUrl, profileImgObj, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  getProfileDraftData(profId) {
    return this.http.get(this.getProfileDataUrl + profId,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

getBusinessTopic(bisProfileObj): any {
    return this.http.post(this.getBusinessTopicUrl, bisProfileObj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  loadDraftData(hwaId, uid) {
    const para = hwaId + '&&uid=' + uid + '&&type=help_wanted_ad';
    console.log(this.getDraftDataUrl + para);
    return this.http.get(this.getDraftDataUrl + para,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  loadSkillsDraftData(hwaId, uid) {
    const para = hwaId + '&&uid=' + uid + '&&type=skills_or_experience_questions';
    return this.http.get(this.getDraftSkillUrl + para,  { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  loadkosDraftData(hwaId, uid) {
    const para = hwaId + '&&uid=' + uid + '&&type=knockout_questions';
    return this.http.get(this.getDraftKoUrl + para, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  loadCountOfHwa(obj) {
    return this.http.post(this.getHwaCountUrl, obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  getAllDataOfHwa(obj) {
    return this.http.post(this.getAllDataOfHwaUrl, obj, { headers: this.authHeaders() })
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  submitHWA(obj) {
    return this.http.post(this.submitHwaUrl, obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  getAllHWAList(uid) {
    return this.http.get(this.getAllHWAListUrl + uid, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }

  linkToProfile(Obj) {
    return this.http.post(this.linkToProfileUrl, Obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  stopHwa(Obj) {
    return this.http.post(this.stopHwaUrl, Obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  deleteImg(Obj) {
    return this.http.post(this.deleteImgUrl, Obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  discardHwa(Obj) {
    return this.http.post(this.discardUrl, Obj, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => error.json());
  }
  removeHWAstorage() {
    localStorage.removeItem('storeHwaFormData');
    localStorage.removeItem('storeHwaNid');
    localStorage.removeItem('profileNid');
    localStorage.removeItem('prof1_img_nid');
    localStorage.removeItem('prof2_img_nid');
    localStorage.removeItem('prof3_img_nid');
    localStorage.removeItem('prof4_img_nid');
    localStorage.removeItem('pamentData');
    localStorage.removeItem('copyHwaNid');
  }
  // just header setting
  authHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }
  // Token Auth here
  private jwt() {
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
      return new RequestOptions({ headers: headers });
    }
  }
}
