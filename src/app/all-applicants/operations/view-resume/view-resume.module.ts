import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewResumeComponent } from './view-resume.component';
import { ViewResumeRoutingModule } from './view-resume-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/index';

import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewResumeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [ViewResumeComponent],
  providers:[]
})

export class ViewResumeModule { }
