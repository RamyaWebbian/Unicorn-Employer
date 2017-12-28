import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HwaPreviewComponent } from './hwa-preview.component';
import { HwaPreviewRoutingModule } from './hwa-preview-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';

import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HwaPreviewRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [HwaPreviewComponent],
  providers:[]
})
export class HwaPreviewModule { }
