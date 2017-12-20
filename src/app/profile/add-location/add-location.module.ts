import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AddLocationComponent } from './add-location.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'',component:AddLocationComponent,pathMatch:'full'}
    ]),
  ],
  declarations: [AddLocationComponent]
})
export class AddLocationModule { }