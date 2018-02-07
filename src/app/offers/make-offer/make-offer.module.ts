import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MakeOfferComponent } from './make-offer.component';
import { MakeOfferRoutingModule } from './make-offer-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MakeOfferRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
    NgxEditorModule
  ],
  declarations: [MakeOfferComponent],
  providers:[UserService, AllApplicantServicesService]
})

export class MakeOfferModule { }
