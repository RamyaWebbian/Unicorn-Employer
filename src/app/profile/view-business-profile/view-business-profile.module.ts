import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewBusinessProfileComponent} from './view-business-profile.component';
import { ViewBusinessProfileRoutingModule} from './view-business-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/index';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    ViewBusinessProfileRoutingModule,
    HeaderValidUserModule,
    NgxMaskModule.forRoot(),
    ],
  declarations: [ViewBusinessProfileComponent],
  providers:[CookieService, UserService]
})
export class ViewBusinessProfileModule { }
