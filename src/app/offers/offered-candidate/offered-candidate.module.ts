import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OfferedCandidateComponent } from './offered-candidate.component';
import { OfferedCandidateRoutingModule } from './offered-candidate-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';

import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllApplicantServicesService } from '../../all-applicants/services/all-applicant-services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OfferedCandidateRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule
  ],
  declarations: [OfferedCandidateComponent],
  providers:[AllApplicantServicesService, UserService]
})

export class OfferedCandidateModule { }
