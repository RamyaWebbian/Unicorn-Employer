import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectHiringLocationComponent } from './select-hiring-location.component';
import { SelectHiringLocationRoutingModule } from './select-hiring-location-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { UserService, ProfileService, HwaCommonService } from '../../../services/index';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectHiringLocationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [SelectHiringLocationComponent],
  providers:[ProfileService, HwaCommonService]
})
export class SelectHiringLocationModule { }
