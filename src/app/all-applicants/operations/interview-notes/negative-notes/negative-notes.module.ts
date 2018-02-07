import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NegativeNotesComponent } from './negative-notes.component';
import { NegativeNotesRoutingModule } from './negative-notes-routing.module';

import { SharedModule } from '../../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HeaderValidUserModule} from '../../../../common/header-valid-user/header-valid-user.module';
import { AllApplicantServicesService } from '../../../services/all-applicant-services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NegativeNotesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule
  ],
  exports:[NegativeNotesComponent],
  declarations: [NegativeNotesComponent],
  providers:[AllApplicantServicesService]
})

export class NegativeNotesModule { }
