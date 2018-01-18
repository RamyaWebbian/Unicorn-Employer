import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HoldDataService {
  /* private _hwaData: Array<any> = [];
  private _koData: Array<any> = [];
  private _skilldata: Array<any> = [];
  private _profiledata: Array<any> = [];
  private asynData: Subject<any> = new Subject<any>();
  private asynkoData: Subject<any> = new Subject<any>();
  private asynskillData: Subject<any> = new Subject<any>();
  private asynprofileData: Subject<any> = new Subject<any>();
  private finalOverlayData: Subject<any> = new Subject<any>();
  private _allStapesData: Array<any> = []; */
  private _selectedAddr = [];

   private selectedAddress: Subject<any> = new Subject<any>();

  constructor() { }

 setSelectedAddress(addressList: any): void {
 //  console.log('addressList', addressList)
    this.selectedAddress.next(addressList);
  }

 getSelectedAddress(): Observable<any> {
    return this.selectedAddress.asObservable();
  }

get selectedAddres(): any {
   return this._selectedAddr;
 }

 set selectedAddres(value: any) {
    // console.log('value ', value)
   this._selectedAddr = value;
 } 
 /* hwaData(hwaData: any): void {
    this._hwaData = hwaData;
    this.asynData.next(hwaData);
  }

  previewData(): Observable<Boolean> {
    return this.asynData.asObservable();
  }

// for the KnockoutQuestion data
  koData(kData: any): void {
     this._koData = kData;
     this.asynkoData.next(kData);
   }

   previewkoData(): Observable<Boolean> {
     return this.asynkoData.asObservable();
   }
   // For Skill and Experince data

  skillData(skillData: any): void {
      this._skilldata = skillData;
      this.asynskillData.next(skillData);
  }
  previewSkillData(): Observable<any> {
      return this.asynskillData.asObservable();
  }

  // For Profile and Experince data

  profileData(profiledata: any, step: number): void {
    this._profiledata[step] = profiledata;
    this.asynprofileData.next(this._profiledata);

  }
  previewProfileData(): Observable<Array<any>> {
    return this.asynprofileData.asObservable();
  }

  getAllHWA(hwaId): void {
  this.finalOverlayData.next(hwaId);
  }
 getAllHWAData(): Observable<any> {
    return this.finalOverlayData.asObservable();
  }
 get allStapesData(): Array<any> {
   return this._allStapesData;
 }

 set allStapesData(value: Array<any>) {
   this._allStapesData = value;
 } */

}
