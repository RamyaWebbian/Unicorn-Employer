import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, ProfileService } from '../../../services/index';
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
    // private hwaCommonService: HwaCommonService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    const user = this.userService.isLogedin();
    if(user) {
    this.getAddress(user);
    }
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
}
