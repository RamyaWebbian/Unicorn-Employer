import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
import {ProfileService, UserService} from '../../services/index';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
// import {DOCUMENT} from '@angular/platform-browser';
import {NotificationsService} from 'angular2-notifications';
declare let $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public helpShow : boolean;
  public disabledButton: boolean;
  public  profileForm: FormGroup;
    public businessName: string;
    public myModel:any;
    private field_name_of_your_business = '';
  private field_first_name = '';
  private field_last_name = '';
  private field_phone_number = '';
  private field_your_website_address = '';
  private field_your_social_media_url = '';
 // private address: Array<string> = [];
  //private members: Array<string> = [];
  private email = '';

  constructor(private formbuilder: FormBuilder,
             // private el: ElementRef,
              private profileService: ProfileService,
              private userService: UserService,
              private router: Router,
              private _notificationsService: NotificationsService,
              ) { }
  
  ngOnInit() {
    this.helpShow = true;
    this.initFields();
     const user  = this.userService.isLogedin();
    this.loadUserProfile(user);
  }

    initFields() {
    this.profileForm = this.formbuilder.group({
      'field_name_of_your_business': ['', Validators.required],
      'field_first_name': ['', Validators.required],
      'field_last_name': [''],
      'email': ['', Validators.required],
      'field_phone_number': ['', Validators.required]
     
      //'address': this.formbuilder.array([ ])
    });
  }

onSubmit() {
    const udata = this.profileForm.value;
    const user = this.userService.isLogedin();
    udata.uid = user.uid;
   // udata.address_delete = this.deleteAddress;
   this.disabledButton = true;
    this.profileService.getUserProfile(udata).subscribe(
      res => {
         this.disabledButton = false;
        console.log(res)
       // this.loadUserFormData(user);
        this._notificationsService.success(
          'Saved!',
          'Your Profile Saved Successfully',
          {
            timeOut: 2500,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          }
        );

        setTimeout(() => {
         // this.router.navigate(['/dashboard/1']);
           this.router.navigate(['/add-location']);
        }, 1000);
      },
      error => {

      });
  }

  loadUserProfile(userdata) {

  //  this.emptyAddresses();
    const userId = {'uid': userdata.uid };
    this.userService.accesData(userId).subscribe(
      res => {
         console.log(res)
        if (res['status']) {
          const user =  res;
         

          localStorage.setItem('currentUser', JSON.stringify(res));

          this.userService.setLogedIn(true);
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
      }
    );
  }


  helpText() {
   this.helpShow = !this.helpShow;
  // alert(this.helpShow)
  }
}
