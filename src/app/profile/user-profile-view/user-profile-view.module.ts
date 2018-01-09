import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserProfileViewComponent } from './user-profile-view.component';
import { HelpModalModule } from '../../common/help-modal/help-modal.module';
import { UserProfileViewRoutingModule } from './user-profile-view-routing.module';
import { SharedModule } from '../../shared/shared.module';
 import {SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileViewRoutingModule,
    HelpModalModule,
    SharedModule,
    SimpleNotificationsModule,
    HeaderValidUserModule
  ],
  declarations: [UserProfileViewComponent],
  providers:[NotificationsService]
})
export class UserProfileViewModule { }
