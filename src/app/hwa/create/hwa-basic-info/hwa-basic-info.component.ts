import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, HwaCommonService, ProfileService, HoldDataService } from '../../../services/index';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-hwa-basic-info',
  templateUrl: './hwa-basic-info.component.html',
  styleUrls: ['./hwa-basic-info.component.css']
})
export class HwaBasicInfoComponent implements OnInit {
  creatHWAForm: FormGroup;
  addressList: Array<string> = [];
  disabledButton: boolean;
  selectedNid = [];
  previewBname;
  editorConfig: Object = {
    'editable': true,
    'spellcheck': true,
    'height': '300',
    'minHeight': '329',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'toolbar': [
      ['bold', 'italic', 'underline']
    ]
  };

// questom question
  defaultQLists = [];
  customQList = [];
  isEditable = [];
  showTextfield: boolean;
  koForm: FormGroup;
  changeText = []; // 'Edit';
  koData: any = 'koData';
  show = false;
  btndisabled: boolean;
  hwaNid = null;
  skillExpForm: FormGroup;
  hideExpArray = true;
  hideExpertiseArray = true;
  showActiveBtn: boolean;
  expertiseValue = '';
  experenceValue = '1';
  skillQuestionList = [];
  showForm: boolean;
  deleteskills = [];
  selectedLocation = [];
  businessTopic = [];
  questionInput: any;
  qustionNid: any = '';
  custObj: any;
  businessName;
  public editCounter: number = null;
  public skillCounter: number = null;

  constructor(private router: Router, private zone: NgZone, private formbuilder: FormBuilder,
              private userService: UserService, private profileService: ProfileService, private hwaCommonService: HwaCommonService,
              private holdDataService: HoldDataService, private cookieService: CookieService) { }

  ngOnInit() {
    const user = this.userService.isLogedin();
    this.selectedNid = [];
    this.creatHWAForm = this.formbuilder.group({
      'hwa_nid': [''],
      'title': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }],
      'field_how_many_people_do_you_nee': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }],
      'field_will_they_be_full_time_par': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }],
      'field_describe_the_skills_and_ex': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }],
      // 'locations': this.formbuilder.array([]),
      'field_how_would_you_describe_thi': ['', {
        updateOn: 'change',
        validators: [Validators.required]
      }],
    }, {
      updateOn: 'change'
    }); // asyncValidators: [this.isEqualEmail]
    // knout Question
    this.koForm = this.formbuilder.group({
      'defaultQlists': this.formbuilder.array([]),
      'customQlist': this.formbuilder.array([]),
      'qinput': [''],
      'nid': ['']
    });
    this.skillExpForm = this.formbuilder.group({
      'nid': [''],
      'skill_exp_ques': ['', Validators.required],
      'field_expertise_needed': [''],
      'field_experience_needed': [1],
       'exp': ['experience',  Validators.required],
      'status': '0'
    }, { validator: this.checkBothFields});
    // skill
    this.expertiseValue = '';
    this.hideExpArray = true;
    this.hideExpertiseArray = false;
    this.showActiveBtn = false;
    // ko
    this.showTextfield = false;
    this.btndisabled = false;
   // console.log(this.addressList);
    this.showForm = true;
    if (user) {
      this.loaddefaultAddress(user);
      // console.log(user);
      // this.loadbusProfile(pid)
      this.loaduserData(user.uid);
      this.getBusinessName();
    }
  }
  getBusinessName() {
    const user = this.userService.isLogedin();
    const obj = {
      'uid': user.uid
    };
    this.userService.accesData(obj).subscribe(
      res => {
        this.previewBname = res['details']['field_name_of_your_business'][0].value;
      }, error => {
        console.log(error);
      });
  }
  checkBothFields(c) {
    if (!c) {
      return {
        skillExpForm: true
      };
    }
    if (c.get('field_expertise_needed')
        .value !== '' || c.get('field_experience_needed')
        .value !== '') {
      return null;
    } else {
      return {
        'skillExpForm': true
      };
    }
  }

  loaddefaultAddress(user) {
    this.addressList = [];
    this.selectedLocation = [];
    this.selectedNid = [];
    this.profileService.getaddress(user.uid)
      .subscribe(res => {
        res.forEach((item, index) => {
          // this.selectedNid[index]=item['nid']
          if (item.field_make_default === '1') {
            item.checked = true;
            this.addressList[index] = item;
            this.selectedLocation.push(item);
            this.selectedNid.push(item['nid']);
          } else {
            item.checked = false;
            this.addressList[index] = item;
          }
        });
      }, error => {});
  }
  get selectedOptions() {
    return this.addressList.filter(opt => opt['checked'])
      .map(opt => opt);
  }
  addSelectedLocation() {
    if (this.selectedOptions.length) {
      this.selectedNid = [];
      this.selectedLocation = this.selectedOptions;
      this.selectedLocation.forEach((item, index) => {
        this.selectedNid[index] = item['nid'];
      });
      $('#bizModel')
        .modal('hide');
    } else {
      this.holdDataService.setMessage({
        msg: 'Select minmum one location',
        sucsess: false
      });
    }
  }
  selectLocation() {
    // this.storeData();
    this.router.navigate(['/select-hiring-location']);
  }
  onSubmit(saveType) {
    this.disabledButton = true; // 'Processing...';
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
      this.hwaCommonService.createHWA(CreteObj)
        .subscribe(res => {
          this.disabledButton = false;
          console.log(res);
          this.onSubmitko(res['got_it'], saveType);
          if (this.userService.isLocalStorage()) {
            localStorage.setItem('storeHwaNid', res['got_it']);
          } else {
            this.cookieService.set('storeHwaNid', res['got_it']);
          }
          this.holdDataService.setMessage({
            msg: 'Your have created Help Wanted Ad Successfully',
            sucsess: true
          });
        });
    }
  }
// saveAsDraft() {}
  discardAd() {
    const user = this.userService.isLogedin();
    this.loaddefaultAddress(user);
    this.deleteskills = [];
    this.skillQuestionList = [];
    this.addressList = [];
    this.customQList = [];
    this.creatHWAForm.reset();
    $('#myModalFullscreen')
      .modal('hide');
    /* this.holdDataService.setMessage({
         msg: 'discard', sucsess: true
       }); */
  }
// Knockout Question Block
  loadkoDraftData(hwaId) {
    const user = this.userService.isLogedin();
    //  const hwaId = localStorage.getItem('storeHwaNid');
    if (hwaId) {} else {
      // this.router.navigate(['/hwa_workflow']);
      return false;
    }
    this.hwaCommonService.loadkosDraftData(hwaId, user.uid)
      .subscribe(res => {
        console.log(res);
        if (res) {
          const qarray: Array < any > = res as Array < any > ;
          for (let i = 0; i < qarray.length; i++) {
            if (qarray[i].field_question_type === 'Default') {
              this.checkdefauldQuestion(qarray[i].title, qarray[i].nid, qarray[i].field_ko);
            } else {
              const todo = {
                'value': qarray[i].title
              };
              todo.value = qarray[i].title;
              this.addQuestion(todo, qarray[i].nid, qarray[i].field_ko);
              this.btndisabled = false;
            }
          }
        }
        // this.displayQuestionn = true;
      }, error => {
        console.log(error);
      });
  }
  checkdefauldQuestion(textval, nid, isSelected) {
    for (let i = 0; i < this.koForm.controls['defaultQlists'].value.length; i++) {
      if (this.koForm.controls['defaultQlists'].value[i].inputval === textval) {
        let selectedval = false;
        if (isSelected === 1) {
          selectedval = true;
        } else if (isSelected === 0) {
          selectedval = false;
        } else {
          selectedval = isSelected;
        }
        const control = this.koForm.controls['defaultQlists']['controls'][i];
        control.patchValue({
          'defaultQlist': selectedval,
          'nid': nid
        });
      }
    }
  }
  getKoQuestion(hwaId) {
    this.hwaCommonService.defaultQuestion()
      .subscribe(res => {
        this.defaultQLists = res;
        for (let j = 0; j < this.defaultQLists.length; j++) {
          const control = < FormArray > this.koForm.controls['defaultQlists'];
          // console.log(this.defaultQLists[j].name);
          control.push(this.initdefaultQuestion(this.defaultQLists[j].name, this.defaultQLists[j].nid));
        }
        this.loadkoDraftData(hwaId);
      }, error => {
        console.log(error);
      });
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
      if (j !== i) {
        this.changeText[j] = 'Edit';
        this.isEditable[j] = false;
      }
    }
  }
  checkEmpty(e) {
    if (e.value === '') {
      this.btndisabled = true;
    } else {
      this.btndisabled = false;
    }
  }
  toggleShow(i) {
    this.resetAllEditbutton(i);
    //  this.changeText[i] = 'Edit';
    if (this.isEditable[i] === true) {
      this.changeText[i] = 'Edit';
    } else {
      this.changeText[i] = 'Save';
    }
    this.isEditable[i] = !this.isEditable[i];
  }
  editText(evt, i, nid) {
    // this.isEditable[i] = !this.isEditable[i];
    this.customQList[i].qus = evt.target.value;
    this.customQList[i].nid = nid;
  }
  finshCode() {}
  deleteQuestion(i) {
    const data_item = this.customQList[i];
    if (data_item.nid) {
      //  this.customQList.push(data_item.nid);
    }
    this.customQList.splice(i, 1);
    this.btndisabled = false;
  }
  addEditQuestion(i) {
    this.editCounter = i;
    this.showTextfield = true;
    this.btndisabled = false;
    this.questionInput = this.customQList[i].qus;
    this.qustionNid = this.customQList[i].nid;
    // this.customQList.splice(i, 1);
  }
  editQuestion(input) {
    // console.log(input.value);
    this.customQList[this.editCounter].qus = input.value;
    this.editCounter = null;
    input.value = null;
    this.btndisabled = false;
    this.showTextfield = false;
  }
  cancleQustion() {
    this.btndisabled = false;
    this.showTextfield = false;
    this.editCounter = null;
  }
// Add Custom question
  addCustomQuestion() {
    this.questionInput = '';
    if (this.showTextfield) {
      this.showTextfield = false;
      this.btndisabled = false;
    } else {
      this.showTextfield = true;
      this.btndisabled = true;
    }
  }
  addQuestion(todo: any, qnid: any, selected: any) {
    if (todo.value !== '') {
      const Obj = {
        qus: todo.value,
        nid: qnid
      };
      this.customQList.push(Obj);
      todo.value = null;
      this.btndisabled = false;
      this.showTextfield = false;
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
  onSubmitko(hwaId, saveType) {
    // this.disableUntil = true;
    //  this.btntext = 'Processing...';
    if (hwaId) { // localStorage.getItem('storeHwaNid')
      const user = this.userService.isLogedin();
      // start
      // const dummyObj = [];
      const dummyCustom = [];
      // const control = this.koForm.controls['customQlist'].value;
      for (let j = 0; j < this.customQList.length; j++) {
        // console.log(control[j].inputval,control[j].nid);
        this.custObj = {
          'nid': this.customQList[j].nid,
          'question': this.customQList[j].qus,
          'field_question_type': 'custom',
          'field_ko': '1',
          'status': '1'
        };
        dummyCustom.push(this.custObj);
      }
      const objTemplate = {
        'uid': user.uid,
        'hwa_nid': hwaId, // localStorage.getItem('storeHwaNid'),
        'ko': dummyCustom
      };
      // console.log(objTemplate);
      this.hwaCommonService.customQuestion(objTemplate)
        .subscribe(res => {
          // console.log('complated costom question', res);
          this.holdDataService.setMessage({
            msg: res['Message'],
            sucsess: true
          });
          this.onSubmitSkill(hwaId, saveType);
        }, error => {});
    } else {
      this.holdDataService.setMessage({
        msg: 'You must have to create and save first step of Help Wanted Ad',
        sucsess: false
      });
    }
  }
// Skill Or Experience Question Block --------------------
  selectExpType(event) {
    if (this.skillExpForm.controls['exp'].value === 'expertise') {
      this.experenceValue = '';
      this.expertiseValue = 'Beginner';
      this.hideExpArray = false;
      this.hideExpertiseArray = true;
      this.showActiveBtn = true;
    } else {
      this.expertiseValue = '';
      this.experenceValue = '1';
      this.hideExpArray = true;
      this.hideExpertiseArray = false;
      this.showActiveBtn = false;
    }
    console.log(event.target.value);
  }
  loadSkillDraftData(hwaId) {
    const user = this.userService.isLogedin();
    // const hwaId = localStorage.getItem('storeHwaNid');
    if (hwaId) {} else {
      return false;
    }
    this.hwaCommonService.loadSkillsDraftData(hwaId, user.uid)
      .subscribe(res => {
        if (res) {
          const qarray: Array < any > = res as Array < any > ;
          if (qarray.length > 0) {
            for (let i = 0; i < qarray.length; i++) {
              let experi = '';
              if (qarray[i].field_expertise_needed === 'N/A') {
                experi = 'experience';
              } else {
                experi = 'expertise';
              }
              const Obj = {
                'nid': qarray[i].nid,
                'skill_exp_ques': qarray[i].title,
                'field_expertise_needed': qarray[i].field_expertise_needed,
                'field_experience_needed': qarray[i].field_experience_needed,
                'exp': [experi]
              };
              this.skillQuestionList.push(Obj);
              // this.addUser(qarray[i].nid, qarray[i].title, qarray[i].field_expertise_needed, qarray[i].field_experience_needed);
            }
          } else {
            for (let i = 0; i < 1; i++) {
              // this.addUser('', '', 'N/A', 'N/A');
            }
          }
        }
      }, error => {
        console.log(error);
      });
  }
  showHideFrom() {
    this.showForm = !this.showForm;
  }
  addInList() {
    if (this.skillExpForm.valid) {
      this.skillQuestionList.push(this.skillExpForm.value);
      this.skillExpForm.reset();
      this.showForm = false;
      this.skillExpForm.patchValue({
        exp: 'experience',
        field_experience_needed: '1',
        field_expertise_needed: '',
        nid: '',
        skill_exp_ques: ''
      });
      this.hideExpArray = true;
      this.hideExpertiseArray = false;
    }
  }
  editSkillQue(i) {
    this.showForm = true;
    // this.skillQuestionList[i];
    this.skillExpForm.patchValue(this.skillQuestionList[i]);
    // console.log(this.skillQuestionList[i].exp);
    if (this.skillQuestionList[i].exp === 'experience') {
      this.hideExpArray = true;
      this.hideExpertiseArray = false;
      this.expertiseValue = '';
      this.experenceValue = this.skillQuestionList[i].field_experience_needed;
    } else {
      this.experenceValue = '';
      this.hideExpArray = false;
      this.hideExpertiseArray = true;
      this.expertiseValue = this.skillQuestionList[i].field_expertise_needed;
    }
    this.skillCounter = i;
    // this.skillQuestionList.splice(i, 1);
  }
  updateSkill() {
    // if(this.skillCounter){
    this.skillQuestionList[this.skillCounter] = this.skillExpForm.value;
    this.skillCounter = null;
    this.skillExpForm.reset();
    this.skillExpForm.patchValue({
      exp: 'experience',
      field_experience_needed: '1',
      field_expertise_needed: '',
      nid: '',
      skill_exp_ques: ''
    });
    this.hideExpArray = true;
    this.hideExpertiseArray = false;
    this.showForm = false;
    // }
  }
  cancleSkill() {
    this.skillCounter = null;
    this.skillExpForm.reset();
    this.showForm = false;
    this.skillExpForm.patchValue({
      exp: 'experience',
      field_experience_needed: '1',
      field_expertise_needed: '',
      nid: '',
      skill_exp_ques: ''
    });
    this.hideExpArray = true;
    this.hideExpertiseArray = false;
  }
  deleteSkill(i) {
    const data_item = this.skillQuestionList[i];
    if (data_item.nid) {
      this.deleteskills.push(data_item.nid);
    }
    this.skillQuestionList.splice(i, 1);
    this.skillCounter = null;
    // this.skillQuestionList = this.skillQuestionList.filter(item => item !== data_item);
  }
  onSubmitSkill(hwaId, saveType) {
    // this.disableUntil = true;
    // this.btntext = 'Processing...';
    if (hwaId) {
      const user = this.userService.isLogedin();
      const pushSkillSet = [];
      this.skillQuestionList.forEach((item) => {
        let experience_temp = '';
        let expertise_temp = '';
        if (item.field_experience_needed === '') {
          experience_temp = 'N/A';
        } else {
          experience_temp = item.field_experience_needed;
        }
        if (item.field_expertise_needed === '') {
          expertise_temp = 'N/A';
        } else {
          expertise_temp = item.field_expertise_needed;
        }
        const skillQ = {
          'nid': item.nid,
          'skill_exp_ques': item.skill_exp_ques,
          'field_experience_needed': experience_temp,
          'field_expertise_needed': expertise_temp,
          'status': '0'
        };
        pushSkillSet.push(skillQ);
      });
      const skillObj = {
        'uid': user.uid,
        'hwa_nid': hwaId, // localStorage.getItem('storeHwaNid'),
        'seq': pushSkillSet,
        'delete_nid': this.deleteskills
      };
      // console.log(pushSkillSet);
      // console.log(skillObj);
      this.hwaCommonService.skillQusestion(skillObj)
        .subscribe(res => {
          this.deleteskills = [];
          console.log(res);
          /* localStorage.removeItem('hwaData');
                   this.cookieService.delete('hwaData');
                   localStorage.removeItem('koData');
                   this.cookieService.delete('koData');
                   localStorage.removeItem('skillData');
                   this.cookieService.delete('skillData');
                   // localStorage.removeItem('storeHwaNid');
                   // this.cookieService.delete('storeHwaNid');
                   localStorage.removeItem('address');
                   this.cookieService.delete('address');*/
          this.skillQuestionList = [];
          this.addressList = [];
          this.customQList = [];
          this.creatHWAForm.reset();
          this.holdDataService.setMessage({
            msg: 'You have created Skills Or Experience Questions Successfully',
            sucsess: true
          });
          $('#myModalFullscreen')
            .modal('hide');
          if (saveType === 'post') {
            // const hwid = this.userService.getHwaId();
            this.router.navigate(['/post-hwa', ]);
          } else {
            this.router.navigate(['/all-hwa-list']);
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.holdDataService.setMessage({
        msg: 'You must have to create and save first step of \'Help Wanted Ad',
        sucsess: false
      });
    }
  }
// load business profile
  loaduserData(uid) {
    const userId = {
      'uid': uid
    };
    this.userService.accesData(userId)
      .subscribe(res => {
        if (res['status']) {
          // const user = res;
          if (res['business_profile_id'].length) {
            this.loadbusProfile(res['business_profile_id'][0].nid);
          }
        }
      });
  }
  loadbusProfile(profileId) {
    const pObj = {
      'bptnid': profileId
    };
    this.hwaCommonService.getBusinessTopic(pObj)
      .subscribe(res => {
        console.log(res);
        this.businessTopic = res['business_topic'];
      }, error => {
        console.log(error);
      });
  }

}



