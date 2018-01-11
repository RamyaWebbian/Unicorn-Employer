import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExtendHwaComponent } from './extend-hwa.component';
import { ExtendHwaRoutingModule } from './extend-hwa-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';

import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExtendHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [ExtendHwaComponent],
  providers:[]
})
export class ExtendHwaModule { }
