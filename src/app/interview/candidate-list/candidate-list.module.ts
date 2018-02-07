import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CandidateListComponent } from './candidate-list.component';
import { CandidateListRoutingModule } from './candidate-list-routing.module';
import { PositiveNotesModule } from '../../all-applicants/operations/interview-notes/positive-notes/positive-notes.module';
import { NegativeNotesModule } from '../../all-applicants/operations/interview-notes/negative-notes/negative-notes.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CandidateListRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule,
    PositiveNotesModule,
    NegativeNotesModule
  ],
  declarations: [CandidateListComponent],
  providers:[AllApplicantServicesService, UserService]
})

export class CandidateListModule { }
