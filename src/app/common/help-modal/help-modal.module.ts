import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HelpModalComponent } from './help-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'',component:HelpModalComponent,pathMatch:'full'}
    ])
  ],
  exports:[HelpModalComponent],
  declarations: [HelpModalComponent]
})
export class HelpModalModule { }
