import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BusinessProfileComponent } from './business-profile.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'',component:BusinessProfileComponent,pathMatch:'full'}
    ]),
  ],
  declarations: [BusinessProfileComponent]
})
export class BusinessProfileModule { }
