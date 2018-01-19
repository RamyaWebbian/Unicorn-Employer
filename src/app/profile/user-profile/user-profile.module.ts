import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';

 import { HelpModalModule } from '../../common/help-modal/help-modal.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import {NgxMaskModule} from 'ngx-mask';
import {ProfileService, UserService} from '../../services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    HeaderValidUserModule,
    HelpModalModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    //SharedModule
     
  ],
  declarations: [UserProfileComponent],
  providers:[ProfileService, UserService]
})
export class UserProfileModule {  }
