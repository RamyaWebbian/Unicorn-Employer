import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CopyHwaComponent } from './copy-hwa.component';
import { CopyHwaRoutingModule } from './copy-hwa-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';

import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CopyHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [CopyHwaComponent],
  providers:[]
})

export class CopyHwaModule { }
