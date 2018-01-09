import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileService, UserService} from '../../services/index';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
// import {DOCUMENT} from '@angular/platform-browser';
import {NotificationsService} from 'angular2-notifications';
// import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  public helpShow : boolean;
  public zipmask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/];
  public businessAddressForm: FormGroup;
  public validZipStatus: string;
  public getCityinfoList = [];
  public showSelect:any;
  public disabledButton: boolean;
  public addresses = [];
  //private locationId:any
  public titalLbl = "Add your business location";
  public subTitel = "This will be the default work location for your employees.";
  public options = {
    position: ['top', 'center'],
    timeOut: 5000,
    lastOnBottom: true
  };
  private defaultNId:any;
  private userInfo:any;
  public addNewBusFlag:boolean;

  constructor(private formbuilder: FormBuilder,
             // private el: ElementRef,
              private profileService: ProfileService,
              private userService: UserService,
              private router: Router,
              private _notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute,
            //  private subscription:Subscription
              ) { }

  ngOnInit() {
    this.defaultNId = '';
     this.userInfo  = this.userService.isLogedin();
    this.initAddress('', '', '', '', '', '', 0);
     this.activatedRoute.params.subscribe(
      (param:  any) => {
         console.log(param['lid']);
          if(param['lid'] == 'new') {
          this.titalLbl = 'Add New Business Location';
          this.subTitel = "";
          this.defaultNId = "";
          this.addNewBusFlag = true;
         // this.locationId = ""
        }else if(param['lid']) {
          this.titalLbl = 'Update Your Business Location';
          this.subTitel = "";
          this.defaultNId = param['lid'];
          this.addNewBusFlag = false;
          //this.locationId = ;
          this.updateLocation(param['lid']);
         // alert('lid '+ param['lid']);
        }else{
          this.addNewBusFlag = false;
          this.getAddress(this.userInfo );
        }
      });

  // this.subscription.unsubscribe()
   
  }

 initAddress(nid, addr1, addr2, zip, state, city, fmd) {
    this.businessAddressForm = this.formbuilder.group({
      'nid': [nid],
      'title': [addr1, Validators.required],
      'field_address_line_2': [addr2],
      'field_z': [zip, Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)],
      'field_state': [state, Validators.required],
      'field_city': [city, Validators.required],
      'field_make_default': [fmd, Validators.required]
    });
   // return this.businessAddressForm;
  }

  userProfileView() {
    this.router.navigate(['/user-profile-view']);
  }
  helpText() {
    this.helpShow = !this.helpShow;
  }
updateLocation(locationId) {
this.profileService.getaddressById(locationId).subscribe(
      res => {
       this.businessAddressForm.patchValue(res[0]);

      },error => {

      });
}

 onSubmit() {

    const user = this.userService.isLogedin();
     
     var fobj = this.businessAddressForm.value;
     fobj.nid = this.defaultNId;
    const locationObj = {
      'uid': user.uid,
      'address': [fobj]
    };
    this.disabledButton = true;
   
   // console.log(locationObj)
    this.profileService.createBusinessLocation(locationObj).subscribe(
      res => {
         this.disabledButton = false;
       // this.displayLocation = true;
       // this.checkAddress(null);
       // console.log(res['message']);
        this.businessAddressForm.reset();

        this.getCityinfoList = [];
        this._notificationsService.success(
          'Success',
          res['message'],
          {
            timeOut: 600,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          });
        //
       this.router.navigate(['/user-profile-view']);
      },
      error => {
        
         this.disabledButton = false;
        //  this.router.navigate(['/user-profile-view']);
      });
  }


   zipCodeSearch() {
    const zipc = this.businessAddressForm.controls['field_z'].value;
   // console.log(zipc)
    if (!isNaN(zipc)) {

      this.userService.searchZip(zipc).subscribe(
        res => {
          if (this.validUsCountry(res)) {
            if (res['results'][0].postcode_localities) {
              this.showSelect = true;
              this.getCityinfoList = [];
              // console.log(res['results'][0].postcode_localities.length)
              for (let j = 0; j < res['results'][0].postcode_localities.length; j++) {
                this.getCityinfoList.push(res['results'][0].postcode_localities[j]);

              }
            } else {
              this.showSelect = false;
            }

            for (let i = 0; i <= res['results'][0].address_components.length - 1; i++) {
              if (res['results'][0].address_components[i].types[0] === 'administrative_area_level_1') {
                const getstate = res['results'][0].address_components[i].short_name;
                const getCity = res['results'][0].address_components[1].long_name;
               const addr = {field_state: getstate, field_city: getCity};
                this.businessAddressForm.patchValue(addr)
                this.validZipStatus = '';
              }
            }
            
          } else {
            this.validZipStatus = 'Please enter valid US zip code';
            this.showSelect = false;
            const arryobj = {field_state: '', field_city: ''};
            this.businessAddressForm.patchValue(arryobj);
           // this.businessAddressForm.controls['field_state'].setValue('');
           // this.businessAddressForm.controls['field_city'].patchValue('')
          }
        });
    } else {
      this.validZipStatus = 'Please enter valid US zip code';
      this.showSelect = false;
      const arryobj = {field_state: '', field_city: ''};
      this.businessAddressForm.patchValue(arryobj);
 // this.businessAddressForm.controls['field_state'].setValue('');
   //    this.businessAddressForm.controls['field_city'].setValue('')
    }
  }
  validUsCountry(res): boolean {
    let isUs = false;
    if (res['status'] === 'OK') {
      for (let i = 0; i <= res['results'][0].address_components.length - 1; i++) {
        if (res['results'][0].address_components[i].short_name === 'US') {
          isUs = true;
          break;
        }
      }
    }
    return isUs;
  }

getAddress(user) {
  this.profileService.getaddress(user.uid).subscribe(
      res => {
        this.addresses = res
       //this.addresses
//console.log(res);
this.addresses.forEach((item, index) => {
    if(item.field_make_default == '1') {
      this.defaultNId = item.nid;
       this.businessAddressForm.patchValue(item);
    }
});

      },error => {

      });
}

}
