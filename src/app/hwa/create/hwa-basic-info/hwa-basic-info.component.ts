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
// questom question
  public defaultQLists = [];
  public customQList = [];
  public isEditable = [];
  public showTextfield: boolean;
  public enb: boolean;
  public showDialog: boolean;
  public showKo: boolean;
  public koForm: FormGroup;
  public nodeId: any;
  public hwaId: number;
  public customlist: any;
  public displayQuestionn: boolean;
  public changeText = []; // 'Edit';
 // @ViewChild(EditableQuestions) input: EditableQuestions;
  public koData: any = 'koData';
  public show = false;
  public koDataStr = 'koData';
  public qusInpitValue: any;
  public level2: boolean;
  public btndisabled: boolean;
  public disableUntil: boolean;
  public btntext = 'Save & Continue';
public hwaNid = null;
// skill ---------------

public skillExpForm: FormGroup;
  public skillDataStr = 'skillData';
 // public showDialog: boolean;
  public showskill: boolean;
  public fromSkill: any = 'fromSkill';
  public hideExpArray:boolean;
  public hideExpertiseArray:boolean;
  public displayQuestionskill: boolean;
  public showActiveBtn: boolean;
public expertiseValue='N/A';
public experenceValue= 'N/A';

public skillQuestionList = [];
public showForm:boolean;
public  deleteskills = [];

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
      'hwa_nid':[''],
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

  // knout Question
 this.koForm = this.formbuilder.group({
      'defaultQlists': this.formbuilder.array([]),
      'customQlist': this.formbuilder.array([])
    });
    this.skillExpForm = this.formbuilder.group({
      // 'questionList': this.formbuilder.array([ ])
      'nid': [''],
      'skill_exp_ques': ['', Validators.required],
      'field_expertise_needed': ['N/A' , Validators.required],
      'field_experience_needed': ['N/A' , Validators.required],
      'exp':['experience']
  
    });

   

 var oldHwaData = null;
 var hwaId = null;  
 if (this.userService.isLocalStorage()) {
  oldHwaData =  JSON.parse(localStorage.getItem('hwaData'));
  hwaId = localStorage.getItem('storeHwaNid');
  }else{
  oldHwaData =  JSON.parse(this.cookieService.get('hwaData'));
  hwaId = this.cookieService.get('storeHwaNid');
}
if(hwaId){
  this.hwaNid = hwaId;
  oldHwaData.hwa_nid = hwaId;
  this.getKoQuestion(hwaId);
   this. loadSkillDraftData(hwaId);
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


/* getAddress(user) {
   
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
} */
selectLocation() {
  // [routerLink]="['/select-hiring-location']
        const creteObj = {
        'hwa_nid': this.creatHWAForm.value.hwa_nid,
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
        'hwa_nid': this.creatHWAForm.value.hwa_nid,
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
          console.log(res['got_it']);
           this.onSubmitko(res['got_it']);
if (this.userService.isLocalStorage()) {
localStorage.setItem('storeHwaNid', res['got_it']);
}else{
 this.cookieService.set('storeHwaNid', res['got_it']);
}

    this.holdDataService.setMessage({msg:'Your have created Help Wanted Ad Successfully', sucsess: true});

            
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
// -----------------knout coustom question ---------------------------------------

loadkoDraftData(hwaId) {
    const user = this.userService.isLogedin();
  //  const hwaId = localStorage.getItem('storeHwaNid');
    if  (hwaId) {

    } else {
     // this.router.navigate(['/hwa_workflow']);
      return false;
    }
    this.hwaCommonService.loadkosDraftData(hwaId, user.uid).subscribe(
      res => {
        console.log(res)
        if  (res) {
          const qarray: Array<any> = res as Array<any>;
          for (let i = 0; i < qarray.length; i++) {
            if  (qarray[i].field_question_type === 'Default') {
              this.checkdefauldQuestion(qarray[i].title, qarray[i].nid, qarray[i].field_ko);
            } else {
              const todo = { 'value': qarray[i].title };
              todo.value = qarray[i].title;
              this.addQuestion(todo, qarray[i].nid, qarray[i].field_ko);
              this.btndisabled = false;
            }
          }
        }
        this.displayQuestionn = true;
      },
      error => {
      });

  }
  checkdefauldQuestion(textval, nid, isSelected) {
    for (let i = 0; i < this.koForm.controls['defaultQlists'].value.length; i++) {

      if  (this.koForm.controls['defaultQlists'].value[i].inputval === textval) {
        let selectedval = false;
        if  (isSelected === 1) { selectedval = true;
        } else if  (isSelected === 0) { selectedval = false; } else { selectedval = isSelected; }
        const control = this.koForm.controls['defaultQlists']['controls'][i];
        control.patchValue({ 'defaultQlist': selectedval, 'nid': nid });
      }
    }
  }
  getKoQuestion(hwaId) {
    this.hwaCommonService.defaultQuestion().subscribe(
      res => {
        this.defaultQLists = res;

        for (let j = 0; j < this.defaultQLists.length; j++) {
          const control = <FormArray>this.koForm.controls['defaultQlists'];
          // console.log(this.defaultQLists[j].name);
          control.push(this.initdefaultQuestion(this.defaultQLists[j].name, this.defaultQLists[j].nid));
        }
        this.loadkoDraftData(hwaId);
      },
      error => {

      }
    );
  }
  initdefaultQuestion(val, qnid) {
    return this.formbuilder.group({
      'defaultQlist': [true], //  , Validators.required
      'inputval': [val],
      'nid': [qnid]
    });
  }
  resetAllEditbutton(i) {
    for (let j = 0; j < this.isEditable.length; j++) {
      if  (j !== i) {
        this.changeText[j] = 'Edit';
        this.isEditable[j] = false;
      }
    }
  }
  checkEmpty(e) {
    if  (e.value === '') {
      this.btndisabled = true;
    } else {
      this.btndisabled = false;
    }

  }
  toggleShow(i) {
    this.resetAllEditbutton(i);
    //  this.changeText[i] = 'Edit';
    if  (this.isEditable[i] === true) {
      this.changeText[i] = 'Edit';
    } else {
      this.changeText[i] = 'Save';
    }
    this.isEditable[i] = !this.isEditable[i];
  }

  editText(evt, i) {
    if  (this.isEditable[i] === true) {
      this.changeText[i] = 'Edit';
    } else {
      this.changeText[i] = 'Save';
    }
    this.isEditable[i] = !this.isEditable[i];
    this.customQList[i] = evt.target.value;

  }
  finshCode() {
  }
// Add Custom question
  addCustomQuestion() {
    if  (this.showTextfield) {
      this.showTextfield = false;
      this.btndisabled = false;
    } else {
      this.showTextfield = true;
      this.btndisabled = true;
      // this.enb = false;
    }
    // console.log(this.qusInpitValue)
    //   this.btndisabled = true;
  }
  addQuestion(todo: any, qnid: any, selected: any) {
    if  (todo.value !== '') {
      this.customQList.push(todo.value);
      this.isEditable.push(false);
      this.changeText.push('Edit');
      const control = <FormArray>this.koForm.controls['customQlist'];
      let sel = false;
      if(selected == 1) {
         sel = true;
        } else if(selected == 0) { 
          sel = false;
         }
      console.log(todo.value, sel)
      control.push(this.initQuestion(todo.value, qnid, sel));
      todo.value = null;
      //   if (qnid){
      this.btndisabled = true;
      //   }

      //   this.showTextfield = false;
      this.resetAllEditbutton(9999);
    }
    return false;
  }
  initQuestion(val: any, qnid: any, selected: boolean) {
    return this.formbuilder.group({
      'inputval': [val], //  , Validators.required
      'costomQus': [selected],
      'nid': [qnid]
    });
  }
  onPreiview() {

    if  (this.showDialog) {
      this.showDialog = false;
    } else {
      this.showDialog = true;
    }

  /*  const koPreive = { 'showKo': this.showKo = true,
      'bottomText': this.HelpText,
      'defaultQ': this.getSelectedDfaultQus(),
      'customQ': this.getSelectedQuestion() };
    this.hwaOverlayService.koData(koPreive); */
  }

  getSelectedQuestion(): Array<any> {
    const customArray = [];
    const control = this.koForm.controls['customQlist'].value;
    for (let j = 0; j < control.length; j++) {
      if  (control[j].costomQus) {
        customArray.push(control[j].inputval);
      }
    }
    return customArray;
  }

  getSelectedDfaultQus(): Array<any> {
    const customArray = [];
    const control = this.koForm.controls['defaultQlists'].value;
    for (let j = 0; j < control.length; j++) {
      // console.log(control[j])
      if  (control[j].defaultQlist) {
        customArray.push(control[j].inputval);
      }
    }
    return customArray;
  }

  onSubmitko(hwaId) {
    this.disableUntil = true;
  //  this.btntext = 'Processing...';
    if  (hwaId) { //localStorage.getItem('storeHwaNid')
      const user = this.userService.isLogedin();
      // start
      const dummyObj = [];
      const dummyCustom = [];

      const control = this.koForm.controls['customQlist'].value;
      for (let j = 0; j < control.length; j++) {
// console.log(control[j].inputval,control[j].nid);
        const custObj = {
          'nid': control[j].nid,
          'question': control[j].inputval,
          'field_question_type': 'custom',
          'field_ko': control[j].costomQus ? 1 : 0,
          'status': '1'
        };
        if(control[j].inputval != ''){
        dummyCustom.push(custObj);
        }
      }
      const control1 = this.koForm.controls['defaultQlists'].value;
      for (let i = 0; i < control1.length; i++) {

        const newObj = {
          'nid': control1[i].nid,
          'question': control1[i].inputval,
          'field_question_type': 'default',
          'field_ko': control1[i].defaultQlist ? 1 : 0,
          'status': '1'
        };
        dummyObj.push(newObj);
      }

      const newObjValue = dummyObj.concat(dummyCustom);
      const objTemplate = {
        'uid': user.uid,
        'hwa_nid': hwaId, //localStorage.getItem('storeHwaNid'),
        'ko': newObjValue
      };

      this.hwaCommonService.customQuestion(objTemplate).subscribe(
        res => {
         
console.log('complated costom question', res);
          this.holdDataService.setMessage({msg:res['Message'], sucsess: true});
          this.onSubmitSkill(hwaId)
          
        },
        error => {
        }
      );
    } else {
      
       this.holdDataService.setMessage({msg: 'You must have to create and save first step of Help Wanted Ad', sucsess: false});

    }
  }
  onSkip() {
   // this.router.navigate(['/AddSkillsAndExpertiseQuestions']);
  }
  goToNext() {
  //  this.router.navigate(['/AddSkillsAndExpertiseQuestions']);

  }
  Close2() {
    if (this.level2) {
      this.level2 = false;
    } else {
      this.level2 = true;
    }
  }
  // ------------------------ skill -----------------------


selectExpType(event){

  if(this.skillExpForm.controls['exp'].value == 'expertise'){
    //this.skillExpForm.controls.questionList.patchValue({expertiseLevel:'N/A'});
    // .patchValue({gender:'male'});{onlySelf: true, emitEvent}
      this.experenceValue = 'N/A'
      this.hideExpArray = false;
      this.hideExpertiseArray = true;
      this.showActiveBtn = true;
  }else{
     //this.skillExpForm.controls['questionList'][i].patchValue({experenceLevel:'N/A'})
      // this.skillExpForm.controls.questionList[i].patchValue({experenceLevel:'N/A'})
        this.expertiseValue = 'N/A';
    this.hideExpArray = true;
      this.hideExpertiseArray = false;
      this.showActiveBtn = false;
  }
console.log(event.target.value)

}


loadSkillDraftData(hwaId) {
    const user = this.userService.isLogedin();
   // const hwaId = localStorage.getItem('storeHwaNid');
    if (hwaId) {
    } else {
      //this.router.navigate(['/hwa_workflow']);
      return false;
    }
    this.hwaCommonService.loadSkillsDraftData(hwaId, user.uid).subscribe(
      res => {
        if (res) {
          const qarray: Array<any> = res as Array<any>;
          if (qarray.length > 0) {
            for (let i = 0; i < qarray.length; i++) {
             var Obj = { 'nid': qarray[i].nid,
                        'skill_exp_ques': qarray[i].title,
                        'field_expertise_needed': qarray[i].field_expertise_needed,
                        'field_experience_needed': qarray[i].field_experience_needed,
                        'exp':['']};

              this.skillQuestionList.push(Obj);
             // this.addUser(qarray[i].nid, qarray[i].title, qarray[i].field_expertise_needed, qarray[i].field_experience_needed);

            }
          } else {
            for (let i = 0; i < 1; i++) {
             // this.addUser('', '', 'N/A', 'N/A');
            }
          }
        }
        this.displayQuestionn = true;
      },
      error => {
      });
  }

 /* onPreiview() {
    if (this.showDialog) {
      this.showDialog = false;
    } else {
      this.showDialog = true;
    }

    const skillData = {'showskill': this.showskill = true,
      'bottomText': this.HelpText,
      'skillQusetion': this.skillExpForm.value.questionList};
    this.hwaOverlayService.skillData(skillData);
  } */

  initQuestion_skill(nid: any, tital: string, expertis: any, experen: any, expertisDisabled: boolean, experenDisabled: boolean ){
    return this.formbuilder.group({
      'nid': [nid],
      'skill_exp_ques': [tital, Validators.required],
      'field_expertise_needed': [expertis , Validators.required],
      'field_experience_needed': [experen , Validators.required],
      'exp':['']
    });
  }

/*hideExperenceLevel(i) {
    const control = <FormArray>this.skillExpForm.controls['questionList'];
    if (control.controls[i]['controls'].expertiseLevel.value === 'N/A') {
      this.hideExpArray = false;
      this.hideExpertiseArray = false;
      this.showActiveBtn = false;
    } else {
      this.hideExpArray = false;
      this.hideExpertiseArray = true;
      this.showActiveBtn = true;
      this.experenceValue='N/A'
    }
  }
  hideExpertiseLevel(i) {

    const control = <FormArray>this.skillExpForm.controls['questionList'];
    if (control.controls[i]['controls'].experenceLevel.value === 'N/A') {
      this.hideExpArray[i] = false;
      this.hideExpertiseArray[i] = false;
    } else {
      this.hideExpArray[i] = true;
      this.hideExpertiseArray[i] = false;
      this.expertiseValue[i]="N/A"
      
    }

  } 
  addUser(nid: any, tital: string, expertis: any, experen: any ) {
    const control = <FormArray>this.skillExpForm.controls['questionList'];
    let experenDisabled = false;
    let expertisDisabled = false;
     this.expertiseValue.push("N/A");
       this.experenceValue.push("N/A");
    if ((experen === 'N/A') && (expertis === 'N/A')) {
      experenDisabled = false;
      expertisDisabled  = false;
    }else {
      if (experen === 'N/A') {
        this.hideExpArray.push(false);
        
        experenDisabled = false;
      }else {
        this.hideExpArray.push(true);
        experenDisabled = true;
      }
      if (expertis === 'N/A') {
        this.hideExpertiseArray.push(false);
        expertisDisabled = false;
      }else {
        this.hideExpertiseArray.push(true);
        expertisDisabled = true;
      }
    }
    control.push(this.initQuestion_skill(nid, tital, expertis, experen, expertisDisabled, experenDisabled));
  }
*/

   showHideFrom() {
    this.showForm = !this.showForm;
  }
  
  addInList(){
    console.log(this.skillExpForm.valid)
    if(this.skillExpForm.valid){
      this.skillQuestionList.push(this.skillExpForm.value)
      this.skillExpForm.reset();
      this.showForm = false;
      console.log(this.skillQuestionList);
    }
    
  }
 editSkillQue(i){
   this.showForm = true;
  // this.skillQuestionList[i];
  this.skillExpForm.patchValue(this.skillQuestionList[i]);
  console.log(this.skillQuestionList[i].exp);
   if(this.skillQuestionList[i].exp == 'experience'){
      this.hideExpArray = true;
      this.hideExpertiseArray = false;
       this.expertiseValue = 'N/A'
    this.experenceValue = this.skillQuestionList[i].field_experience_needed;

  }else{
     this.experenceValue = 'N/A'
      this.hideExpArray = false;
      this.hideExpertiseArray = true;
 this.expertiseValue = this.skillQuestionList[i].field_expertise_needed;
  }
  
   this.skillQuestionList.splice(i, 1);
 }

 deleteSkill(i){
   var data_item = this.skillQuestionList[i];
   if(data_item.nid){
     this.deleteskills.push(data_item.nid);
   }
    this.skillQuestionList.splice(i, 1);
    // this.skillQuestionList = this.skillQuestionList.filter(item => item !== data_item);
 }

  onSubmitSkill(hwaId) {
    this.disableUntil = true;
    this.btntext = 'Processing...';
    if (hwaId) {
      const user = this.userService.isLogedin();
     
      const pushSkillSet = [];
    /*  for (let i = 0; i <= this.skillExpForm.value.questionList.length - 1; i++) {
        if ((this.skillExpForm.value.questionList[i].experenceLevel === 'N/A') && (this.skillExpForm.value.questionList[i].expertiseLevel === 'N/A')){
          if (this.skillExpForm.value.questionList[i].nid) {
            deleteskills.push(this.skillExpForm.value.questionList[i].nid);
          }
        } else {
          const skillQ = {
            'nid': this.skillExpForm.value.questionList[i].nid,
            'skill_exp_ques': this.skillExpForm.value.questionList[i].typeQuestion,
            'field_experience_needed': this.skillExpForm.value.questionList[i].experenceLevel,
            'field_expertise_needed': this.skillExpForm.value.questionList[i].expertiseLevel,
            'status': '0'
          };
          pushSkillSet.push(skillQ);
        }
      } */

      const skillObj = {
        'uid': user.uid,
        'hwa_nid': hwaId, //localStorage.getItem('storeHwaNid'),
        'seq': this.skillQuestionList, //pushSkillSet,
        'delete_nid': this.deleteskills
      };
      this.hwaCommonService.skillQusestion(skillObj).subscribe(
        res => {

         console.log(res)

             localStorage.removeItem('hwaData');
             this.cookieService.delete('hwaData');
             localStorage.removeItem('storeHwaNid');
             this.cookieService.delete('storeHwaNid');

             this.holdDataService.setMessage({msg:'You have created Skills Or Experience Questions Successfully', sucsess: true});
            // this.router.navigate(['/postmyad']);
        
          //this.btntext = 'Save & Continue';

        },
        error => {

        }
      );
    } else {
       this.holdDataService.setMessage({msg:'You must have to create and save first step of \'Help Wanted Ad', sucsess: false});

    }
  }
}
