import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InterviewedListComponent } from './interviewed-list.component';
import { InterviewedListRoutingModule } from './interviewed-list-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';

import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InterviewedListRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [InterviewedListComponent],
  providers:[UserService,AllApplicantServicesService]
})

export class InterviewedListModule { }
