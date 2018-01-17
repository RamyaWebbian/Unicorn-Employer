import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, HwaCommonService, ProfileService } from '../../../services/index';
import {NotificationsService} from 'angular2-notifications';

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
    private formbuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
     private hwaCommonService: HwaCommonService,
    private _notificationsService: NotificationsService,
    ) { }

  ngOnInit() {
    this.selectedNid = [];
      this.creatHWAForm = this.formbuilder.group({
      'position': ['', {updateOn: 'change', validators: [Validators.required]}],
      'numberOfPosition': ['', {updateOn: 'change', validators:[Validators.required]}],
      'position_type': ['', {updateOn: 'change', validators:[Validators.required]}],
      'exp': ['', {updateOn: 'change', validators:[Validators.required]}],
      //'locations': this.formbuilder.array([]),
      'describeSkill': ['', {updateOn: 'change', validators:[Validators.required]}],
      //'email': ['',{updateOn: 'change',validators:[ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
    //  'confirmemail': ['',{updateOn: 'change',validators: [ Validators.compose([Validators.required, Validators.pattern(this.emailMask)])]}],
     // 'phone': ['', {updateOn: 'change', validators: [Validators.required]}]
    }, {updateOn: 'change'}); //asyncValidators: [this.isEqualEmail]
   
   
    const user = this.userService.isLogedin();
    if(user) {
    this.getAddress(user);
    }
    
  }

 initLocation(val) {
    return this.formbuilder.group({
      'nid': [val]
    });
  }

 addLocation(val) {
    // add address to the list
    const control = <FormArray>this.creatHWAForm.controls['locations'];
    control.push(this.initLocation(val));
   // console.log(this.creatHWAForm.controls['locations'].value)
  }

getAddress(user) {
   
    this.profileService.getaddress(user.uid).subscribe(
      res => {
        console.log(res);
        this.addressList = res;
        this.addressList.forEach((item, index) => {
          this.selectedNid[index]=item['nid']
   // if(item.field_make_default == '1') {
     // this.defaultNId = item.nid;
      // this.businessAddressForm.patchValue(item);
      // this.addLocation(item['nid'])
   // }
});
    console.log(' this.selectedNid',  this.selectedNid);    
      },error=>{

      });
}

onSubmit() {
    this.disabledButton = true; //'Processing...';

    if (this.creatHWAForm.valid) {
      const user = this.userService.isLogedin();

      
    
      const CreteObj = {
        'hwa_nid': '',
        'uid': user.uid,
        'title': this.creatHWAForm.value.position,
        'field_how_many_people_do_you_nee': this.creatHWAForm.value.numberOfPosition,
        'field_will_they_be_full_time_par': this.creatHWAForm.value.position_type,
        //'field_how_would_you_describe_thi': this.creatHWAForm.value.describePosition,
        'field_describe_the_skills_and_ex': this.creatHWAForm.value.describeSkill,
        'nid': this.selectedNid
      };


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
    });
    }
  }

  saveAsDraft() {


  };

  discardAd() {

  }
//---------------------------------------------------

onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }
 
  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }
 
  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }
 
  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

}
