import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
import {ProfileService, UserService} from '../../services/index';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
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
 // public addresses: any;
private userInfo:any;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(private router : Router,
              private profileService: ProfileService,
              private userService: UserService,
              private _notificationsService: NotificationsService
              ) { }

  ngOnInit(  ) {
     this.userInfo  = this.userService.isLogedin();
    this.loadUserProfile(this.userInfo);
   // this.getAddress(this.userInfo)
  }

  loadUserProfile(userdata) {

  //  this.emptyAddresses();
    const userId = {'uid': userdata.uid };
    this.userService.accesData(userId).subscribe(
      res => {
        
        if (res['status']) {
          const user =  res;
          this.bisProfileId = res['business_profile_id'][0].nid;
 console.log('this.bisProfileId', this.bisProfileId)
          this.addressList = res['address'];
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

  businessCreate() {
    this.router.navigate(['/business-profile',this.bisProfileId, '']);
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
}
