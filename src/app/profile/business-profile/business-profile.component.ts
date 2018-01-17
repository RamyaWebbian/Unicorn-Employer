import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService, HwaCommonService } from '../../services/index';
import {NotificationsService} from 'angular2-notifications';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  public isFirstBisProfile:boolean;
  public businessProfile:FormGroup;
  public disableButton:boolean;
  public submitted: boolean = false;
  public loading: boolean;
  public helpShow:boolean = true;
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  public profileImageId:any;
  public filesToUpload: Array<File>;
  public imgbase64src: any;
  public imgLoading: boolean;
public isThereImge:boolean;
private bisProfileId:string = '';
private topicItemId:string = '';
public  changeUiForNew:boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private hwaCommonService:HwaCommonService,
    private _notificationsService: NotificationsService,
    private activatedRoute:ActivatedRoute
   ) { }
  

  ngOnInit() {

      this.businessProfile = this.formBuilder.group({
      'field_business_profile_topic_ima':[''],
      'field_topic': ['', {updateOn: 'change', validators: [Validators.required]}],
      'field_business_profile_topic_des': ['', {updateOn: 'change', validators:[Validators.required]}],
    })
    var user = this.userService.isLogedin();
    console.log(user)
    if(user.business_profile_created == 'yes') {
      this.isFirstBisProfile = false;
    this.businessProfile.controls["field_business_profile_topic_ima"].setValidators([Validators.nullValidator]);
  }else {
    this.isFirstBisProfile = true;
    this.businessProfile.controls["field_business_profile_topic_ima"].setValidators([Validators.required]);
    }
    
     this.isThereImge = false;
     this.activatedRoute.params.subscribe(
      (param:  any) => {
         console.log(param['bId']);
         if(param['bId']){
           this.isFirstBisProfile = false;
           this.bisProfileId = param['bId'];
           this.helpShow = false;
           if(param['topicId'] == 'new'){
           this.topicItemId = '';
            this.imgbase64src = '';
          this.changeUiForNew = true; 
          // this.bisProfileId = "";
         }else if(param['topicId'] != ''){
          this.topicItemId = param['topicId'];
           this.loadbusProfile(param['bId']);
         }else {
          this.changeUiForNew = false; 
         }
       
         }else{
            this.topicItemId = '';
            this.changeUiForNew = false; 
           this.bisProfileId = "";
          
           // alert('busness profile id is empty')
         }
 
      });

     // {updateOn: 'change', validators: [Validators.required]}
  
  }

  
  helpText() {
   this.helpShow = !this.helpShow;
  }
  viewProfile() {
   // this.router.navigate(['/view-business-profile']);
  }
loadbusProfile(profileId){
const pObj = {"bptnid": profileId}
   this.hwaCommonService.getBusinessTopic(pObj).subscribe(
         res => {
         console.log(res);
         var bizTopics = res['business_topic'];
       //  console.log(this.topicItemId);
         if(this.topicItemId) {
          // alert('kkkkkkkkkkkkkkkk')
          for(let i = 0; i<bizTopics.length; i++){
             if(this.topicItemId == bizTopics[i].item_id){
              this.imgbase64src = bizTopics[i].field_business_profile_topic_ima;
              this.businessProfile.patchValue(bizTopics[i]);
               this.profileImageId = bizTopics[i].fid;
              this.isThereImge = true;
              
             }
          }
         }else{
           
           this.imgbase64src = bizTopics[0].field_business_profile_topic_ima;
           if(!this.changeUiForNew) {
             this.topicItemId = bizTopics[0].item_id;
             this.businessProfile.patchValue(bizTopics[0]);
           }
           this.isThereImge = true;
           this.profileImageId = bizTopics[0].fid; 
         }
        
        // alert('loaded succsed')
        },error => {
          
 console.log(error);
 
      });
 
  }

  onSubmit(fvalue:any , valid: boolean) {
    this.disableButton = true;
    const user = this.userService.isLogedin();
    this.submitted = true;
    this.loading = true;
    const userObj = {
    "item_id": this.topicItemId,
    "field_business_profile_topic_ima": fvalue.controls['field_business_profile_topic_ima'].value,
    'field_topic': fvalue.controls['field_topic'].value,
    'field_business_profile_topic_des': fvalue.controls['field_business_profile_topic_des'].value
    };

    var bisObj = {
    "nid":this.bisProfileId,
    "uid":user.uid,
    "field_hwa_refrence":"",
    "business_topic":[userObj]
    }
    console.log(bisObj)
     if (valid) {
      this.hwaCommonService.createProfile(bisObj).subscribe(
      res => {
         this.disableButton = false;
        console.log(res);
        if(this.isFirstBisProfile) {
        const user = this.userService.isLogedin();
        user.business_profile_created = 'yes'
        this.userService.resetUserInfo(user);
        }
         this._notificationsService.success(
          'Success',
          res['Message'],
          {
            timeOut: 600,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          });
          let pid = res['details'][0].nid[0].value
          console.log(pid);
        this.router.navigate(['/view-business-profile', pid]);
      },error => {

      });

               
         } else {
          this.loading = false;
        }
     }

fileChangeEvent (fileInput: any) {
   this.imgLoading = true;
    this.isThereImge = false;
    this.filesToUpload = <Array<File>> fileInput.target.files;
    const file: File = this.filesToUpload[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      console.log( file.name);
      const imgData = {
        'image_data': myReader.result.split(',')[1],
        'name': file.name
      };
      this.hwaCommonService.uploadProfileImage(imgData).subscribe(
        res => {
          console.log(res);
          if (res['fid']) {
            this.profileImageId =  res['fid'];
            this.imgbase64src = res['image'];
            this.isThereImge = true;
            //this.showDeleteBtn[j] = true;
           // setTimeout(() => {
              this.imgLoading = false;
           // }, 1500);
          }else {
          }
        });
    };

    myReader.readAsDataURL(file);
  }

userProfileView(){

}
    }