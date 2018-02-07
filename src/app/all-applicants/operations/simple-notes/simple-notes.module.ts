import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleNotesComponent } from './simple-notes.component';
import { SimpleNotesRoutingModule } from './simple-notes-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/index';
import { AllApplicantServicesService } from '../../services/all-applicant-services.service';
import { HeaderValidUserModule } from '../../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SimpleNotesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [SimpleNotesComponent],
  exports:[SimpleNotesComponent],
  providers:[AllApplicantServicesService]
})

export class SimpleNotesModule { }
