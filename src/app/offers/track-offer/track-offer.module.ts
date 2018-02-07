import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrackOfferComponent } from './track-offer.component';
import { TrackOfferRoutingModule } from './track-offer-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrackOfferRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [TrackOfferComponent],
  providers: [AllApplicantServicesService]
})

export class TrackOfferModule { }
