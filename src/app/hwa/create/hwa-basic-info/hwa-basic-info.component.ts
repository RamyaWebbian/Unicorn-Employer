import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, HwaCommonService, ProfileService, HoldDataService } from '../../../services/index';
import {NotificationsService} from 'angular2-notifications';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-hwa-basic-info',
  templateUrl: './hwa-basic-info.component.html',
  styleUrls: ['./hwa-basic-info.component.css','../../only-hwa.css']
})
export class HwaBasicInfoComponent implements OnInit {
  public creatHWAForm: FormGroup;
  public addressList:Array<string> = [];
  public disabledButton:boolean;
  public addLocationForm: FormGroup;
public selectedNid = [];
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
    private toolbarOptions = [
    'bold',
    'italic',
    'underline',
    { 'align': '' },
    { 'align': 'center' },
    { 'align': 'right' },
    { 'list': 'ordered' },
    { 'list': 'bullet' },
    { 'indent': '-1' },
    { 'indent': '+1' }
  ];
  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    modules: {
      toolbar: this.toolbarOptions
    },
    placeholder: `•   Explain Job Responsibilities.
•   Add your work culture.
•   Add specific requirements like shifts, days etc.
`};

  constructor(
    private router: Router,
    private zone:NgZone,
    private formbuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
     private hwaCommonService: HwaCommonService,
     private holdDataService:HoldDataService,
    private _notificationsService: NotificationsService,
    private cookieService:CookieService
    ) { }
 
   

  ngOnInit() {
   

    this.selectedNid = [];
      this.creatHWAForm = this.formbuilder.group({
      'title': ['', {updateOn: 'change', validators: [Validators.required]}],
      'field_how_many_people_do_you_nee': ['', {updateOn: 'change', validators:[Validators.required]}],
      'field_will_they_be_full_time_par': ['', {updateOn: 'change', validators:[Validators.required]}],
      'field_describe_the_skills_and_ex': ['', {updateOn: 'change', validators:[Validators.required]}],
      //'locations': this.formbuilder.array([]),
      'field_how_would_you_describe_thi': ['', {updateOn: 'change', validators:[Validators.required]}],
      //'email': ['',{updateOn: 'change',validators:[ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
    //  'confirmemail': ['',{updateOn: 'change',validators: [ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
     // 'phone': ['', {updateOn: 'change', validators: [Validators.required]}]
    }, {updateOn: 'change'}); //asyncValidators: [this.isEqualEmail]
   
 var oldHwaData = null;  
 if (this.userService.isLocalStorage()) {
  oldHwaData =  JSON.parse(localStorage.getItem('hwaData'));
  }else{
  oldHwaData =  JSON.parse(this.cookieService.get('hwaData'));
}
if(oldHwaData){
this.creatHWAForm.patchValue(oldHwaData);
}
  
    
    // this.addressList =  this.holdDataService.selectedAddres;
     //console.log( this.addressList  );
  this.holdDataService.getSelectedAddress().subscribe((data: Array<any>) => {
      console.log('data', data);
       this.addressList = data
       this.addressList.forEach((item, index) => {
          this.selectedNid[index]=item['nid']
      });

   });
   
 /* this.holdDataService.getSelectedAddress().subscribe(data => this.zone.run(() => {;
       console.log('zzzzzzzzzzzzzzz', data  );
    }));*/
   
  }


getAddress(user) {
   
    this.profileService.getaddress(user.uid).subscribe(
      res => {
       // console.log(res);
        this.addressList = res;
        this.addressList.forEach((item, index) => {
          this.selectedNid[index]=item['nid']
});
   // console.log(' this.selectedNid',  this.selectedNid);    
      },error=>{

      });
}
selectLocation() {
  // [routerLink]="['/select-hiring-location']
        const creteObj = {
        //'hwa_nid': '',
        'title': this.creatHWAForm.value.title,
        'field_how_many_people_do_you_nee': this.creatHWAForm.value.field_how_many_people_do_you_nee,
        'field_will_they_be_full_time_par': this.creatHWAForm.value.field_will_they_be_full_time_par,
        'field_how_would_you_describe_thi': this.creatHWAForm.value.field_how_would_you_describe_thi,
        'field_describe_the_skills_and_ex': this.creatHWAForm.value.field_describe_the_skills_and_ex,
       // 'nid': this.selectedNid
      };

    if (this.userService.isLocalStorage()) {

      localStorage.setItem('hwaData', JSON.stringify(creteObj));
    
    }else{
        this.cookieService.delete('hwaData');
        this.cookieService.set('hwaData', JSON.stringify(creteObj));
      
        }

this.router.navigate(['/select-hiring-location']);
}
onSubmit() {
    this.disabledButton = true; //'Processing...';

    if (this.creatHWAForm.valid) {
      const user = this.userService.isLogedin();
   
      const CreteObj = {
        'hwa_nid': '',
        'uid': user.uid,
        'title': this.creatHWAForm.value.title,
        'field_how_many_people_do_you_nee': this.creatHWAForm.value.field_how_many_people_do_you_nee,
        'field_will_they_be_full_time_par': this.creatHWAForm.value.field_will_they_be_full_time_par,
        'field_how_would_you_describe_thi': this.creatHWAForm.value.field_how_would_you_describe_thi,
        'field_describe_the_skills_and_ex': this.creatHWAForm.value.field_describe_the_skills_and_ex,
        'nid': this.selectedNid
      };

console.log(CreteObj);

      this.hwaCommonService.createHWA(CreteObj).subscribe(
        res => {
          this.disabledButton = false;
          console.log(res)
          this._notificationsService.success(
            'Success',
            'Your have created Help Wanted Ad Successfully',
            {
              timeOut: 600,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
            });

             localStorage.removeItem('hwaData');
             this.cookieService.delete('hwaData');
    });
    }
  }

  saveAsDraft() {


  };

  discardAd() {

  }
//---------------------------------------------------

onEditorBlured(quill) {
 //   console.log('editor blur!', quill);
  }
 
  onEditorFocused(quill) {
  //  console.log('editor focus!', quill);
  }
 
  onEditorCreated(quill) {
    this.editor = quill;
   // console.log('quill is ready! this is current quill instance object', quill);
  }
 
  onContentChanged({ quill, html, text }) {
   // console.log('quill content is changed!', quill, html, text);
  }

}
