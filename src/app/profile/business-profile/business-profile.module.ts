import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessProfileComponent } from './business-profile.component';
import { BusinessProfileRoutingModule } from './business-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { CookieService } from 'ngx-cookie-service';
import { UserService, HwaCommonService } from '../../services/index';
import {NgxMaskModule} from 'ngx-mask';
import { HelpModalModule } from '../../common/help-modal/help-modal.module';
 

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusinessProfileRoutingModule,
    HeaderValidUserModule,
      HelpModalModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [BusinessProfileComponent],
  providers:[CookieService, UserService, HwaCommonService]
})
export class BusinessProfileModule { }
