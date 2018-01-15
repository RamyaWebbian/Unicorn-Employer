import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
import {ProfileService, UserService, HwaCommonService} from '../../services/index';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css'],
  
})
export class UserProfileViewComponent implements OnInit {
  public helpShow : boolean;
  public businessName: string;
  public myModel:any;
  public field_name_of_your_business = '';
  public field_first_name = '';
  public field_last_name = '';
  public field_phone_number = '';
  public field_your_website_address = '';
  public field_your_social_media_url = '';
  public email = '';
  public addressList = [];
  public showHideArray = [];
  private bisProfileId:string = "";
  public isFirstTime:boolean = false;
 // public addresses: any;
private userInfo:any;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };

  public businessTopic:Array<any> = [];
  public bisProfileImg:any;
 // public bisProfileId = '';

  constructor(private router : Router,
              private profileService: ProfileService,
              private userService: UserService,
              private _notificationsService: NotificationsService,
              private _eref: ElementRef,
              private hwaCommonService:HwaCommonService,
              ) { }

  ngOnInit(  ) {
     this.userInfo  = this.userService.isLogedin();
     if( this.userInfo){
       this.loadUserProfile(this.userInfo);
     }
   
   // this.getAddress(this.userInfo)
  }

  loadUserProfile(userdata) {

  //  this.emptyAddresses();
    const userId = {'uid': userdata.uid };
    this.userService.accesData(userId).subscribe(
      res => {
        
        if (res['status']) {
          const user =  res;
        
          this.addressList = res['address'];
          if(this.addressList.length && res['business_profile_id'].length){
            this.isFirstTime = false;
              this.bisProfileId = res['business_profile_id'][0].nid;
           this.loadbusProfile(this.bisProfileId);
 console.log('this.bisProfileId', this.bisProfileId)
          }else{
             this.isFirstTime = true;
          }
          this.addressList.forEach((item, index) => {
            this.showHideArray[index] = false;
          });
          
      
          // localStorage.setItem('currentUser', JSON.stringify(res));

          //this.userService.setLogedIn(true);
          if (user['details'].field_name_of_your_business[0]) {
            this.field_name_of_your_business = user['details'].field_name_of_your_business[0].value;
            this.businessName = user['details'].field_name_of_your_business[0].value;
          }
          if (user['details'].field_first_name[0]) {
            this.field_first_name = user['details'].field_first_name[0].value;
          }
          if (user['details'].field_last_name[0]) {
            this.field_last_name = user['details'].field_last_name[0].value;
          }
          if (user['details'].field_phone_number[0]) {
            this.myModel = user['details'].field_phone_number[0].value;
          }
          if (user['details'].field_your_website_address[0]) {
            this.field_your_website_address = user['details'].field_your_website_address[0].value;
          }
          if (user['details'].field_your_social_media_url[0]) {
            this.field_your_social_media_url =  user['details'].field_your_social_media_url[0].value;
          }
          if (user['details'].name[0]) {
            this.email =  user['details'].name[0].value;
          } 

        }
      },
      error => {
      });
  }



deleteAddress(nid) {
  const delItem = {"nid":[nid] }
 this.profileService.deleteAddressById(delItem).subscribe(
      res => {
      console.log(res);
       this.loadUserProfile(this.userInfo);
        this._notificationsService.success(
          'Deleted!',
          res['message'],
          {
            timeOut: 4000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          });
      },error => {
        console.log(error);
      });
}

markAsDefault(nid){
const user = this.userService.isLogedin();

this.profileService.getaddressById(nid).subscribe(
      res => {

        var locObj = res[0]
        var fobj = {'nid':nid, 'field_make_default': 1};
          locObj.field_make_default = 1;
          const locationObj = {
          'uid': user.uid,
          'address': [locObj]
          };
 this.profileService.createBusinessLocation(locationObj).subscribe(
      res => {
        console.log(res);
        this.loadUserProfile(this.userInfo);
        this._notificationsService.success(
          'Success', res['message'],
          {
            timeOut: 600,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          }
        );
        //
       // this.router.navigate(['/user-profile-view']);
      },
      error => {
        
      });

      },error => {

      }); 

}

openMenu(i){
  this.showHideArray.forEach((item, index) => {
    if(index == i){
      this.showHideArray[index] = true
    }else{
       this.showHideArray[index] = false;
    }
           
  });
}

hideAllMenu(){
  this.showHideArray.forEach((item, index) => {
       this.showHideArray[index] = false;  
  });
}

 /*  onClick(event) {
    console.log( event.target);
    if (!this._eref.nativeElement.contains(event.target)) { // or some similar check
    // doSomething();
     this.hideAllMenu();
    } 

  }*/

  businessCreate() {
    if( this.bisProfileId ){
      this.router.navigate(['/business-profile', this.bisProfileId, '']);
    }else{
      this.router.navigate(['/business-profile']);
    }
    
  }
  createHWA(){
     this.router.navigate(['/hwa-basic-info']);
  }
  userProfile() {
    this.router.navigate(['/user-profile']);
  }
  addLoc() {
    this.router.navigate(['/add-location']);
  }
  addNewLoc() {
    this.router.navigate(['/add-new-location']);
  }
  helpText() {
    this.helpShow = !this.helpShow;
   // alert(this.helpShow)
  }
 // --------------------------------business profile ---------------- 
  loadbusProfile(profileId) {
const pObj = {"bptnid": profileId}
   this.hwaCommonService.getBusinessTopic(pObj).subscribe(
         res => {
          console.log(res['business_topic']);
          this.bisProfileImg = res['business_topic'][0].field_business_profile_topic_ima;
          this.businessTopic = res['business_topic'];

        },error => {
 
 console.log(error);
 
      });
 
  }

}
