import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
 import { HelpModalModule } from '../../common/help-modal/help-modal.module';
 import { SharedModule } from '../../shared/shared.module';
 import { HeaderRegistrationModule } from '../../common/header-registration/header-registration.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RegistrationRoutingModule,
    HelpModalModule,
    HeaderRegistrationModule,
  ],
  declarations: [RegistrationComponent],
  providers:[]
})
export class RegistrationModule { }
