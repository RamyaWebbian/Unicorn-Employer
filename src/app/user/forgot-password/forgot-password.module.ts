import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
// import { HeaderRegistrationModule } from '../../common/header-registration/header-registration.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
   // HeaderRegistrationModule,
ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:ForgotPasswordComponent,pathMatch:'full'}
    ])
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
