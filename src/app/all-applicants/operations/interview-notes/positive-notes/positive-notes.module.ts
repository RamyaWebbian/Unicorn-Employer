import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PositiveNotesComponent } from './positive-notes.component';
import { PositiveNotesRoutingModule } from './positive-notes-routing.module';

import { SharedModule } from '../../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HeaderValidUserModule} from '../../../../common/header-valid-user/header-valid-user.module';
import { AllApplicantServicesService } from '../../../services/all-applicant-services.service';
import { UserService } from '../../../../services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PositiveNotesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule
  ],
  exports:[PositiveNotesComponent],
  declarations: [PositiveNotesComponent],
  providers:[AllApplicantServicesService]
})

export class PositiveNotesModule { }
