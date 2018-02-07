import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OfferedHwaListComponent } from './offered-hwa-list.component';
import { OfferedHwaListRoutingModule } from './offered-hwa-list-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OfferedHwaListRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [OfferedHwaListComponent],
  providers:[UserService, AllApplicantServicesService]
})

export class OfferedHwaListModule { }
