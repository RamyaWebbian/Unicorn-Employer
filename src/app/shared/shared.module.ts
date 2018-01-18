import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { HelpModalModule } from '../help-modal/help-modal.module';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { UserService, HoldDataService } from '../services/index';
import { HttpModule} from '@angular/http';
import { EqualValidator } from '../common/directives/equal-validator.directive';
import {ShowHideInput} from '../common/directives/show-hide-directive';
import { CookieService } from 'ngx-cookie-service';
// import { HeaderRegistrationModule } from './../common/header-registration/header-registration.module';

@NgModule({
  imports: [
      CommonModule,
      // BrowserModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      //HeaderRegistrationModule,
      SimpleNotificationsModule
  ],
  exports:[ SimpleNotificationsModule, EqualValidator, ShowHideInput, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpModule],
  declarations: [EqualValidator, ShowHideInput],
  providers:[UserService, NotificationsService, CookieService, HoldDataService]
})

export class SharedModule { }
