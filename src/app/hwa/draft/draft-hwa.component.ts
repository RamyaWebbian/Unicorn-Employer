import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from 'rxjs/Subscription';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService, HwaCommonService, ProfileService, HoldDataService } from '../../services/index';
declare var $: any;

@Component({
  selector: 'app-draft-hwa',
  templateUrl: './draft-hwa.component.html',
  styleUrls: ['./draft-hwa.component.css']
})
export class DraftHwaComponent implements OnInit, AfterViewInit {
  public draftType = 'Edit'; // null, Edit, Copy

  subscription: Subscription;
  hwaPramId;
  uidPramId;
  creatHWAForm: FormGroup;
  addressList: Array<string> = [];
  disabledButton: boolean;
  selectedNid = [];
  previewBname;
  pageLoded: boolean;
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
// Custom question
  defaultQLists = [];
  customQList = [];
  isEditable = [];
  showTextfield: boolean;
  koForm: FormGroup;
  changeText = []; // 'Edit';
  show = false;
  btndisabled: boolean;
  hwaNid = null;
  skillExpForm: FormGroup;
  hideExpArray = true;
  hideExpertiseArray = true;
  showActiveBtn: boolean;
  expertiseValue = 'N/A';
  experenceValue = 'N/A';
  skillQuestionList = [];
  showForm: boolean;
  deleteskills = [];
  selectedLocation = [];
  businessTopic = [];
  questionInput: any;
  qustionNid: any = '';
  custObj: any;
  businessName;
  editCounter: number = null;
  skillCounter: number = null;
  // Fetch HWA DATA
  fetchPosition = '';
  fetchNoOfOpening = '';
  fetchTypeOfHire = '';
  fetchReqExp;
  fetchLocation;
  fetchJd;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, private zone: NgZone, private formbuilder: FormBuilder,
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
    this.showForm = true;
    if (user) {
      this.loaddefaultAddress(user);
      this.loaduserData(user.uid);
    }
    // Get Url Parameter
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.hwaPramId = param['hwaId'];
        this.uidPramId = param['uid'];
        if (param['hwaId']) {
          this.loadDraftData(param['hwaId'], user.uid);
          this.loadkoDraftData(param['hwaId']);
          this.loadSkillDraftData(param['hwaId']);
        }
      });
  }
  // Load Hwa Draft Data
  loadDraftData(hwaId, uid) {
    this.hwaCommonService.loadDraftData(hwaId, uid).subscribe(
      res => {
        console.log(res);
        this.fetchPosition = res['title'][0].value;
        this.fetchNoOfOpening = res['field_how_many_people_do_you_nee'][0].value;
        this.fetchTypeOfHire = res['field_will_they_be_full_time_par'][0].value;
        this.fetchReqExp = res['field_describe_the_skills_and_ex'][0].value;
        this.fetchLocation = res['field_which_location_s_are_you_h'];
        this.fetchJd = res['field_how_would_you_describe_thi'][0].value;
        this.pageLoded = true;
/**
 * If assinged hwaid to this var "this.hwaNid" then hwa will update with same hwaid
 * If you want edit hwa then assign hwaid to "this.hwaNid"
 * If you want use copy then assign null to "this.hwaNid"
 */
  if ( this.draftType === 'Edit') {
    this.hwaNid = hwaId;
  } else if ( this.draftType === 'Copy') {
    this.hwaNid = null;
  }



      let arrayTemp = [];
      arrayTemp = this.resetcheckbox();

      if (arrayTemp.length) {
        this.updateLocation(arrayTemp);
      }

      if (arrayTemp.length === 0) {
         setTimeout(() => {
          this.updateLocation(arrayTemp);
          }, 2000);
      }


/* Observable.interval(10000)
    .takeWhile(() => !stopCondition)
    .subscribe(i => {
        // This will be called every 10 seconds until `stopCondition` flag is set to true
    }) */

      }, error => {
        console.log(error);
      }
    );
  }

updateLocation(arrayTemp) {
 this.selectedLocation = [];
       this.selectedNid = [];
        for ( let i = 0; i < arrayTemp.length; i++) {
          for ( let j = 0; j < this.fetchLocation.length; j++) {
              if (arrayTemp[i]['nid'] === this.fetchLocation[j].nid[0].value) {
 // console.log('mid', arrayTemp[i]['nid']);
                arrayTemp[i]['checked'] = true;
                this.selectedLocation.push(arrayTemp[i]);
                this.selectedNid.push(arrayTemp[i]['nid']);
                break;
              }
          }
        }
        this.addressList = arrayTemp;
        console.log( this.addressList);
}
  // Create HWA PART Logic
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
  ngAfterViewInit() {
   // this.loadDraftData();
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
        // this.loadDraftData();
      }, error => {});
  }

  resetcheckbox(): Array<any> {
    const tempArray = [];
    this.addressList.forEach((item, index) => {
          // this.selectedNid[index]=item['nid']
            item['checked'] = false;
            tempArray[index] = item;
        });
  this.addressList = tempArray;
        return this.addressList;
  }

  get selectedOptions() {
    return this.addressList.filter(opt => opt['checked'])
      .map(opt => opt);
  }
  selectLoc(evt, indx) {
     this.addressList[indx]['checked'] = evt.target.checked;
  }
  addSelectedLocation() {
    if (this.selectedOptions.length) {
     this.selectedNid = [];
      this.selectedLocation = this.selectedOptions;
      console.log( this.selectedLocation);
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
          const edit_hwaid = res['details'][0].nid[0].value;
          console.log(edit_hwaid);
          this.onSubmitko(edit_hwaid, saveType);
          if (this.userService.isLocalStorage()) {
            localStorage.setItem('storeHwaNid', edit_hwaid);
          } else {
            this.cookieService.set('storeHwaNid', edit_hwaid);
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

        if (res) {
          const qarray: Array < any > = res as Array < any > ;
          for (let i = 0; i < qarray.length; i++) {
            if (qarray[i].field_question_type === 'Default') {
             // this.checkdefauldQuestion(qarray[i].title, qarray[i].nid, qarray[i].field_ko);
            } else {
        const Obj = {
        qus: qarray[i].title,
        nid: qarray[i].nid
      };
      this.customQList.push(Obj);
             // this.btndisabled = false;
            }
          }
        }
        // this.displayQuestionn = true;
      }, error => {
        console.log(error);
      });
  }
 /*  checkdefauldQuestion(textval, nid, isSelected) {
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
  } */

  /* getKoQuestion(hwaId) {
    this.hwaCommonService.defaultQuestion()
      .subscribe(res => {
        this.defaultQLists = res;
        for (let j = 0; j < this.defaultQLists.length; j++) {
          const control = < FormArray > this.koForm.controls['defaultQlists'];
          // console.log(this.defaultQLists[j].name);
          control.push(this.initdefaultQuestion(this.defaultQLists[j].name, this.defaultQLists[j].nid));
        }
       // this.loadkoDraftData(hwaId);
      }, error => {
        console.log(error);
      });
  } */
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

      this.hwaCommonService.customQuestion(objTemplate)
        .subscribe(res => {
         //  console.log('complated costom question', res);
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


/**
 * Skill Or Experience Question Block
 *
 */
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
   // console.log(event.target.value);
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
          console.log(res);
          const qarray: Array < any > = res as Array < any > ;
          if (qarray.length > 0) {
            for (let i = 0; i < qarray.length; i++) {
              let experi = '';
              let experience_temp = '';
             let expertise_temp = '';
              if (qarray[i].field_expertise_needed === 'N/A') {
                experi = 'experience';
                expertise_temp = '';
              } else {
                experi = 'expertise';
                expertise_temp = qarray[i].field_expertise_needed;
              }
 if (qarray[i].field_experience_needed === 'N/A') {
               // experi = 'experience';
                experience_temp = '';
              } else {
               // experi = 'expertise';
                experience_temp = qarray[i].field_experience_needed;
              }

              const Obj = {
                'nid': qarray[i].nid,
                'skill_exp_ques': qarray[i].title,
                'field_expertise_needed': expertise_temp,
                'field_experience_needed': experience_temp,
                'exp': [experi]
              };
              this.skillQuestionList.push(Obj);
            }
          } else {

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
    this.skillExpForm.patchValue(this.skillQuestionList[i]);
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
// -----------------------------------------------------
}
