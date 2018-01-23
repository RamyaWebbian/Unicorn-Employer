import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpModalComponent } from '../../common/help-modal/help-modal.component';
import {ProfileService, UserService, HoldDataService} from '../../services/index';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
// import {DOCUMENT} from '@angular/platform-browser';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public contentmsg = 'user'
  public helpShow : boolean;
  public disabledButton: boolean;
  public  profileForm: FormGroup;
  public businessName: string;
  public myModel:any;
  public field_name_of_your_business = '';
  public field_first_name = '';
  public field_last_name = '';
  public field_phone_number = '';
  public field_your_website_address = '';
  public field_your_social_media_url = '';
 // private address: Array<string> = [];
  //private members: Array<string> = [];
  public email = '';
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  private  addressList = [];

  constructor(private formbuilder: FormBuilder,
             // private el: ElementRef,
              private profileService: ProfileService,
              private userService: UserService,
              private router: Router,
              private holdDataService: HoldDataService,
              ) { }
  
  ngOnInit() {
    
    this.initFields();
     const user  = this.userService.isLogedin();
     if(user){
     if(user['business_address_created'] == 'no'){
      this.helpShow = true;
     }

    this.loadUserProfile(user);
  }
  }

    initFields() {
    this.profileForm = this.formbuilder.group({
      'field_name_of_your_business': ['', Validators.required],
      'field_first_name': ['', Validators.required], //Validators.pattern('^(^[^\s]+[A-z][A-Za-z]*\s+[A-Za-z]*)|([A-z][A-Za-z]*)$')],
      'field_last_name': ['', ], // Validators.pattern('^(^[^\s]+[A-z][A-Za-z]*\s+[A-Za-z]*)|([A-z][A-Za-z]*)$')],
      'email': ['', Validators.required],
      'field_phone_number': ['', Validators.required]
     
      //'address': this.formbuilder.array([ ])
    });
  }

onSubmit(isValid) {
    const udata = this.profileForm.value;
    const user = this.userService.isLogedin();
    if(user){

    }else{
      return false;
    }
    udata.uid = user.uid;
   // udata.address_delete = this.deleteAddress;
   this.disabledButton = true;
  
    this.profileService.getUserProfile(udata).subscribe(
      res => {
         this.disabledButton = false;
        console.log(res)
       this.holdDataService.setMessage({msg:res['message'], sucsess: true});
       
// this.router.navigate(['/add-location']);
        setTimeout(() => {
          if(this.addressList.length){
             this.router.navigate(['/user-profile-view']);
          }else{
             this.router.navigate(['/add-location']);
          }
        
        }, 2000);


      },
      error => {

      });
  }

  loadUserProfile(userdata) {

  //  this.emptyAddresses();
    const userId = {'uid': userdata.uid };
    this.userService.accesData(userId).subscribe(
      res => {
        // console.log(res)
 this.addressList = res['address'];
 if(this.addressList.length){
   this.helpShow = false;
  // this.router.navigate(['/user-profile-view']);
 }
        if (res['status']) {
          const user =  res;
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
