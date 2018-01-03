import { Component, OnInit, Input, ViewChild, TemplateRef, } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService, HwaCommonService } from '../../services/index';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  public businessProfile:FormGroup;
  public submitted: boolean = false;
  public loading: boolean;
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
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private hwaCommonService:HwaCommonService,
    private _notificationsService: NotificationsService
   ) { }
  

  ngOnInit() {
    var user = this.userService.isLogedin();
    this.businessProfile = this.formBuilder.group({
      'field_business_profile_topic_ima':['', {updateOn: 'change', validators: [Validators.required]}],
      'field_topic': ['', {updateOn: 'change', validators: [Validators.required]}],
      'field_business_profile_topic_des': ['', {updateOn: 'change', validators:[Validators.required]}],
    })
  }

  helpText() {
    this.router.navigate(['/why-business-profile-imp']);
  }
  viewProfile() {
    this.router.navigate(['/view-business-profile']);
  }

  onSubmit(fvalue:any , valid: boolean) {
    const user = this.userService.isLogedin();
    this.submitted = true;
    this.loading = true;
    const userObj = {
    "item_id":"",
    "field_business_profile_topic_ima": fvalue.controls['field_business_profile_topic_ima'].value,
    'field_topic': fvalue.controls['field_topic'].value,
    'field_business_profile_topic_des': fvalue.controls['field_business_profile_topic_des'].value
    };

    var bisObj ={
    "nid":"",
    "uid":user.uid,
    "field_hwa_refrence":"",
    "business_topic":[userObj]
    }
   // console.log(valid)
     if (valid) {
      this.hwaCommonService.createProfile(bisObj).subscribe(
      res => {
        this.router.navigate(['/view-business-profile']);
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

    }