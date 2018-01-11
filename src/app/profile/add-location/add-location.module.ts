import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddLocationComponent } from './add-location.component';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import {ProfileService, UserService} from '../../services/index';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { AddLocationRoutingModule } from './add-location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
     FormsModule,
     AddLocationRoutingModule,
    HeaderValidUserModule,
    ReactiveFormsModule,
    SimpleNotificationsModule
    
  ],
  declarations: [AddLocationComponent],
  providers:[NotificationsService]
})
export class AddLocationModule { }