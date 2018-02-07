import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActiveHwaComponent } from './active-hwa.component';
import { ActiveHwaRoutingModule } from './active-hwa-routing.module';

import { SharedModule } from '../shared/shared.module';
import { UserService } from '../services/index';
import {HwaCommonService} from '../services/index';

import {HeaderValidUserModule} from '../common/header-valid-user/header-valid-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActiveHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    HeaderValidUserModule
  ],
  declarations: [ActiveHwaComponent],
  providers:[HwaCommonService, UserService]
})

export class ActiveHwaModule { }
