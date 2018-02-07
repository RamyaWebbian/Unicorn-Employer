import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScheduleInterviewComponent } from './schedule-interview.component';
import { ScheduleInterviewRoutingModule } from './schedule-interview-routing.module';
import {NotificationsService} from 'angular2-notifications';
import { SharedModule } from '../../../shared/shared.module';
import {UserService, ProfileService, HoldDataService } from '../../../services/index';
import {AllApplicantServicesService} from '../../services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScheduleInterviewRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [ScheduleInterviewComponent],
  providers:[AllApplicantServicesService, UserService, ProfileService]
})

export class ScheduleInterviewModule { }
