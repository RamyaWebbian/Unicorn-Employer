import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {ViewBusinessProfileComponent} from './view-business-profile.component';
@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      RouterModule.forChild([
        {path:'',component:ViewBusinessProfileComponent,pathMatch:'full'}
      ])
    ],
  declarations: [ViewBusinessProfileComponent]
})
export class ViewBusinessProfileModule { }
