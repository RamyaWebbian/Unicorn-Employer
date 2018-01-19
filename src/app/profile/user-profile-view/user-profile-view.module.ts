import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserProfileViewComponent } from './user-profile-view.component';
import { HelpModalModule } from '../../common/help-modal/help-modal.module';
import { UserProfileViewRoutingModule } from './user-profile-view-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { UserService, HwaCommonService } from '../../services/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileViewRoutingModule,
    HelpModalModule,
    SharedModule,
    HeaderValidUserModule,
    NgbModule.forRoot(),
  ],
  declarations: [UserProfileViewComponent],
  providers:[ HwaCommonService, UserService ]
})
export class UserProfileViewModule { }
