import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderRegistrationModule } from '../../common/header-registration/header-registration.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule,
    HeaderRegistrationModule
    
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
