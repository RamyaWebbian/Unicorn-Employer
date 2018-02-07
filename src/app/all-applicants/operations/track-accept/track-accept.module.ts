import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrackAcceptComponent } from './track-accept.component';
import { TrackAcceptRoutingModule } from './track-accept-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/index';
import {AllApplicantServicesService} from '../../services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrackAcceptRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [TrackAcceptComponent],
  providers:[AllApplicantServicesService,UserService]
})

export class TrackAcceptModule { }
