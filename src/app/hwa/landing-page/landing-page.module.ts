import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService, HwaCommonService } from '../../services/index';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
import {AllApplicantServicesService} from '../../applicants_status/services/all-applicant-services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [LandingPageComponent],
  providers: [HwaCommonService, AllApplicantServicesService]
})

export class LandingPageModule {
}
