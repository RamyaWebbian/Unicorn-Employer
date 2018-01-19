import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
 import { UserService, HwaCommonService} from '../../services/index';

 
@Component({
  selector: 'app-view-business-profile',
  templateUrl: './view-business-profile.component.html',
  styleUrls: ['./view-business-profile.component.css']
})
export class ViewBusinessProfileComponent implements OnInit {
  public businessTopic:Array<any> = [];
  public bisProfileImg:any;
  public bisProfileId = '';
  constructor(
    private router: Router,
    private userService:UserService,
    private hwaCommonService:HwaCommonService,
    private activatedRoute:ActivatedRoute
  ) { }
 
 
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param:  any) => {
         console.log(param['pId']);
         if(param['pId']){
           this.bisProfileId = param['pId'];
          this.loadbusProfile(param['pId']);
         }else{
           this.bisProfileId ="";
          alert('busness profile id is empty')
         }  
 
      });
 
     const user = this.userService.isLogedin();
 
  }
  addNewBusiness() {
    //this.router.navigate(['/business-profile']);
  }

  helpText(){
  }
 
  
 
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

 createHWA() {
this.router.navigate(['/hwa-basic-info']);
 }

}
