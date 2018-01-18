import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, ProfileService, HwaCommonService } from '../../../services/index';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-select-hiring-location',
  templateUrl: './select-hiring-location.component.html',
  styleUrls: ['./select-hiring-location.component.css']
})
export class SelectHiringLocationComponent implements OnInit {
  public addressList = [];

  constructor(private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private hwaCommonService: HwaCommonService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    const user = this.userService.isLogedin();
    if(user) {
    this.getAddress(user);
    }
  }

 get selectedOptions() { // right now: ['1','3']
    return this.addressList
              .filter(opt => opt.checked)
              .map(opt => opt.nid)
  }
getSelectedAddress(){
  console.log(this.selectedOptions);
}
getAddress(user) {
   
    this.profileService.getaddress(user.uid).subscribe(
      res => {
        console.log(res);
        this.addressList = res;
        this.addressList.forEach((item, index) => {
          //this.selectedNid[index]=item['nid']
    if(item.field_make_default == '1') {
     // this.defaultNId = item.nid;
      // this.businessAddressForm.patchValue(item);
      // this.addLocation(item['nid'])
    }
});
      },error=>{

      });
}

onSubmit() {
  console.log(this.selectedOptions);
   const user = this.userService.isLogedin();
    const locationObj = {
      'uid': user.uid,
      'address': this.selectedOptions
    };
    
    this.hwaCommonService.popUpAddLocation(locationObj).subscribe(
      res => {
       console.log(res)
       // this.addLocationForm.reset();
         this._notificationsService.success(
          'Success',
          'Location Added Successfully',
          {
            timeOut: 600,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          }
        );
      });
}

}
