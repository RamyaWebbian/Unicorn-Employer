import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetNewPasswordComponent } from './set-new-password.component';
import { SharedModule } from '../../shared/shared.module';
import { SetnewPasswordRoutingModule } from './set-new-password-routing.module';
import { UserService } from '../../services/index';
import {ShowHideCnf} from '../../common/directives/show-hide-cnf';
import { HeaderRegistrationModule } from '../../common/header-registration/header-registration.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SetnewPasswordRoutingModule,
    HeaderRegistrationModule
  ],
  declarations: [SetNewPasswordComponent, ShowHideCnf],
 // providers:[UserService]
})
export class SetNewPasswordModule { }
