import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HeaderRegistrationComponent } from './header-registration.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'', component:HeaderRegistrationComponent, pathMatch:'full'}
    ])
  ],
  exports:[HeaderRegistrationComponent],
  declarations: [HeaderRegistrationComponent]
})
export class HeaderRegistrationModule { }
