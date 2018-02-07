import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostHwaComponent } from './post-hwa.component';
import { PostHwaRoutingModule } from './post-hwa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserService, HwaCommonService } from '../services/index';
import {HeaderValidUserModule} from '../common/header-valid-user/header-valid-user.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { PaypalComponent } from '../paypal/paypal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [PostHwaComponent],
 providers:[HwaCommonService]
})

export class PostHwaModule { }
