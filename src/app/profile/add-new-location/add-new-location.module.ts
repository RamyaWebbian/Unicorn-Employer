import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { AddNewLocationComponent } from './add-new-location.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'', component:AddNewLocationComponent,pathMatch:'full'}
    ]),
  ],
  declarations: [AddNewLocationComponent]
})
export class AddNewLocationModule { }
