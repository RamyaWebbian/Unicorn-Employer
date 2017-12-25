import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotSuccessComponent } from './forgot-success.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'',component:ForgotSuccessComponent,pathMatch:'full'}
    ])
  ],
  declarations: [ForgotSuccessComponent]
})

export class ForgotSuccessModule { }
