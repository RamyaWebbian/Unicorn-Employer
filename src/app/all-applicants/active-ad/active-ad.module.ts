import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActiveAdComponent } from './active-ad.component';
import { ActiveAdRoutingModule } from './active-ad-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
//import { OrderByFilter } from '../../common/pipes/orderby.pipe';
//import { OrderByPipe } from '../../common/pipes/order-by.pipe';
//import { Format } from '../../common/pipes/format.pipe';

import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllApplicantServicesService } from '../../all-applicants/services/all-applicant-services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActiveAdRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule
  ],
  declarations: [ActiveAdComponent],
  providers:[AllApplicantServicesService]
})

export class ActiveAdModule { }
