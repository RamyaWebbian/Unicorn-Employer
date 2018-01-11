import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegistrationSuccessComponent } from './registration-success.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'',component:RegistrationSuccessComponent,pathMatch:'full'}
    ])
  ],
  declarations: [RegistrationSuccessComponent]
})
export class RegistrationSuccessModule { }
