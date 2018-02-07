import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewApplicantComponent } from './view-applicant.component';
import { ViewApplicantRoutingModule } from './view-applicant-routing.module';
import {AllApplicantServicesService} from '../services/all-applicant-services.service';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import { SimpleNotesModule } from '../operations/simple-notes/simple-notes.module';
import { PositiveNotesModule } from '../operations/interview-notes/positive-notes/positive-notes.module';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewApplicantRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SimpleNotesModule,
    PositiveNotesModule,
    HeaderValidUserModule
  ],
  declarations: [ViewApplicantComponent],
  providers:[AllApplicantServicesService]
})

export class ViewApplicantModule { }
