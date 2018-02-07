import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApplicantsListComponent } from './applicants-list.component';
import { ApplicantsListRoutingModule } from './applicants-list-routing.module';
import { PositiveNotesModule } from '../operations/interview-notes/positive-notes/positive-notes.module';
import { NegativeNotesModule } from '../operations/interview-notes/negative-notes/negative-notes.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import { AllApplicantServicesService } from '../services/all-applicant-services.service';

import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApplicantsListRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule,
    PositiveNotesModule,
    NegativeNotesModule
  ],
  declarations: [ApplicantsListComponent],
  providers:[AllApplicantServicesService]
})

export class ApplicantsListModule { }
